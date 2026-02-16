import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRMClients, useDeleteCRMClient, type CRMClient, type CRMClientStatus, type CRMClientType } from '@/hooks/useCRMClients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Search, Trash2, Pencil, ShieldAlert, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { CRMClientForm } from './CRMClientForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CLIENT_STATUS_COLORS, CLIENT_STATUS_LABELS, PIPELINE_LABELS, formatCurrency, getRiskLevel, RISK_LABELS } from '@/lib/crm';

interface ColumnDef {
  key: string;
  label: string;
  defaultVisible: boolean;
  render: (client: CRMClient) => ReactNode;
}

const buildColumns = (): ColumnDef[] => [
  {
    key: 'name',
    label: 'Cliente',
    defaultVisible: true,
    render: (c) => (
      <div>
        <p className="font-medium text-foreground hover:text-primary transition-colors">{c.name}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{c.email || '-'}</p>
      </div>
    ),
  },
  {
    key: 'nif_cif',
    label: 'NIF/CIF',
    defaultVisible: true,
    render: (c) => <span className="text-sm text-muted-foreground font-mono">{c.nif_cif || '-'}</span>,
  },
  {
    key: 'phone',
    label: 'Teléfono',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground">{c.phone || '-'}</span>,
  },
  {
    key: 'sector',
    label: 'Sector',
    defaultVisible: true,
    render: (c) => <span className="text-sm text-muted-foreground">{c.sector || '-'}</span>,
  },
  {
    key: 'fiscal_address',
    label: 'Dirección fiscal',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground truncate max-w-[180px] block">{c.fiscal_address || '-'}</span>,
  },
  {
    key: 'city',
    label: 'Ciudad',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground">{c.city || '-'}</span>,
  },
  {
    key: 'postal_code',
    label: 'C.Postal',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground font-mono">{c.postal_code || '-'}</span>,
  },
  {
    key: 'country',
    label: 'País',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground">{c.country || '-'}</span>,
  },
  {
    key: 'website',
    label: 'Web',
    defaultVisible: false,
    render: (c) => c.website ? (
      <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate max-w-[150px] block" onClick={(e) => e.stopPropagation()}>
        {c.website.replace(/^https?:\/\//, '')}
      </a>
    ) : <span className="text-muted-foreground">-</span>,
  },
  {
    key: 'status',
    label: 'Estado',
    defaultVisible: true,
    render: (c) => (
      <Badge className={CLIENT_STATUS_COLORS[c.status]} variant="secondary">
        {CLIENT_STATUS_LABELS[c.status]}
      </Badge>
    ),
  },
  {
    key: 'pipeline_stage',
    label: 'Etapa',
    defaultVisible: true,
    render: (c) => <span className="text-xs text-muted-foreground">{PIPELINE_LABELS[c.pipeline_stage]}</span>,
  },
  {
    key: 'estimated_value',
    label: 'Valor',
    defaultVisible: true,
    render: (c) => {
      if ((c.estimated_value ?? 0) <= 0) return <span className="text-muted-foreground">-</span>;
      const risk = getRiskLevel(c.estimated_value);
      const riskInfo = RISK_LABELS[risk];
      return (
        <Badge variant="secondary" className={`text-[11px] ${riskInfo.color}`}>
          {formatCurrency(c.estimated_value)} €
        </Badge>
      );
    },
  },
  {
    key: 'source',
    label: 'Origen',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground">{c.source || '-'}</span>,
  },
  {
    key: 'assigned_to',
    label: 'Asignado a',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground truncate max-w-[120px] block">{c.assigned_to || '-'}</span>,
  },
  {
    key: 'total_facturacion',
    label: 'Facturación',
    defaultVisible: false,
    render: (c) => c.total_facturacion != null ? (
      <span className="text-sm text-muted-foreground font-mono">{formatCurrency(c.total_facturacion)} €</span>
    ) : <span className="text-muted-foreground">-</span>,
  },
  {
    key: 'num_empleados',
    label: 'Empleados',
    defaultVisible: false,
    render: (c) => <span className="text-sm text-muted-foreground">{c.num_empleados ?? '-'}</span>,
  },
  {
    key: 'total_activo',
    label: 'Total activo',
    defaultVisible: false,
    render: (c) => c.total_activo != null ? (
      <span className="text-sm text-muted-foreground font-mono">{formatCurrency(c.total_activo)} €</span>
    ) : <span className="text-muted-foreground">-</span>,
  },
  {
    key: 'audit',
    label: 'Auditoría',
    defaultVisible: true,
    render: (c) => {
      const auditExceeded = [
        c.total_facturacion != null && c.total_facturacion > 5700000,
        c.num_empleados != null && c.num_empleados > 50,
        c.total_activo != null && c.total_activo > 2850000,
      ].filter(Boolean).length;
      const hasAuditData = c.total_facturacion != null || c.num_empleados != null || c.total_activo != null;
      if (!hasAuditData) return <span className="text-muted-foreground text-xs">—</span>;
      return auditExceeded >= 2 ? (
        <Badge variant="secondary" className="text-[11px] bg-amber-100 text-amber-800 border-amber-200 gap-1">
          <ShieldAlert className="h-3 w-3" /> {auditExceeded}/3
        </Badge>
      ) : (
        <Badge variant="secondary" className="text-[11px] bg-emerald-100 text-emerald-800 border-emerald-200 gap-1">
          <ShieldCheck className="h-3 w-3" /> {auditExceeded}/3
        </Badge>
      );
    },
  },
  {
    key: 'created_at',
    label: 'Alta',
    defaultVisible: true,
    render: (c) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(c.created_at), 'd MMM yy', { locale: es })}
      </span>
    ),
  },
  {
    key: 'updated_at',
    label: 'Últ. actualización',
    defaultVisible: false,
    render: (c) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(c.updated_at), 'd MMM yy', { locale: es })}
      </span>
    ),
  },
];

const COLUMNS = buildColumns();
const STORAGE_KEY_PREFIX = 'crm-visible-cols-';

function getInitialVisible(clientType?: CRMClientType): Set<string> {
  const key = STORAGE_KEY_PREFIX + (clientType || 'all');
  try {
    const stored = localStorage.getItem(key);
    if (stored) return new Set(JSON.parse(stored));
  } catch {}
  return new Set(COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key));
}

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
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => getInitialVisible(clientType));

  useEffect(() => {
    const combined = globalSearch || search;
    const timer = setTimeout(() => setDebouncedSearch(combined), 300);
    return () => clearTimeout(timer);
  }, [search, globalSearch]);

  const saveColumns = useCallback((cols: Set<string>) => {
    const key = STORAGE_KEY_PREFIX + (clientType || 'all');
    localStorage.setItem(key, JSON.stringify([...cols]));
  }, [clientType]);

  const toggleColumn = useCallback((colKey: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(colKey)) next.delete(colKey);
      else next.add(colKey);
      saveColumns(next);
      return next;
    });
  }, [saveColumns]);

  const activeColumns = useMemo(() => COLUMNS.filter((c) => visibleColumns.has(c.key)), [visibleColumns]);
  const totalColSpan = activeColumns.length + 2; // +checkbox +actions

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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0" title="Seleccionar columnas">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3 max-h-80 overflow-y-auto">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Columnas visibles</p>
              <div className="space-y-1.5">
                {COLUMNS.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-1.5 py-1 transition-colors">
                    <Checkbox
                      checked={visibleColumns.has(col.key)}
                      onCheckedChange={() => toggleColumn(col.key)}
                    />
                    <span className="text-sm">{col.label}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={() => { setEditingClient(null); setShowForm(true); }} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> {clientType === 'persona' ? 'Nueva Persona' : clientType === 'empresa' ? 'Nueva Empresa' : 'Nuevo Cliente'}
        </Button>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground px-1">
          {clients.length} cliente{clients.length !== 1 ? 's' : ''}
          {statusFilter !== 'all' && ` · Filtrado por: ${CLIENT_STATUS_LABELS[statusFilter]}`}
        </p>
      )}

      {/* Table */}
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-10">
                <Checkbox disabled className="opacity-40" />
              </TableHead>
              {activeColumns.map((col) => (
                <TableHead key={col.key} className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground font-medium">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={totalColSpan} className="text-center text-muted-foreground py-12">Cargando...</TableCell></TableRow>
            ) : clients.length === 0 ? (
              <TableRow><TableCell colSpan={totalColSpan} className="text-center text-muted-foreground py-12">No se encontraron clientes</TableCell></TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-accent/30 group cursor-pointer" onClick={() => navigate(`/admin/crm/clients/${client.id}`)}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox className="opacity-40" />
                  </TableCell>
                  {activeColumns.map((col) => (
                    <TableCell key={col.key}>{col.render(client)}</TableCell>
                  ))}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingClient(client); setShowForm(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
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
                            <AlertDialogAction onClick={() => deleteClient.mutate(client.id)} className="bg-destructive hover:bg-destructive/90">
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
          defaultClientType={clientType}
        />
      )}
    </div>
  );
};
