import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ServicesSearchParams {
  searchQuery?: string;
  area?: string;
  limit?: number;
  offset?: number;
}

export const useServicesSearch = (params: ServicesSearchParams, language: string = 'es') => {
  return useQuery({
    queryKey: ["services-search", params, language],
    queryFn: async () => {
      let query = supabase
        .from('services')
        .select('*', { count: 'exact' })
        .eq('is_active', true) as any;

      // Apply search filter with language-specific columns
      if (params.searchQuery) {
        const nameCol = `name_${language}`;
        const descCol = `description_${language}`;
        query = query.or(
          `${nameCol}.ilike.%${params.searchQuery}%,${descCol}.ilike.%${params.searchQuery}%`
        );
      }

      // Apply area filter with language-specific column
      if (params.area) {
        query = query.eq(`area_${language}`, params.area);
      }

      // Order by display order, then creation date
      query = query.order('display_order', { ascending: true });
      query = query.order('created_at', { ascending: false });

      // Apply pagination
      if (params.limit) {
        query = query.limit(params.limit);
      }
      if (params.offset) {
        query = query.range(params.offset, params.offset + (params.limit || 20) - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      
      // Map data to include language-specific fields
      const services = (data || []).map((service: any) => ({
        ...service,
        name: service[`name_${language}`] || service.name_es,
        description: service[`description_${language}`] || service.description_es,
        slug: service[`slug_${language}`] || service.slug_es,
        area: service[`area_${language}`] || service.area_es,
      }));
      
      return {
        services,
        totalCount: count || 0
      };
    },
    enabled: true,
  });
};

export const useServicesFilterOptions = () => {
  return useQuery({
    queryKey: ["services-filter-options"],
    queryFn: async () => {
      // @ts-ignore - New tables not in types yet
      const supabaseAny = supabase as any;
      const { data, error } = await supabaseAny
        .from('services')
        .select('area')
        .eq('is_active', true);
      
      if (error) throw error;
      
      const uniqueAreas = Array.from(new Set(data?.map((s: any) => s.area) || []));
      
      return {
        areas: uniqueAreas,
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
