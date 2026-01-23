import { useState, useRef, useMemo, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServicesSearch } from "@/hooks/useServicesSearch";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { mainBreadcrumbs } from "@/lib/seoUtils";
import { Loader2 } from "lucide-react";

import { AuditHeroSection } from "@/components/audit-hub/AuditHeroSection";
import { AuditTrustBar } from "@/components/audit-hub/AuditTrustBar";
import { CategoryGrid } from "@/components/audit-hub/CategoryGrid";
import { ServiceSection } from "@/components/audit-hub/ServiceSection";
import { WhyChooseUsSection } from "@/components/audit-hub/WhyChooseUsSection";
import { AuditCTASection } from "@/components/audit-hub/AuditCTASection";

const AuditHub = () => {
  const { t, language } = useLanguage();
  const { trackPageView } = useAnalytics();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Track page view
  useEffect(() => {
    trackPageView("audit-hub");
  }, []);

  // Fetch all services
  const { data: dbServices, isLoading } = useServicesSearch({
    limit: 50,
  }, language);

  const services = dbServices?.services || [];

  // Group services by area/category
  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    services.forEach((service) => {
      const area = service.area || "Otros";
      if (!grouped[area]) {
        grouped[area] = [];
      }
      grouped[area].push(service);
    });
    return grouped;
  }, [services]);

  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    // Scroll to services section
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <Meta
        title={t('auditHub.meta.title')}
        description={t('auditHub.meta.description')}
        canonicalUrl={`${window.location.origin}/servicios`}
      />
      <BreadcrumbSchema items={mainBreadcrumbs.services} />

      <div className="min-h-screen">
        <AuditHeroSection />
        <AuditTrustBar />
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <CategoryGrid 
              servicesByCategory={servicesByCategory}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
            
            <div ref={servicesRef}>
              <ServiceSection 
                servicesByCategory={servicesByCategory}
                highlightedCategory={activeCategory}
              />
            </div>
          </>
        )}

        <WhyChooseUsSection />
        <AuditCTASection />
      </div>
    </>
  );
};

export default AuditHub;
