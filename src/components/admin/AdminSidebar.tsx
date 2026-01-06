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
  Globe,
  Calculator,
  FileDown,
  MessageSquareQuote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/ui/logo';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/settings', icon: Settings, label: 'Site Settings' },
  { path: '/admin/content', icon: FileText, label: 'Content Management' },
  { path: '/admin/blog', icon: Newspaper, label: 'Blog' },
  { path: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
  { path: '/admin/contact-leads', icon: Users, label: 'Contact Leads' },
  { path: '/admin/playbook-leads', icon: FileDown, label: 'Resource Leads' },
  { path: '/admin/calculator-settings', icon: Calculator, label: 'Calculator' },
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
      {/* Header with International Branding */}
      <div className="p-6 border-b border-amber-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Globe className="h-6 w-6 text-amber-500" />
          </div>
          <Logo brand="international" variant="compact" color="light" asLink={false} className="h-8" />
        </div>
        <p className="text-[10px] text-amber-500/80 tracking-[0.2em] uppercase font-medium">
          Admin Portal
        </p>
        {adminUser && (
          <div className="mt-3">
            <Badge 
              variant="outline" 
              className="text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10"
            >
              {adminUser.role.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      {/* Decorative gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

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
            {...((item as any).external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start gap-2 transition-all ${
                isActive(item.path)
                  ? 'bg-slate-800 text-white border-l-2 border-amber-500 rounded-l-none'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive(item.path) ? 'text-amber-500' : ''}`} />
              <span className="flex-1 text-left text-sm">{item.label}</span>
              {item.path === '/admin/contact-leads' && unreadLeads > 0 && (
                <Badge 
                  className="h-5 min-w-[20px] rounded-full px-1.5 text-xs bg-amber-500 text-slate-950 hover:bg-amber-400"
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
                    ? 'bg-slate-800 text-white border-l-2 border-amber-500 rounded-l-none'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <UserCog className={`mr-3 h-4 w-4 ${isActive('/admin/users') ? 'text-amber-500' : ''}`} />
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
            <p className="truncate text-slate-300 font-medium">{adminUser.full_name}</p>
            <p className="text-xs truncate text-slate-500">{adminUser.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
