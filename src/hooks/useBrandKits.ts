import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BrandTokens {
  fonts: { heading: string; body: string };
  colors: {
    bg: string;
    surface: string;
    text: string;
    mutedText: string;
    primary: string;
    accent: string;
    border: string;
  };
  typography: {
    h1: { size: number; weight: number; lineHeight: number };
    h2: { size: number; weight: number; lineHeight: number };
    body: { size: number; weight: number; lineHeight: number };
  };
  spacing: { slidePadding: number; gap: number };
  radius: { card: number; button: number };
  shadow: { card: string };
}

export interface BrandKit {
  id: string;
  name: string;
  tokens_json: BrandTokens;
  font_urls?: { heading?: string; body?: string } | null;
  logo_url?: string | null;
  cover_bg_url?: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const useBrandKits = () => {
  return useQuery({
    queryKey: ['brand-kits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brand_kits')
        .select('*')
        .order('is_default', { ascending: false });
      
      if (error) throw error;
      return data as unknown as BrandKit[];
    },
  });
};

export const useDefaultBrandKit = () => {
  return useQuery({
    queryKey: ['brand-kit-default'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brand_kits')
        .select('*')
        .eq('is_default', true)
        .single();
      
      if (error) throw error;
      return data as unknown as BrandKit;
    },
  });
};

export const useBrandKit = (id: string) => {
  return useQuery({
    queryKey: ['brand-kit', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brand_kits')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as unknown as BrandKit;
    },
    enabled: !!id,
  });
};

export const useCreateBrandKit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (kit: Partial<BrandKit>) => {
      const { data, error } = await supabase
        .from('brand_kits')
        .insert(kit as any)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brand-kits'] });
    },
  });
};

export const useUpdateBrandKit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BrandKit> & { id: string }) => {
      const { data, error } = await supabase
        .from('brand_kits')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brand-kits'] });
      queryClient.invalidateQueries({ queryKey: ['brand-kit', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['brand-kit-default'] });
    },
  });
};

export const useDeleteBrandKit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('brand_kits')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brand-kits'] });
    },
  });
};
