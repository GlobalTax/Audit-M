import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada' | 'bloqueada';
export type TaskPriority = 'baja' | 'media' | 'alta' | 'urgente';

export interface ProjectTask {
  id: string;
  board_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string | null;
  due_date: string | null;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjectTasks = (boardId: string | undefined) => {
  return useQuery({
    queryKey: ['project-tasks', boardId],
    queryFn: async () => {
      if (!boardId) return [];
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('board_id', boardId)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as ProjectTask[];
    },
    enabled: !!boardId,
  });
};

export const useCreateProjectTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: Partial<ProjectTask> & { board_id: string; title: string }) => {
      const { data, error } = await supabase
        .from('project_tasks')
        .insert(task as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['project-tasks', vars.board_id] });
      qc.invalidateQueries({ queryKey: ['project-boards'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useUpdateProjectTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ProjectTask> & { id: string }) => {
      // If completing, set completed_at
      if (updates.status === 'completada' && !updates.completed_at) {
        updates.completed_at = new Date().toISOString();
      }
      if (updates.status && updates.status !== 'completada') {
        updates.completed_at = null;
      }
      const { data, error } = await supabase
        .from('project_tasks')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as ProjectTask;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['project-tasks', data.board_id] });
      qc.invalidateQueries({ queryKey: ['project-boards'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useDeleteProjectTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, boardId }: { id: string; boardId: string }) => {
      const { error } = await supabase.from('project_tasks').delete().eq('id', id);
      if (error) throw error;
      return boardId;
    },
    onSuccess: (boardId) => {
      qc.invalidateQueries({ queryKey: ['project-tasks', boardId] });
      qc.invalidateQueries({ queryKey: ['project-boards'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
};
