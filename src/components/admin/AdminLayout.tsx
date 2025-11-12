import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useContactLeadsRealtime } from '@/hooks/useContactLeadsRealtime';

export const AdminLayout = () => {
  // Activar suscripción a notificaciones en tiempo real
  useContactLeadsRealtime();
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
