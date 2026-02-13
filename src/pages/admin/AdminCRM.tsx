import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CRMDashboard } from '@/components/admin/crm/CRMDashboard';
import { CRMPipeline } from '@/components/admin/crm/CRMPipeline';
import { CRMClientList } from '@/components/admin/crm/CRMClientList';
import { BarChart3, Kanban, Users, FileText } from 'lucide-react';
import { useCRMContracts } from '@/hooks/useCRMContracts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCRMClients } from '@/hooks/useCRMClients';

const CONTRACT_STATUS_COLORS: Record<string, string> = {
  activo: 'bg-green-100 text-green-800',
  pausado: 'bg-yellow-100 text-yellow-800',
  finalizado: 'bg-gray-100 text-gray-800',
  renovacion_pendiente: 'bg-orange-100 text-orange-800',
};

const ContractsOverview = () => {
  const { data: contracts = [], isLoading } = useCRMContracts();
  const { data: clients = [] } = useCRMClients();

  const getClientName = (clientId: string) => {
    return clients.find((c) => c.id === clientId)?.name || 'Desconocido';
  };

  if (isLoading) return <p className="text-sm text-muted-foreground text-center py-8">Cargando contratos...</p>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Importe</TableHead>
            <TableHead>Facturación</TableHead>
            <TableHead>Vencimiento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Sin contratos</TableCell></TableRow>
          ) : (
            contracts.map((contract) => {
              const daysUntilEnd = contract.end_date ? differenceInDays(new Date(contract.end_date), new Date()) : null;
              const isExpiring = daysUntilEnd !== null && daysUntilEnd <= 30 && daysUntilEnd > 0;
              return (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.service_name}</TableCell>
                  <TableCell className="text-muted-foreground">{getClientName(contract.client_id)}</TableCell>
                  <TableCell>
                    <Badge className={CONTRACT_STATUS_COLORS[contract.status] || ''} variant="secondary">
                      {contract.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.amount?.toLocaleString('es-ES')} €</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{contract.billing_frequency}</TableCell>
                  <TableCell>
                    {contract.end_date ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{format(new Date(contract.end_date), 'd MMM yyyy', { locale: es })}</span>
                        {isExpiring && <Badge variant="destructive" className="text-[10px]">{daysUntilEnd}d</Badge>}
                      </div>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const AdminCRM = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CRM</h1>
        <p className="text-muted-foreground">Gestión de clientes, pipeline de ventas y contratos</p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard" className="gap-1.5">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="gap-1.5">
            <Kanban className="h-4 w-4" /> Pipeline
          </TabsTrigger>
          <TabsTrigger value="clients" className="gap-1.5">
            <Users className="h-4 w-4" /> Clientes
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-1.5">
            <FileText className="h-4 w-4" /> Contratos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <CRMDashboard />
        </TabsContent>
        <TabsContent value="pipeline">
          <CRMPipeline />
        </TabsContent>
        <TabsContent value="clients">
          <CRMClientList />
        </TabsContent>
        <TabsContent value="contracts">
          <ContractsOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCRM;
