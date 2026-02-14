import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Search,
  Users,
  Building2,
  Kanban,
  FileText,
  BarChart3,
  Mail,
  Phone,
  CalendarDays,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export type CRMView = 'personas' | 'empresas' | 'pipeline' | 'tratos' | 'analitica' | 'emails' | 'llamadas' | 'reuniones';

interface CRMSidebarProps {
  activeView: CRMView;
  onViewChange: (view: CRMView) => void;
  counts?: {
    personas?: number;
    tratos?: number;
  };
  searchValue: string;
  onSearchChange: (value: string) => void;
}

interface SidebarSection {
  label: string;
  items: {
    id: CRMView;
    label: string;
    icon: React.ElementType;
    count?: number;
    disabled?: boolean;
  }[];
}

export const CRMSidebar = ({
  activeView,
  onViewChange,
  counts,
  searchValue,
  onSearchChange,
}: CRMSidebarProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    prospectar: true,
    comprometer: false,
    tratos: true,
    herramientas: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections: (SidebarSection & { key: string })[] = [
    {
      key: 'prospectar',
      label: 'PROSPECTAR',
      items: [
        { id: 'personas', label: 'Personas', icon: Users, count: counts?.personas },
        { id: 'empresas', label: 'Empresas', icon: Building2 },
      ],
    },
    {
      key: 'comprometer',
      label: 'COMPROMETER',
      items: [
        { id: 'emails', label: 'Emails', icon: Mail, disabled: true },
        { id: 'llamadas', label: 'Llamadas', icon: Phone, disabled: true },
        { id: 'reuniones', label: 'Reuniones', icon: CalendarDays, disabled: true },
      ],
    },
    {
      key: 'tratos',
      label: 'GANAR TRATOS',
      items: [
        { id: 'pipeline', label: 'Pipeline', icon: Kanban },
        { id: 'tratos', label: 'Contratos', icon: FileText, count: counts?.tratos },
      ],
    },
    {
      key: 'herramientas',
      label: 'HERRAMIENTAS',
      items: [
        { id: 'analitica', label: 'Analítica', icon: BarChart3 },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-slate-700 border-r border-slate-200 w-full">
      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-xs bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-blue-500/40"
          />
        </div>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {sections.map((section) => (
          <div key={section.key} className="mb-1">
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-mono font-light uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span>{section.label}</span>
              {openSections[section.key] ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>

            {openSections[section.key] && (
              <div className="space-y-0.5 mt-0.5">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => !item.disabled && onViewChange(item.id)}
                    disabled={item.disabled}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-1.5 rounded-md text-sm transition-colors',
                      activeView === item.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : item.disabled
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>
                    {item.count !== undefined && (
                      <span className="text-[10px] font-mono text-slate-400">{item.count}</span>
                    )}
                    {item.disabled && (
                      <span className="text-[9px] font-mono uppercase text-slate-400">Pronto</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
