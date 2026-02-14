import { useState, useEffect } from 'react';
import { useCRMClients, useDeleteCRMClient, type CRMClient, type CRMClientStatus } from '@/hooks/useCRMClients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Trash2, Eye, Pencil } from 'lucide-react';
import { CRMClientForm } from './CRMClientForm';
import { CRMClientDetail } from './CRMClientDetail';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CLIENT_STATUS_COLORS, CLIENT_STATUS_LABELS, formatCurrency } from '@/lib/crm';

export const CRMClientList = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CRMClientStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<CRMClient | null>(null);
  const [viewingClientId, setViewingClientId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: clients = [], isLoading } = useCRMClients({
    search: debouncedSearch || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });
  const deleteClient = useDeleteCRMClient();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
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
        <Button onClick={() => { setEditingClient(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Nuevo Cliente
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Valor Est.</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Cargando...</TableCell></TableRow>
            ) : clients.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No hay clientes</TableCell></TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.email || '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{client.sector || '-'}</TableCell>
                  <TableCell>
                    <Badge className={CLIENT_STATUS_COLORS[client.status]} variant="secondary">
                      {CLIENT_STATUS_LABELS[client.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{(client.estimated_value ?? 0) > 0 ? `${formatCurrency(client.estimated_value)} €` : '-'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(client.created_at), 'd MMM yyyy', { locale: es })}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setViewingClientId(client.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setEditingClient(client); setShowForm(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Se eliminará {client.name} y todos sus datos asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteClient.mutate(client.id)}>
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <CRMClientForm
          open={showForm}
          onClose={() => { setShowForm(false); setEditingClient(null); }}
          client={editingClient}
        />
      )}

      {viewingClientId && (
        <CRMClientDetail
          clientId={viewingClientId}
          open={!!viewingClientId}
          onClose={() => setViewingClientId(null)}
        />
      )}
    </div>
  );
};
