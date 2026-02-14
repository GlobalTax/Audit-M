import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CRMDashboard } from '@/components/admin/crm/CRMDashboard';
import { CRMPipeline } from '@/components/admin/crm/CRMPipeline';
import { CRMClientList } from '@/components/admin/crm/CRMClientList';
import { BarChart3, Kanban, Users, FileText, Plus } from 'lucide-react';
import { useCRMContracts } from '@/hooks/useCRMContracts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCRMClients } from '@/hooks/useCRMClients';
import { useCRMStats } from '@/hooks/useCRMStats';
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS, formatCurrency } from '@/lib/crm';
import { useState } from 'react';
import { CRMClientForm } from '@/components/admin/crm/CRMClientForm';

const ContractsOverview = () => {
  const { data: contracts = [], isLoading } = useCRMContracts();
  const { data: clients = [] } = useCRMClients();

  const getClientName = (clientId: string) => {
    return clients.find((c) => c.id === clientId)?.name || 'Desconocido';
  };

  if (isLoading) return <p className="text-sm text-muted-foreground text-center py-8">Cargando contratos...</p>;

  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="font-medium">Servicio</TableHead>
            <TableHead className="font-medium">Cliente</TableHead>
            <TableHead className="font-medium">Estado</TableHead>
            <TableHead className="font-medium">Importe</TableHead>
            <TableHead className="font-medium">Facturación</TableHead>
            <TableHead className="font-medium">Vencimiento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-12">Sin contratos registrados</TableCell></TableRow>
          ) : (
            contracts.map((contract) => {
              const daysUntilEnd = contract.end_date ? differenceInDays(new Date(contract.end_date), new Date()) : null;
              const isExpiring = daysUntilEnd !== null && daysUntilEnd <= 30 && daysUntilEnd >= 0;
              return (
                <TableRow key={contract.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium">{contract.service_name}</TableCell>
                  <TableCell className="text-muted-foreground">{getClientName(contract.client_id)}</TableCell>
                  <TableCell>
                    <Badge className={CONTRACT_STATUS_COLORS[contract.status as keyof typeof CONTRACT_STATUS_COLORS] || ''} variant="secondary">
                      {CONTRACT_STATUS_LABELS[contract.status as keyof typeof CONTRACT_STATUS_LABELS] || contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(contract.amount)} €</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{contract.billing_frequency}</TableCell>
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
  );
};

const AdminCRM = () => {
  const { data: crmStats } = useCRMStats();
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">CRM</h1>
          <p className="text-slate-500 mt-0.5">
            Gestión de clientes, pipeline comercial y contratos
            {crmStats && (
              <span className="ml-2 text-slate-400">
                · {crmStats.totalClients} clientes · {formatCurrency(crmStats.totalContractValue)} € en contratos activos
              </span>
            )}
          </p>
        </div>
        <Button onClick={() => setShowNewClientForm(true)} className="gap-1.5">
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="bg-slate-100/80">
          <TabsTrigger value="dashboard" className="gap-1.5 data-[state=active]:bg-white">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="gap-1.5 data-[state=active]:bg-white">
            <Kanban className="h-4 w-4" /> Pipeline
          </TabsTrigger>
          <TabsTrigger value="clients" className="gap-1.5 data-[state=active]:bg-white">
            <Users className="h-4 w-4" /> Clientes
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-1.5 data-[state=active]:bg-white">
            <FileText className="h-4 w-4" /> Contratos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-4">
          <CRMDashboard />
        </TabsContent>
        <TabsContent value="pipeline" className="mt-4">
          <CRMPipeline />
        </TabsContent>
        <TabsContent value="clients" className="mt-4">
          <CRMClientList />
        </TabsContent>
        <TabsContent value="contracts" className="mt-4">
          <ContractsOverview />
        </TabsContent>
      </Tabs>

      {showNewClientForm && (
        <CRMClientForm
          open={showNewClientForm}
          onClose={() => setShowNewClientForm(false)}
        />
      )}
    </div>
  );
};

export default AdminCRM;
