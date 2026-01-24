import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_SOURCE, getSourceFilter } from "@/config/site";

interface NewsSearchParams {
  searchQuery?: string;
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string;
  author_avatar_url: string | null;
  category: string;
  tags: string[];
  read_time: number;
  is_featured: boolean;
  published_at: string;
}

export const useNewsSearch = (params: NewsSearchParams) => {
  const { language } = useLanguage();
  const sourceFilter = getSourceFilter() as 'es' | 'int';
  
  return useQuery({
    queryKey: ["news-search", params, language, SITE_SOURCE],
    queryFn: async () => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .eq('is_published', true)
        .eq('source_site', sourceFilter)
        .order('is_featured', { ascending: false })
        .order('published_at', { ascending: false });

      // Apply search filter
      if (params.searchQuery) {
        const titleCol = `title_${language}`;
        const excerptCol = `excerpt_${language}`;
        const contentCol = `content_${language}`;
        query = query.or(`${titleCol}.ilike.%${params.searchQuery}%,${excerptCol}.ilike.%${params.searchQuery}%,${contentCol}.ilike.%${params.searchQuery}%`);
      }

      // Apply category filter
      if (params.category) {
        query = query.eq('category', params.category);
      }

      // Apply tags filter
      if (params.tags && params.tags.length > 0) {
        query = query.contains('tags', params.tags);
      }

      // Apply pagination
      if (params.limit) {
        query = query.limit(params.limit);
      }
      if (params.offset) {
        query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Map to NewsArticle with correct language fields
      return (data || []).map((article: any) => ({
        id: article.id,
        title: article[`title_${language}`] || article.title_es,
        slug: article[`slug_${language}`] || article.slug_es,
        excerpt: article[`excerpt_${language}`] || article.excerpt_es,
        content: article[`content_${language}`] || article.content_es,
        featured_image_url: article.featured_image_url,
        author_name: article.author_name,
        author_avatar_url: article.author_avatar_url,
        category: article.category,
        tags: article.tags,
        read_time: article.read_time,
        is_featured: article.is_featured,
        published_at: article.published_at,
      })) as NewsArticle[];
    },
    enabled: true,
  });
};

export const useNewsFilterOptions = () => {
  return useQuery({
    queryKey: ["news-filter-options"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_news_filter_options");
      
      if (error) throw error;
      
      const result = data && data.length > 0 ? data[0] : { categories: [], all_tags: [] };
      return result as {
        categories: string[];
        all_tags: string[];
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
