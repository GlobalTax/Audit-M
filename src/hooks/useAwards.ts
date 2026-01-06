import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Award {
  id: string;
  name: string;
  category: string;
  short_name: string;
  year: string;
  organization: string;
  display_order: number;
  is_active: boolean;
  source_site: string | null;
  created_at: string;
  updated_at: string;
}

export type AwardInsert = Omit<Award, 'id' | 'created_at' | 'updated_at'>;
export type AwardUpdate = Partial<AwardInsert>;

// Fetch active awards for frontend display
export function useAwards() {
  return useQuery({
    queryKey: ["awards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("awards")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Award[];
    },
  });
}

// Fetch all awards for admin panel
export function useAdminAwards() {
  return useQuery({
    queryKey: ["admin-awards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("awards")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Award[];
    },
  });
}

// Create new award
export function useCreateAward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (award: AwardInsert) => {
      const { data, error } = await supabase
        .from("awards")
        .insert(award)
        .select()
        .single();

      if (error) throw error;
      return data as Award;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      queryClient.invalidateQueries({ queryKey: ["admin-awards"] });
      toast.success("Award creado correctamente");
    },
    onError: (error) => {
      toast.error("Error al crear el award: " + error.message);
    },
  });
}

// Update existing award
export function useUpdateAward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & AwardUpdate) => {
      const { data, error } = await supabase
        .from("awards")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Award;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      queryClient.invalidateQueries({ queryKey: ["admin-awards"] });
      toast.success("Award actualizado correctamente");
    },
    onError: (error) => {
      toast.error("Error al actualizar el award: " + error.message);
    },
  });
}

// Delete award
export function useDeleteAward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("awards")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      queryClient.invalidateQueries({ queryKey: ["admin-awards"] });
      toast.success("Award eliminado correctamente");
    },
    onError: (error) => {
      toast.error("Error al eliminar el award: " + error.message);
    },
  });
}
