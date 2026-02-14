-- ============================================
-- COMPREHENSIVE BLOG DATABASE FIX MIGRATION
-- Fixes: reproducibility, Catalan fields, status validation,
--        FKs, RLS, categories normalization, search functions
-- Date: 2026-02-14
-- ============================================

-- ============================================
-- FIX 1: Create missing blog tables with IF NOT EXISTS
-- These tables were created via Supabase dashboard and are
-- missing from local migrations (reproducibility risk)
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_es text NOT NULL,
  title_en text,
  slug_es text NOT NULL,
  slug_en text,
  excerpt_es text,
  excerpt_en text,
  content_es text,
  content_en text,
  featured_image text,
  category text,
  tags text[],
  read_time integer,
  author_id uuid NOT NULL,
  author_name text,
  author_specialization text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  scheduled_at timestamptz,
  seo_title_es text,
  seo_title_en text,
  seo_description_es text,
  seo_description_en text,
  view_count integer DEFAULT 0,
  quality_score numeric,
  quality_checks jsonb,
  passed_validation boolean DEFAULT false,
  source_site text DEFAULT 'es',
  shared_sites text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_automation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  is_enabled boolean NOT NULL DEFAULT false,
  articles_per_run integer NOT NULL DEFAULT 1,
  auto_publish boolean NOT NULL DEFAULT false,
  default_language text NOT NULL DEFAULT 'both',
  default_tone text NOT NULL DEFAULT 'professional',
  run_interval_days integer NOT NULL DEFAULT 7,
  notify_on_generation boolean NOT NULL DEFAULT true,
  last_run_at timestamptz,
  next_run_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_generation_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  category text NOT NULL DEFAULT 'Corporativo',
  language text NOT NULL DEFAULT 'both',
  tone text NOT NULL DEFAULT 'professional',
  status text NOT NULL DEFAULT 'pending',
  scheduled_for timestamptz NOT NULL DEFAULT now(),
  generated_post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_post_state_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by text NOT NULL,
  changed_at timestamptz DEFAULT now(),
  notes text
);

CREATE TABLE IF NOT EXISTS public.blog_topics_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  category text DEFAULT 'Corporativo',
  target_keywords text[],
  target_language text DEFAULT 'both',
  target_site text DEFAULT 'international',
  priority integer DEFAULT 1,
  status text DEFAULT 'pending',
  generated_post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  error_message text,
  scheduled_for timestamptz,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


-- ============================================
-- FIX 2: Add Catalan language fields
-- The translate-blog-to-catalan edge function already
-- references these fields but they may not exist
-- ============================================

ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS title_ca text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS slug_ca text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS excerpt_ca text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_ca text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS seo_title_ca text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS seo_description_ca text;

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_ca ON public.blog_posts(slug_ca);


-- ============================================
-- FIX 3: Add CHECK constraints for status validation
-- Prevents typos like "publshed" or invalid values
-- ============================================

DO $$ BEGIN
  ALTER TABLE public.blog_posts
    ADD CONSTRAINT blog_posts_status_check
    CHECK (status IN ('draft', 'scheduled', 'published'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_generation_queue
    ADD CONSTRAINT blog_generation_queue_status_check
    CHECK (status IN ('pending', 'processing', 'completed', 'failed'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_topics_queue
    ADD CONSTRAINT blog_topics_queue_status_check
    CHECK (status IN ('pending', 'processing', 'completed', 'failed'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_post_state_changes
    ADD CONSTRAINT blog_state_changes_to_status_check
    CHECK (to_status IN ('draft', 'scheduled', 'published'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_automation_settings
    ADD CONSTRAINT blog_automation_tone_check
    CHECK (default_tone IN ('professional', 'technical', 'divulgative'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================
-- FIX 4: Create blog_categories reference table
-- Normalizes categories instead of free text
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

INSERT INTO public.blog_categories (name, slug, display_order) VALUES
  ('Fiscal', 'fiscal', 1),
  ('Mercantil', 'mercantil', 2),
  ('Laboral', 'laboral', 3),
  ('Corporativo', 'corporativo', 4),
  ('Análisis', 'analisis', 5)
ON CONFLICT (name) DO NOTHING;


-- ============================================
-- FIX 5: Ensure Foreign Keys exist
-- ============================================

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'blog_generation_queue_generated_post_id_fkey'
    AND table_name = 'blog_generation_queue'
  ) THEN
    ALTER TABLE public.blog_generation_queue
      ADD CONSTRAINT blog_generation_queue_generated_post_id_fkey
      FOREIGN KEY (generated_post_id) REFERENCES public.blog_posts(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'blog_post_state_changes_post_id_fkey'
    AND table_name = 'blog_post_state_changes'
  ) THEN
    ALTER TABLE public.blog_post_state_changes
      ADD CONSTRAINT blog_post_state_changes_post_id_fkey
      FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'blog_topics_queue_generated_post_id_fkey'
    AND table_name = 'blog_topics_queue'
  ) THEN
    ALTER TABLE public.blog_topics_queue
      ADD CONSTRAINT blog_topics_queue_generated_post_id_fkey
      FOREIGN KEY (generated_post_id) REFERENCES public.blog_posts(id) ON DELETE SET NULL;
  END IF;
END $$;


-- ============================================
-- FIX 6: Enable RLS and add policies
-- ============================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_automation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_generation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_state_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- blog_posts: anyone can read published, admins manage all
DO $$ BEGIN
  CREATE POLICY "Anyone can view published blog posts"
    ON public.blog_posts FOR SELECT
    USING (status = 'published');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage all blog posts"
    ON public.blog_posts FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- blog_automation_settings: admins only
DO $$ BEGIN
  CREATE POLICY "Admins can manage blog automation"
    ON public.blog_automation_settings FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- blog_generation_queue: admins + service role
DO $$ BEGIN
  CREATE POLICY "Admins can manage blog generation queue"
    ON public.blog_generation_queue FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- blog_post_state_changes: admins read, system insert
DO $$ BEGIN
  CREATE POLICY "Admins can view blog state changes"
    ON public.blog_post_state_changes FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "System can insert blog state changes"
    ON public.blog_post_state_changes FOR INSERT
    TO authenticated
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- blog_categories: public read active, admins manage
DO $$ BEGIN
  CREATE POLICY "Anyone can view active blog categories"
    ON public.blog_categories FOR SELECT
    USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can manage blog categories"
    ON public.blog_categories FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================
-- FIX 7: Update search functions for Catalan + filter_site
-- ============================================

-- Drop all existing overloads to recreate clean versions
DROP FUNCTION IF EXISTS public.search_blog_posts(text, text, text[], text, integer, integer);
DROP FUNCTION IF EXISTS public.search_blog_posts(text, text, text[], text, integer, integer, text);
DROP FUNCTION IF EXISTS public.search_blog_posts(text, text, text[], text, integer, integer, text, text);

CREATE OR REPLACE FUNCTION public.search_blog_posts(
  search_query text DEFAULT NULL,
  filter_category text DEFAULT NULL,
  filter_tags text[] DEFAULT NULL,
  filter_status text DEFAULT 'published',
  limit_count integer DEFAULT 10,
  offset_count integer DEFAULT 0,
  lang text DEFAULT 'es',
  filter_site text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  slug_es text,
  slug_en text,
  excerpt text,
  content text,
  category text,
  tags text[],
  read_time integer,
  view_count integer,
  featured_image text,
  published_at timestamptz,
  created_at timestamptz,
  status text,
  source_site text,
  shared_sites text[],
  author_name text,
  author_specialization text
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    bp.id,
    CASE lang
      WHEN 'en' THEN COALESCE(bp.title_en, bp.title_es)
      WHEN 'ca' THEN COALESCE(bp.title_ca, bp.title_es)
      ELSE bp.title_es
    END as title,
    CASE lang
      WHEN 'en' THEN COALESCE(bp.slug_en, bp.slug_es)
      WHEN 'ca' THEN COALESCE(bp.slug_ca, bp.slug_es)
      ELSE bp.slug_es
    END as slug,
    bp.slug_es,
    bp.slug_en,
    CASE lang
      WHEN 'en' THEN COALESCE(bp.excerpt_en, bp.excerpt_es)
      WHEN 'ca' THEN COALESCE(bp.excerpt_ca, bp.excerpt_es)
      ELSE bp.excerpt_es
    END as excerpt,
    CASE lang
      WHEN 'en' THEN COALESCE(bp.content_en, bp.content_es)
      WHEN 'ca' THEN COALESCE(bp.content_ca, bp.content_es)
      ELSE bp.content_es
    END as content,
    bp.category,
    bp.tags,
    bp.read_time,
    bp.view_count,
    bp.featured_image,
    bp.published_at,
    bp.created_at,
    bp.status,
    bp.source_site::text,
    bp.shared_sites,
    bp.author_name,
    bp.author_specialization
  FROM public.blog_posts bp
  WHERE (filter_status IS NULL OR bp.status = filter_status)
    AND (filter_site IS NULL OR bp.source_site::text = filter_site)
    AND (search_query IS NULL OR
         CASE lang
           WHEN 'en' THEN
             bp.title_en ILIKE '%' || search_query || '%' OR
             bp.excerpt_en ILIKE '%' || search_query || '%' OR
             bp.content_en ILIKE '%' || search_query || '%'
           WHEN 'ca' THEN
             bp.title_ca ILIKE '%' || search_query || '%' OR
             bp.excerpt_ca ILIKE '%' || search_query || '%' OR
             bp.content_ca ILIKE '%' || search_query || '%'
           ELSE
             bp.title_es ILIKE '%' || search_query || '%' OR
             bp.excerpt_es ILIKE '%' || search_query || '%' OR
             bp.content_es ILIKE '%' || search_query || '%'
         END)
    AND (filter_category IS NULL OR bp.category = filter_category)
    AND (filter_tags IS NULL OR array_length(filter_tags, 1) IS NULL OR bp.tags && filter_tags)
  ORDER BY bp.published_at DESC NULLS LAST
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Drop existing count_blog_posts overloads
DROP FUNCTION IF EXISTS public.count_blog_posts(text, text, text[], text);
DROP FUNCTION IF EXISTS public.count_blog_posts(text, text, text[], text, text);
DROP FUNCTION IF EXISTS public.count_blog_posts(text, text, text[], text, text, text);

CREATE OR REPLACE FUNCTION public.count_blog_posts(
  search_query text DEFAULT NULL,
  filter_category text DEFAULT NULL,
  filter_tags text[] DEFAULT NULL,
  filter_status text DEFAULT 'published',
  lang text DEFAULT 'es',
  filter_site text DEFAULT NULL
)
RETURNS bigint
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  result_count bigint;
BEGIN
  SELECT COUNT(*)
  INTO result_count
  FROM public.blog_posts bp
  WHERE (filter_status IS NULL OR bp.status = filter_status)
    AND (filter_site IS NULL OR bp.source_site::text = filter_site)
    AND (search_query IS NULL OR
         CASE lang
           WHEN 'en' THEN
             bp.title_en ILIKE '%' || search_query || '%' OR
             bp.excerpt_en ILIKE '%' || search_query || '%' OR
             bp.content_en ILIKE '%' || search_query || '%'
           WHEN 'ca' THEN
             bp.title_ca ILIKE '%' || search_query || '%' OR
             bp.excerpt_ca ILIKE '%' || search_query || '%' OR
             bp.content_ca ILIKE '%' || search_query || '%'
           ELSE
             bp.title_es ILIKE '%' || search_query || '%' OR
             bp.excerpt_es ILIKE '%' || search_query || '%' OR
             bp.content_es ILIKE '%' || search_query || '%'
         END)
    AND (filter_category IS NULL OR bp.category = filter_category)
    AND (filter_tags IS NULL OR array_length(filter_tags, 1) IS NULL OR bp.tags && filter_tags);

  RETURN result_count;
END;
$$;


-- ============================================
-- FIX 8: Ensure all indexes exist
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_es ON public.blog_posts(slug_es);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_en ON public.blog_posts(slug_en);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_source_site ON public.blog_posts(source_site);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);


-- ============================================
-- FIX 9: Ensure updated_at triggers exist
-- ============================================

DO $$ BEGIN
  CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_blog_automation_settings_updated_at
    BEFORE UPDATE ON public.blog_automation_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_blog_generation_queue_updated_at
    BEFORE UPDATE ON public.blog_generation_queue
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
