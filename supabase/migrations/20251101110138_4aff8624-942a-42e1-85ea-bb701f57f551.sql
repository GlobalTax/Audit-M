-- Función de búsqueda para blog_posts
CREATE OR REPLACE FUNCTION public.search_blog_posts(
  search_query text DEFAULT NULL,
  filter_category text DEFAULT NULL,
  filter_tags text[] DEFAULT NULL,
  filter_status text DEFAULT 'published',
  limit_count integer DEFAULT 10,
  offset_count integer DEFAULT 0,
  lang text DEFAULT 'es'
)
RETURNS TABLE(
  id uuid,
  title_es text,
  slug_es text,
  excerpt_es text,
  category text,
  tags text[],
  read_time integer,
  view_count integer,
  featured_image text,
  published_at timestamp with time zone,
  status text,
  relevance numeric
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title_es,
    bp.slug_es,
    bp.excerpt_es,
    bp.category,
    bp.tags,
    bp.read_time,
    bp.view_count,
    bp.featured_image,
    bp.published_at,
    bp.status,
    CASE
      WHEN search_query IS NULL THEN 0::numeric
      WHEN bp.title_es ILIKE '%' || search_query || '%' THEN 1.0
      WHEN bp.excerpt_es ILIKE '%' || search_query || '%' THEN 0.7
      WHEN bp.content_es ILIKE '%' || search_query || '%' THEN 0.5
      ELSE 0::numeric
    END as relevance
  FROM public.blog_posts bp
  WHERE (filter_status IS NULL OR bp.status = filter_status)
    AND (search_query IS NULL OR 
         bp.title_es ILIKE '%' || search_query || '%' OR
         bp.excerpt_es ILIKE '%' || search_query || '%' OR
         bp.content_es ILIKE '%' || search_query || '%')
    AND (filter_category IS NULL OR bp.category = filter_category)
    AND (filter_tags IS NULL OR array_length(filter_tags, 1) IS NULL OR bp.tags && filter_tags)
  ORDER BY bp.published_at DESC NULLS LAST, relevance DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Función para opciones de filtros
CREATE OR REPLACE FUNCTION public.get_blog_filter_options()
RETURNS TABLE(
  categories text[],
  all_tags text[]
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    array_agg(DISTINCT bp.category) FILTER (WHERE bp.category IS NOT NULL) as categories,
    array_agg(DISTINCT tag) FILTER (WHERE tag IS NOT NULL) as all_tags
  FROM public.blog_posts bp
  CROSS JOIN LATERAL unnest(bp.tags) as tag
  WHERE bp.status = 'published';
END;
$$;

-- Función para obtener estadísticas del blog
CREATE OR REPLACE FUNCTION public.get_blog_stats()
RETURNS TABLE(
  total_published bigint,
  total_drafts bigint,
  total_scheduled bigint,
  total_views bigint
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE status = 'published') as total_published,
    COUNT(*) FILTER (WHERE status = 'draft') as total_drafts,
    COUNT(*) FILTER (WHERE status = 'scheduled') as total_scheduled,
    COALESCE(SUM(view_count), 0) as total_views
  FROM public.blog_posts;
END;
$$;

-- Índices para optimizar búsqueda
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_es ON public.blog_posts(slug_es);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_en ON public.blog_posts(slug_en);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Función para incrementar view_count
CREATE OR REPLACE FUNCTION public.increment_blog_view_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.blog_posts
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = post_id;
END;
$$;