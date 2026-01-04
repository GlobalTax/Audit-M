import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ResourceType = 'white_paper' | 'country_guide' | 'template' | 'webinar';
export type ResourceCategory = 'accounting' | 'tax' | 'payroll' | 'corporate_legal' | 'treasury' | 'transfer_pricing' | 'governance';

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  category: ResourceCategory;
  countries: string[];
  personas: string[];
  file_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  download_count: number;
  published_at: string | null;
  is_active: boolean;
  source_site: string;
  created_at: string;
  updated_at: string;
}

export interface ResourceFilters {
  search?: string;
  type?: ResourceType | 'all';
  category?: ResourceCategory | 'all';
  country?: string | 'all';
  persona?: string | 'all';
}

export const useResources = (filters?: ResourceFilters) => {
  return useQuery({
    queryKey: ['resources', filters],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select('*')
        .eq('source_site', 'int')
        .eq('is_active', true)
        .not('published_at', 'is', null)
        .order('is_featured', { ascending: false })
        .order('published_at', { ascending: false });

      if (filters?.type && filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.country && filters.country !== 'all') {
        query = query.contains('countries', [filters.country]);
      }

      if (filters?.persona && filters.persona !== 'all') {
        query = query.contains('personas', [filters.persona]);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Resource[];
    },
  });
};

export const useFeaturedResources = () => {
  return useQuery({
    queryKey: ['resources', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('source_site', 'int')
        .eq('is_active', true)
        .eq('is_featured', true)
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Resource[];
    },
  });
};
