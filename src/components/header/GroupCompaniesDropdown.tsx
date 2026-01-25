import { Building2, ChevronDown, ExternalLink, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GroupCompany } from '@/hooks/useTopBarConfig';

interface GroupCompaniesDropdownProps {
  companies: GroupCompany[];
  currentCompany: GroupCompany | null;
}

export const GroupCompaniesDropdown = ({ 
  companies, 
  currentCompany 
}: GroupCompaniesDropdownProps) => {
  if (companies.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm focus:outline-none">
        <Building2 className="w-4 h-4" />
        <span className="font-medium">{currentCompany?.name || 'Grupo'}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="bg-slate-800 border-slate-700 min-w-[200px] z-[60]"
      >
        {companies.map((company) => (
          <DropdownMenuItem
            key={company.id}
            disabled={company.is_current}
            className={`
              flex items-center justify-between gap-2 cursor-pointer
              ${company.is_current 
                ? 'text-white bg-slate-700/50' 
                : 'text-white/70 hover:text-white hover:bg-slate-700'
              }
            `}
            asChild={!company.is_current}
          >
            {company.is_current ? (
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {company.name}
                </span>
              </div>
            ) : (
              <a 
                href={company.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full"
              >
                <span>{company.name}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
