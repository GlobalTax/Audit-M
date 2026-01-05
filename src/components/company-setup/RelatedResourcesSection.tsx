import { Link } from "react-router-dom";
import { 
  Scale, 
  BadgeCheck, 
  Landmark, 
  FileText, 
  BookOpen, 
  Calculator, 
  Download,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const resources = [
  {
    title: "Choosing the Right Legal Structure",
    description: "Compare SL, SA, branch, and subsidiary options for your Spanish entity.",
    url: "/legal-structures-spain",
    icon: Scale,
  },
  {
    title: "NIE Application for Foreigners",
    description: "Step-by-step guide to obtaining your Spanish tax identification number.",
    url: "/nie-spain-foreigners",
    icon: BadgeCheck,
  },
  {
    title: "Opening a Spanish Bank Account",
    description: "Requirements and process for setting up your corporate bank account.",
    url: "/set-up-in-spain#bank-account",
    icon: Landmark,
  },
  {
    title: "Articles of Association Guide",
    description: "Essential elements to include in your company bylaws (estatutos).",
    url: "/set-up-in-spain#legal-documents",
    icon: FileText,
  },
  {
    title: "Commercial Registry Filing",
    description: "Understanding the Mercantile Registry inscription process and timeline.",
    url: "/set-up-in-spain#registry",
    icon: BookOpen,
  },
  {
    title: "Cost & Timeline Calculator",
    description: "Get instant estimates based on your entity type and requirements.",
    url: "/spain-setup-calculator",
    icon: Calculator,
  },
  {
    title: "Spain Company Setup Playbook",
    description: "Comprehensive 12-step guide with checklists, templates, and forms.",
    url: "/spain-company-setup-playbook",
    icon: Download,
  },
];

export const RelatedResourcesSection = () => {
  const { trackEvent } = useAnalytics();

  const handleResourceClick = (resourceTitle: string) => {
    trackEvent("resource_click_global_nrro", {
      resource: resourceTitle,
      page: "set-up-company-spain",
    });
  };

  const handleCTAClick = () => {
    trackEvent("resources_cta_click_global_nrro", {
      page: "set-up-company-spain",
    });
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Resources
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mt-4">
              Helpful Resources for Company Setup in Spain
            </h2>
          </div>

          {/* Resources List */}
          <div className="bg-background rounded-2xl border border-border/50 overflow-hidden shadow-sm">
            {resources.map((resource, index) => (
              <Link
                key={index}
                to={resource.url}
                onClick={() => handleResourceClick(resource.title)}
                className="group flex items-start gap-4 p-5 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <resource.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Button asChild size="lg" onClick={handleCTAClick}>
              <Link to="/resources">
                Explore All Setup Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
