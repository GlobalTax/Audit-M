import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type CRMContractStatus = 'activo' | 'pausado' | 'finalizado' | 'renovacion_pendiente';

export interface CRMContract {
  id: string;
  client_id: string;
  service_name: string;
  status: CRMContractStatus;
  start_date: string | null;
  end_date: string | null;
  amount: number;
  billing_frequency: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useCRMContracts = (clientId?: string) => {
  return useQuery({
    queryKey: ['crm-contracts', clientId],
    queryFn: async () => {
      let query = supabase.from('crm_contracts').select('*').order('created_at', { ascending: false });
      if (clientId) {
        query = query.eq('client_id', clientId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as CRMContract[];
    },
  });
};

export const useCreateCRMContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contract: Omit<CRMContract, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('crm_contracts')
        .insert(contract as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['crm-contracts'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Contrato creado');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useUpdateCRMContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CRMContract> & { id: string }) => {
      const { data, error } = await supabase
        .from('crm_contracts')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-contracts'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Contrato actualizado');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
