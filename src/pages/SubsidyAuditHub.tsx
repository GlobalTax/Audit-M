import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { mainBreadcrumbs } from "@/lib/seoUtils";
import {
  SubsidyHeroSection,
  SubsidyTrustBar,
  SubsidyProgramGrid,
  SubsidyTimeline2026,
  SubsidyRequirements2026,
  SubsidyFAQSection,
  SubsidyCTASection,
} from "@/components/subsidy-hub";

const SubsidyAuditHub = () => {
  const { trackPageView } = useAnalytics();
  const { t, language } = useLanguage();

  useEffect(() => {
    trackPageView("subsidy-audit-hub");
  }, []);

  // FAQ items for schema
  const faqItems = [
    {
      question: t('subsidyHub.faq.items.obligatorio.question'),
      answer: t('subsidyHub.faq.items.obligatorio.answer'),
    },
    {
      question: t('subsidyHub.faq.items.simplificada.question'),
      answer: t('subsidyHub.faq.items.simplificada.answer'),
    },
    {
      question: t('subsidyHub.faq.items.prtrIncumplimiento.question'),
      answer: t('subsidyHub.faq.items.prtrIncumplimiento.answer'),
    },
    {
      question: t('subsidyHub.faq.items.dnsh.question'),
      answer: t('subsidyHub.faq.items.dnsh.answer'),
    },
    {
      question: t('subsidyHub.faq.items.coste.question'),
      answer: t('subsidyHub.faq.items.coste.answer'),
    },
  ];

  return (
    <>
      <Meta
        title={t('subsidyHub.meta.title')}
        description={t('subsidyHub.meta.description')}
        keywords={t('subsidyHub.meta.keywords')}
        canonicalUrl={`https://nrro.es/${language === 'es' ? 'servicios/subvenciones' : language === 'en' ? 'services/subsidies' : 'serveis/subvencions'}`}
      />
      <BreadcrumbSchema 
        items={[
          ...mainBreadcrumbs.services,
          { name: t('subsidyHub.breadcrumb'), url: `https://nrro.es/servicios/subvenciones` }
        ]} 
      />
      <FAQSchema faqs={faqItems} />

      <SubsidyHeroSection />
      <SubsidyTrustBar />
      <SubsidyProgramGrid />
      <SubsidyTimeline2026 />
      <SubsidyRequirements2026 />
      <SubsidyFAQSection />
      <SubsidyCTASection />
    </>
  );
};

export default SubsidyAuditHub;
