import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Meta } from '@/components/seo/Meta';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Meta
        title={t("notFound.title") || "Page Not Found"}
        description={t("notFound.description") || "The page you're looking for doesn't exist."}
      />
      
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-serif font-bold text-primary mb-4">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                {t("notFound.heading") || "Page not found"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("notFound.message") || "Sorry, we couldn't find the page you're looking for."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  {t("notFound.backHome") || "Back to Home"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  {t("nav.contact") || "Contact"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
