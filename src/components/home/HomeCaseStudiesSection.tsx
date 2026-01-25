import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import { useLanguage } from "@/contexts/LanguageContext";

export const HomeCaseStudiesSection = () => {
  const { trackEvent } = useAnalytics();
  const { t, language } = useLanguage();
  const { data: caseStudies, isLoading } = useCaseStudies({ 
    language, 
    limit: 3,
    status: 'published' 
  });

  const handleCardClick = (index: number, industry: string) => {
    trackEvent("case_study_teaser_click", {
      case_study_index: index,
      industry
    });
  };

  const handleExploreClick = () => {
    trackEvent("case_study_cta_click", {
      cta_text: t("home.caseStudies.cta")
    });
  };

  if (isLoading) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            {t("home.caseStudies.overline")}
          </span>
          <h2 className="text-3xl md:text-4xl font-normal mt-4 mb-4">
            {t("home.caseStudies.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.caseStudies.subtitle")}
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
              <Link 
                to={`/case-studies/${study.slug}`}
                onClick={() => handleCardClick(index, study.client_industry)}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {study.client_industry}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {study.challenge}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{t("home.caseStudies.readMore")}</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg"
            onClick={handleExploreClick}
          >
            <Link to="/case-studies">
              {t("home.caseStudies.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
