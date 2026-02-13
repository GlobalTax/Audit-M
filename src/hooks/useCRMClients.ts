import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type CRMClientStatus = 'prospecto' | 'activo' | 'inactivo' | 'perdido';
export type CRMPipelineStage = 'nuevo' | 'contactado' | 'propuesta' | 'negociacion' | 'cerrado_ganado' | 'cerrado_perdido';

export interface CRMClient {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  nif_cif: string | null;
  fiscal_address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  website: string | null;
  sector: string | null;
  status: CRMClientStatus;
  pipeline_stage: CRMPipelineStage;
  assigned_to: string | null;
  notes: string | null;
  source: string | null;
  estimated_value: number;
  source_site: string | null;
  created_at: string;
  updated_at: string;
}

export type CRMClientInsert = Omit<CRMClient, 'id' | 'created_at' | 'updated_at'>;

export const useCRMClients = (filters?: { status?: CRMClientStatus; search?: string }) => {
  return useQuery({
    queryKey: ['crm-clients', filters],
    queryFn: async () => {
      let query = supabase
        .from('crm_clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,nif_cif.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CRMClient[];
    },
  });
};

export const useCRMClient = (id: string | undefined) => {
  return useQuery({
    queryKey: ['crm-client', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('crm_clients')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as CRMClient;
    },
    enabled: !!id,
  });
};

export const useCreateCRMClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: Partial<CRMClientInsert>) => {
      const { data, error } = await supabase
        .from('crm_clients')
        .insert(client as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-clients'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Cliente creado correctamente');
    },
    onError: (error: Error) => {
      toast.error(`Error al crear cliente: ${error.message}`);
    },
  });
};

export const useUpdateCRMClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CRMClient> & { id: string }) => {
      const { data, error } = await supabase
        .from('crm_clients')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-clients'] });
      queryClient.invalidateQueries({ queryKey: ['crm-client'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Cliente actualizado');
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar: ${error.message}`);
    },
  });
};

export const useDeleteCRMClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('crm_clients').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-clients'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Cliente eliminado');
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });
};
