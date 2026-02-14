import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type CRMInvoiceStatus = 'borrador' | 'emitida' | 'pagada' | 'vencida' | 'anulada';

export interface CRMInvoice {
  id: string;
  client_id: string;
  contract_id: string | null;
  invoice_number: string;
  issue_date: string;
  due_date: string | null;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: CRMInvoiceStatus;
  service_description: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CRMInvoiceWithClient extends CRMInvoice {
  crm_clients: { name: string } | null;
}

export const useCRMInvoices = (filters?: { year?: number; status?: CRMInvoiceStatus }) => {
  return useQuery({
    queryKey: ['crm-invoices', filters],
    queryFn: async () => {
      let query = supabase
        .from('crm_invoices')
        .select('*, crm_clients(name)')
        .order('issue_date', { ascending: false });

      if (filters?.year) {
        query = query
          .gte('issue_date', `${filters.year}-01-01`)
          .lte('issue_date', `${filters.year}-12-31`);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as CRMInvoiceWithClient[];
    },
  });
};

export const useCRMInvoiceStats = () => {
  return useQuery({
    queryKey: ['crm-invoice-stats'],
    queryFn: async () => {
      const currentYear = new Date().getFullYear();
      const prevYear = currentYear - 1;

      const { data: allInvoices, error } = await supabase
        .from('crm_invoices')
        .select('total_amount, issue_date, status, client_id')
        .in('status', ['emitida', 'pagada']);

      if (error) throw error;

      const invoices = allInvoices ?? [];

      const byYear = (year: number) =>
        invoices.filter((i) => new Date(i.issue_date).getFullYear() === year);

      const sum = (items: typeof invoices) =>
        items.reduce((acc, i) => acc + Number(i.total_amount || 0), 0);

      const currentYearInvoices = byYear(currentYear);
      const prevYearInvoices = byYear(prevYear);

      const currentTotal = sum(currentYearInvoices);
      const prevTotal = sum(prevYearInvoices);
      const variation = prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0;

      // Monthly breakdown
      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const currentMonthInvoices = currentYearInvoices.filter(
          (inv) => new Date(inv.issue_date).getMonth() === i
        );
        const prevMonthInvoices = prevYearInvoices.filter(
          (inv) => new Date(inv.issue_date).getMonth() === i
        );
        return {
          month,
          label: new Date(2024, i).toLocaleString('es-ES', { month: 'short' }),
          current: sum(currentMonthInvoices),
          previous: sum(prevMonthInvoices),
        };
      });

      // Top clients
      const clientTotals: Record<string, number> = {};
      currentYearInvoices.forEach((inv) => {
        clientTotals[inv.client_id] = (clientTotals[inv.client_id] || 0) + Number(inv.total_amount || 0);
      });

      return {
        currentYear,
        prevYear,
        currentTotal,
        prevTotal,
        variation,
        monthlyData,
        clientTotals,
      };
    },
  });
};

export const useNextInvoiceNumber = () => {
  return useQuery({
    queryKey: ['next-invoice-number'],
    queryFn: async () => {
      const year = new Date().getFullYear();
      const prefix = `FAC-${year}-`;
      const { data, error } = await supabase
        .from('crm_invoices')
        .select('invoice_number')
        .ilike('invoice_number', `${prefix}%`)
        .order('invoice_number', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) return `${prefix}001`;

      const lastNum = parseInt(data[0].invoice_number.replace(prefix, ''), 10) || 0;
      return `${prefix}${String(lastNum + 1).padStart(3, '0')}`;
    },
  });
};

export const useCreateCRMInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invoice: Omit<CRMInvoice, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('crm_invoices')
        .insert(invoice as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-invoices'] });
      queryClient.invalidateQueries({ queryKey: ['crm-invoice-stats'] });
      queryClient.invalidateQueries({ queryKey: ['next-invoice-number'] });
      toast.success('Factura creada');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useUpdateCRMInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CRMInvoice> & { id: string }) => {
      const { data, error } = await supabase
        .from('crm_invoices')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-invoices'] });
      queryClient.invalidateQueries({ queryKey: ['crm-invoice-stats'] });
      toast.success('Factura actualizada');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useDeleteCRMInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('crm_invoices').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-invoices'] });
      queryClient.invalidateQueries({ queryKey: ['crm-invoice-stats'] });
      toast.success('Factura eliminada');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
