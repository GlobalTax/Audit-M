import { Link } from 'react-router-dom';
import { Scale, FileText, CreditCard, Landmark, ScrollText, ClipboardList } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export const StepProgressBar = () => {
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

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            The Process
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4 mb-4">
            Your 6-Step Roadmap to Company Formation in Spain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these essential steps to successfully register and launch your business entity in Spain
          </p>
        </div>

        {/* Progress Line - Desktop */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div className="flex justify-between relative">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium z-10"
              >
                {step.number}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <TooltipProvider delayDuration={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Tooltip key={step.number}>
                  <TooltipTrigger asChild>
                    <div 
                      className="group bg-card border border-border rounded-lg p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
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
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                    </div>
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
          </div>
        </TooltipProvider>

        {/* Helper Text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Hover over each step to see more details
        </p>
      </div>
    </section>
  );
};
