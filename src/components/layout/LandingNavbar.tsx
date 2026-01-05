import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LandingNavbar = () => {
  const { t } = useLanguage();
  
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo variant="full" brand="international" color="light" />

          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              onClick={scrollToForm}
              className="font-medium"
            >
              {t("nav.contact")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
