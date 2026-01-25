import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TopBarConfig {
  id: string;
  phone_number: string;
  phone_link: string;
  show_search: boolean;
  show_language_selector: boolean;
}

export interface TopBarLink {
  id: string;
  label: string;
  href: string;
  is_external: boolean;
  position: number;
  is_active: boolean;
}

export interface GroupCompany {
  id: string;
  name: string;
  url: string;
  logo_url: string | null;
  is_current: boolean;
  position: number;
  is_active: boolean;
}

export const useTopBarConfig = () => {
  const configQuery = useQuery({
    queryKey: ['topbar-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topbar_config')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as TopBarConfig | null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const linksQuery = useQuery({
    queryKey: ['topbar-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topbar_links')
        .select('*')
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      return (data || []) as TopBarLink[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const companiesQuery = useQuery({
    queryKey: ['topbar-group-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topbar_group_companies')
        .select('*')
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      return (data || []) as GroupCompany[];
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    config: configQuery.data,
    links: linksQuery.data || [],
    companies: companiesQuery.data || [],
    isLoading: configQuery.isLoading || linksQuery.isLoading || companiesQuery.isLoading,
    currentCompany: companiesQuery.data?.find(c => c.is_current) || null,
  };
};
