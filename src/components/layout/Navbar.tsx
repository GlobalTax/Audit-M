import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServicesSearch } from "@/hooks/useServicesSearch";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  
  // Fetch dynamic services from DB
  const { data: servicesData } = useServicesSearch({ limit: 11 }, language);
  const services = servicesData?.services || [];

  // Separate services and areas
  const serviciosMenu = services.slice(0, 5).map(service => ({
    name: service.name,
    href: `/services/${service.slug_en || service.slug_es}`
  }));

  const areasMenu = services.slice(5, 11).map(service => ({
    name: service.name,
    href: `/services/${service.slug_en || service.slug_es}`
  }));

  const navigation = [
    { name: t("nav.services"), href: "/services" },
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

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviciosOpen && !(event.target as Element).closest('.servicios-dropdown')) {
        setServiciosOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [serviciosOpen]);

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
