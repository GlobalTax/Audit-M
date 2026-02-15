import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRMClients, useDeleteCRMClient, type CRMClient, type CRMClientStatus, type CRMClientType } from '@/hooks/useCRMClients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search, Trash2, Pencil } from 'lucide-react';
import { CRMClientForm } from './CRMClientForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CLIENT_STATUS_COLORS, CLIENT_STATUS_LABELS, PIPELINE_LABELS, formatCurrency, getRiskLevel, RISK_LABELS } from '@/lib/crm';

interface CRMClientListProps {
  globalSearch?: string;
  clientType?: CRMClientType;
}

export const CRMClientList = ({ globalSearch = '', clientType }: CRMClientListProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CRMClientStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<CRMClient | null>(null);

  useEffect(() => {
    const combined = globalSearch || search;
    const timer = setTimeout(() => setDebouncedSearch(combined), 300);
    return () => clearTimeout(timer);
  }, [search, globalSearch]);

  const { data: clients = [], isLoading } = useCRMClients({
    search: debouncedSearch || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    client_type: clientType,
  });
  const deleteClient = useDeleteCRMClient();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, email o NIF..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as CRMClientStatus | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="prospecto">Prospecto</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
              <SelectItem value="perdido">Perdido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => { setEditingClient(null); setShowForm(true); }} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> {clientType === 'persona' ? 'Nueva Persona' : clientType === 'empresa' ? 'Nueva Empresa' : 'Nuevo Cliente'}
        </Button>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-gray-400 px-1">
          {clients.length} cliente{clients.length !== 1 ? 's' : ''}
          {statusFilter !== 'all' && ` · Filtrado por: ${CLIENT_STATUS_LABELS[statusFilter]}`}
        </p>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80">
              <TableHead className="w-10">
                <Checkbox disabled className="opacity-40" />
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Cliente</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">NIF/CIF</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Sector</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Estado</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Etapa</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Valor</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Origen</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-medium">Alta</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-gray-500 font-medium">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={10} className="text-center text-gray-400 py-12">Cargando...</TableCell></TableRow>
            ) : clients.length === 0 ? (
              <TableRow><TableCell colSpan={10} className="text-center text-gray-400 py-12">No se encontraron clientes</TableCell></TableRow>
            ) : (
              clients.map((client) => {
                const risk = getRiskLevel(client.estimated_value);
                const riskInfo = RISK_LABELS[risk];
                return (
                  <TableRow key={client.id} className="hover:bg-indigo-50/30 group cursor-pointer" onClick={() => navigate(`/admin/crm/clients/${client.id}`)}>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox className="opacity-40" />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">{client.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{client.email || '-'}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 font-mono">{client.nif_cif || '-'}</TableCell>
                    <TableCell className="text-sm text-gray-500">{client.sector || '-'}</TableCell>
                    <TableCell>
                      <Badge className={CLIENT_STATUS_COLORS[client.status]} variant="secondary">
                        {CLIENT_STATUS_LABELS[client.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-500">{PIPELINE_LABELS[client.pipeline_stage]}</span>
                    </TableCell>
                    <TableCell>
                      {(client.estimated_value ?? 0) > 0 ? (
                        <Badge variant="secondary" className={`text-[11px] ${riskInfo.color}`}>
                          {formatCurrency(client.estimated_value)} €
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">{client.source || '-'}</TableCell>
                    <TableCell className="text-xs text-gray-400">
                      {format(new Date(client.created_at), 'd MMM yy', { locale: es })}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingClient(client); setShowForm(true); }}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar cliente</AlertDialogTitle>
                              <AlertDialogDescription>
                                Se eliminará <strong>{client.name}</strong> y todos sus datos asociados. Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteClient.mutate(client.id)} className="bg-red-600 hover:bg-red-700">
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <CRMClientForm
          open={showForm}
          onClose={() => { setShowForm(false); setEditingClient(null); }}
          client={editingClient}
          defaultClientType={clientType}
        />
      )}
    </div>
  );
};
