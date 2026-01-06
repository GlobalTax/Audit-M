import { Linkedin, Instagram, Twitter, Facebook, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { useSiteSettingsMap } from '@/hooks/useSiteSettings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useServicesSearch } from '@/hooks/useServicesSearch';
import { useAnalytics } from '@/hooks/useAnalytics';

export const Footer = () => {
  const { t, language } = useLanguage();
  const { trackContactClick } = useAnalytics();
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettingsMap();
  
  // Fetch dynamic services from DB
  const { data: servicesData } = useServicesSearch({ limit: 11 }, language);
  const services = servicesData?.services || [];

  // Default values (fallback)
  const socialLinks = {
    instagram: settings.social_instagram || 'https://www.instagram.com',
    twitter: settings.social_twitter || 'https://www.twitter.com',
    facebook: settings.social_facebook || 'https://www.facebook.com',
    linkedin: settings.social_linkedin || 'https://www.linkedin.com/company/navarro-tax-legal/',
  };

  const contactInfo = {
    phone: settings.contact_phone || '+34934593600',
    phoneDisplay: settings.contact_phone_display || '934593600',
    email: settings.contact_email || 'info@nrro.es',
  };

  // Separate services and areas
  const serviciosItems = services.slice(0, 5);
  const areasItems = services.slice(5, 11);

  return (
    <footer className="bg-black text-white">
      {/* Top Contact Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h3 className="text-2xl md:text-3xl font-display font-normal text-white">
              {t("footer.contact")}
            </h3>
            <div className="flex flex-wrap gap-6">
              <a
                href={`tel:${contactInfo.phone}`}
                onClick={() => trackContactClick('phone', contactInfo.phone, 'footer')}
                className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors group"
              >
                <div className="rounded-full border-2 border-white/20 p-2 group-hover:border-accent transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">{contactInfo.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => trackContactClick('email', contactInfo.email, 'footer')}
                className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors group"
              >
                <div className="rounded-full border-2 border-white/20 p-2 group-hover:border-accent transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium">{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <span className="font-display text-2xl md:text-3xl font-normal text-white tracking-tight">
                global.nrro
              </span>
            </Link>
            <p className="text-base text-white/70 font-light leading-relaxed">
              {t("footer.tagline")}
            </p>
            
            {/* Head Office */}
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-white/50">Head Office:</p>
              <p className="text-sm text-white/80 font-light">
                Calle Ausias March 36 Pr<br />
                08010 Barcelona
              </p>
            </div>

            {/* Other Offices */}
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-white/50">Other Offices:</p>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Madrid · Girona · Lleida · Tarragona · Palma de Mallorca · Zaragoza · Valencia
              </p>
            </div>
            
            {/* Social Media Links - Horizontal */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-2 text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-2 text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-2 text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-2 text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-normal text-white">
              {t("footer.services")}
            </h4>
            <nav className="flex flex-col gap-3">
              {serviciosItems.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug_en || service.slug_es}`}
                  className="text-white/80 hover:text-accent transition-colors text-base font-light"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Areas Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-normal text-white">
              {t("footer.areas")}
            </h4>
            <nav className="flex flex-col gap-3">
              {areasItems.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug_en || service.slug_es}`}
                  className="text-white/80 hover:text-accent transition-colors text-base font-light"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-normal text-white">
              {t("footer.company")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/about"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                {t("footer.about")}
              </Link>
              <Link
                to="/team"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                {t("footer.team")}
              </Link>
              <Link
                to="/blog"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                {t("footer.blog")}
              </Link>
              <Link
                to="/careers"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                {t("footer.careers")}
              </Link>
              <Link
                to="/testimonials"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className="text-white/80 hover:text-accent transition-colors text-base font-light"
              >
                {t("footer.contact")}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Legal & Copyright */}
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/60 font-light">
            © {currentYear} global.nrro. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/legal-notice"
              className="text-sm text-white/60 hover:text-accent transition-colors font-light"
            >
              {t("footer.legal")}
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-white/60 hover:text-accent transition-colors font-light"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/cookie-policy"
              className="text-sm text-white/60 hover:text-accent transition-colors font-light"
            >
              {t("footer.cookies")}
            </Link>
            <Link
              to="/terms"
              className="text-sm text-white/60 hover:text-accent transition-colors font-light"
            >
              {t("footer.terms")}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.Cookiebot) {
                  window.Cookiebot.renew();
                }
              }}
              className="text-sm text-white/60 hover:text-accent transition-colors font-light"
            >
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
