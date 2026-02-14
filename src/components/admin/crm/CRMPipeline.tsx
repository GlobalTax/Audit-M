import { useState } from 'react';
import { useCRMClients, useUpdateCRMClient, type CRMClient, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { CRMPipelineColumn } from './CRMPipelineColumn';
import { CRMClientDetail } from './CRMClientDetail';

const PIPELINE_STAGES: { stage: CRMPipelineStage; label: string }[] = [
  { stage: 'nuevo', label: 'Nuevo' },
  { stage: 'contactado', label: 'Contactado' },
  { stage: 'propuesta', label: 'Propuesta' },
  { stage: 'negociacion', label: 'Negociación' },
  { stage: 'cerrado_ganado', label: 'Cerrado ✓' },
  { stage: 'cerrado_perdido', label: 'Perdido ✗' },
];

export const CRMPipeline = () => {
  const { data: clients = [], isLoading } = useCRMClients();
  const updateClient = useUpdateCRMClient();
  const [selectedClient, setSelectedClient] = useState<CRMClient | null>(null);

  const handleDrop = (clientId: string, newStage: CRMPipelineStage) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client || client.pipeline_stage === newStage) return;
    updateClient.mutate({ id: clientId, pipeline_stage: newStage });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-muted-foreground">Cargando pipeline...</div>;
  }

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map(({ stage, label }) => (
          <CRMPipelineColumn
            key={stage}
            stage={stage}
            label={label}
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
