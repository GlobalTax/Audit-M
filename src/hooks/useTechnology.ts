import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SITE_SOURCE, getSourceFilter } from '@/config/site';

export interface TechItem {
  name: string;
  category: string;
  description: string;
  mockup_url: string;
  featured?: boolean;
  order: number;
}

interface TechnologyContent {
  overline?: string;
  title?: string;
  technologies: TechItem[];
}

export const useTechnology = () => {
  const sourceFilter = getSourceFilter() as 'es' | 'int';
  
  return useQuery({
    queryKey: ['technology-content', SITE_SOURCE],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_key', 'home')
        .eq('section_key', 'tecnologia')
        .eq('source_site', sourceFilter)
        .maybeSingle();

      if (error) throw error;
      
      // If no record exists, return empty array
      if (!data) return [];
      
      const content = data?.content as unknown as TechnologyContent;
      return content?.technologies || [];
    }
  });
};

export const useUpdateTechnology = () => {
  const queryClient = useQueryClient();
  const sourceFilter = getSourceFilter() as 'es' | 'int';
  
  return useMutation({
    mutationFn: async (technologies: TechItem[]) => {
      // First try to get existing record
      const { data: existing } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_key', 'home')
        .eq('section_key', 'tecnologia')
        .eq('source_site', sourceFilter)
        .maybeSingle();

      const existingContent = existing?.content as unknown as TechnologyContent | null;
      const updatedContent = {
        overline: existingContent?.overline || 'Technology we use',
        title: existingContent?.title || 'Our Software Stack',
        technologies
      };

      if (existing) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('page_content')
          .update({ content: updatedContent as any, updated_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (updateError) throw updateError;
      } else {
        // Create new record if it doesn't exist
        const { error: insertError } = await supabase
          .from('page_content')
          .insert([{
            page_key: 'home',
            section_key: 'tecnologia',
            source_site: sourceFilter,
            content: updatedContent as any
          }]);

        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technology-content'] });
      toast.success('Technologies updated successfully');
    },
    onError: (error) => {
      console.error('Error updating technologies:', error);
      toast.error('Error updating technologies');
    }
  });
};
