import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export const AuditCTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t('auditHub.cta.title')}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t('auditHub.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="hero"
              asChild
              className="min-w-[200px]"
            >
              <Link to="/contacto">
                {t('auditHub.cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="min-w-[200px] border-white/30 text-white hover:bg-white/10"
            >
              <a href="tel:+34932000000">
                <Phone className="mr-2 h-5 w-5" />
                {t('auditHub.cta.secondary')}
              </a>
            </Button>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            {t('auditHub.cta.guarantee')}
          </p>
        </div>
      </div>
    </section>
  );
};
