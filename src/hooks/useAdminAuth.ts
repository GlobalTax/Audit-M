import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useAdminAuth = () => {
  const { adminUser, isAdmin } = useAuth();

  // Fetch user roles from user_roles table
  const { data: userRoles } = useQuery({
    queryKey: ['user-roles', adminUser?.user_id],
    queryFn: async () => {
      if (!adminUser?.user_id) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', adminUser.user_id);
      
      if (error) throw error;
      return data.map(r => r.role);
    },
    enabled: !!adminUser?.user_id,
  });

  const hasRole = (requiredRole: 'admin' | 'editor' | 'viewer' | 'hr_viewer' | 'hr_manager' | 'marketing') => {
    if (!adminUser || !userRoles) return false;
    
    // Admin has all permissions
    if (userRoles.includes('admin')) return true;
    
    // Check if user has the required role
    if (userRoles.includes(requiredRole as any)) return true;
    
    return false;
  };

  const isHRViewer = () => {
    return hasRole('hr_viewer');
  };

  const canViewHR = () => {
    return isAdmin && (hasRole('admin') || hasRole('hr_viewer'));
  };

  const canEdit = () => {
    return isAdmin && hasRole('editor');
  };

  const canPublish = () => {
    return isAdmin && hasRole('admin');
  };

  const canDelete = () => {
    return isAdmin && hasRole('admin');
  };

  const canManageUsers = () => {
    return isAdmin && hasRole('admin');
  };

  const requireAdmin = () => {
    if (!isAdmin) {
      throw new Error('Admin access required');
    }
  };

  const requireSuperAdmin = () => {
    if (!hasRole('admin')) {
      throw new Error('Admin access required');
    }
  };

  return {
    adminUser,
    isAdmin,
    hasRole,
    canEdit,
    canPublish,
    canDelete,
    canManageUsers,
    requireAdmin,
    requireSuperAdmin,
    isHRViewer,
    canViewHR,
  };
};
