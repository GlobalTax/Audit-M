import { useState } from 'react';
import { useCRMContracts, type CRMContract } from '@/hooks/useCRMContracts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { CRMContractForm } from './CRMContractForm';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS, formatCurrency } from '@/lib/crm';

interface Props {
  clientId: string;
}

export const CRMContractList = ({ clientId }: Props) => {
  const { data: contracts = [], isLoading } = useCRMContracts(clientId);
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState<CRMContract | null>(null);

  if (isLoading) return <p className="text-sm text-muted-foreground">Cargando contratos...</p>;

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => { setEditingContract(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Nuevo Contrato
        </Button>
      </div>

      {contracts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">Sin contratos</p>
      ) : (
        contracts.map((contract) => {
          const daysUntilEnd = contract.end_date
            ? differenceInDays(new Date(contract.end_date), new Date())
            : null;
          const isExpiringSoon = daysUntilEnd !== null && daysUntilEnd <= 30 && daysUntilEnd >= 0;

          return (
            <div
              key={contract.id}
              className="p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/30"
              onClick={() => { setEditingContract(contract); setShowForm(true); }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{contract.service_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{contract.billing_frequency}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isExpiringSoon && <Badge variant="destructive" className="text-[10px]">Vence en {daysUntilEnd}d</Badge>}
                  <Badge className={CONTRACT_STATUS_COLORS[contract.status]} variant="secondary">
                    {CONTRACT_STATUS_LABELS[contract.status]}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {contract.start_date && format(new Date(contract.start_date), 'd MMM yyyy', { locale: es })}
                  {contract.end_date && ` → ${format(new Date(contract.end_date), 'd MMM yyyy', { locale: es })}`}
                </span>
                <span className="font-medium text-foreground">{formatCurrency(contract.amount)} €</span>
              </div>
            </div>
          );
        })
      )}

      {showForm && (
        <CRMContractForm
          clientId={clientId}
          open={showForm}
          onClose={() => { setShowForm(false); setEditingContract(null); }}
          contract={editingContract}
        />
      )}
    </div>
  );
};
