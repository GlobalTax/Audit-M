import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewsletterSignupData {
  email: string;
  first_name?: string;
  company?: string;
  consent: boolean;
  source_page: string;
}

export const useNewsletterSignup = () => {
  return useMutation({
    mutationFn: async (data: NewsletterSignupData) => {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: data.email,
          first_name: data.first_name || null,
          company: data.company || null,
          consent: data.consent,
          source_page: data.source_page,
          source_site: 'int',
          is_active: true,
        });

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already subscribed to our newsletter.');
        }
        throw error;
      }

      // Track GA4 event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup_global_nrro', {
          source_page: data.source_page,
        });
      }

      return true;
    },
    onSuccess: () => {
      toast.success("Successfully subscribed!", {
        description: "Thank you for subscribing to our newsletter.",
      });
    },
    onError: (error: Error) => {
      toast.error("Subscription failed", {
        description: error.message,
      });
    },
  });
};
