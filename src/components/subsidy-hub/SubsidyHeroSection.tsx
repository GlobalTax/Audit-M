import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, FileCheck, Euro, Users, CheckCircle } from "lucide-react";

const stats = [
  { value: "99%", labelKey: "subsidyHub.stats.approvalRate", icon: CheckCircle },
  { value: "50M€+", labelKey: "subsidyHub.stats.verifiedFunds", icon: Euro },
  { value: "100+", labelKey: "subsidyHub.stats.projectsYear", icon: FileCheck },
  { value: "0", labelKey: "subsidyHub.stats.reimbursements", icon: Users },
];

export const SubsidyHeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-primary to-primary/95 py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Urgency Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <BadgeHero variant="warning" className="flex items-center gap-2 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              {t('subsidyHub.hero.badge')}
            </BadgeHero>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight tracking-tight">
            {t('subsidyHub.hero.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('subsidyHub.hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              variant="hero"
              asChild
              className="min-w-[220px]"
            >
              <Link to="/contacto?servicio=subvenciones">
                {t('subsidyHub.hero.ctaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="min-w-[220px] border-white/30 text-white hover:bg-white/10"
            >
              <a href="#timeline-2026">
                {t('subsidyHub.hero.ctaSecondary')}
              </a>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <Icon className="h-6 w-6 text-accent mx-auto mb-3 opacity-80" />
                  <div className="text-3xl md:text-4xl font-light text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">
                    {t(stat.labelKey)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
