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
        supabase.from('crm_clients').select('*'),
        supabase.from('crm_contracts').select('*'),
        supabase.from('crm_interactions').select('*').order('date', { ascending: false }).limit(10),
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

      const activeContracts = contracts.filter((c) => c.status === 'activo').length;
      const expiringContracts = contracts.filter(
        (c) => c.status === 'activo' && c.end_date && new Date(c.end_date) <= in30Days
      ).length;

      const totalContractValue = contracts
        .filter((c) => c.status === 'activo')
        .reduce((sum, c) => sum + (c.amount || 0), 0);

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
