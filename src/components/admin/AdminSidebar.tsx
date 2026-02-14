import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useUnreadContactLeads } from '@/hooks/useUnreadContactLeads';
import { useCRMStats } from '@/hooks/useCRMStats';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  UserCog,
  Home,
  Settings,
  FileText,
  Monitor,
  MessageSquareQuote,
  Trophy,
  Briefcase,
  Map,
  FileOutput,
  Presentation,
  ClipboardList,
  UsersRound,
  PanelTop,
  ChevronLeft,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Search,
  Building2,
  Kanban,
  BarChart3,
  Mail,
  Phone,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

const navSections: NavSection[] = [
  {
    title: 'Contenido',
    items: [
      { path: '/admin/blog', icon: Newspaper, label: 'Blog' },
      { path: '/admin/services', icon: ClipboardList, label: 'Servicios' },
      { path: '/admin/case-studies', icon: Briefcase, label: 'Casos de Éxito' },
      { path: '/admin/content', icon: FileText, label: 'Contenido Web' },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { path: '/admin/crm', icon: Briefcase, label: 'CRM' },
      { path: '/admin/contact-leads', icon: Users, label: 'Leads' },
      { path: '/admin/team', icon: UsersRound, label: 'Equipo' },
    ],
  },
  {
    title: 'Comunicación',
    items: [
      { path: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonios' },
      { path: '/admin/awards', icon: Trophy, label: 'Premios' },
    ],
  },
  {
    title: 'Herramientas',
    items: [
      { path: '/admin/proposal-generator', icon: FileOutput, label: 'Propuestas' },
      { path: '/admin/deck-studio', icon: Presentation, label: 'Deck Studio' },
      { path: '/admin/corporate-presentation', icon: Presentation, label: 'Presentación Corp.' },
    ],
  },
  {
    title: 'Configuración',
    items: [
      { path: '/admin/settings', icon: Settings, label: 'Ajustes' },
      { path: '/admin/topbar', icon: PanelTop, label: 'TopBar' },
      { path: '/admin/sitemap', icon: Map, label: 'Sitemap' },
      { path: '/admin/technology', icon: Monitor, label: 'Tecnología' },
    ],
  },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { adminUser, canManageUsers } = useAdminAuth();
  const unreadLeads = useUnreadContactLeads();
  const { data: crmStats } = useCRMStats();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const isCRMRoute = location.pathname.startsWith('/admin/crm');

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const userInitials = adminUser?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'A';

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`${
         collapsed ? 'w-[68px]' : 'w-64'
        } bg-white text-slate-700 border-r border-slate-200 min-h-screen flex flex-col transition-all duration-300 relative`}
      >
        {/* Brand header */}
        <div className={`p-4 ${collapsed ? 'px-3' : 'px-5'} border-b border-slate-200`}>
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </div>
              {!collapsed && (
                <div>
                  <span className="font-display text-lg font-semibold text-slate-900 tracking-tight">
                    audit
                  </span>
                  <span className="text-blue-600 text-lg">.</span>
                </div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <nav className={`py-3 ${collapsed ? 'px-2' : 'px-3'} space-y-1`}>
            {/* Back to site */}
            <SidebarItem
              path="/"
              icon={Home}
              label="Ir al sitio"
              isActive={false}
              collapsed={collapsed}
              variant="muted"
            />

            {/* Dashboard */}
            <SidebarItem
              path="/admin"
              icon={LayoutDashboard}
              label="Dashboard"
              isActive={isActive('/admin') && location.pathname === '/admin'}
              collapsed={collapsed}
            />

            {/* Search shortcut */}
            {!collapsed && (
              <div className="pt-1 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm cursor-default">
                  <Search className="h-3.5 w-3.5" />
                  <span className="flex-1">Buscar...</span>
                  <kbd className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-400">⌘K</kbd>
                </div>
              </div>
            )}

            {/* Nav sections */}
            {navSections.map((section) => {
              const isSectionCollapsed = collapsedSections[section.title];
              return (
                <div key={section.title} className="pt-3 first:pt-1">
                  {!collapsed && (
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="flex items-center justify-between w-full px-3 mb-1.5 group"
                    >
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-600 transition-colors">
                        {section.title}
                      </span>
                      {isSectionCollapsed ? (
                        <ChevronRightIcon className="h-3 w-3 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-slate-400" />
                      )}
                    </button>
                  )}
                  {collapsed && <div className="border-t border-slate-200 mb-2 mx-1" />}
                  {!isSectionCollapsed && (
                    <div className="space-y-0.5">
                      {section.items.map((item) => (
                        <div key={item.path}>
                          <SidebarItem
                            path={item.path}
                            icon={item.icon}
                            label={item.label}
                            isActive={isActive(item.path)}
                            collapsed={collapsed}
                            badge={
                              item.path === '/admin/contact-leads' && unreadLeads > 0
                                ? unreadLeads
                                : undefined
                            }
                          />
                          {/* CRM sub-items */}
                          {item.path === '/admin/crm' && isCRMRoute && !collapsed && (
                            <CRMSubNav currentPath={location.pathname} crmStats={crmStats} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Super admin section */}
            {canManageUsers() && (
              <div className="pt-3">
                {!collapsed && (
                  <div className="px-3 mb-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
                      Administración
                    </span>
                  </div>
                )}
                {collapsed && <div className="border-t border-slate-200 mb-2 mx-1" />}
                <SidebarItem
                  path="/admin/users"
                  icon={UserCog}
                  label="Usuarios Admin"
                  isActive={isActive('/admin/users')}
                  collapsed={collapsed}
                />
              </div>
            )}
          </nav>
        </ScrollArea>

        {/* User footer */}
        <div className={`border-t border-slate-200 ${collapsed ? 'p-2' : 'p-3 px-4'}`}>
          {adminUser && (
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-blue-600">{userInitials}</span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {adminUser.full_name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{adminUser.email}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

function SidebarItem({
  path,
  icon: Icon,
  label,
  isActive,
  collapsed,
  badge,
  variant,
}: {
  path: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  badge?: number;
  variant?: 'muted';
}) {
  const content = (
    <Link to={path}>
      <Button
        variant="ghost"
        className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'} gap-2.5 h-9 transition-all duration-150 ${
          isActive
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-50 border-l-2 border-blue-500'
            : variant === 'muted'
            ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <div className="relative">
          <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 text-left text-[13px]">{label}</span>
            {badge !== undefined && badge > 0 && (
              <Badge className="h-5 min-w-[20px] rounded-full px-1.5 text-[10px] bg-blue-500 text-white border-0 hover:bg-blue-500">
                {badge > 99 ? '99+' : badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {label}
          {badge !== undefined && badge > 0 && (
            <Badge className="h-4 min-w-[16px] rounded-full px-1 text-[10px] bg-blue-500 text-white border-0">
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

interface CRMSubNavProps {
  currentPath: string;
  crmStats?: { totalClients: number; activeContracts: number } | null;
}

const crmSubSections = [
  {
    label: 'PROSPECTAR',
    items: [
      { path: '/admin/crm/personas', label: 'Personas', icon: Users },
      { path: '/admin/crm/empresas', label: 'Empresas', icon: Building2 },
    ],
  },
  {
    label: 'GANAR TRATOS',
    items: [
      { path: '/admin/crm/pipeline', label: 'Pipeline', icon: Kanban },
      { path: '/admin/crm/tratos', label: 'Contratos', icon: FileText },
    ],
  },
  {
    label: 'HERRAMIENTAS',
    items: [
      { path: '/admin/crm/analitica', label: 'Analítica', icon: BarChart3 },
    ],
  },
];

function CRMSubNav({ currentPath, crmStats }: CRMSubNavProps) {
  return (
    <div className="ml-4 mt-0.5 mb-1 border-l border-slate-200 pl-2 space-y-2">
      {crmSubSections.map((section) => (
        <div key={section.label}>
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400 px-2">
            {section.label}
          </span>
          <div className="mt-0.5 space-y-0.5">
            {section.items.map((item) => {
              const active = currentPath === item.path;
              const count =
                item.path === '/admin/crm/personas' ? crmStats?.totalClients :
                item.path === '/admin/crm/tratos' ? crmStats?.activeContracts :
                undefined;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-2 py-1 rounded-md text-[12px] transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </span>
                  {count !== undefined && (
                    <span className="text-[10px] font-mono text-slate-400">{count}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
