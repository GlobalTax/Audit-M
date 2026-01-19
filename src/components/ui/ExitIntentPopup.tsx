import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X, FileText, ArrowRight, Calendar, BookOpen, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type PopupVariant = "playbook" | "consultation" | "newsletter" | "calculator";

interface VariantConfig {
  icon: typeof FileText;
  title: string;
  description: string;
  buttonText: string;
  showTimeline?: boolean;
  showCompany?: boolean;
}

const variantConfigs: Record<PopupVariant, VariantConfig> = {
  playbook: {
    icon: FileText,
    title: "Wait! Don't leave empty-handed",
    description: "Get our free Spain Company Setup Playbook — the complete guide to establishing your business in Spain.",
    buttonText: "Get Free Playbook",
  },
  consultation: {
    icon: Calendar,
    title: "Before you go...",
    description: "Book a free 15-minute consultation with our Spain setup specialists. No obligations.",
    buttonText: "Book Free Consultation",
    showTimeline: true,
    showCompany: true,
  },
  newsletter: {
    icon: BookOpen,
    title: "Stay informed",
    description: "Get monthly insights on international tax, legal updates, and Spain business news directly to your inbox.",
    buttonText: "Subscribe to Newsletter",
  },
  calculator: {
    icon: Calculator,
    title: "Get your detailed estimate",
    description: "Enter your email to receive a personalized cost & timeline breakdown for your Spain company setup.",
    buttonText: "Get Full Report",
    showCompany: true,
  },
};

const getVariantFromPath = (pathname: string): PopupVariant => {
  // Calculator pages
  if (pathname.includes("calculator") || pathname.includes("cost")) {
    return "calculator";
  }
  // Blog pages
  if (pathname.includes("blog") || pathname.includes("insights")) {
    return "newsletter";
  }
  // High-intent setup pages
  if (
    pathname.includes("checklist") ||
    pathname.includes("nie") ||
    pathname.includes("bank-account") ||
    pathname.includes("visa")
  ) {
    return "consultation";
  }
  // Default for Spain setup cluster
  return "playbook";
};

export const ExitIntentPopup = () => {
  const location = useLocation();
  const { showPopup, closePopup } = useExitIntent({ delay: 3000 });
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const variant = getVariantFromPath(location.pathname);
  const config = variantConfigs[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (showPopup) {
      trackEvent("exit_intent_shown_global_nrro", {
        page: window.location.pathname,
        variant,
      });
    }
  }, [showPopup, trackEvent, variant]);

  const handleDismiss = () => {
    trackEvent("exit_intent_dismissed_global_nrro", {
      page: window.location.pathname,
      variant,
    });
    closePopup();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("playbook_leads").insert({
        email,
        full_name: "Exit Intent Lead",
        company_name: companyName || "Not provided",
        country: "Not provided",
        timeline: timeline || null,
        playbook_name: variant === "playbook" ? "spain-company-setup" : `exit-intent-${variant}`,
        source_site: "international",
      });

      if (error) throw error;

      trackEvent("exit_intent_converted_global_nrro", {
        page: window.location.pathname,
        variant,
        has_company: !!companyName,
        has_timeline: !!timeline,
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
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-normal text-foreground">
                {config.title}
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                {config.description}
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
                
                {config.showCompany && (
                  <Input
                    type="text"
                    placeholder="Company name (optional)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-12"
                  />
                )}

                {config.showTimeline && (
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="When do you plan to set up?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : config.buttonText}
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
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-normal text-foreground">
                {variant === "consultation" ? "We'll be in touch!" : "Check your inbox!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {variant === "consultation" 
                  ? "Our team will contact you within 24 hours to schedule your consultation."
                  : "We've sent the resource to your email."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
