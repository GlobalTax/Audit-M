import { type CRMClient } from '@/hooks/useCRMClients';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface CRMPipelineCardProps {
  client: CRMClient;
  onClick: (client: CRMClient) => void;
}

export const CRMPipelineCard = ({ client, onClick }: CRMPipelineCardProps) => {
  const daysInStage = differenceInDays(new Date(), new Date(client.updated_at));

  return (
    <Card
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', client.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onClick={() => onClick(client)}
      className="p-3 cursor-pointer hover:shadow-md transition-shadow border border-border"
    >
      <div className="space-y-2">
        <p className="font-medium text-sm truncate">{client.name}</p>
        {client.sector && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span className="truncate">{client.sector}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {client.estimated_value > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <DollarSign className="h-3 w-3" />
              {client.estimated_value.toLocaleString('es-ES')} €
            </div>
          )}
          <Badge variant="outline" className="text-[10px]">
            {daysInStage}d
          </Badge>
        </div>
      </div>
    </Card>
  );
};
