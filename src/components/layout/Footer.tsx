import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo variant="compact" color="light" className="h-12 mb-4" />
            <p className="text-sm text-primary-foreground/80 max-w-md leading-relaxed mb-6">
              Asesoría fiscal, contable y legal en Barcelona. Transformamos la gestión en 
              impulso para tu negocio con más de 25 años de experiencia.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+34934593600"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>93 459 36 00</span>
              </a>
              <a
                href="mailto:info@nrro.es"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@nrro.es</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Carrer Ausias March número 36<br />08010 Barcelona, España</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-display font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Enlaces
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/#services" 
                  className="text-sm text-primary-foreground/80 hover:text-accent hover:underline transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-primary-foreground/80 hover:text-accent hover:underline transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-sm text-primary-foreground/80 hover:text-accent hover:underline transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-primary-foreground/80 hover:text-accent hover:underline transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-display font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/navarro-tax-legal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Navarro Tax Legal (NRRO). Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Privacidad
              </Link>
              <Link 
                to="/legal" 
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
