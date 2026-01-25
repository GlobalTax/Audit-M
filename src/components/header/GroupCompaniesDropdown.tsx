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
        sideOffset={8}
        className="bg-slate-800 border-slate-700 min-w-[200px] z-[100] shadow-xl"
      >
        {companies.map((company) => (
          company.is_current ? (
            <DropdownMenuItem
              key={company.id}
              disabled
              className="text-white bg-slate-700/50 focus:bg-slate-700/50 focus:text-white cursor-default"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-2" />
              {company.name}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem 
              key={company.id}
              asChild 
              className="text-white/70 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white cursor-pointer"
            >
              <a 
                href={company.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full"
              >
                <span>{company.name}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
