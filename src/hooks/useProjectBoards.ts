import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ProjectBoard {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjectBoards = () => {
  return useQuery({
    queryKey: ['project-boards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_boards')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ProjectBoard[];
    },
  });
};

export const useCreateProjectBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (board: Partial<ProjectBoard>) => {
      const { data, error } = await supabase
        .from('project_boards')
        .insert(board as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['project-boards'] });
      toast.success('Proyecto creado');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useUpdateProjectBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProjectBoard> & { id: string }) => {
      const { data, error } = await supabase
        .from('project_boards')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['project-boards'] });
      toast.success('Proyecto actualizado');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useDeleteProjectBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('project_boards').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['project-boards'] });
      toast.success('Proyecto eliminado');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};
