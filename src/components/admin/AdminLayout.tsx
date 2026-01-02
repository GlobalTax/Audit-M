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
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 bg-slate-100 p-6">
          {showBanner && (
            <Alert className="mb-4 border-amber-500/30 bg-amber-50">
              <Bell className="h-4 w-4 text-amber-600" />
              <AlertTitle className="flex items-center justify-between text-amber-900">
                <span>Enable push notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0 hover:bg-amber-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription className="flex items-center justify-between text-amber-800">
                <span>
                  Receive alerts for new contacts even when the panel is closed
                </span>
                <Button 
                  onClick={handleEnable} 
                  size="sm" 
                  className="ml-4 bg-amber-500 hover:bg-amber-600 text-slate-950"
                >
                  Enable
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
