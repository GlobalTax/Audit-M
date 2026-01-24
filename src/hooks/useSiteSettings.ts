import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SITE_SOURCE } from '@/config/site';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  source_site: string;
  created_at: string;
  updated_at: string;
}

export function useSiteSettings(category?: string) {
  return useQuery({
    queryKey: ['site-settings', category, SITE_SOURCE],
    queryFn: async () => {
      let query = supabase
        .from('site_settings')
        .select('*')
        .eq('source_site', SITE_SOURCE)
        .order('key');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

export function useSiteSettingsMap(category?: string) {
  const { data, ...rest } = useSiteSettings(category);
  
  const settingsMap = data?.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>) || {};

  return { settings: settingsMap, ...rest };
}

export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Configuración actualizada correctamente');
    },
    onError: (error) => {
      console.error('Error updating setting:', error);
      toast.error('Error al actualizar la configuración');
    },
  });
}
