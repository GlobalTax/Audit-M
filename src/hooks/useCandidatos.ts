import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SITE_SOURCE, getSourceFilter } from "@/config/site";

export interface Candidato {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  linkedin_url: string | null;
  puesto_solicitado: string;
  departamento: string | null;
  notas: string | null;
  cv_url: string | null;
  estado: string;
  fuente: string;
  anos_experiencia: number | null;
  created_at: string;
  updated_at: string;
}

export const useCandidatos = (filters?: {
  estado?: string;
  departamento?: string;
  search?: string;
}) => {
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';
  
  return useQuery({
    queryKey: ["candidatos", filters, SITE_SOURCE],
    queryFn: async () => {
      let query = supabase
        .from("candidatos")
        .select("*")
        .eq("source_site", sourceFilter)
        .order("created_at", { ascending: false });

      if (filters?.estado) {
        query = query.eq("estado", filters.estado);
      }

      if (filters?.departamento) {
        query = query.eq("departamento", filters.departamento);
      }

      if (filters?.search) {
        query = query.or(
          `nombre.ilike.%${filters.search}%,email.ilike.%${filters.search}%,puesto_solicitado.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Candidato[];
    },
  });
};

export const useUpdateCandidato = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Candidato>;
    }) => {
      const { data, error } = await supabase
        .from("candidatos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidatos"] });
      toast.success("Candidato actualizado correctamente");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al actualizar el candidato");
    },
  });
};

export const useDeleteCandidato = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("candidatos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidatos"] });
      toast.success("Candidato eliminado correctamente");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al eliminar el candidato");
    },
  });
};

export const useCandidatoStats = () => {
  const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';
  
  return useQuery({
    queryKey: ["candidatos-stats", SITE_SOURCE],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidatos").select("estado").eq("source_site", sourceFilter);

      if (error) throw error;

      const stats = {
        total: data.length,
        nuevo: data.filter((c) => c.estado === "nuevo").length,
        en_revision: data.filter((c) => c.estado === "en_revision").length,
        entrevista: data.filter((c) => c.estado === "entrevista").length,
        contratado: data.filter((c) => c.estado === "contratado").length,
        descartado: data.filter((c) => c.estado === "descartado").length,
      };

      return stats;
    },
  });
};
