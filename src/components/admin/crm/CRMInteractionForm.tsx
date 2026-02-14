import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateCRMInteraction, type CRMInteractionType } from '@/hooks/useCRMInteractions';
import { useAuth } from '@/contexts/AuthContext';
import { getLocalDateTimeString } from '@/lib/crm';

interface CRMInteractionFormProps {
  clientId: string;
  open: boolean;
  onClose: () => void;
}

const TYPES: { value: CRMInteractionType; label: string }[] = [
  { value: 'llamada', label: 'Llamada' },
  { value: 'email', label: 'Email' },
  { value: 'reunion', label: 'Reunión' },
  { value: 'nota', label: 'Nota' },
  { value: 'tarea', label: 'Tarea' },
];

export const CRMInteractionForm = ({ clientId, open, onClose }: CRMInteractionFormProps) => {
  const createInteraction = useCreateCRMInteraction();
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: 'nota' as CRMInteractionType,
    subject: '',
    description: '',
    date: getLocalDateTimeString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim()) return;
    await createInteraction.mutateAsync({
      client_id: clientId,
      type: form.type,
      subject: form.subject,
      description: form.description || null,
      date: new Date(form.date).toISOString(),
      created_by: user?.id ?? null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Interacción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v as CRMInteractionType }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="datetime-local" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Asunto *</Label>
            <Input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} required />
          </div>
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={createInteraction.isPending}>Registrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
