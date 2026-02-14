import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CRMClient } from './useCRMClients';
import type { CRMContract } from './useCRMContracts';
import type { CRMInteraction } from './useCRMInteractions';

export interface CRMStats {
  totalClients: number;
  byStatus: Record<string, number>;
  byPipeline: Record<string, number>;
  totalContractValue: number;
  activeContracts: number;
  expiringContracts: number;
  recentInteractions: CRMInteraction[];
}

export const useCRMStats = () => {
  return useQuery({
    queryKey: ['crm-stats'],
    queryFn: async () => {
      const [clientsRes, contractsRes, interactionsRes] = await Promise.all([
        supabase.from('crm_clients').select('id, status, pipeline_stage'),
        supabase.from('crm_contracts').select('id, status, amount, end_date'),
        supabase.from('crm_interactions').select('id, client_id, type, subject, description, date, created_by, created_at').order('date', { ascending: false }).limit(10),
      ]);

      if (clientsRes.error) throw clientsRes.error;
      if (contractsRes.error) throw contractsRes.error;
      if (interactionsRes.error) throw interactionsRes.error;

      const clients = clientsRes.data as CRMClient[];
      const contracts = contractsRes.data as CRMContract[];
      const interactions = interactionsRes.data as CRMInteraction[];

      const byStatus: Record<string, number> = {};
      const byPipeline: Record<string, number> = {};

      clients.forEach((c) => {
        byStatus[c.status] = (byStatus[c.status] || 0) + 1;
        byPipeline[c.pipeline_stage] = (byPipeline[c.pipeline_stage] || 0) + 1;
      });

      const now = new Date();
      const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      let activeContracts = 0;
      let expiringContracts = 0;
      let totalContractValue = 0;

      for (const c of contracts) {
        if (c.status === 'activo') {
          activeContracts++;
          totalContractValue += c.amount || 0;
          if (c.end_date) {
            const endDate = new Date(c.end_date);
            if (endDate >= now && endDate <= in30Days) {
              expiringContracts++;
            }
          }
        }
      }

      return {
        totalClients: clients.length,
        byStatus,
        byPipeline,
        totalContractValue,
        activeContracts,
        expiringContracts,
        recentInteractions: interactions,
      } as CRMStats;
    },
  });
};
