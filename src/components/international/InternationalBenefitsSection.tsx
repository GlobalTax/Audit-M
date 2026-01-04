import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp, Globe, Scale } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface BenefitBlock {
  id: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  benefits: string[];
  cta: string;
  destinationUrl: string;
  eventName: string;
}

const benefitBlocks: BenefitBlock[] = [
  {
    id: "tax-planning",
    icon: TrendingUp,
    headline: "Strategic Global Tax Planning",
    description: "Reduce your worldwide tax burden through expert cross-border structuring, treaty optimization, and proactive compliance management.",
    benefits: [
      "Effective tax rate reduction through double taxation treaty analysis",
      "Transfer pricing policies that withstand regulatory scrutiny",
      "Proactive risk mitigation to avoid penalties and disputes"
    ],
    cta: "Explore Tax Advisory",
    destinationUrl: "/services/international-tax-management",
    eventName: "benefit_click_taxplanning_global_nrro"
  },
  {
    id: "operations",
    icon: Globe,
    headline: "Seamless Multi-Country Operations",
    description: "Operate confidently across jurisdictions with integrated accounting, payroll, and treasury management tailored for multinational complexity.",
    benefits: [
      "Unified financial reporting across all entities and currencies",
      "Compliant payroll processing in 50+ countries",
      "Real-time cash flow visibility and working capital optimization"
    ],
    cta: "Explore Global Operations",
    destinationUrl: "/services/international-accounting-management",
    eventName: "benefit_click_operations_global_nrro"
  },
  {
    id: "legal",
    icon: Scale,
    headline: "End-to-End Legal & Governance Support",
    description: "Establish and maintain your international presence with comprehensive legal advisory on entity formation, contracts, and ongoing corporate governance.",
    benefits: [
      "Fast-track company incorporation in Spain and key EU markets",
      "Commercial contracts aligned with local and international standards",
      "Ongoing corporate secretarial and board support"
    ],
    cta: "Explore Legal Services",
    destinationUrl: "/services/corporate-legal-services",
    eventName: "benefit_click_legal_global_nrro"
  }
];

export const InternationalBenefitsSection = () => {
  const { trackBenefitClick } = useAnalytics();

  const handleBenefitClick = (block: BenefitBlock, index: number) => {
    trackBenefitClick({
      eventName: block.eventName,
      benefitTitle: block.headline,
      benefitIndex: index,
      destinationUrl: block.destinationUrl
    });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-3 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Designed for International Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three strategic pillars that drive value for multinational companies and cross-border operations.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitBlocks.map((block, index) => {
              const IconComponent = block.icon;
              return (
                <div 
                  key={block.id}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {block.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {block.description}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-3 mb-8">
                    {block.benefits.map((benefit, benefitIndex) => (
                      <li 
                        key={benefitIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full group"
                    onClick={() => handleBenefitClick(block, index)}
                  >
                    <Link to={block.destinationUrl}>
                      {block.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
