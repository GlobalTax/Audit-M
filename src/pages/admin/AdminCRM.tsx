import { useParams, Navigate } from 'react-router-dom';
import { CRMDashboard } from '@/components/admin/crm/CRMDashboard';
import { CRMPipeline } from '@/components/admin/crm/CRMPipeline';
import { CRMClientList } from '@/components/admin/crm/CRMClientList';
import { CRMContractsView } from '@/components/admin/crm/CRMContractsView';

type CRMSection = 'personas' | 'empresas' | 'pipeline' | 'tratos' | 'analitica';

const AdminCRM = () => {
  const { section } = useParams<{ section: string }>();

  // Default redirect
  if (!section) {
    return <Navigate to="/admin/crm/personas" replace />;
  }

  const renderContent = () => {
    switch (section as CRMSection) {
      case 'personas':
      case 'empresas':
        return <CRMClientList globalSearch="" />;
      case 'pipeline':
        return <CRMPipeline />;
      case 'tratos':
        return <CRMContractsView />;
      case 'analitica':
        return <CRMDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Próximamente
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
};

export default AdminCRM;
