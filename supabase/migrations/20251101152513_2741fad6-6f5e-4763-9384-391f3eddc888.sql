-- Function to count blog posts matching search criteria
CREATE OR REPLACE FUNCTION public.count_blog_posts(
  search_query text DEFAULT NULL,
  filter_category text DEFAULT NULL,
  filter_tags text[] DEFAULT NULL,
  filter_status text DEFAULT 'published'
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
    AND (search_query IS NULL OR 
         bp.title_es ILIKE '%' || search_query || '%' OR
         bp.excerpt_es ILIKE '%' || search_query || '%' OR
         bp.content_es ILIKE '%' || search_query || '%')
    AND (filter_category IS NULL OR bp.category = filter_category)
    AND (filter_tags IS NULL OR array_length(filter_tags, 1) IS NULL OR bp.tags && filter_tags);
  
  RETURN result_count;
END;
$$;