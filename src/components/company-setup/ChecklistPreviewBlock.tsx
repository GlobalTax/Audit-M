import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ChecklistPreviewBlockProps {
  variant?: "light" | "dark";
  showTeaser?: boolean;
  ctaText?: string;
  className?: string;
}

const checklistItems = [
  {
    title: "Reserve Your Company Name",
    description: "Secure a unique business name through Spain's Central Mercantile Registry"
  },
  {
    title: "Obtain NIE/NIF Tax Numbers",
    description: "Required for all directors and shareholders before notarization"
  },
  {
    title: "Open a Spanish Bank Account",
    description: "Set up corporate banking to hold your share capital deposit"
  },
  {
    title: "Deposit Minimum Share Capital",
    description: "€3,000 for SL or €60,000 for SA must be deposited before notary"
  },
  {
    title: "Execute Notary Deed",
    description: "Sign public incorporation deed (escritura) before a Spanish notary"
  },
  {
    title: "Register at Mercantile Registry",
    description: "Complete inscription to obtain permanent NIF and legal status"
  },
  {
    title: "Complete Tax Registrations",
    description: "Register for VAT, corporate tax, and economic activity tax (IAE)"
  },
  {
    title: "Register for Social Security",
    description: "Required before hiring any employees in Spain"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
  }
};

export function ChecklistPreviewBlock({
  variant = "light",
  showTeaser = true,
  ctaText = "Download Full Checklist PDF",
  className
}: ChecklistPreviewBlockProps) {
  const { trackEvent } = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Track view when component enters viewport
  useEffect(() => {
    if (hasTrackedView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("checklist_preview_view_global_nrro", {
            variant,
            page_location: window.location.pathname
          });
          setHasTrackedView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView, trackEvent, variant]);

  const handleCtaClick = () => {
    trackEvent("checklist_preview_cta_click_global_nrro", {
      variant,
      cta_text: ctaText,
      page_location: window.location.pathname
    });
  };

  const isDark = variant === "dark";

  return (
    <section 
      ref={containerRef}
      className={cn(
        "py-20 md:py-28",
        isDark ? "bg-black text-white" : "bg-muted/30",
        className
      )}
      data-dark={isDark}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className={cn(
            "font-mono font-light text-xs md:text-sm tracking-wide uppercase mb-4",
            isDark ? "text-white/60" : "text-foreground/70"
          )}>
            Spain Company Setup Checklist
          </p>
          <h2 className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-normal mb-4",
            isDark ? "text-white" : "text-foreground"
          )}>
            Quick Preview: Documents to Form a Company in Spain
          </h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDark ? "text-white/70" : "text-muted-foreground"
          )}>
            Essential items you'll need for a successful Spanish incorporation
          </p>
        </div>

        {/* Checklist Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group flex items-start gap-4 p-5 rounded-lg border transition-all duration-300",
                isDark 
                  ? "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10" 
                  : "bg-background border-border hover:border-primary/50 hover:shadow-md"
              )}
            >
              <div className={cn(
                "flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110",
                isDark ? "text-emerald-400" : "text-emerald-600"
              )}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className={cn(
                  "font-medium mb-1",
                  isDark ? "text-white" : "text-foreground"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-white/60" : "text-muted-foreground"
                )}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Teaser + CTA */}
        <div className="text-center mt-10 md:mt-12">
          {showTeaser && (
            <p className={cn(
              "text-sm italic mb-6",
              isDark ? "text-white/50" : "text-muted-foreground"
            )}>
              + 30 more items in the full checklist
            </p>
          )}
          
          <Button
            asChild
            size="lg"
            variant={isDark ? "secondary" : "default"}
            className="gap-2"
            onClick={handleCtaClick}
          >
            <Link to="/spain-document-checklist">
              <Download className="h-4 w-4" />
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ChecklistPreviewBlock;
