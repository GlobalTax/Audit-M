import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LandingStats {
  total: number;
  active: number;
  uniqueCategories: number;
  thisMonth: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
}

export const useLandingStats = () => {
  return useQuery({
    queryKey: ['landing-stats'],
    queryFn: async (): Promise<LandingStats> => {
      const { data: landings, error } = await supabase
        .from('landing_pages')
        .select('id, status, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Count totals
      const total = landings?.length || 0;
      const active = landings?.filter(l => l.status === 'published' && l.created_at).length || 0;
      const thisMonth = landings?.filter(l => {
        if (!l.created_at) return false;
        return new Date(l.created_at) >= startOfMonth;
      }).length || 0;

      // Group by category
      const byCategory: Record<string, number> = {};
      landings?.forEach(landing => {
        const category = landing.category || 'Other';
        byCategory[category] = (byCategory[category] || 0) + 1;
      });

      // Group by status
      const byStatus: Record<string, number> = {};
      landings?.forEach(landing => {
        const status = landing.status || 'draft';
        byStatus[status] = (byStatus[status] || 0) + 1;
      });

      const uniqueCategories = Object.keys(byCategory).length;

      return {
        total,
        active,
        uniqueCategories,
        thisMonth,
        byCategory,
        byStatus,
      };
    },
  });
};
