import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  specialization?: string;
  linkedin?: string;
  email?: string;
  avatar_url?: string;
  order_index: number;
  is_active: boolean;
}

export function useTeamMembers(language: string = 'es') {
  return useQuery({
    queryKey: ['team-members', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      
      // Map to TeamMember with language-specific fields
      return (data || []).map((member: any) => ({
        id: member.id,
        name: member.name,
        position: member[`position_${language}`] || member.position_es,
        bio: member[`bio_${language}`] || member.bio_es,
        specialization: member[`specialization_${language}`] || member.specialization_es,
        linkedin: member.linkedin,
        email: member.email,
        avatar_url: member.avatar_url,
        order_index: member.order_index,
        is_active: member.is_active,
      })) as TeamMember[];
    },
  });
}
