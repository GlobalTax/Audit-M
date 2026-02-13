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
import { Plus, Pencil, Building2, Mail, Phone, Globe, MapPin, Hash } from 'lucide-react';

interface CRMClientDetailProps {
  clientId: string;
  open: boolean;
  onClose: () => void;
}

const PIPELINE_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  propuesta: 'Propuesta',
  negociacion: 'Negociación',
  cerrado_ganado: 'Cerrado Ganado',
  cerrado_perdido: 'Cerrado Perdido',
};

export const CRMClientDetail = ({ clientId, open, onClose }: CRMClientDetailProps) => {
  const { data: client, isLoading } = useCRMClient(clientId);
  const [showInteractionForm, setShowInteractionForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (isLoading || !client) {
    return (
      <Sheet open={open} onOpenChange={() => onClose()}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <div className="flex items-center justify-center py-12 text-muted-foreground">Cargando...</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Sheet open={open} onOpenChange={() => onClose()}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-lg">{client.name}</SheetTitle>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="capitalize">{client.status}</Badge>
                  <Badge variant="secondary" className="text-xs">{PIPELINE_LABELS[client.pipeline_stage]}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)}>
                <Pencil className="h-3 w-3 mr-1" /> Editar
              </Button>
            </div>
          </SheetHeader>

          <div className="mt-6">
            <Tabs defaultValue="info">
              <TabsList className="w-full">
                <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
                <TabsTrigger value="interactions" className="flex-1">Historial</TabsTrigger>
                <TabsTrigger value="contracts" className="flex-1">Contratos</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4 space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Contacto</h4>
                  <div className="grid gap-2 text-sm">
                    {client.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" /> {client.email}
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" /> {client.phone}
                      </div>
                    )}
                    {client.website && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" />
                        <a href={client.website} target="_blank" rel="noopener" className="text-primary underline truncate">{client.website}</a>
                      </div>
                    )}
                    {client.sector && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" /> {client.sector}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fiscal Data */}
                {(client.nif_cif || client.fiscal_address) && (
                  <div className="space-y-2 border-t pt-4">
                    <h4 className="text-sm font-semibold">Datos Fiscales</h4>
                    <div className="grid gap-2 text-sm">
                      {client.nif_cif && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Hash className="h-3.5 w-3.5" /> {client.nif_cif}
                        </div>
                      )}
                      {client.fiscal_address && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{[client.fiscal_address, client.city, client.postal_code, client.country].filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="text-sm font-semibold">Otros</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Origen:</span> {client.source || '-'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Responsable:</span> {client.assigned_to || '-'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Valor est.:</span> {client.estimated_value?.toLocaleString('es-ES')} €
                    </div>
                  </div>
                </div>

                {client.notes && (
                  <div className="space-y-2 border-t pt-4">
                    <h4 className="text-sm font-semibold">Notas</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="interactions" className="mt-4">
                <div className="flex justify-end mb-3">
                  <Button size="sm" onClick={() => setShowInteractionForm(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Nueva Interacción
                  </Button>
                </div>
                <CRMInteractionTimeline clientId={clientId} />
              </TabsContent>

              <TabsContent value="contracts" className="mt-4">
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
