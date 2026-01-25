import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Star, ExternalLink } from 'lucide-react';
import { cn } from '../utils/cn';
import { TopBarCompany } from '../types';

interface GroupDropdownProps {
  companies: TopBarCompany[];
  textColor: string;
  hoverColor: string;
}

/**
 * GroupDropdown - fully independent dropdown (no Radix dependency)
 */
export function GroupDropdown({ companies, textColor, hoverColor }: GroupDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Find current company
  const currentCompany = companies.find(c => c.isCurrent);
  const otherCompanies = companies.filter(c => !c.isCurrent);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Don't render if no companies
  if (companies.length === 0) return null;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = hoverColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = textColor;
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-1 -mx-1'
        )}
        style={{ color: textColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentCompany?.logoUrl ? (
          <img 
            src={currentCompany.logoUrl} 
            alt={currentCompany.name} 
            className="h-4 w-auto"
          />
        ) : (
          <span>{currentCompany?.name || 'Select Company'}</span>
        )}
        <ChevronDown className={cn(
          'w-3.5 h-3.5 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={cn(
            'absolute top-full left-0 mt-2 min-w-[200px] rounded-md shadow-lg z-[70]',
            'bg-slate-800 border border-slate-700',
            'py-1'
          )}
          role="menu"
        >
          {/* Current company (disabled) */}
          {currentCompany && (
            <div 
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 cursor-default"
              role="menuitem"
              aria-disabled="true"
            >
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span>{currentCompany.name}</span>
              <span className="ml-auto text-xs">(current)</span>
            </div>
          )}

          {/* Separator */}
          {currentCompany && otherCompanies.length > 0 && (
            <div className="h-px my-1 bg-slate-700" />
          )}

          {/* Other companies */}
          {otherCompanies.map((company) => (
            <a
              key={company.id}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer',
                'text-white/80 hover:bg-slate-700 hover:text-white',
                'transition-colors'
              )}
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="h-4 w-auto"
                />
              ) : (
                <span>{company.name}</span>
              )}
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            </a>
          ))}

          {/* Empty state */}
          {companies.length === 0 && (
            <div className="px-3 py-2 text-sm text-white/50">
              No companies configured
            </div>
          )}
        </div>
      )}
    </div>
  );
}
