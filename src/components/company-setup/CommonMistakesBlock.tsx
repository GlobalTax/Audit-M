import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";

interface CommonMistakesBlockProps {
  variant?: "light" | "dark";
  ctaText?: string;
  ctaUrl?: string;
  className?: string;
}

const mistakes = [
  {
    title: "Choosing the Wrong Legal Structure",
    description: "Selecting an SA when an SL would suffice wastes €57,000 in share capital. Understand the differences before committing to avoid costly restructuring later."
  },
  {
    title: "Not Obtaining NIE Before Notary Appointment",
    description: "All directors and shareholders need a Spanish NIE (tax ID) before signing the incorporation deed. Missing this delays registration by 3-6 weeks."
  },
  {
    title: "Submitting Incorrect or Incomplete Documentation",
    description: "Foreign documents require apostille, sworn translation, and proper legalization. Errors here cause Commercial Registry rejections and restart the process."
  },
  {
    title: "Ignoring Spanish Tax Registration Deadlines",
    description: "Failing to register for VAT, corporate tax, or IAE within 30 days of incorporation triggers penalties and limits your ability to invoice clients."
  },
  {
    title: "Underestimating Bank Account Opening Requirements",
    description: "Spanish banks require extensive KYC documentation from foreign shareholders. Without proper preparation, account opening can delay operations by months."
  },
  {
    title: "Skipping Social Security Registration",
    description: "Directors and employees must be registered with Social Security before starting work. Non-compliance results in significant fines and back-payments."
  },
  {
    title: "Using Generic Company Bylaws",
    description: "Standard bylaws may not protect minority shareholders or address cross-border governance needs. Tailored estatutos prevent future disputes."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
  }
};

export function CommonMistakesBlock({
  variant = "light",
  ctaText = "Learn how to avoid these with our expert guidance",
  ctaUrl = "/contact",
  className
}: CommonMistakesBlockProps) {
  const { trackEvent } = useAnalytics();

  const handleCtaClick = () => {
    trackEvent("mistakes_block_cta_click_global_nrro", {
      variant,
      cta_text: ctaText,
      page_location: window.location.pathname
    });
  };

  const isDark = variant === "dark";

  return (
    <section 
      className={cn(
        "py-20 md:py-28",
        isDark ? "bg-black text-white" : "bg-background",
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
            Spain Company Registration Pitfalls
          </p>
          <h2 className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-normal mb-4",
            isDark ? "text-white" : "text-foreground"
          )}>
            Common Mistakes to Avoid When Setting Up a Company in Spain
          </h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDark ? "text-white/70" : "text-muted-foreground"
          )}>
            International founders often encounter these costly errors during Spanish incorporation
          </p>
        </div>

        {/* Mistakes List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {mistakes.map((mistake, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group flex gap-4 p-5 md:p-6 rounded-lg border-l-4 transition-all duration-300",
                isDark 
                  ? "bg-white/5 border-l-amber-500/70 hover:bg-white/10" 
                  : "bg-muted/30 border-l-amber-500 hover:bg-muted/50 hover:shadow-sm"
              )}
            >
              <div className={cn(
                "flex-shrink-0 mt-0.5",
                isDark ? "text-amber-400" : "text-amber-600"
              )}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className={cn(
                  "font-medium mb-2",
                  isDark ? "text-white" : "text-foreground"
                )}>
                  {mistake.title}
                </h3>
                <p className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-white/60" : "text-muted-foreground"
                )}>
                  {mistake.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Button
            asChild
            size="lg"
            variant={isDark ? "secondary" : "default"}
            className="gap-2"
            onClick={handleCtaClick}
          >
            <Link to={ctaUrl}>
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CommonMistakesBlock;
