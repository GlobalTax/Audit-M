import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUnreadContactLeads = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Query inicial para obtener el conteo
  const { data: initialCount } = useQuery({
    queryKey: ["contact-leads-unread-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("contact_leads")
        .select("*", { count: "exact", head: true })
        .eq("email_sent", false);

      if (error) throw error;
      return count || 0;
    },
  });

  useEffect(() => {
    if (initialCount !== undefined) {
      setUnreadCount(initialCount);
    }
  }, [initialCount]);

  // Suscripción en tiempo real
  useEffect(() => {
    const channel = supabase
      .channel('contact-leads-count')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_leads'
        },
        () => {
          setUnreadCount((prev) => prev + 1);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'contact_leads'
        },
        (payload) => {
          const oldLead = payload.old as any;
          const newLead = payload.new as any;
          
          // Si cambió de no leído a leído
          if (!oldLead.email_sent && newLead.email_sent) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
          // Si cambió de leído a no leído
          if (oldLead.email_sent && !newLead.email_sent) {
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return unreadCount;
};
