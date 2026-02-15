import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SITE_SOURCE, getSourceFilter } from "@/config/site";

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company: string | null;
  subject: string;
  message: string;
  service_type: string | null;
  lead_source: string | null;
  source_site: string | null;
  ip_address: string | null;
  user_agent: string | null;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
  response_notes: string | null;
  responded_by: string | null;
  responded_at: string | null;
}

export interface ContactLeadFilters {
  search?: string;
  status?: string;
  serviceType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useContactLeads = (filters?: ContactLeadFilters) => {
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';
  
  return useQuery({
    queryKey: ["contact-leads", filters, SITE_SOURCE],
    queryFn: async () => {
      let query = supabase
        .from("contact_leads")
        .select("*")
        .eq("source_site", sourceFilter);

      // Apply filters
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }

      if (filters?.status === "pending") {
        query = query.eq("email_sent", false);
      } else if (filters?.status === "responded") {
        query = query.eq("email_sent", true);
      }

      if (filters?.serviceType && filters.serviceType !== "all") {
        query = query.eq("service_type", filters.serviceType as any);
      }

      if (filters?.dateFrom) {
        query = query.gte("created_at", filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte("created_at", filters.dateTo);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return data as ContactLead[];
    },
  });
};

export const useUpdateContactLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      email_sent, 
      response_notes 
    }: { 
      id: string; 
      email_sent: boolean; 
      response_notes?: string;
    }) => {
      const updateData: any = { 
        email_sent, 
        updated_at: new Date().toISOString() 
      };

      if (email_sent) {
        updateData.responded_at = new Date().toISOString();
        if (response_notes !== undefined) {
          updateData.response_notes = response_notes;
        }
      } else {
        // Clear response data when marking as pending
        updateData.responded_at = null;
        updateData.response_notes = null;
      }

      const { error } = await supabase
        .from("contact_leads")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
      toast.success("Lead actualizado correctamente");
    },
    onError: (error) => {
      console.error("Error updating lead:", error);
      toast.error("Error al actualizar el lead");
    },
  });
};

export const useUpdateContactLeadSourceSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      source_site 
    }: { 
      id: string; 
      source_site: 'es' | 'int' | 'audit';
    }) => {
      const { error } = await supabase
        .from("contact_leads")
        .update({ 
          source_site,
          updated_at: new Date().toISOString() 
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
      toast.success("Sitio del lead actualizado correctamente");
    },
    onError: (error) => {
      console.error("Error updating lead source site:", error);
      toast.error("Error al actualizar el sitio del lead");
    },
  });
};

export const useDeleteContactLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_leads")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
      toast.success("Lead eliminado correctamente");
    },
    onError: (error) => {
      console.error("Error deleting lead:", error);
      toast.error("Error al eliminar el lead");
    },
  });
};

type ServiceType = "empresa_familiar" | "financial_planning" | "legal_advisory" | "other" | "tax_advisory";

export interface CreateContactLeadInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  service_type?: ServiceType | null;
  lead_source?: string;
  email_sent?: boolean;
}

export const useCreateContactLead = () => {
  const queryClient = useQueryClient();
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';

  return useMutation({
    mutationFn: async (lead: CreateContactLeadInput) => {
      const insertData: Record<string, unknown> = {
        name: lead.name,
        email: lead.email,
        subject: lead.subject,
        message: lead.message,
        source_site: sourceFilter,
      };
      
      if (lead.phone) insertData.phone = lead.phone;
      if (lead.company) insertData.company = lead.company;
      if (lead.service_type) insertData.service_type = lead.service_type;
      if (lead.lead_source) insertData.lead_source = lead.lead_source;
      if (lead.email_sent !== undefined) insertData.email_sent = lead.email_sent;

      const { data, error } = await supabase
        .from("contact_leads")
        .insert(insertData as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
      toast.success("Lead añadido correctamente");
    },
    onError: (error) => {
      console.error("Error creating lead:", error);
      toast.error("Error al crear el lead");
    },
  });
};

export const useSendLeadNotification = () => {
  return useMutation({
    mutationFn: async ({ 
      leadId, 
      sendConfirmation = true, 
      sendNotification = true 
    }: { 
      leadId: string; 
      sendConfirmation?: boolean; 
      sendNotification?: boolean;
    }) => {
      const { data, error } = await supabase.functions.invoke('send-lead-notification', {
        body: { leadId, sendConfirmation, sendNotification },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.confirmationSent || data.notificationSent) {
        toast.success("Correos enviados correctamente");
      } else {
        toast.warning("No se pudo enviar ningún correo");
      }
    },
    onError: (error) => {
      console.error("Error sending notification:", error);
      toast.error("Error al enviar correos");
    },
  });
};

export const useBulkCreateContactLeads = () => {
  const queryClient = useQueryClient();
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';

  return useMutation({
    mutationFn: async (leads: CreateContactLeadInput[]) => {
      const leadsWithSource = leads.map((lead) => {
        const insertData: Record<string, unknown> = {
          name: lead.name,
          email: lead.email,
          subject: lead.subject,
          message: lead.message,
          source_site: sourceFilter,
        };
        
        if (lead.phone) insertData.phone = lead.phone;
        if (lead.company) insertData.company = lead.company;
        if (lead.service_type) insertData.service_type = lead.service_type;
        if (lead.lead_source) insertData.lead_source = lead.lead_source;
        if (lead.email_sent !== undefined) insertData.email_sent = lead.email_sent;
        
        return insertData;
      });

      const { error } = await supabase
        .from("contact_leads")
        .insert(leadsWithSource as any);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
      toast.success("Leads importados correctamente");
    },
    onError: (error) => {
      console.error("Error importing leads:", error);
      toast.error("Error al importar los leads");
    },
  });
};
