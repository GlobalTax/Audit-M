import { useState, useCallback } from 'react';
import { CRMSidebar, type CRMView } from '@/components/admin/crm/CRMSidebar';
import { CRMDashboard } from '@/components/admin/crm/CRMDashboard';
import { CRMPipeline } from '@/components/admin/crm/CRMPipeline';
import { CRMClientList } from '@/components/admin/crm/CRMClientList';
import { CRMContractsView } from '@/components/admin/crm/CRMContractsView';
import { useCRMStats } from '@/hooks/useCRMStats';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const AdminCRM = () => {
  const [activeView, setActiveView] = useState<CRMView>('personas');
  const [globalSearch, setGlobalSearch] = useState('');
  const { data: crmStats } = useCRMStats();

  const handleViewChange = useCallback((view: CRMView) => {
    setActiveView(view);
    setGlobalSearch('');
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'personas':
      case 'empresas':
        return <CRMClientList globalSearch={globalSearch} />;
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
    <div className="-m-6 lg:-m-8 h-[calc(100vh-64px)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* CRM Sidebar */}
        <ResizablePanel defaultSize={14} minSize={10} maxSize={20} className="min-w-[180px]">
          <CRMSidebar
            activeView={activeView}
            onViewChange={handleViewChange}
            counts={{
              personas: crmStats?.totalClients,
              tratos: crmStats?.activeContracts,
            }}
            searchValue={globalSearch}
            onSearchChange={setGlobalSearch}
          />
        </ResizablePanel>

        <ResizableHandle />

        {/* Main content */}
        <ResizablePanel defaultSize={86}>
          <div className="h-full overflow-auto bg-slate-50 p-6">
            {renderContent()}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AdminCRM;
