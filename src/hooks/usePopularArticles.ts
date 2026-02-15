import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getSourceFilter, SITE_SOURCE, getCurrentSiteConfig } from '@/config/site';

interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  view_count: number;
  read_time: number | null;
}

export const usePopularArticles = (excludeId?: string, limit: number = 5) => {
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';
  const lang = getCurrentSiteConfig().defaultLanguage || 'es';
  const titleCol = `title_${lang}` as const;
  const slugCol = `slug_${lang}` as const;

  return useQuery({
    queryKey: ['popular-articles', excludeId, limit, SITE_SOURCE],
    queryFn: async (): Promise<PopularArticle[]> => {
      let query = supabase
        .from('blog_posts')
        .select(`id, title_es, title_en, slug_es, slug_en, category, view_count, read_time`)
        .eq('status', 'published')
        .eq('source_site', sourceFilter)
        .order('view_count', { ascending: false, nullsFirst: false })
        .limit(limit + 1);

      const { data, error } = await query;

      if (error) throw error;

      const filtered = (data || [])
        .filter(post => post.id !== excludeId)
        .slice(0, limit)
        .map(post => ({
          id: post.id,
          title: (post as any)[titleCol] || post.title_es || '',
          slug: (post as any)[slugCol] || post.slug_es || '',
          category: post.category,
          view_count: post.view_count || 0,
          read_time: post.read_time,
        }));

      return filtered;
    },
    staleTime: 5 * 60 * 1000,
  });
};
