import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useContactLeadsRealtime } from '@/hooks/useContactLeadsRealtime';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

export const AdminLayout = () => {
  // Activate real-time notifications subscription
  useContactLeadsRealtime();
  
  const { permission, isSupported, requestPermission } = useBrowserNotifications();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner only if:
    // - Notifications are supported
    // - Permissions haven't been requested yet (default)
    // - Banner hasn't been dismissed before
    const bannerDismissed = localStorage.getItem('notification-banner-dismissed');
    
    if (isSupported && permission === 'default' && !bannerDismissed) {
      setShowBanner(true);
    }
  }, [isSupported, permission]);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notification-banner-dismissed', 'true');
  };

  const handleEnable = async () => {
    const granted = await requestPermission();
    if (granted) {
      setShowBanner(false);
    }
  };
  
  return (
    <div className="flex min-h-screen admin-international">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 bg-[#F8F9FC] p-6 lg:p-8">
          {showBanner && (
            <Alert className="mb-6 border-indigo-200 bg-indigo-50 rounded-xl">
              <Bell className="h-4 w-4 text-indigo-600" />
              <AlertTitle className="flex items-center justify-between text-slate-900">
                <span>Activar notificaciones push</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription className="flex items-center justify-between text-indigo-700">
                <span>
                  Recibe alertas de nuevos contactos aunque tengas el panel cerrado
                </span>
                <Button
                  onClick={handleEnable}
                  size="sm"
                  className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Activar
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
