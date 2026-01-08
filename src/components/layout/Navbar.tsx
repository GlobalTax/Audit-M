import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Building2, Scale, Landmark, FileText, Rocket, Zap, Calculator, ClipboardCheck, HelpCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServicesSearch } from "@/hooks/useServicesSearch";
import { cn } from "@/lib/utils";

// Spain Setup mega-menu data
const spainSetupGuides = [
  { name: "How to Set Up in Spain", href: "/set-up-in-spain", icon: Building2 },
  { name: "Legal Structures", href: "/legal-structures-spain", icon: Scale },
  { name: "Bank Account Guide", href: "/spain-business-bank-account", icon: Landmark },
  { name: "NIE for Foreigners", href: "/nie-spain-foreigners", icon: FileText },
  { name: "Tech Startup Setup", href: "/tech-startup-spain", icon: Rocket },
  { name: "Express Registration", href: "/express-spain-company-registration", icon: Zap },
];

const spainSetupTools = [
  { name: "Setup Calculator", href: "/spain-setup-calculator", icon: Calculator },
  { name: "Labor Cost Calculator", href: "/spain-labor-cost-calculator", icon: Calculator },
  { name: "Readiness Quiz", href: "/spain-readiness-quiz", icon: HelpCircle },
  { name: "Free Playbook", href: "/spain-company-setup-playbook", icon: BookOpen },
  { name: "Document Checklist", href: "/spain-document-checklist", icon: ClipboardCheck },
];

const spainSetupByCountry = [
  { name: "US Companies", href: "/spain-company-setup-usa", flag: "🇺🇸" },
  { name: "UK Companies", href: "/spain-company-setup-uk", flag: "🇬🇧" },
  { name: "UAE Companies", href: "/spain-company-setup-uae", flag: "🇦🇪" },
];

export const Navbar = () => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [spainSetupOpen, setSpainSetupOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  
  // Fetch dynamic services from DB (only active international services)
  const { data: servicesData } = useServicesSearch({ limit: 20 }, language);
  const services = servicesData?.services || [];

  // Separate services into two columns based on display_order
  // SERVICES (display_order 1-6): Core international services
  // AREAS (display_order 7-13): Specialized services
  const serviciosMenu = services
    .filter(s => s.display_order >= 1 && s.display_order <= 6)
    .map(service => ({
      name: service.name,
      href: `/services/${service.slug_en || service.slug_es}`
    }));

  const areasMenu = services
    .filter(s => s.display_order >= 7 && s.display_order <= 13)
    .map(service => ({
      name: service.name,
      href: `/services/${service.slug_en || service.slug_es}`
    }));

  const navigation = [
    { name: t("nav.services"), href: "/services" },
    { name: "Spain Setup", href: "/spain-company-setup" },
    { name: "Resources", href: "/resources" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.team"), href: "/team" },
    { name: t("nav.careers"), href: "/careers" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const detectBackgroundColor = () => {
      if (!navRef.current) return;

      if (location.pathname.startsWith('/services') && window.scrollY < 10) {
        setIsLightMode(false);
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const elementsBelow = document.elementsFromPoint(
        navRect.left + navRect.width / 2,
        navRect.bottom + 10
      );

      for (const element of elementsBelow) {
        if (element instanceof HTMLElement) {
          const dataDark = element.getAttribute('data-dark');
          if (dataDark !== null) {
            setIsLightMode(dataDark !== 'true');
            return;
          }
        }
      }

      for (const element of elementsBelow) {
        if (element instanceof HTMLElement && element !== navRef.current) {
          const bgColor = window.getComputedStyle(element).backgroundColor;
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0]);
              const g = parseInt(rgb[1]);
              const b = parseInt(rgb[2]);
              const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              setIsLightMode(luminosity >= 0.5);
              return;
            }
          }
        }
      }
      
      setIsLightMode(false);
    };

    detectBackgroundColor();
    requestAnimationFrame(() => detectBackgroundColor());

    const scrollHandler = () => {
      requestAnimationFrame(detectBackgroundColor);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviciosOpen && !(event.target as Element).closest('.servicios-dropdown')) {
        setServiciosOpen(false);
      }
      if (spainSetupOpen && !(event.target as Element).closest('.spain-setup-dropdown')) {
        setSpainSetupOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [serviciosOpen, spainSetupOpen]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : isLightMode
          ? "bg-background/80 backdrop-blur-sm border-b border-border/40"
          : "bg-transparent border-b border-white/10"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo
              variant="full"
              brand="international"
              color={scrolled || (isLightMode && !mobileMenuOpen) ? "dark" : "light"}
              className="h-auto"
              asLink={false}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              if (item.name === t("nav.services")) {
                return (
                  <div
                    key={item.name}
                    className="relative group servicios-dropdown"
                  >
                    <button
                      onClick={() => setServiciosOpen(!serviciosOpen)}
                      className={cn(
                        "flex items-center gap-1 font-display text-base transition-colors",
                        scrolled || isLightMode
                          ? "text-foreground hover:text-accent"
                          : "text-white hover:text-accent",
                        isActive(item.href) && (scrolled || isLightMode 
                          ? "text-accent font-semibold" 
                          : "text-white font-semibold underline decoration-2 underline-offset-4")
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {serviciosOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden min-w-[500px] z-[100]">
                        <div className="grid grid-cols-2 gap-px bg-border">
                          <div className="bg-background p-4">
                            <h3 className="text-sm font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                              {t("footer.services")}
                            </h3>
                            <div className="space-y-2">
                              {serviciosMenu.map((service) => (
                                <Link
                                  key={service.href}
                                  to={service.href}
                                  onClick={() => setServiciosOpen(false)}
                                  className="block px-3 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="bg-background p-4">
                            <h3 className="text-sm font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                              {t("footer.areas")}
                            </h3>
                            <div className="space-y-2">
                              {areasMenu.map((area) => (
                                <Link
                                  key={area.href}
                                  to={area.href}
                                  onClick={() => setServiciosOpen(false)}
                                  className="block px-3 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                >
                                  {area.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Spain Setup mega-menu
              if (item.name === "Spain Setup") {
                return (
                  <div
                    key={item.name}
                    className="relative group spain-setup-dropdown"
                  >
                    <button
                      onClick={() => {
                        setSpainSetupOpen(!spainSetupOpen);
                        setServiciosOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-1 font-display text-base transition-colors",
                        scrolled || isLightMode
                          ? "text-foreground hover:text-accent"
                          : "text-white hover:text-accent",
                        isActive("/spain-company-setup") && (scrolled || isLightMode 
                          ? "text-accent font-semibold" 
                          : "text-white font-semibold underline decoration-2 underline-offset-4")
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {spainSetupOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden min-w-[680px] z-[100]">
                        <div className="grid grid-cols-3 gap-px bg-border">
                          {/* Column 1: Guides */}
                          <div className="bg-background p-4">
                            <h3 className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                              Guides
                            </h3>
                            <div className="space-y-1">
                              {spainSetupGuides.map((guide) => (
                                <Link
                                  key={guide.href}
                                  to={guide.href}
                                  onClick={() => setSpainSetupOpen(false)}
                                  className="flex items-center gap-2 px-2 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                >
                                  <guide.icon className="h-4 w-4 text-foreground/50" />
                                  {guide.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          
                          {/* Column 2: By Country */}
                          <div className="bg-background p-4">
                            <h3 className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                              By Country
                            </h3>
                            <div className="space-y-1">
                              {spainSetupByCountry.map((country) => (
                                <Link
                                  key={country.href}
                                  to={country.href}
                                  onClick={() => setSpainSetupOpen(false)}
                                  className="flex items-center gap-2 px-2 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                >
                                  <span className="text-base">{country.flag}</span>
                                  {country.name}
                                </Link>
                              ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-border">
                              <Link
                                to="/spain-company-setup"
                                onClick={() => setSpainSetupOpen(false)}
                                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-accent hover:bg-accent/10 rounded transition-colors"
                              >
                                <Building2 className="h-4 w-4" />
                                View All Resources →
                              </Link>
                            </div>
                          </div>
                          
                          {/* Column 3: Tools */}
                          <div className="bg-muted/30 p-4">
                            <h3 className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                              Tools & Calculators
                            </h3>
                            <div className="space-y-1">
                              {spainSetupTools.map((tool) => (
                                <Link
                                  key={tool.href}
                                  to={tool.href}
                                  onClick={() => setSpainSetupOpen(false)}
                                  className="flex items-center gap-2 px-2 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                >
                                  <tool.icon className="h-4 w-4 text-foreground/50" />
                                  {tool.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "font-display text-base transition-colors",
                    scrolled || isLightMode
                      ? "text-foreground hover:text-accent"
                      : "text-white hover:text-accent",
                    isActive(item.href) && (scrolled || isLightMode 
                      ? "text-accent font-semibold" 
                      : "text-white font-semibold underline decoration-2 underline-offset-4")
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link to="/contact">
              <Button 
                variant={scrolled || isLightMode ? "default" : "secondary"}
                className="font-medium"
              >
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-md transition-colors",
                scrolled || isLightMode
                  ? "text-foreground hover:text-accent"
                  : "text-white hover:text-accent"
              )}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-display text-base px-4 py-2 transition-colors",
                    isActive(item.href)
                      ? "text-accent bg-accent/10 font-semibold"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  {t("nav.contact")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
