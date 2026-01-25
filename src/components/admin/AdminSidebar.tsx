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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/settings', icon: Settings, label: 'Site Settings' },
  { path: '/admin/topbar', icon: PanelTop, label: 'TopBar' },
  { path: '/admin/content', icon: FileText, label: 'Content Management' },
  { path: '/admin/services', icon: ClipboardList, label: 'Services' },
  { path: '/admin/blog', icon: Newspaper, label: 'Blog' },
  { path: '/admin/case-studies', icon: Briefcase, label: 'Case Studies' },
  { path: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
  { path: '/admin/awards', icon: Trophy, label: 'Awards' },
  { path: '/admin/team', icon: UsersRound, label: 'Team' },
  { path: '/admin/contact-leads', icon: Users, label: 'Contact Leads' },
  { path: '/admin/proposal-generator', icon: FileOutput, label: 'Proposal Generator' },
  { path: '/admin/corporate-presentation', icon: Presentation, label: 'Corporate Presentation' },
  { path: '/admin/deck-studio', icon: Presentation, label: 'Deck Studio' },
  { path: '/admin/sitemap', icon: Map, label: 'Sitemap' },
  { path: '/admin/technology', icon: Monitor, label: 'Technology' },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { adminUser, canManageUsers } = useAdminAuth();
  const unreadLeads = useUnreadContactLeads();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-slate-950 text-white min-h-screen flex flex-col">
      {/* Header with Audit Branding */}
      <div className="p-6 border-b border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ClipboardList className="h-6 w-6 text-primary" />
          </div>
          <div>
            <span className="font-display text-xl font-normal text-white lowercase">audit</span>
          </div>
        </div>
        <p className="text-[10px] text-primary/80 tracking-[0.2em] uppercase font-normal">
          Admin Portal
        </p>
        {adminUser && (
          <div className="mt-3">
            <Badge 
              variant="outline" 
              className="text-[10px] border-primary/30 text-primary bg-primary/10"
            >
              {adminUser.role.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      {/* Decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link to="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Home className="mr-3 h-4 w-4" />
            Back to Site
          </Button>
        </Link>

        <Separator className="bg-slate-800 my-3" />

        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start gap-2 transition-all ${
                isActive(item.path)
                  ? 'bg-slate-800 text-white border-l-2 border-primary rounded-l-none'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive(item.path) ? 'text-primary' : ''}`} />
              <span className="flex-1 text-left text-sm">{item.label}</span>
              {item.path === '/admin/contact-leads' && unreadLeads > 0 && (
                <Badge 
                  className="h-5 min-w-[20px] rounded-full px-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {unreadLeads > 99 ? '99+' : unreadLeads}
                </Badge>
              )}
            </Button>
          </Link>
        ))}

        {canManageUsers() && (
          <>
            <Separator className="bg-slate-800 my-3" />
            <Link to="/admin/users">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive('/admin/users')
                    ? 'bg-slate-800 text-white border-l-2 border-primary rounded-l-none'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <UserCog className={`mr-3 h-4 w-4 ${isActive('/admin/users') ? 'text-primary' : ''}`} />
                Admin Users
              </Button>
            </Link>
          </>
        )}
      </nav>

      {/* User info footer */}
      <div className="p-4 border-t border-slate-800">
        {adminUser && (
          <div className="text-sm">
            <p className="truncate text-slate-300 font-normal">{adminUser.full_name}</p>
            <p className="text-xs truncate text-slate-500">{adminUser.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
};