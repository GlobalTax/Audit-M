import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useUnreadContactLeads } from '@/hooks/useUnreadContactLeads';
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
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

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
        } bg-[#1B1F3D] text-white min-h-screen flex flex-col transition-all duration-300 relative`}
      >
        {/* Brand header */}
        <div className={`p-4 ${collapsed ? 'px-3' : 'px-5'} border-b border-white/[0.06]`}>
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-4 w-4 text-indigo-400" />
              </div>
              {!collapsed && (
                <div>
                  <span className="font-display text-lg font-semibold text-white tracking-tight">
                    audit
                  </span>
                  <span className="text-indigo-400 text-lg">.</span>
                </div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 text-[#6B7194] hover:text-white hover:bg-white/[0.06] transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
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
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#6B7194] text-sm cursor-default">
                  <Search className="h-3.5 w-3.5" />
                  <span className="flex-1">Buscar...</span>
                  <kbd className="text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded font-mono text-[#6B7194]">⌘K</kbd>
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
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B7194] group-hover:text-[#8B92B0] transition-colors">
                        {section.title}
                      </span>
                      {isSectionCollapsed ? (
                        <ChevronRightIcon className="h-3 w-3 text-[#6B7194]" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-[#6B7194]" />
                      )}
                    </button>
                  )}
                  {collapsed && <div className="border-t border-white/[0.06] mb-2 mx-1" />}
                  {!isSectionCollapsed && (
                    <div className="space-y-0.5">
                      {section.items.map((item) => (
                        <SidebarItem
                          key={item.path}
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
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B7194]">
                      Administración
                    </span>
                  </div>
                )}
                {collapsed && <div className="border-t border-white/[0.06] mb-2 mx-1" />}
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
        <div className={`border-t border-white/[0.06] ${collapsed ? 'p-2' : 'p-3 px-4'}`}>
          {adminUser && (
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-indigo-400">{userInitials}</span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">
                    {adminUser.full_name}
                  </p>
                  <p className="text-[11px] text-[#6B7194] truncate">{adminUser.email}</p>
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
            ? 'bg-indigo-500/15 text-white hover:bg-indigo-500/20 border-l-2 border-indigo-400'
            : variant === 'muted'
            ? 'text-[#6B7194] hover:text-[#B0B5CC] hover:bg-white/[0.04]'
            : 'text-[#8B92B0] hover:text-white hover:bg-white/[0.06]'
        }`}
      >
        <div className="relative">
          <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 text-left text-[13px]">{label}</span>
            {badge !== undefined && badge > 0 && (
              <Badge className="h-5 min-w-[20px] rounded-full px-1.5 text-[10px] bg-indigo-500 text-white border-0 hover:bg-indigo-500">
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
            <Badge className="h-4 min-w-[16px] rounded-full px-1 text-[10px] bg-indigo-500 text-white border-0">
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
