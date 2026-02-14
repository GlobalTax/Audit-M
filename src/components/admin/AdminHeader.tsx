import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LogOut, Bell, BellOff, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUnreadContactLeads } from '@/hooks/useUnreadContactLeads';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast as sonnerToast } from 'sonner';
import { Fragment, useMemo } from 'react';

const ROUTE_LABELS: Record<string, string> = {
  admin: 'Panel',
  crm: 'CRM',
  blog: 'Blog',
  services: 'Servicios',
  'case-studies': 'Casos de Éxito',
  'contact-leads': 'Leads',
  team: 'Equipo',
  testimonials: 'Testimonios',
  awards: 'Premios',
  settings: 'Ajustes',
  topbar: 'TopBar',
  content: 'Contenido',
  sitemap: 'Sitemap',
  technology: 'Tecnología',
  users: 'Usuarios',
  'proposal-generator': 'Propuestas',
  'deck-studio': 'Deck Studio',
  'corporate-presentation': 'Presentación',
  landings: 'Landings',
  'landing-dashboard': 'Landing Dashboard',
};

export const AdminHeader = () => {
  const { adminUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const unreadLeads = useUnreadContactLeads();
  const {
    isEnabled,
    isSupported,
    permission,
    toggleNotifications,
  } = useBrowserNotifications();

  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => ({
      label: ROUTE_LABELS[segment] || segment,
      path: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1,
    }));
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: 'Sesión cerrada', description: 'Has cerrado sesión correctamente' });
      navigate('/admin/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al cerrar sesión';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    }
  };

  const userInitials = adminUser?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'A';

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.path}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <BreadcrumbPage className="font-medium text-slate-900">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={crumb.path}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full hover:bg-slate-100"
            onClick={() => navigate('/admin/contact-leads')}
          >
            <Bell className="h-4 w-4 text-slate-500" />
            {unreadLeads > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                {unreadLeads > 9 ? '9+' : unreadLeads}
              </span>
            )}
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2.5 h-9 pl-2 pr-3 rounded-full hover:bg-slate-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-primary">{userInitials}</span>
                </div>
                <span className="text-sm text-slate-700 hidden sm:inline">{adminUser?.full_name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="font-medium">{adminUser?.full_name}</p>
                <p className="text-xs text-muted-foreground font-normal">{adminUser?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isSupported && (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {isEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        <Label htmlFor="browser-notifications" className="cursor-pointer text-sm">
                          Notificaciones
                        </Label>
                      </div>
                      <Switch
                        id="browser-notifications"
                        checked={isEnabled}
                        onCheckedChange={async () => {
                          const result = await toggleNotifications();
                          if (result) {
                            sonnerToast.success('Notificaciones activadas');
                          } else if (permission === 'denied') {
                            sonnerToast.error('Permiso denegado', {
                              description: 'Actívalo en la configuración del navegador',
                            });
                          }
                        }}
                      />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
