import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCRMClient } from '@/hooks/useCRMClients';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Mail,
  Phone,
  ListTodo,
  Pencil,
  MoreHorizontal,
  Building2,
  Globe,
  MapPin,
  Hash,
  User,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  Trash2,
} from 'lucide-react';
import { CRMInteractionTimeline } from '@/components/admin/crm/CRMInteractionTimeline';
import { CRMInteractionForm } from '@/components/admin/crm/CRMInteractionForm';
import { CRMContractList } from '@/components/admin/crm/CRMContractList';
import { CRMClientForm } from '@/components/admin/crm/CRMClientForm';
import { useDeleteCRMClient } from '@/hooks/useCRMClients';
import {
  PIPELINE_LABELS,
  PIPELINE_STAGE_COLORS,
  CLIENT_STATUS_COLORS,
  CLIENT_STATUS_LABELS,
  formatCurrency,
  getDaysInStage,
  getRiskLevel,
  RISK_LABELS,
} from '@/lib/crm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AdminCRMClientDetail = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { data: client, isLoading } = useCRMClient(clientId!);
  const deleteClient = useDeleteCRMClient();
  const [showInteractionForm, setShowInteractionForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (isLoading || !client) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const daysInStage = getDaysInStage(client.updated_at);
  const stageColors = PIPELINE_STAGE_COLORS[client.pipeline_stage];
  const risk = getRiskLevel(client.estimated_value);
  const riskInfo = RISK_LABELS[risk];

  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleDelete = async () => {
    await deleteClient.mutateAsync(client.id);
    navigate('/admin/crm');
  };

  return (
    <div className="-m-6 lg:-m-8">
      {/* Top bar: back button */}
      <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-gray-500 hover:text-gray-900"
          onClick={() => navigate('/admin/crm')}
        >
          <ArrowLeft className="h-4 w-4" />
          CRM
        </Button>
      </div>

      {/* Header */}
      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-indigo-600">{initials}</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                {client.sector && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {client.sector}
                  </span>
                )}
                {client.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {client.city}{client.country && client.country !== 'España' ? `, ${client.country}` : ''}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge className={CLIENT_STATUS_COLORS[client.status]} variant="secondary">
                  {CLIENT_STATUS_LABELS[client.status]}
                </Badge>
                <Badge variant="secondary" className={`${stageColors.bg} ${stageColors.text}`}>
                  {PIPELINE_LABELS[client.pipeline_stage]}
                </Badge>
                {(client.estimated_value ?? 0) > 0 && (
                  <Badge variant="secondary" className={riskInfo.color}>
                    {formatCurrency(client.estimated_value)} €
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {client.email && (
              <Button
                size="sm"
                className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => window.open(`mailto:${client.email}`, '_blank')}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </Button>
            )}
            {client.phone && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => window.open(`tel:${client.phone}`, '_blank')}
              >
                <Phone className="h-3.5 w-3.5" />
                Llamar
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowInteractionForm(true)}
            >
              <ListTodo className="h-3.5 w-3.5" />
              Tarea
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowEditForm(true)}
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {client.website && (
                  <DropdownMenuItem onClick={() => window.open(client.website!, '_blank')}>
                    <Globe className="mr-2 h-4 w-4" />
                    Visitar web
                  </DropdownMenuItem>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar cliente
                    </DropdownMenuItem>
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
                      <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Content: Two-column layout */}
      <div className="flex">
        {/* Left: Tabs content */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="prospecto" className="w-full">
            <div className="border-b border-gray-200 bg-white px-6">
              <TabsList className="h-auto p-0 bg-transparent gap-6">
                <TabsTrigger
                  value="prospecto"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Prospecto
                </TabsTrigger>
                <TabsTrigger
                  value="actividades"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Actividades
                </TabsTrigger>
                <TabsTrigger
                  value="contratos"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Contratos
                </TabsTrigger>
                <TabsTrigger
                  value="campos"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Todos los campos
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              {/* Prospecto tab */}
              <TabsContent value="prospecto" className="mt-0 space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">Contacto</h3>
                  <div className="grid gap-3">
                    {client.email && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href={`mailto:${client.email}`} className="hover:text-indigo-600 transition-colors">{client.email}</a>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a href={`tel:${client.phone}`} className="hover:text-indigo-600 transition-colors">{client.phone}</a>
                      </div>
                    )}
                    {client.website && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline truncate">{client.website}</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {client.notes && (
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">Notas</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{client.notes}</p>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">Actividad reciente</h3>
                    <Button size="sm" variant="outline" onClick={() => setShowInteractionForm(true)} className="gap-1.5 text-xs">
                      <Plus className="h-3 w-3" /> Nueva
                    </Button>
                  </div>
                  <CRMInteractionTimeline clientId={clientId!} />
                </div>
              </TabsContent>

              {/* Actividades tab */}
              <TabsContent value="actividades" className="mt-0">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Historial de interacciones</h3>
                    <Button size="sm" onClick={() => setShowInteractionForm(true)} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-3.5 w-3.5" /> Nueva interacción
                    </Button>
                  </div>
                  <CRMInteractionTimeline clientId={clientId!} />
                </div>
              </TabsContent>

              {/* Contratos tab */}
              <TabsContent value="contratos" className="mt-0">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <CRMContractList clientId={clientId!} />
                </div>
              </TabsContent>

              {/* Todos los campos tab */}
              <TabsContent value="campos" className="mt-0">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-5">Todos los campos del registro</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <FieldRow label="Nombre / Razón Social" value={client.name} />
                    <FieldRow label="Email" value={client.email} />
                    <FieldRow label="Teléfono" value={client.phone} />
                    <FieldRow label="NIF/CIF" value={client.nif_cif} mono />
                    <FieldRow label="Sector" value={client.sector} />
                    <FieldRow label="Sitio web" value={client.website} />
                    <FieldRow label="Dirección fiscal" value={client.fiscal_address} />
                    <FieldRow label="Ciudad" value={client.city} />
                    <FieldRow label="Código postal" value={client.postal_code} />
                    <FieldRow label="País" value={client.country} />
                    <FieldRow label="Responsable" value={client.assigned_to} />
                    <FieldRow label="Origen" value={client.source} />
                    <FieldRow label="Valor estimado" value={client.estimated_value ? `${formatCurrency(client.estimated_value)} €` : null} />
                    <FieldRow label="Fecha alta" value={format(new Date(client.created_at), "d MMM yyyy, HH:mm", { locale: es })} />
                    <FieldRow label="Última actualización" value={format(new Date(client.updated_at), "d MMM yyyy, HH:mm", { locale: es })} />
                  </div>
                  {client.notes && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">Notas</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{client.notes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right sidebar: Record details */}
        <div className="w-80 border-l border-gray-200 bg-white flex-shrink-0 hidden lg:block">
          <div className="p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">Detalles del registro</h3>
            <div className="space-y-4">
              <DetailField label="Etapa" icon={TrendingUp}>
                <Badge variant="secondary" className={`${stageColors.bg} ${stageColors.text}`}>
                  {PIPELINE_LABELS[client.pipeline_stage]}
                </Badge>
              </DetailField>
              <DetailField label="Estado" icon={User}>
                <Badge className={CLIENT_STATUS_COLORS[client.status]} variant="secondary">
                  {CLIENT_STATUS_LABELS[client.status]}
                </Badge>
              </DetailField>
              <DetailField label="Valor estimado" icon={TrendingUp}>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(client.estimated_value)} €</span>
              </DetailField>
              <DetailField label="Responsable" icon={User}>
                <span className="text-sm text-gray-700">{client.assigned_to || '—'}</span>
              </DetailField>
              <DetailField label="Origen" icon={Globe}>
                <span className="text-sm text-gray-700">{client.source || '—'}</span>
              </DetailField>
              <DetailField label="Fecha alta" icon={Calendar}>
                <span className="text-sm text-gray-700">{format(new Date(client.created_at), "d MMM yyyy", { locale: es })}</span>
              </DetailField>
              <DetailField label="Días en etapa" icon={Clock}>
                <span className="text-sm text-gray-700">{daysInStage} días</span>
              </DetailField>
            </div>
          </div>

          {/* Company insights */}
          {(client.sector || client.nif_cif || client.fiscal_address) && (
            <div className="p-5 border-t border-gray-100">
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">Datos de empresa</h3>
              <div className="space-y-3">
                {client.sector && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    {client.sector}
                  </div>
                )}
                {client.nif_cif && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Hash className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="font-mono">{client.nif_cif}</span>
                  </div>
                )}
                {client.fiscal_address && (
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{[client.fiscal_address, client.city, client.postal_code, client.country].filter(Boolean).join(', ')}</span>
                  </div>
                )}
                {client.website && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline truncate">{client.website}</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showInteractionForm && (
        <CRMInteractionForm
          clientId={clientId!}
          open={showInteractionForm}
          onClose={() => setShowInteractionForm(false)}
        />
      )}
      {showEditForm && (
        <CRMClientForm
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          client={client}
        />
      )}
    </div>
  );
};

function FieldRow({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-sm text-gray-700 ${mono ? 'font-mono' : ''}`}>{value || '—'}</span>
    </div>
  );
}

function DetailField({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      {children}
    </div>
  );
}

export default AdminCRMClientDetail;
