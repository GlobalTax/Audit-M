import { motion } from "framer-motion";
import { MessageSquare, ClipboardCheck, FileText, Building2, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface JourneyStage {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

const journeyStages: JourneyStage[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Inquiry",
    description: "Share your business objectives, target timeline, and initial questions. We respond within 24 hours with tailored guidance for your Spain company setup.",
    ctaText: "Book Free Call",
    ctaUrl: "/contact"
  },
  {
    number: 2,
    icon: ClipboardCheck,
    title: "Assessment",
    description: "We analyze your requirements and propose the optimal legal structure for your Spain incorporation—SL, SA, or branch office.",
    ctaText: "Start Assessment",
    ctaUrl: "/spain-readiness-quiz"
  },
  {
    number: 3,
    icon: FileText,
    title: "Documentation",
    description: "Our team prepares all incorporation documents, coordinates NIE applications, and handles translations and legalizations required to register a company in Spain.",
    ctaText: "View Doc Checklist",
    ctaUrl: "/spain-document-checklist"
  },
  {
    number: 4,
    icon: Building2,
    title: "Registration",
    description: "We manage notarization, Commercial Registry submission, tax registrations, and bank account setup—complete Spain incorporation services on your behalf.",
    ctaText: "See Timeline",
    ctaUrl: "/spain-setup-calculator"
  },
  {
    number: 5,
    icon: Rocket,
    title: "Post-Setup Support",
    description: "Once incorporated, we provide ongoing accounting, payroll, tax compliance, and corporate secretary services for your new Spanish entity.",
    ctaText: "Explore Services",
    ctaUrl: "/international-services"
  }
];

interface CustomerJourneyMapProps {
  variant?: "light" | "dark";
  showFinalCta?: boolean;
  finalCtaText?: string;
  finalCtaUrl?: string;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const stageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const progressLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

export function CustomerJourneyMap({
  variant = "light",
  showFinalCta = true,
  finalCtaText = "Start Your Spain Incorporation Journey",
  finalCtaUrl = "/contact",
  className
}: CustomerJourneyMapProps) {
  const { trackEvent } = useAnalytics();
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackEvent("journey_map_view_global_nrro", {
              component: "CustomerJourneyMap",
              variant
            });
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [trackEvent, variant]);

  const handleStageClick = (stage: JourneyStage) => {
    trackEvent("journey_stage_click_global_nrro", {
      stage_number: stage.number,
      stage_name: stage.title,
      cta_text: stage.ctaText,
      destination_url: stage.ctaUrl
    });
  };

  const handleFinalCtaClick = () => {
    trackEvent("journey_final_cta_click_global_nrro", {
      cta_text: finalCtaText,
      destination_url: finalCtaUrl
    });
  };

  const isDark = variant === "dark";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28",
        isDark ? "bg-black text-white" : "bg-background",
        className
      )}
      data-dark={isDark}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={cn(
            "font-mono font-light text-xs md:text-sm tracking-wide uppercase",
            isDark ? "text-white/60" : "text-foreground/70"
          )}>
            Your Journey With NRRO
          </span>
          <h2 className={cn(
            "mt-4 text-2xl md:text-3xl lg:text-4xl font-normal",
            isDark ? "text-white" : "text-foreground"
          )}>
            From First Inquiry to Company Launch in Spain
          </h2>
          <p className={cn(
            "mt-4 text-base md:text-lg max-w-2xl mx-auto",
            isDark ? "text-white/70" : "text-muted-foreground"
          )}>
            Expert guidance at every stage of your Spain incorporation process—from initial consultation to ongoing compliance support.
          </p>
        </div>

        {/* Progress Line (Desktop) */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2">
            <div className={cn(
              "absolute inset-0",
              isDark ? "bg-white/20" : "bg-border"
            )} />
            <motion.div
              variants={progressLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={cn(
                "absolute inset-0 origin-left",
                isDark ? "bg-white/60" : "bg-primary/60"
              )}
            />
          </div>
          
          {/* Step Numbers */}
          <div className="flex justify-between px-[5%]">
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.number}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10",
                  isDark 
                    ? "bg-white text-black" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                {stage.number}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Stages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {journeyStages.map((stage) => {
            const IconComponent = stage.icon;
            return (
              <motion.div
                key={stage.number}
                variants={stageVariants}
                className={cn(
                  "group relative p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1",
                  isDark 
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20" 
                    : "bg-card border-border hover:shadow-md hover:border-primary/20"
                )}
              >
                {/* Mobile Step Number */}
                <div className={cn(
                  "lg:hidden absolute -top-3 left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  isDark 
                    ? "bg-white text-black" 
                    : "bg-primary text-primary-foreground"
                )}>
                  {stage.number}
                </div>

                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  isDark 
                    ? "bg-white/10" 
                    : "bg-primary/10"
                )}>
                  <IconComponent className={cn(
                    "w-6 h-6",
                    isDark ? "text-white" : "text-primary"
                  )} />
                </div>

                {/* Title */}
                <h3 className={cn(
                  "text-lg font-medium mb-2",
                  isDark ? "text-white" : "text-foreground"
                )}>
                  {stage.title}
                </h3>

                {/* Description */}
                <p className={cn(
                  "text-sm mb-4 leading-relaxed",
                  isDark ? "text-white/70" : "text-muted-foreground"
                )}>
                  {stage.description}
                </p>

                {/* Micro CTA */}
                <a
                  href={stage.ctaUrl}
                  onClick={() => handleStageClick(stage)}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium transition-colors",
                    isDark 
                      ? "text-white/80 hover:text-white" 
                      : "text-primary hover:text-primary/80"
                  )}
                >
                  {stage.ctaText}
                  <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Final CTA */}
        {showFinalCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              asChild
              size="lg"
              variant={isDark ? "secondary" : "default"}
              onClick={handleFinalCtaClick}
            >
              <a href={finalCtaUrl}>
                {finalCtaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
