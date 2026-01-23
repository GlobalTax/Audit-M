import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Calculator, ArrowRight } from "lucide-react";

export const AuditHeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-black py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <BadgeHero variant="dark" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {t('auditHub.hero.badge')}
            </BadgeHero>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
            {t('auditHub.hero.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('auditHub.hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="hero"
              asChild
              className="min-w-[200px]"
            >
              <Link to="/contacto">
                {t('auditHub.hero.ctaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="min-w-[200px] border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/calculadora-obligacion-auditoria">
                <Calculator className="mr-2 h-5 w-5" />
                {t('auditHub.hero.ctaSecondary')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
