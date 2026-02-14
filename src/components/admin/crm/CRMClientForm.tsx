import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateCRMClient, useUpdateCRMClient, type CRMClient, type CRMClientStatus, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { toast } from 'sonner';
import { AUDIT_SECTORS, CLIENT_SOURCES } from '@/lib/crm';

interface CRMClientFormProps {
  open: boolean;
  onClose: () => void;
  client?: CRMClient | null;
}

const STATUSES: { value: CRMClientStatus; label: string }[] = [
  { value: 'prospecto', label: 'Prospecto' },
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
  { value: 'perdido', label: 'Perdido' },
];

const STAGES: { value: CRMPipelineStage; label: string }[] = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'propuesta', label: 'Propuesta enviada' },
  { value: 'negociacion', label: 'En negociación' },
  { value: 'cerrado_ganado', label: 'Cerrado' },
  { value: 'cerrado_perdido', label: 'Descartado' },
];

export const CRMClientForm = ({ open, onClose, client }: CRMClientFormProps) => {
  const createClient = useCreateCRMClient();
  const updateClient = useUpdateCRMClient();
  const isEditing = !!client;

  const [form, setForm] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    nif_cif: client?.nif_cif || '',
    fiscal_address: client?.fiscal_address || '',
    city: client?.city || '',
    postal_code: client?.postal_code || '',
    country: client?.country || 'España',
    website: client?.website || '',
    sector: client?.sector || '',
    status: client?.status || 'prospecto' as CRMClientStatus,
    pipeline_stage: client?.pipeline_stage || 'nuevo' as CRMPipelineStage,
    assigned_to: client?.assigned_to || '',
    source: client?.source || '',
    estimated_value: client?.estimated_value || 0,
    notes: client?.notes || '',
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('El email no es válido');
      return;
    }

    const payload = {
      ...form,
      email: form.email || null,
      phone: form.phone || null,
      nif_cif: form.nif_cif || null,
      fiscal_address: form.fiscal_address || null,
      city: form.city || null,
      postal_code: form.postal_code || null,
      website: form.website || null,
      sector: form.sector || null,
      assigned_to: form.assigned_to || null,
      source: form.source || null,
      notes: form.notes || null,
      estimated_value: Math.max(0, form.estimated_value),
    };

    if (isEditing && client) {
      await updateClient.mutateAsync({ id: client.id, ...payload });
    } else {
      await createClient.mutateAsync(payload);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{isEditing ? 'Editar cliente' : 'Nuevo cliente'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic info */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Información básica</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Nombre / Razón Social *</Label>
                <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Teléfono</Label>
                <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Sector</Label>
                <Select value={form.sector} onValueChange={(v) => handleChange('sector', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar sector" /></SelectTrigger>
                  <SelectContent>
                    {AUDIT_SECTORS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Commercial info */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Información comercial</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Estado</Label>
                <Select value={form.status} onValueChange={(v) => handleChange('status', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Etapa Pipeline</Label>
                <Select value={form.pipeline_stage} onValueChange={(v) => handleChange('pipeline_stage', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Valor estimado (€)</Label>
                <Input type="number" min="0" value={form.estimated_value} onChange={(e) => handleChange('estimated_value', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Origen del contacto</Label>
                <Select value={form.source} onValueChange={(v) => handleChange('source', v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar origen" /></SelectTrigger>
                  <SelectContent>
                    {CLIENT_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Responsable</Label>
                <Input value={form.assigned_to} onChange={(e) => handleChange('assigned_to', e.target.value)} placeholder="Nombre del responsable" />
              </div>
            </div>
          </div>

          {/* Fiscal Data */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Datos fiscales</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">NIF/CIF</Label>
                <Input value={form.nif_cif} onChange={(e) => handleChange('nif_cif', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Sitio Web</Label>
                <Input value={form.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Dirección fiscal</Label>
                <Input value={form.fiscal_address} onChange={(e) => handleChange('fiscal_address', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Ciudad</Label>
                <Input value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Código postal</Label>
                <Input value={form.postal_code} onChange={(e) => handleChange('postal_code', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">País</Label>
                <Input value={form.country} onChange={(e) => handleChange('country', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs">Notas internas</Label>
            <Textarea value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={3} placeholder="Notas sobre el cliente, servicios de interés, etc." />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={createClient.isPending || updateClient.isPending}>
              {isEditing ? 'Guardar cambios' : 'Crear cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
