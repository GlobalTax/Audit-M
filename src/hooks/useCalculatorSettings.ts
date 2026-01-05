import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

export interface CalculatorSetting {
  id: string;
  category: 'timeline' | 'cost' | 'general';
  entity_type: 'sl' | 'sa' | 'branch' | 'subsidiary' | 'global' | null;
  item_key: string;
  item_label: string;
  item_notes: string | null;
  min_value: number;
  max_value: number;
  display_order: number;
  is_active: boolean;
  conditions: Json | null;
  created_at: string;
  updated_at: string;
}

export type CalculatorSettingInput = {
  category: string;
  entity_type: string | null;
  item_key: string;
  item_label: string;
  item_notes: string | null;
  min_value: number;
  max_value: number;
  display_order: number;
  is_active: boolean;
  conditions: Json | null;
};

export function useCalculatorSettings(category?: string, entityType?: string) {
  return useQuery({
    queryKey: ['calculator-settings', category, entityType],
    queryFn: async () => {
      let query = supabase
        .from('calculator_settings')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      if (entityType) {
        query = query.eq('entity_type', entityType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as CalculatorSetting[];
    },
  });
}

export function useCalculatorSettingsByCategory() {
  return useQuery({
    queryKey: ['calculator-settings-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calculator_settings')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      const settings = data as CalculatorSetting[];
      
      // Group by category and entity_type
      const grouped = {
        timeline: {} as Record<string, CalculatorSetting[]>,
        cost: {} as Record<string, CalculatorSetting[]>,
        general: {} as Record<string, CalculatorSetting[]>,
      };
      
      settings.forEach(setting => {
        const entityKey = setting.entity_type || 'global';
        if (!grouped[setting.category][entityKey]) {
          grouped[setting.category][entityKey] = [];
        }
        grouped[setting.category][entityKey].push(setting);
      });
      
      return { settings, grouped };
    },
  });
}

export function useUpdateCalculatorSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<CalculatorSettingInput>) => {
      const { data, error } = await supabase
        .from('calculator_settings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-settings'] });
      queryClient.invalidateQueries({ queryKey: ['calculator-settings-all'] });
      toast.success('Setting updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating setting: ${error.message}`);
    },
  });
}

export function useCreateCalculatorSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (setting: CalculatorSettingInput) => {
      const { data, error } = await supabase
        .from('calculator_settings')
        .insert(setting)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-settings'] });
      queryClient.invalidateQueries({ queryKey: ['calculator-settings-all'] });
      toast.success('Setting created successfully');
    },
    onError: (error) => {
      toast.error(`Error creating setting: ${error.message}`);
    },
  });
}

export function useDeleteCalculatorSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('calculator_settings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-settings'] });
      queryClient.invalidateQueries({ queryKey: ['calculator-settings-all'] });
      toast.success('Setting deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting setting: ${error.message}`);
    },
  });
}

// Hook for public calculator to get config
export function useCalculatorConfig() {
  return useQuery({
    queryKey: ['calculator-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calculator_settings')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      const settings = data as CalculatorSetting[];
      
      // Transform to config format
      const config = {
        timeline: {} as Record<string, { min: number; max: number; label: string; notes?: string }>,
        cost: {} as Record<string, { min: number; max: number; label: string; notes?: string }>,
      };
      
      settings.forEach(s => {
        const key = s.entity_type ? `${s.entity_type}_${s.item_key}` : s.item_key;
        if (s.category === 'timeline' || s.category === 'cost') {
          config[s.category][key] = {
            min: Number(s.min_value),
            max: Number(s.max_value),
            label: s.item_label,
            notes: s.item_notes || undefined,
          };
        }
      });
      
      return config;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
