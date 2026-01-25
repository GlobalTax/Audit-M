import { ChevronDown, Star, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TopBarCompany } from '../types';

interface GroupDropdownProps {
  companies: TopBarCompany[];
  textColor?: string;
  hoverColor?: string;
}

export function GroupDropdown({ companies, textColor, hoverColor }: GroupDropdownProps) {
  const currentCompany = companies.find(c => c.isCurrent);
  const otherCompanies = companies.filter(c => !c.isCurrent);

  if (!currentCompany && otherCompanies.length === 0) {
    return null;
  }

  const triggerStyle = {
    color: textColor,
    '--hover-color': hoverColor,
  } as React.CSSProperties;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="flex items-center gap-1.5 text-sm font-medium transition-colors outline-none"
        style={triggerStyle}
        onMouseEnter={(e) => {
          if (hoverColor) e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          if (textColor) e.currentTarget.style.color = textColor;
        }}
      >
        {currentCompany ? (
          <>
            {currentCompany.logoUrl ? (
              <img 
                src={currentCompany.logoUrl} 
                alt={currentCompany.name}
                className="h-4 w-auto"
              />
            ) : (
              <span>{currentCompany.name}</span>
            )}
          </>
        ) : (
          <span>Group Companies</span>
        )}
        <ChevronDown className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        className="bg-slate-800 border-slate-700 min-w-[200px] z-[70]"
      >
        {/* Current company (disabled) */}
        {currentCompany && (
          <DropdownMenuItem 
            disabled 
            className="text-white/60 cursor-default flex items-center gap-2"
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{currentCompany.name}</span>
            <span className="text-xs text-white/40 ml-auto">(current)</span>
          </DropdownMenuItem>
        )}

        {/* Other companies as external links */}
        {otherCompanies.map((company) => (
          <DropdownMenuItem 
            key={company.id} 
            asChild
            className="text-white/80 hover:text-white hover:bg-slate-700 cursor-pointer"
          >
            <a 
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full"
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
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
