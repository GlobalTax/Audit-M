import { useParams, Navigate } from 'react-router-dom';
import { CRMDashboard } from '@/components/admin/crm/CRMDashboard';
import { CRMPipeline } from '@/components/admin/crm/CRMPipeline';
import { CRMClientList } from '@/components/admin/crm/CRMClientList';
import { CRMContractsView } from '@/components/admin/crm/CRMContractsView';
import { CRMBillingDashboard } from '@/components/admin/crm/CRMBillingDashboard';
import { lazy, Suspense } from 'react';

const ProposalGenerator = lazy(() => import('@/pages/admin/AdminProposalGenerator'));

type CRMSection = 'personas' | 'empresas' | 'pipeline' | 'tratos' | 'analitica' | 'facturacion' | 'propuestas';

const AdminCRM = () => {
  const { section } = useParams<{ section: string }>();

  if (!section) {
    return <Navigate to="/admin/crm/personas" replace />;
  }

  const renderContent = () => {
    switch (section as CRMSection) {
      case 'personas':
        return <CRMClientList globalSearch="" clientType="persona" />;
      case 'empresas':
        return <CRMClientList globalSearch="" clientType="empresa" />;
      case 'pipeline':
        return <CRMPipeline />;
      case 'tratos':
        return <CRMContractsView />;
      case 'analitica':
        return <CRMDashboard />;
      case 'facturacion':
        return <CRMBillingDashboard />;
      case 'propuestas':
        return (
          <Suspense fallback={<div className="p-6 text-sm text-slate-400">Cargando...</div>}>
            <ProposalGenerator />
          </Suspense>
        );
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
