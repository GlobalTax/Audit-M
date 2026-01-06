import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  view_count: number;
  read_time: number | null;
}

export const usePopularArticles = (excludeId?: string, limit: number = 5) => {
  return useQuery({
    queryKey: ['popular-articles', excludeId, limit],
    queryFn: async (): Promise<PopularArticle[]> => {
      let query = supabase
        .from('blog_posts')
        .select('id, title_en, slug_en, category, view_count, read_time')
        .eq('status', 'published')
        .eq('source_site', 'int')
        .not('title_en', 'is', null)
        .order('view_count', { ascending: false, nullsFirst: false })
        .limit(limit + 1); // Fetch one extra in case we need to exclude current

      const { data, error } = await query;

      if (error) throw error;

      // Filter out the current article and map to our interface
      const filtered = (data || [])
        .filter(post => post.id !== excludeId)
        .slice(0, limit)
        .map(post => ({
          id: post.id,
          title: post.title_en || '',
          slug: post.slug_en || '',
          category: post.category,
          view_count: post.view_count || 0,
          read_time: post.read_time,
        }));

      return filtered;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
