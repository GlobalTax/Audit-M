import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const BlogCTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            {t('blog.cta.title') || 'Need personalized advice?'}
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('blog.cta.subtitle') || 'Our team of experts is ready to help you with your tax, accounting and legal needs.'}
          </p>
          
          <div className="pt-4">
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                {t('blog.cta.button') || 'Contact us'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
