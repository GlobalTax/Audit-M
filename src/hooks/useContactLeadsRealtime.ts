import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContactLeadsRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('contact-leads-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_leads'
        },
        (payload) => {
          const newLead = payload.new as any;
          
          // Mostrar notificación toast
          toast.success('Nuevo contacto recibido', {
            description: `${newLead.name} - ${newLead.subject}`,
            action: {
              label: 'Ver',
              onClick: () => {
                window.location.href = '/admin/contact-leads';
              }
            },
            duration: 5000,
          });

          // Invalidar queries para actualizar la lista
          queryClient.invalidateQueries({ queryKey: ["contact-leads"] });
          
          // Reproducir sonido
          playNotificationSound();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};

const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => {
    // Silenciar error si el navegador bloquea autoplay
  });
};
