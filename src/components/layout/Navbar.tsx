import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, FileCheck, CheckCircle, Leaf, Search, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServicesSearch } from "@/hooks/useServicesSearch";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";
// Audit service categories with icons - keys match DB area values in each language
const auditCategories = [
  { 
    key: { es: "Auditoría Financiera", en: "Financial Audit", ca: "Auditoria Financera" },
    label: { es: "Financiera", en: "Financial", ca: "Financera" }, 
    icon: FileCheck 
  },
  { 
    key: { es: "Auditoría de Cumplimiento", en: "Compliance Audit", ca: "Auditoria de Compliment" },
    label: { es: "Cumplimiento", en: "Compliance", ca: "Compliment" }, 
    icon: CheckCircle 
  },
  { 
    key: { es: "Auditoría ESG", en: "ESG Audit", ca: "Auditoria ESG" },
    label: { es: "ESG / Sostenibilidad", en: "ESG / Sustainability", ca: "ESG / Sostenibilitat" }, 
    icon: Leaf 
  },
  { 
    key: { es: "Auditoría Transaccional", en: "Transaction Audit", ca: "Auditoria Transaccional" },
    label: { es: "Transaccional", en: "Transactional", ca: "Transaccional" }, 
    icon: Search 
  },
  { 
    key: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" },
    label: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" }, 
    icon: Shield 
  },
  { 
    key: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" },
    label: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" }, 
    icon: FileText 
  },
];

export const Navbar = () => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const location = useLocation();
  
  // Rutas que siempre usan modo oscuro cuando no hay scroll
  const darkRoutes = ['/', '/servicios'];
  const isDarkRoute = darkRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith('/servicios/')
  );
  
  // Inicializar isLightMode basándose en la ruta actual
  const [isLightMode, setIsLightMode] = useState(() => !isDarkRoute);
  const navRef = useRef<HTMLElement>(null);
  
  // Calcular modo visual directamente - esto se ejecuta en cada render, sin depender de useEffect
  const visualMode = useMemo(() => {
    if (scrolled || mobileMenuOpen) return 'scrolled';
    if (isDarkRoute) return 'dark';
    return isLightMode ? 'light' : 'dark';
  }, [scrolled, mobileMenuOpen, isDarkRoute, isLightMode]);
  
  // Fetch dynamic services from DB (only active audit services)
  const { data: servicesData } = useServicesSearch({ limit: 30 }, language);
  const services = servicesData?.services || [];

  // Helper to get category key for current language
  const getCategoryKey = (cat: typeof auditCategories[0]) => {
    return cat.key[language as keyof typeof cat.key] || cat.key.es;
  };

  // Group services by audit area using language-aware keys
  const servicesByArea = auditCategories.reduce((acc, cat) => {
    const areaKey = getCategoryKey(cat);
    acc[areaKey] = services.filter(s => s.area === areaKey);
    return acc;
  }, {} as Record<string, typeof services>);

  const navigation = [
    { name: t("nav.services"), href: "/servicios" },
    { name: t("nav.about"), href: "/nosotros" },
    { name: t("nav.caseStudies"), href: "/casos-exito" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.team"), href: "/equipo" },
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

  // Cuando cambia la ruta, resetear isLightMode basándose en si es ruta oscura
  useEffect(() => {
    // Forzar modo oscuro inmediatamente para rutas oscuras
    if (isDarkRoute) {
      setIsLightMode(false);
    }
  }, [location.pathname, isDarkRoute]);

  useEffect(() => {
    const detectBackgroundColor = () => {
      // PRIORIDAD 1: Rutas oscuras sin scroll = siempre modo oscuro
      if (isDarkRoute && window.scrollY < 50) {
        setIsLightMode(false);
        return;
      }

      // PRIORIDAD 2: Detección basada en DOM para otros casos
      if (!navRef.current) {
        setIsLightMode(false);
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const elementsBelow = document.elementsFromPoint(
        navRect.left + navRect.width / 2,
        navRect.bottom + 10
      );

      // Buscar atributo data-dark
      for (const element of elementsBelow) {
        if (element instanceof HTMLElement) {
          const dataDark = element.getAttribute('data-dark');
          if (dataDark !== null) {
            setIsLightMode(dataDark !== 'true');
            return;
          }
        }
      }

      // Analizar color de fondo
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
      
      // Default: modo oscuro
      setIsLightMode(false);
    };

    // Ejecutar detección inicial
    detectBackgroundColor();

    const scrollHandler = () => {
      requestAnimationFrame(detectBackgroundColor);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [location.pathname, isDarkRoute]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviciosOpen && !(event.target as Element).closest('.servicios-dropdown')) {
        setServiciosOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [serviciosOpen]);

  const getCategoryLabel = (cat: typeof auditCategories[0]) => {
    return cat.label[language as keyof typeof cat.label] || cat.label.es;
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 md:top-10 left-0 right-0 z-40 transition-all duration-300",
        visualMode === 'scrolled'
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : visualMode === 'light'
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
              brand="default"
              color={visualMode === 'scrolled' || visualMode === 'light' ? "dark" : "light"}
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
                        visualMode === 'scrolled' || visualMode === 'light'
                          ? "text-foreground hover:text-accent"
                          : "text-white hover:text-accent",
                        isActive(item.href) && (visualMode === 'scrolled' || visualMode === 'light'
                          ? "text-accent font-normal" 
                          : "text-white font-normal underline decoration-2 underline-offset-4")
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", serviciosOpen && "rotate-180")} />
                    </button>
                    
                    {serviciosOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border rounded-xl shadow-xl overflow-hidden min-w-[900px] z-[100]">
                        <div className="grid grid-cols-3 gap-px bg-border">
                          {/* First row: 3 categories */}
                          {auditCategories.slice(0, 3).map((cat, idx) => {
                            const Icon = cat.icon;
                            const catKey = getCategoryKey(cat);
                            const categoryServices = servicesByArea[catKey] || [];
                            return (
                              <div key={idx} className="bg-background p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Icon className="h-4 w-4 text-accent" />
                                  <h3 className="text-xs font-normal text-foreground/70 uppercase tracking-wider">
                                    {getCategoryLabel(cat)}
                                  </h3>
                                </div>
                                <div className="space-y-1">
                                  {categoryServices.map((service) => (
                                    <Link
                                      key={service.id}
                                      to={`/servicios/${service.slug}`}
                                      onClick={() => setServiciosOpen(false)}
                                      className="block px-2 py-1.5 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                    >
                                      {service.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="grid grid-cols-3 gap-px bg-border border-t border-border">
                          {/* Second row: 3 categories */}
                          {auditCategories.slice(3, 6).map((cat, idx) => {
                            const Icon = cat.icon;
                            const catKey = getCategoryKey(cat);
                            const categoryServices = servicesByArea[catKey] || [];
                            return (
                              <div key={idx + 3} className="bg-background p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Icon className="h-4 w-4 text-accent" />
                                  <h3 className="text-xs font-normal text-foreground/70 uppercase tracking-wider">
                                    {getCategoryLabel(cat)}
                                  </h3>
                                </div>
                                <div className="space-y-1">
                                  {categoryServices.map((service) => (
                                    <Link
                                      key={service.id}
                                      to={`/servicios/${service.slug}`}
                                      onClick={() => setServiciosOpen(false)}
                                      className="block px-2 py-1.5 text-sm text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                                    >
                                      {service.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/* Footer CTA */}
                        <div className="bg-muted/40 px-4 py-3 border-t border-border flex items-center justify-between">
                          <span className="text-sm text-foreground/60">
                            {language === 'en' ? 'Not sure which service you need?' : language === 'ca' ? 'No saps quin servei necessites?' : '¿No sabes qué servicio necesitas?'}
                          </span>
                          <Link
                            to="/contacto"
                            onClick={() => setServiciosOpen(false)}
                            className="text-sm font-normal text-accent hover:underline"
                          >
                            {language === 'en' ? 'Contact us →' : language === 'ca' ? 'Contacta\'ns →' : 'Contáctanos →'}
                          </Link>
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
                    visualMode === 'scrolled' || visualMode === 'light'
                      ? "text-foreground hover:text-accent"
                      : "text-white hover:text-accent",
                    isActive(item.href) && (visualMode === 'scrolled' || visualMode === 'light'
                      ? "text-accent font-normal" 
                      : "text-white font-normal underline decoration-2 underline-offset-4")
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link to="/contacto">
              <Button 
                variant={visualMode === 'scrolled' || visualMode === 'light' ? "default" : "secondary"}
                className="font-normal"
              >
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSwitcher 
              variant={visualMode === 'scrolled' || visualMode === 'light' ? 'light' : 'dark'}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-md transition-colors",
                visualMode === 'scrolled' || visualMode === 'light'
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
                      ? "text-accent bg-accent/10 font-normal"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>
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
