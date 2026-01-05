import { Link } from 'react-router-dom';
import { Scale, FileText, CreditCard, Landmark, ScrollText, ClipboardList, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

const steps = [
  {
    number: 1,
    icon: Scale,
    title: "Choose Legal Structure",
    description: "Select the right entity type for your business goals—SL, SA, or branch office.",
    tooltip: "SL (Sociedad Limitada) is ideal for SMEs with €3,000 minimum capital. SA (Sociedad Anónima) suits larger ventures with €60,000 capital. Branch offices suit foreign companies testing the Spanish market.",
    ctaText: "Learn about entity types",
    ctaUrl: "/legal-structures-spain"
  },
  {
    number: 2,
    icon: FileText,
    title: "Reserve Company Name",
    description: "Secure your unique business name through the Central Commercial Registry.",
    tooltip: "Request a negative name certificate (Certificación Negativa de Denominación) from the Central Mercantile Registry. This reserves your company name for 6 months and prevents duplicates.",
    ctaText: "See name requirements",
    ctaUrl: "/set-up-in-spain#name-reservation"
  },
  {
    number: 3,
    icon: CreditCard,
    title: "Obtain NIE/NIF",
    description: "Acquire tax identification numbers required for all shareholders and directors.",
    tooltip: "The NIE (Número de Identificación de Extranjero) is required for all foreign nationals. Directors and shareholders must have this before notarization. We handle the application process entirely on your behalf.",
    ctaText: "Start NIE application",
    ctaUrl: "/nie-spain-foreigners"
  },
  {
    number: 4,
    icon: Landmark,
    title: "Open Bank Account",
    description: "Deposit share capital and set up your corporate banking in Spain.",
    tooltip: "Open a corporate bank account to deposit the minimum share capital (€3,000 for SL, €60,000 for SA). Spanish banks require NIE, proof of address, and incorporation documents. Account opening takes 1-2 weeks.",
    ctaText: "View banking guide",
    ctaUrl: "/set-up-in-spain#bank-account"
  },
  {
    number: 5,
    icon: ScrollText,
    title: "Notary & Incorporation",
    description: "Execute the public deed of incorporation before a Spanish notary.",
    tooltip: "The public deed (escritura pública) is the official incorporation document signed before a notary. We coordinate the appointment, translate documents, and can represent you via power of attorney—no travel required.",
    ctaText: "Understand notarization",
    ctaUrl: "/set-up-in-spain#notary"
  },
  {
    number: 6,
    icon: ClipboardList,
    title: "Register at Mercantile Registry",
    description: "Complete the inscription at the Commercial Registry to finalize your company.",
    tooltip: "File the incorporation deed at the Commercial Registry (Registro Mercantil). Upon registration, your company receives its permanent NIF (Número de Identificación Fiscal) and becomes fully operational. Timeline: 2-4 weeks.",
    ctaText: "Learn about registration",
    ctaUrl: "/set-up-in-spain#registry"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const progressLineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const, delay: 0.2 }
  }
};

interface StepProgressBarProps {
  cta?: {
    text: string;
    url: string;
  };
}

export const StepProgressBar = ({ cta }: StepProgressBarProps) => {
  const { trackEvent } = useAnalytics();

  const handleStepHover = (stepNumber: number, stepTitle: string) => {
    trackEvent('step_progress_step_hover_global_nrro', {
      step_number: stepNumber,
      step_title: stepTitle
    });
  };

  const handleCtaClick = (stepNumber: number, stepTitle: string, ctaUrl: string) => {
    trackEvent('step_progress_cta_click_global_nrro', {
      step_number: stepNumber,
      step_title: stepTitle,
      destination_url: ctaUrl
    });
  };

  const handleFinalCtaClick = () => {
    if (cta) {
      trackEvent('step_progress_cta_final_click_global_nrro', {
        cta_text: cta.text,
        destination_url: cta.url
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            The Process
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4 mb-4">
            Your 6-Step Roadmap to Company Formation in Spain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these essential steps to successfully register and launch your business entity in Spain
          </p>
        </motion.div>

        {/* Progress Line - Desktop */}
        <div className="hidden lg:block relative mb-8">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          {/* Animated progress line */}
          <motion.div 
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary -translate-y-1/2 origin-left"
            variants={progressLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3, type: "spring" }}
              >
                {step.number}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <TooltipProvider delayDuration={200}>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Tooltip key={step.number}>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="group bg-card border border-border rounded-lg p-5 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      variants={stepVariants}
                      onMouseEnter={() => handleStepHover(step.number, step.title)}
                    >
                      {/* Step Number - Mobile/Tablet */}
                      <div className="lg:hidden flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                          {step.number}
                        </div>
                        <span className="text-xs text-muted-foreground">Step {step.number}</span>
                      </div>

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="font-medium text-foreground mb-2 text-sm lg:text-base">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                        {step.description}
                      </p>

                      {/* Mini CTA */}
                      <Link
                        to={step.ctaUrl}
                        onClick={() => handleCtaClick(step.number, step.title, step.ctaUrl)}
                        className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {step.ctaText}
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="max-w-xs p-4 bg-popover text-popover-foreground"
                  >
                    <p className="text-sm leading-relaxed">{step.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </motion.div>
        </TooltipProvider>

        {/* Helper Text */}
        <motion.p 
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Hover over each step to see more details
        </motion.p>

        {/* Optional Final CTA */}
        {cta && (
          <motion.div 
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link to={cta.url} onClick={handleFinalCtaClick}>
                {cta.text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
