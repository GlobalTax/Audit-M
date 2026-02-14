import { useCRMContracts } from '@/hooks/useCRMContracts';
import { useCRMClients } from '@/hooks/useCRMClients';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS, formatCurrency } from '@/lib/crm';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

export const CRMContractsView = () => {
  const { data: contracts = [], isLoading } = useCRMContracts();
  const { data: clients = [] } = useCRMClients();

  const getClientName = (clientId: string) =>
    clients.find((c) => c.id === clientId)?.name || 'Desconocido';

  if (isLoading) return <p className="text-sm text-slate-500 text-center py-8">Cargando contratos...</p>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Contratos</h1>
        <p className="text-sm text-slate-500 mt-0.5">{contracts.length} contrato{contracts.length !== 1 ? 's' : ''} registrados</p>
      </div>
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80">
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Servicio</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Cliente</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Estado</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Importe</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Facturación</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-slate-500 font-medium">Vencimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-slate-400 py-12">Sin contratos registrados</TableCell></TableRow>
            ) : (
              contracts.map((contract) => {
                const daysUntilEnd = contract.end_date ? differenceInDays(new Date(contract.end_date), new Date()) : null;
                const isExpiring = daysUntilEnd !== null && daysUntilEnd <= 30 && daysUntilEnd >= 0;
                return (
                  <TableRow key={contract.id} className="hover:bg-indigo-50/30">
                    <TableCell className="font-medium text-slate-900">{contract.service_name}</TableCell>
                    <TableCell className="text-slate-500">{getClientName(contract.client_id)}</TableCell>
                    <TableCell>
                      <Badge className={CONTRACT_STATUS_COLORS[contract.status as keyof typeof CONTRACT_STATUS_COLORS] || ''} variant="secondary">
                        {CONTRACT_STATUS_LABELS[contract.status as keyof typeof CONTRACT_STATUS_LABELS] || contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{formatCurrency(contract.amount)} €</TableCell>
                    <TableCell className="capitalize text-slate-500">{contract.billing_frequency}</TableCell>
                    <TableCell>
                      {contract.end_date ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{format(new Date(contract.end_date), 'd MMM yyyy', { locale: es })}</span>
                          {isExpiring && <Badge variant="destructive" className="text-[10px]">{daysUntilEnd}d</Badge>}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
