import { Button } from "@/components/ui/button";
import { BadgeHero } from "@/components/ui/badge-hero";
import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/hooks/useLanguage";

export const HeroSection = () => {
  const { trackCTAClick } = useAnalytics();
  const { t } = useLanguage();

  const handleCTAClick = () => {
    trackCTAClick("solicitar-consulta-hero", "ley-beckham-hero");
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-dark="true" className="bg-black text-white py-40 md:py-56 lg:py-72">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <BadgeHero variant="light">{t('leyBeckham.hero.badge')}</BadgeHero>
          
          <h1 className="hero-title mb-6">
            {t('leyBeckham.hero.title')}
          </h1>
          
          <p className="text-lead mb-8">
            {t('leyBeckham.hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleCTAClick}
              className="text-base group"
            >
              {t('leyBeckham.hero.ctaButton')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => {
                trackCTAClick("ver-requisitos", "ley-beckham-hero");
                document.getElementById("requisitos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t('leyBeckham.hero.viewRequirements')}
            </Button>
          </div>

          {/* Trust indicators - minimalistas */}
          <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
            <div>
              <div className="text-3xl font-normal mb-1">{t('leyBeckham.hero.successRate')}</div>
              <div className="text-sm text-white/70">{t('leyBeckham.hero.successRateLabel')}</div>
            </div>
            <div>
              <div className="text-3xl font-normal mb-1">{t('leyBeckham.hero.experience')}</div>
              <div className="text-sm text-white/70">{t('leyBeckham.hero.experienceLabel')}</div>
            </div>
            <div>
              <div className="text-3xl font-normal mb-1">{t('leyBeckham.hero.taxRate')}</div>
              <div className="text-sm text-white/70">{t('leyBeckham.hero.taxRateLabel')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
