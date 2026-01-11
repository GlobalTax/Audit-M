import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ContentSection = 'home' | 'about' | 'services' | 'team' | 'resources' | 'contact' | 'other';

export interface ContentBlock {
  id: string;
  source_url?: string | null;
  section: ContentSection;
  language: string;
  title?: string | null;
  markdown: string;
  tags?: string[] | null;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export const useContentBlocks = (section?: ContentSection) => {
  return useQuery({
    queryKey: ['content-blocks', section],
    queryFn: async () => {
      let query = supabase
        .from('content_blocks')
        .select('*')
        .order('section')
        .order('created_at', { ascending: false });
      
      if (section) {
        query = query.eq('section', section);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as ContentBlock[];
    },
  });
};

export const useContentBlock = (id: string) => {
  return useQuery({
    queryKey: ['content-block', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as ContentBlock;
    },
    enabled: !!id,
  });
};

export const useCreateContentBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (block: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('content_blocks')
        .insert(block as any)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] });
    },
  });
};

export const useUpdateContentBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ContentBlock> & { id: string }) => {
      const { data, error } = await supabase
        .from('content_blocks')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] });
      queryClient.invalidateQueries({ queryKey: ['content-block', variables.id] });
    },
  });
};

export const useDeleteContentBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('content_blocks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] });
    },
  });
};
