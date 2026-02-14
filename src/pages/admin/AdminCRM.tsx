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

  if (isLoading) return <p className="text-sm text-gray-500 text-center py-8">Cargando contratos...</p>;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Servicio</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Cliente</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Estado</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Importe</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Facturación</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Vencimiento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-12">Sin contratos registrados</TableCell></TableRow>
          ) : (
            contracts.map((contract) => {
              const daysUntilEnd = contract.end_date ? differenceInDays(new Date(contract.end_date), new Date()) : null;
              const isExpiring = daysUntilEnd !== null && daysUntilEnd <= 30 && daysUntilEnd >= 0;
              return (
                <TableRow key={contract.id} className="hover:bg-indigo-50/30">
                  <TableCell className="font-medium text-gray-900">{contract.service_name}</TableCell>
                  <TableCell className="text-gray-500">{getClientName(contract.client_id)}</TableCell>
                  <TableCell>
                    <Badge className={CONTRACT_STATUS_COLORS[contract.status as keyof typeof CONTRACT_STATUS_COLORS] || ''} variant="secondary">
                      {CONTRACT_STATUS_LABELS[contract.status as keyof typeof CONTRACT_STATUS_LABELS] || contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{formatCurrency(contract.amount)} €</TableCell>
                  <TableCell className="capitalize text-gray-500">{contract.billing_frequency}</TableCell>
                  <TableCell>
                    {contract.end_date ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{format(new Date(contract.end_date), 'd MMM yyyy', { locale: es })}</span>
                        {isExpiring && <Badge variant="destructive" className="text-[10px]">{daysUntilEnd}d</Badge>}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
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
          <h1 className="text-2xl font-semibold text-gray-900">CRM</h1>
          <p className="text-gray-500 mt-0.5">
            Gestión de clientes, pipeline comercial y contratos
            {crmStats && (
              <span className="ml-2 text-gray-400">
                · {crmStats.totalClients} clientes · {formatCurrency(crmStats.totalContractValue)} € en contratos activos
              </span>
            )}
          </p>
        </div>
        <Button onClick={() => setShowNewClientForm(true)} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 w-full justify-start gap-6 rounded-none">
          <TabsTrigger value="dashboard" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 gap-1.5">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 gap-1.5">
            <Kanban className="h-4 w-4" /> Pipeline
          </TabsTrigger>
          <TabsTrigger value="clients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 gap-1.5">
            <Users className="h-4 w-4" /> Clientes
          </TabsTrigger>
          <TabsTrigger value="contracts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 gap-1.5">
            <FileText className="h-4 w-4" /> Contratos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <CRMDashboard />
        </TabsContent>
        <TabsContent value="pipeline" className="mt-6">
          <CRMPipeline />
        </TabsContent>
        <TabsContent value="clients" className="mt-6">
          <CRMClientList />
        </TabsContent>
        <TabsContent value="contracts" className="mt-6">
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
