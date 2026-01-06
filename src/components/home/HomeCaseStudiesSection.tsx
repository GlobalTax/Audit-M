import { ArrowRight, Building2, Factory, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "@/hooks/useAnalytics";

const caseStudies = [
  {
    id: 1,
    industry: "Technology",
    icon: Building2,
    title: "European Tech Expansion",
    story: "A fast-growing SaaS company from the UK established their Spanish subsidiary in under 4 weeks. We handled company registration, NIE processing, and payroll setup, enabling them to hire local talent immediately.",
    slug: "tech-expansion-uk"
  },
  {
    id: 2,
    industry: "Manufacturing",
    icon: Factory,
    title: "Global Supply Chain Restructuring",
    story: "A German industrial group consolidated their Iberian operations through our legal and tax advisory. The restructuring reduced administrative costs by 35% and simplified cross-border compliance.",
    slug: "manufacturing-restructuring"
  },
  {
    id: 3,
    industry: "Financial Services",
    icon: Landmark,
    title: "Private Equity Entry to Spain",
    story: "An international PE fund acquired a Spanish portfolio company with full legal and tax due diligence support. Our team ensured regulatory compliance and optimized the post-acquisition structure.",
    slug: "pe-acquisition"
  }
];

export const HomeCaseStudiesSection = () => {
  const { trackEvent } = useAnalytics();

  const handleCardClick = (index: number, industry: string) => {
    trackEvent("case_study_teaser_click_global_nrro", {
      case_study_index: index,
      industry
    });
  };

  const handleExploreClick = () => {
    trackEvent("case_study_cta_click_global_nrro", {
      cta_text: "Explore All Case Studies"
    });
  };

  const handleShareClick = () => {
    trackEvent("case_study_share_click_global_nrro", {
      cta_text: "Share Your Experience"
    });
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-normal mt-4 mb-4">
            Results That Speak for International Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From rapid market entry to complex restructuring, see how we've helped global businesses succeed in Spain.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => handleCardClick(index, study.industry)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {study.industry}
                    </Badge>
                    <study.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {study.story}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read full story</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="text-center mb-12">
          <Button 
            asChild 
            size="lg"
            onClick={handleExploreClick}
          >
            <Link to="/case-studies">
              Explore All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mini CTA */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-3">
            Have a success story to share?
          </p>
          <Button 
            variant="outline" 
            asChild
            onClick={handleShareClick}
          >
            <Link to="/contact?subject=testimonial">
              Share Your Experience with NRRO
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
