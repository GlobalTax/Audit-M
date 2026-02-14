import { useState, useMemo } from 'react';
import { useCRMClients, useUpdateCRMClient, type CRMClient, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { CRMPipelineColumn } from './CRMPipelineColumn';
import { CRMClientDetail } from './CRMClientDetail';
import { PIPELINE_LABELS, PIPELINE_STAGES, formatCurrency } from '@/lib/crm';

export const CRMPipeline = () => {
  const { data: clients = [], isLoading } = useCRMClients();
  const updateClient = useUpdateCRMClient();
  const [selectedClient, setSelectedClient] = useState<CRMClient | null>(null);

  const handleDrop = (clientId: string, newStage: CRMPipelineStage) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client || client.pipeline_stage === newStage) return;
    updateClient.mutate({ id: clientId, pipeline_stage: newStage });
  };

  const totalPipelineValue = useMemo(() => {
    return clients
      .filter((c) => c.pipeline_stage !== 'cerrado_perdido' && c.pipeline_stage !== 'cerrado_ganado')
      .reduce((sum, c) => sum + (c.estimated_value || 0), 0);
  }, [clients]);

  const activeDeals = useMemo(() => {
    return clients.filter((c) => c.pipeline_stage !== 'cerrado_perdido' && c.pipeline_stage !== 'cerrado_ganado').length;
  }, [clients]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-muted-foreground">Cargando pipeline...</div>;
  }

  return (
    <>
      {/* Pipeline summary bar */}
      <div className="flex items-center gap-6 mb-4 px-1">
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{activeDeals}</span> oportunidades abiertas
        </div>
        <div className="text-sm text-slate-500">
          Valor total: <span className="font-semibold text-slate-900">{formatCurrency(totalPipelineValue)} €</span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => (
          <CRMPipelineColumn
            key={stage}
            stage={stage}
            label={PIPELINE_LABELS[stage]}
            clients={clients.filter((c) => c.pipeline_stage === stage)}
            onDrop={handleDrop}
            onClientClick={setSelectedClient}
          />
        ))}
      </div>

      {selectedClient && (
        <CRMClientDetail
          clientId={selectedClient.id}
          open={!!selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </>
  );
};
