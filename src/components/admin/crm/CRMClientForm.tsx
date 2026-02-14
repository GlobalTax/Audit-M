import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateCRMClient, useUpdateCRMClient, type CRMClient, type CRMClientStatus, type CRMPipelineStage } from '@/hooks/useCRMClients';
import { toast } from 'sonner';

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
  { value: 'propuesta', label: 'Propuesta' },
  { value: 'negociacion', label: 'Negociación' },
  { value: 'cerrado_ganado', label: 'Cerrado Ganado' },
  { value: 'cerrado_perdido', label: 'Cerrado Perdido' },
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

  const handleChange = (field: string, value: any) => {
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
          <DialogTitle>{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre / Razón Social *</Label>
              <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sector</Label>
              <Input value={form.sector} onChange={(e) => handleChange('sector', e.target.value)} placeholder="Ej: Tecnología, Salud..." />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => handleChange('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Etapa Pipeline</Label>
              <Select value={form.pipeline_stage} onValueChange={(v) => handleChange('pipeline_stage', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Valor Estimado (€)</Label>
              <Input type="number" min="0" value={form.estimated_value} onChange={(e) => handleChange('estimated_value', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Origen</Label>
              <Input value={form.source} onChange={(e) => handleChange('source', e.target.value)} placeholder="Web, Referido, Evento..." />
            </div>
          </div>

          {/* Fiscal Data */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">Datos Fiscales</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>NIF/CIF</Label>
                <Input value={form.nif_cif} onChange={(e) => handleChange('nif_cif', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Dirección Fiscal</Label>
                <Input value={form.fiscal_address} onChange={(e) => handleChange('fiscal_address', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Código Postal</Label>
                <Input value={form.postal_code} onChange={(e) => handleChange('postal_code', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>País</Label>
                <Input value={form.country} onChange={(e) => handleChange('country', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Sitio Web</Label>
                <Input value={form.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Responsable</Label>
            <Input value={form.assigned_to} onChange={(e) => handleChange('assigned_to', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={3} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={createClient.isPending || updateClient.isPending}>
              {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
