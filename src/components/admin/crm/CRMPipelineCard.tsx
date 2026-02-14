import { type CRMClient } from '@/hooks/useCRMClients';
import { Badge } from '@/components/ui/badge';
import { Building2, Clock } from 'lucide-react';
import { formatCurrency, getDaysInStage, getRiskLevel, RISK_LABELS } from '@/lib/crm';

interface CRMPipelineCardProps {
  client: CRMClient;
  onClick: (client: CRMClient) => void;
}

export const CRMPipelineCard = ({ client, onClick }: CRMPipelineCardProps) => {
  const daysInStage = getDaysInStage(client.updated_at);
  const risk = getRiskLevel(client.estimated_value);
  const riskInfo = RISK_LABELS[risk];

  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', client.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onClick={() => onClick(client)}
      className="p-3 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-all group border-0"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-semibold text-indigo-700">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
            {client.name}
          </p>
          {client.sector && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{client.sector}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-50">
        {(client.estimated_value ?? 0) > 0 ? (
          <Badge variant="secondary" className={`text-[10px] ${riskInfo.color}`}>
            {formatCurrency(client.estimated_value)} €
          </Badge>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock className="h-3 w-3" />
          {daysInStage}d
        </div>
      </div>
    </div>
  );
};
