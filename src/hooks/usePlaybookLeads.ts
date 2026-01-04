import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PlaybookLead {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  job_title: string | null;
  country: string;
  timeline: string | null;
  playbook_name: string;
  source_site: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  downloaded_at: string;
  created_at: string;
}

export interface PlaybookLeadFilters {
  playbookName?: string;
  country?: string;
  timeline?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const usePlaybookLeads = (filters?: PlaybookLeadFilters) => {
  return useQuery({
    queryKey: ["playbook-leads", filters],
    queryFn: async () => {
      let query = supabase
        .from("playbook_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.playbookName) {
        query = query.eq("playbook_name", filters.playbookName);
      }

      if (filters?.country) {
        query = query.eq("country", filters.country);
      }

      if (filters?.timeline) {
        query = query.eq("timeline", filters.timeline);
      }

      if (filters?.search) {
        query = query.or(
          `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
        );
      }

      if (filters?.dateFrom) {
        query = query.gte("created_at", filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte("created_at", filters.dateTo);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching playbook leads:", error);
        throw error;
      }

      return data as PlaybookLead[];
    },
  });
};

export const useDeletePlaybookLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("playbook_leads")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playbook-leads"] });
      queryClient.invalidateQueries({ queryKey: ["playbook-stats"] });
    },
  });
};

export const usePlaybookStats = () => {
  return useQuery({
    queryKey: ["playbook-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playbook_leads")
        .select("playbook_name, country, timeline, created_at");

      if (error) throw error;

      const leads = data || [];
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      return {
        total: leads.length,
        thisMonth: leads.filter(l => new Date(l.created_at) >= thisMonth).length,
        byPlaybook: leads.reduce((acc, l) => {
          acc[l.playbook_name] = (acc[l.playbook_name] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        byCountry: leads.reduce((acc, l) => {
          acc[l.country] = (acc[l.country] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        byTimeline: leads.reduce((acc, l) => {
          if (l.timeline) {
            acc[l.timeline] = (acc[l.timeline] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>),
      };
    },
  });
};
