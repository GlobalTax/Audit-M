import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCRMClient } from '@/hooks/useCRMClients';
import { CRMInteractionTimeline } from './CRMInteractionTimeline';
import { CRMInteractionForm } from './CRMInteractionForm';
import { CRMContractList } from './CRMContractList';
import { CRMClientForm } from './CRMClientForm';
import { Plus, Pencil, Building2, Mail, Phone, Globe, MapPin, Hash, User, Calendar, TrendingUp } from 'lucide-react';
import { PIPELINE_LABELS, PIPELINE_STAGE_COLORS, CLIENT_STATUS_COLORS, CLIENT_STATUS_LABELS, formatCurrency, getDaysInStage, getRiskLevel, RISK_LABELS } from '@/lib/crm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CRMClientDetailProps {
  clientId: string;
  open: boolean;
  onClose: () => void;
}

export const CRMClientDetail = ({ clientId, open, onClose }: CRMClientDetailProps) => {
  const { data: client, isLoading } = useCRMClient(clientId);
  const [showInteractionForm, setShowInteractionForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (isLoading || !client) {
    return (
      <Sheet open={open} onOpenChange={() => onClose()}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="flex items-center justify-center py-12 text-muted-foreground">Cargando...</div>
        </SheetContent>
      </Sheet>
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

  return (
    <>
      <Sheet open={open} onOpenChange={() => onClose()}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
          {/* Header */}
          <div className="p-6 pb-4 border-b bg-slate-50/50">
            <SheetHeader className="mb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{initials}</span>
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-semibold text-slate-900">{client.name}</SheetTitle>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
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
                <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)} className="gap-1.5">
                  <Pencil className="h-3 w-3" /> Editar
                </Button>
              </div>
            </SheetHeader>

            {/* Quick stats row */}
            <div className="flex gap-4 mt-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Alta: {format(new Date(client.created_at), "d MMM yyyy", { locale: es })}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {daysInStage}d en esta etapa
              </div>
              {client.assigned_to && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {client.assigned_to}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="info">
              <TabsList className="w-full bg-slate-100/80">
                <TabsTrigger value="info" className="flex-1 data-[state=active]:bg-white">Información</TabsTrigger>
                <TabsTrigger value="interactions" className="flex-1 data-[state=active]:bg-white">Historial</TabsTrigger>
                <TabsTrigger value="contracts" className="flex-1 data-[state=active]:bg-white">Contratos</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-5 space-y-5">
                {/* Contact Info */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Contacto</h4>
                  <div className="grid gap-2.5">
                    {client.email && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors">{client.email}</a>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors">{client.phone}</a>
                      </div>
                    )}
                    {client.website && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Globe className="h-4 w-4 text-slate-400" />
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{client.website}</a>
                      </div>
                    )}
                    {client.sector && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Building2 className="h-4 w-4 text-slate-400" /> {client.sector}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fiscal Data */}
                {(client.nif_cif || client.fiscal_address) && (
                  <div className="pt-4 border-t">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Datos fiscales</h4>
                    <div className="grid gap-2.5">
                      {client.nif_cif && (
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Hash className="h-4 w-4 text-slate-400" />
                          <span className="font-mono">{client.nif_cif}</span>
                        </div>
                      )}
                      {client.fiscal_address && (
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{[client.fiscal_address, client.city, client.postal_code, client.country].filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Commercial info */}
                <div className="pt-4 border-t">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Información comercial</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-400">Origen</p>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">{client.source || '-'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-400">Responsable</p>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">{client.assigned_to || '-'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-400">Valor estimado</p>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">{formatCurrency(client.estimated_value)} €</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-400">Días en pipeline</p>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">{daysInStage} días</p>
                    </div>
                  </div>
                </div>

                {client.notes && (
                  <div className="pt-4 border-t">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Notas</h4>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-3">{client.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="interactions" className="mt-5">
                <div className="flex justify-end mb-3">
                  <Button size="sm" onClick={() => setShowInteractionForm(true)} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Nueva interacción
                  </Button>
                </div>
                <CRMInteractionTimeline clientId={clientId} />
              </TabsContent>

              <TabsContent value="contracts" className="mt-5">
                <CRMContractList clientId={clientId} />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {showInteractionForm && (
        <CRMInteractionForm
          clientId={clientId}
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
    </>
  );
};
