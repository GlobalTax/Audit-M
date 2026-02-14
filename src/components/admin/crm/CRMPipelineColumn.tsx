import { type CRMClient, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { CRMPipelineCard } from './CRMPipelineCard';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import { formatCurrency, PIPELINE_STAGE_COLORS } from '@/lib/crm';

interface CRMPipelineColumnProps {
  stage: CRMPipelineStage;
  label: string;
  clients: CRMClient[];
  onDrop: (clientId: string, stage: CRMPipelineStage) => void;
  onClientClick: (client: CRMClient) => void;
}

export const CRMPipelineColumn = ({ stage, label, clients, onDrop, onClientClick }: CRMPipelineColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const stageColors = PIPELINE_STAGE_COLORS[stage];

  const totalValue = useMemo(
    () => clients.reduce((sum, c) => sum + (c.estimated_value || 0), 0),
    [clients]
  );

  return (
    <div
      className={`flex flex-col min-w-[240px] w-[240px] rounded-xl transition-all duration-200 ${
        isDragOver ? 'ring-2 ring-primary/30 bg-primary/5' : 'bg-white border border-slate-200/60'
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
      {/* Column header with color accent */}
      <div className="p-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stageColors.accent }} />
            <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
          </div>
          <Badge variant="secondary" className={`text-[10px] ${stageColors.bg} ${stageColors.text}`}>
            {clients.length}
          </Badge>
        </div>
        {totalValue > 0 && (
          <p className="text-xs text-slate-400 ml-4">
            {formatCurrency(totalValue)} €
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
        {clients.map((client) => (
          <CRMPipelineCard key={client.id} client={client} onClick={onClientClick} />
        ))}
        {clients.length === 0 && (
          <div className="flex items-center justify-center py-8 text-xs text-slate-400">
            Arrastra clientes aquí
          </div>
        )}
      </div>
    </div>
  );
};
