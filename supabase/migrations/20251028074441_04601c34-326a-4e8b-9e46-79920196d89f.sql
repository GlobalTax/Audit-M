-- Create news_articles table
CREATE TABLE IF NOT EXISTS public.news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image_url text,
  author_name text,
  author_avatar_url text,
  category text NOT NULL,
  tags text[] DEFAULT '{}'::text[],
  read_time integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio_companies table
CREATE TABLE IF NOT EXISTS public.portfolio_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  logo_url text,
  website_url text,
  sector text NOT NULL,
  stage text NOT NULL,
  country text NOT NULL,
  founded_year integer,
  investment_date date,
  investment_thesis text,
  metrics jsonb,
  timeline jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text,
  email text,
  avatar_url text,
  bio text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON public.news_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news_articles(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_companies(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_sector ON public.portfolio_companies(sector);
CREATE INDEX IF NOT EXISTS idx_portfolio_stage ON public.portfolio_companies(stage);
CREATE INDEX IF NOT EXISTS idx_portfolio_country ON public.portfolio_companies(country);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON public.portfolio_companies(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_companies(is_featured);

CREATE INDEX IF NOT EXISTS idx_team_active ON public.team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_order ON public.team_members(order_index);

-- Add triggers for updated_at
CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_companies_updated_at
  BEFORE UPDATE ON public.portfolio_companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news_articles
CREATE POLICY "Public can view published news"
  ON public.news_articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all news"
  ON public.news_articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and editors can insert news"
  ON public.news_articles FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update news"
  ON public.news_articles FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete news"
  ON public.news_articles FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for portfolio_companies
CREATE POLICY "Public can view active portfolio companies"
  ON public.portfolio_companies FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all portfolio companies"
  ON public.portfolio_companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and editors can insert portfolio companies"
  ON public.portfolio_companies FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update portfolio companies"
  ON public.portfolio_companies FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete portfolio companies"
  ON public.portfolio_companies FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for team_members
CREATE POLICY "Public can view active team members"
  ON public.team_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all team members"
  ON public.team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage team members"
  ON public.team_members FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RPC: search_news_articles
CREATE OR REPLACE FUNCTION public.search_news_articles(
  search_query text DEFAULT NULL,
  filter_category text DEFAULT NULL,
  filter_tags text[] DEFAULT NULL,
  limit_count int DEFAULT 10,
  offset_count int DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  excerpt text,
  content text,
  featured_image_url text,
  author_name text,
  author_avatar_url text,
  category text,
  tags text[],
  read_time integer,
  is_featured boolean,
  is_published boolean,
  published_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  relevance numeric
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    n.slug,
    n.excerpt,
    n.content,
    n.featured_image_url,
    n.author_name,
    n.author_avatar_url,
    n.category,
    n.tags,
    n.read_time,
    n.is_featured,
    n.is_published,
    n.published_at,
    n.created_at,
    n.updated_at,
    CASE
      WHEN search_query IS NULL THEN 0::numeric
      WHEN n.title ILIKE '%' || search_query || '%' THEN 1.0
      WHEN n.excerpt ILIKE '%' || search_query || '%' THEN 0.7
      WHEN n.content ILIKE '%' || search_query || '%' THEN 0.5
      ELSE 0::numeric
    END as relevance
  FROM public.news_articles n
  WHERE n.is_published = true
    AND (search_query IS NULL OR 
         n.title ILIKE '%' || search_query || '%' OR
         n.excerpt ILIKE '%' || search_query || '%' OR
         n.content ILIKE '%' || search_query || '%')
    AND (filter_category IS NULL OR n.category = filter_category)
    AND (filter_tags IS NULL OR array_length(filter_tags, 1) IS NULL OR n.tags && filter_tags)
  ORDER BY n.is_featured DESC, n.published_at DESC NULLS LAST, relevance DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Create RPC: get_news_filter_options
CREATE OR REPLACE FUNCTION public.get_news_filter_options()
RETURNS TABLE (
  categories text[],
  all_tags text[]
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    array_agg(DISTINCT n.category) FILTER (WHERE n.category IS NOT NULL) as categories,
    array_agg(DISTINCT tag) FILTER (WHERE tag IS NOT NULL) as all_tags
  FROM public.news_articles n
  CROSS JOIN LATERAL unnest(n.tags) as tag
  WHERE n.is_published = true;
END;
$$;

-- Create RPC: search_portfolio_companies
CREATE OR REPLACE FUNCTION public.search_portfolio_companies(
  search_query text DEFAULT NULL,
  filter_sector text DEFAULT NULL,
  filter_stage text DEFAULT NULL,
  filter_country text DEFAULT NULL,
  limit_count int DEFAULT 20,
  offset_count int DEFAULT 0
)
RETURNS SETOF public.portfolio_companies
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.portfolio_companies p
  WHERE p.is_active = true
    AND (search_query IS NULL OR 
         p.name ILIKE '%' || search_query || '%' OR
         p.sector ILIKE '%' || search_query || '%' OR
         p.investment_thesis ILIKE '%' || search_query || '%')
    AND (filter_sector IS NULL OR p.sector = filter_sector)
    AND (filter_stage IS NULL OR p.stage = filter_stage)
    AND (filter_country IS NULL OR p.country = filter_country)
  ORDER BY p.is_featured DESC, p.display_order ASC, p.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- Create RPC: get_portfolio_filter_options
CREATE OR REPLACE FUNCTION public.get_portfolio_filter_options()
RETURNS TABLE (
  sectors text[],
  stages text[],
  countries text[]
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    array_agg(DISTINCT p.sector) FILTER (WHERE p.sector IS NOT NULL) as sectors,
    array_agg(DISTINCT p.stage) FILTER (WHERE p.stage IS NOT NULL) as stages,
    array_agg(DISTINCT p.country) FILTER (WHERE p.country IS NOT NULL) as countries
  FROM public.portfolio_companies p
  WHERE p.is_active = true;
END;
$$;