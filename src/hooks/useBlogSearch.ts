import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SITE_SOURCE } from "@/config/site";

interface BlogSearchParams {
  searchQuery?: string;
  category?: string;
  tags?: string[];
  status?: string;
  limit?: number;
  offset?: number;
}

export const useBlogSearch = (params: BlogSearchParams, language: string = 'es') => {
  return useQuery({
    queryKey: ["blog-search", params, language, SITE_SOURCE],
    queryFn: async () => {
      // Build direct query with source_site filter
      let query = supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .eq("source_site", SITE_SOURCE)
        .eq("status", params.status || "published");

      if (params.searchQuery) {
        const search = `%${params.searchQuery}%`;
        if (language === 'en') {
          query = query.or(`title_en.ilike.${search},excerpt_en.ilike.${search},content_en.ilike.${search}`);
        } else {
          query = query.or(`title_es.ilike.${search},excerpt_es.ilike.${search},content_es.ilike.${search}`);
        }
      }

      if (params.category) {
        query = query.eq("category", params.category);
      }

      if (params.tags && params.tags.length > 0) {
        query = query.overlaps("tags", params.tags);
      }

      query = query
        .order("published_at", { ascending: false, nullsFirst: false })
        .range(params.offset || 0, (params.offset || 0) + (params.limit || 10) - 1);

      const { data: posts, error, count } = await query;

      if (error) throw error;

      return {
        posts: posts || [],
        totalCount: count || 0,
      };
    },
    enabled: true,
  });
};

export const useBlogFilterOptions = () => {
  return useQuery({
    queryKey: ["blog-filter-options", SITE_SOURCE],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("category, tags")
        .eq("source_site", SITE_SOURCE)
        .eq("status", "published");
      
      if (error) throw error;
      
      const categories = [...new Set(data.map(p => p.category).filter(Boolean))] as string[];
      const allTags = [...new Set(data.flatMap(p => p.tags || []))] as string[];
      
      return { categories, all_tags: allTags };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogStats = () => {
  return useQuery({
    queryKey: ["blog-stats", SITE_SOURCE],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("status, view_count")
        .eq("source_site", SITE_SOURCE);
      
      if (error) throw error;
      
      const stats = {
        total_published: data.filter(p => p.status === 'published').length,
        total_drafts: data.filter(p => p.status === 'draft').length,
        total_scheduled: data.filter(p => p.status === 'scheduled').length,
        total_views: data.reduce((sum, p) => sum + (p.view_count || 0), 0),
      };
      return stats;
    },
  });
};
