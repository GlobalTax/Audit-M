import { type CRMClient, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { CRMPipelineCard } from './CRMPipelineCard';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface CRMPipelineColumnProps {
  stage: CRMPipelineStage;
  label: string;
  clients: CRMClient[];
  onDrop: (clientId: string, stage: CRMPipelineStage) => void;
  onClientClick: (client: CRMClient) => void;
}

export const CRMPipelineColumn = ({ stage, label, clients, onDrop, onClientClick }: CRMPipelineColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const totalValue = clients.reduce((sum, c) => sum + (c.estimated_value || 0), 0);

  return (
    <div
      className={`flex flex-col min-w-[220px] w-[220px] rounded-lg transition-colors ${
        isDragOver ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted/30'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const clientId = e.dataTransfer.getData('text/plain');
        if (clientId) onDrop(clientId, stage);
      }}
    >
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{label}</h3>
          <Badge variant="secondary" className="text-xs">{clients.length}</Badge>
        </div>
        {totalValue > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {totalValue.toLocaleString('es-ES')} €
          </p>
        )}
      </div>
      <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
        {clients.map((client) => (
          <CRMPipelineCard key={client.id} client={client} onClick={onClientClick} />
        ))}
        {clients.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">Sin clientes</p>
        )}
      </div>
    </div>
  );
};
