import { useState, useEffect } from "react";
import { X, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ExitIntentPopup = () => {
  const { showPopup, closePopup } = useExitIntent({ delay: 3000 });
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (showPopup) {
      trackEvent("exit_intent_shown_global_nrro", {
        page: window.location.pathname,
      });
    }
  }, [showPopup, trackEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("playbook_leads").insert({
        email,
        full_name: "Exit Intent Lead",
        company_name: "Not provided",
        country: "Not provided",
        playbook_name: "spain-company-setup",
        source_site: "international",
      });

      if (error) throw error;

      trackEvent("exit_intent_converted_global_nrro", {
        page: window.location.pathname,
      });

      setIsSuccess(true);
      setTimeout(closePopup, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-2xl bg-background p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-normal text-foreground">
                Wait! Don't leave empty-handed
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Get our free Spain Company Setup Playbook — the complete guide to establishing your business in Spain.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Get Free Playbook"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-normal text-foreground">
                Check your inbox!
              </h3>
              <p className="text-sm text-muted-foreground">
                We've sent the playbook to your email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
