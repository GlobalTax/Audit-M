import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { TablesInsert } from '@/integrations/supabase/types';

export type CRMInteractionType = 'llamada' | 'email' | 'reunion' | 'nota' | 'tarea';

export interface CRMInteraction {
  id: string;
  client_id: string;
  type: CRMInteractionType;
  subject: string;
  description: string | null;
  date: string;
  created_by: string | null;
  created_at: string;
}

export const useCRMInteractions = (clientId: string | undefined) => {
  return useQuery({
    queryKey: ['crm-interactions', clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from('crm_interactions')
        .select('*')
        .eq('client_id', clientId)
        .order('date', { ascending: false });
      if (error) throw error;
      return data as CRMInteraction[];
    },
    enabled: !!clientId,
  });
};

export const useCreateCRMInteraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (interaction: Omit<CRMInteraction, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('crm_interactions')
        .insert(interaction as TablesInsert<'crm_interactions'>)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['crm-interactions', variables.client_id] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Interacción registrada');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
