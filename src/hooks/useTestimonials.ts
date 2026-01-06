import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  company_name: string;
  company_type: string;
  company_type_label: string;
  location: string;
  flag_emoji: string;
  avatar_url?: string;
  company_logo_url?: string;
  display_order: number;
  is_active: boolean;
  source_site: string;
  created_at: string;
  updated_at: string;
}

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
export type TestimonialUpdate = Partial<TestimonialInsert>;

// Hook for frontend - only active testimonials
export const useTestimonials = (sourceSite: string = 'int') => {
  return useQuery({
    queryKey: ['testimonials', 'active', sourceSite],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .eq('source_site', sourceSite)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

// Hook for admin - all testimonials
export const useAdminTestimonials = (sourceSite?: string) => {
  return useQuery({
    queryKey: ['testimonials', 'admin', sourceSite],
    queryFn: async () => {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (sourceSite) {
        query = query.eq('source_site', sourceSite);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

// Create testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: TestimonialInsert) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();

      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

// Update testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & TestimonialUpdate) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

// Delete testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};
