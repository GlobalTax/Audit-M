import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GroupCompaniesDropdown } from './GroupCompaniesDropdown';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useTopBarConfig } from '@/hooks/useTopBarConfig';

export const TopBar = () => {
  const { config, links, companies, currentCompany, isLoading } = useTopBarConfig();

  // No mostrar nada mientras carga para evitar flash
  if (isLoading) return null;

  return (
    <div className="h-10 bg-slate-900 text-white/70 hidden md:block fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Izquierda: Empresas del grupo + enlaces */}
        <div className="flex items-center gap-4">
          <GroupCompaniesDropdown 
            companies={companies} 
            currentCompany={currentCompany} 
          />
          
          {links.length > 0 && (
            <>
              <span className="text-white/30">|</span>
              <nav className="flex items-center gap-4">
                {links.map((link, index) => (
                  <div key={link.id} className="flex items-center gap-4">
                    {link.is_external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                    {index < links.length - 1 && (
                      <span className="text-white/30">|</span>
                    )}
                  </div>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Derecha: Idioma + teléfono */}
        <div className="flex items-center gap-4">
          {config?.show_language_selector && (
            <LanguageSwitcher />
          )}
          
          {config?.phone_number && (
            <>
              {config?.show_language_selector && (
                <span className="text-white/30">|</span>
              )}
              <a
                href={config.phone_link}
                className="flex items-center gap-1.5 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{config.phone_number}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
