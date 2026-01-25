import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, Clock } from "lucide-react";

export const SubsidyCTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            {t('subsidyHub.cta.title')}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('subsidyHub.cta.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button 
              size="lg" 
              variant="hero"
              asChild
              className="min-w-[220px]"
            >
              <Link to="/contacto?servicio=subvenciones">
                {t('subsidyHub.cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="min-w-[220px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="tel:+34935555555">
                <Phone className="mr-2 h-5 w-5" />
                {t('subsidyHub.cta.secondary')}
              </a>
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{t('subsidyHub.cta.response')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{t('subsidyHub.cta.freeQuote')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
