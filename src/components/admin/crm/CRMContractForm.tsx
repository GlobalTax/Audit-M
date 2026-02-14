import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateCRMContract, useUpdateCRMContract, type CRMContract, type CRMContractStatus } from '@/hooks/useCRMContracts';
import { toast } from 'sonner';

interface CRMContractFormProps {
  clientId: string;
  open: boolean;
  onClose: () => void;
  contract?: CRMContract | null;
}

const STATUSES: { value: CRMContractStatus; label: string }[] = [
  { value: 'activo', label: 'Activo' },
  { value: 'pausado', label: 'Pausado' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'renovacion_pendiente', label: 'Renovación Pendiente' },
];

export const CRMContractForm = ({ clientId, open, onClose, contract }: CRMContractFormProps) => {
  const createContract = useCreateCRMContract();
  const updateContract = useUpdateCRMContract();
  const isEditing = !!contract;

  const [form, setForm] = useState({
    service_name: contract?.service_name || '',
    status: contract?.status || 'activo' as CRMContractStatus,
    start_date: contract?.start_date || '',
    end_date: contract?.end_date || '',
    amount: contract?.amount || 0,
    billing_frequency: contract?.billing_frequency || 'mensual',
    notes: contract?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service_name.trim()) return;

    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      toast.error('La fecha de fin no puede ser anterior a la de inicio');
      return;
    }

    const payload = {
      ...form,
      amount: Math.max(0, form.amount),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      notes: form.notes || null,
    };

    if (isEditing && contract) {
      await updateContract.mutateAsync({ id: contract.id, ...payload });
    } else {
      await createContract.mutateAsync({ client_id: clientId, ...payload });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Contrato' : 'Nuevo Contrato'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Servicio *</Label>
            <Input value={form.service_name} onChange={(e) => setForm((p) => ({ ...p, service_name: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v as CRMContractStatus }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Facturación</Label>
              <Select value={form.billing_frequency} onValueChange={(v) => setForm((p) => ({ ...p, billing_frequency: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha Inicio</Label>
              <Input type="date" value={form.start_date} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Fecha Fin</Label>
              <Input type="date" value={form.end_date} onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Importe (€)</Label>
            <Input type="number" min="0" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: parseFloat(e.target.value) || 0 }))} />
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} rows={2} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={createContract.isPending || updateContract.isPending}>
              {isEditing ? 'Guardar' : 'Crear Contrato'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
