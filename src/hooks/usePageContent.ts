import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageContent, PageContentInsert, PageContentUpdate } from '@/types/pageContent';
import { useLanguage } from './useLanguage';
import { getLocalizedPageContent } from '@/i18n/utils';
import { pageContentFallbacks } from '@/i18n/pageContentFallbacks';

export const usePageContent = (pageKey?: string, sectionKey?: string) => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['page-content', pageKey, sectionKey, language],
    queryFn: async () => {
      let query = supabase
        .from('page_content')
        .select('*')
        .eq('is_active', true);
      
      if (pageKey) {
        query = query.eq('page_key', pageKey);
      }
      
      if (sectionKey) {
        query = query.eq('section_key', sectionKey);
      }
      
      const { data, error } = await query.order('display_order');
      
      if (error) throw error;
      
      // If no data in DB, use fallbacks directly
      if (!data || data.length === 0) {
        if (pageKey && sectionKey) {
          const fallback = pageContentFallbacks[language]?.[pageKey]?.[sectionKey];
          if (fallback) {
            return [{
              id: `fallback-${pageKey}-${sectionKey}`,
              page_key: pageKey,
              section_key: sectionKey,
              content: fallback,
              display_order: 0,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }] as PageContent[];
          }
        }
        return [];
      }
      
      // Extract localized content with fallback support
      return data?.map(item => {
        let localizedContent = getLocalizedPageContent(item.content, language);
        
        // If no localized content in DB, use static fallback
        if (!localizedContent && item.page_key && item.section_key) {
          const fallback = pageContentFallbacks[language]?.[item.page_key]?.[item.section_key];
          localizedContent = fallback || null;
        }
        
        return {
          ...item,
          content: localizedContent || item.content
        };
      }) as PageContent[];
    },
    enabled: !!pageKey,
  });
};

export const useAllPageContent = () => {
  return useQuery({
    queryKey: ['page-content', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_key')
        .order('display_order');
      
      if (error) throw error;
      return data as PageContent[];
    },
  });
};

export const useCreatePageContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: PageContentInsert) => {
      const { data, error } = await supabase
        .from('page_content')
        .insert(content)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
    },
  });
};

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: PageContentUpdate }) => {
      const { data, error } = await supabase
        .from('page_content')
        .update(content)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
    },
  });
};

export const useDeletePageContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
    },
  });
};
