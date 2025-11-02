import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from './useTeamMembers';

interface TeamSearchParams {
  specialization?: string;
  position?: string;
}

export function useTeamSearch(params: TeamSearchParams = {}) {
  return useQuery({
    queryKey: ['team-members-search', params.specialization, params.position],
    queryFn: async () => {
      let query = supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (params.specialization) {
        query = query.eq('specialization', params.specialization);
      }

      if (params.position) {
        query = query.eq('position', params.position);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as TeamMember[];
    },
  });
}

export function useTeamFilterOptions() {
  return useQuery({
    queryKey: ['team-specializations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('specialization')
        .eq('is_active', true)
        .not('specialization', 'is', null);

      if (error) throw error;

      // Get unique specializations
      const uniqueSpecializations = Array.from(
        new Set(data.map(item => item.specialization).filter(Boolean))
      ).sort();

      return uniqueSpecializations as string[];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useTeamPositionOptions() {
  return useQuery({
    queryKey: ['team-positions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('position')
        .eq('is_active', true)
        .not('position', 'is', null);

      if (error) throw error;

      // Get unique positions and order them logically
      const uniquePositions = Array.from(
        new Set(data.map(item => item.position).filter(Boolean))
      );

      const orderMap: Record<string, number> = {
        'SENIOR': 1,
        'ASOCIADO': 2,
        'JUNIOR': 3,
        'MASTER SCHOLAR': 4
      };

      return uniquePositions.sort((a, b) => {
        return (orderMap[a] || 999) - (orderMap[b] || 999);
      }) as string[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
