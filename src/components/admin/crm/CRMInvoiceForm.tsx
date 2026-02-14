import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCRMClients } from '@/hooks/useCRMClients';
import { useCRMContracts } from '@/hooks/useCRMContracts';
import { useNextInvoiceNumber, useCreateCRMInvoice, type CRMInvoiceStatus } from '@/hooks/useCRMInvoices';

interface CRMInvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INVOICE_STATUSES: { value: CRMInvoiceStatus; label: string }[] = [
  { value: 'borrador', label: 'Borrador' },
  { value: 'emitida', label: 'Emitida' },
  { value: 'pagada', label: 'Pagada' },
];

export function CRMInvoiceForm({ open, onOpenChange }: CRMInvoiceFormProps) {
  const { data: clients } = useCRMClients();
  const { data: nextNumber } = useNextInvoiceNumber();
  const createInvoice = useCreateCRMInvoice();

  const [clientId, setClientId] = useState('');
  const [contractId, setContractId] = useState('');
  const { data: contracts } = useCRMContracts(clientId || undefined);

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('21');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<CRMInvoiceStatus>('borrador');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (nextNumber) setInvoiceNumber(nextNumber);
  }, [nextNumber]);

  const numAmount = parseFloat(amount) || 0;
  const numTax = numAmount * (parseFloat(taxRate) / 100);
  const total = numAmount + numTax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !invoiceNumber || numAmount <= 0) return;

    createInvoice.mutate(
      {
        client_id: clientId,
        contract_id: contractId || null,
        invoice_number: invoiceNumber,
        issue_date: issueDate,
        due_date: dueDate || null,
        amount: numAmount,
        tax_amount: numTax,
        total_amount: total,
        status,
        service_description: description,
        notes: notes || null,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
        },
      }
    );
  };

  const resetForm = () => {
    setClientId('');
    setContractId('');
    setAmount('');
    setTaxRate('21');
    setDescription('');
    setStatus('borrador');
    setNotes('');
    setDueDate('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Nueva Factura</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-slate-500">Cliente *</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                <SelectContent>
                  {clients?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {clientId && contracts && contracts.length > 0 && (
              <div className="col-span-2">
                <Label className="text-xs text-slate-500">Contrato (opcional)</Label>
                <Select value={contractId} onValueChange={setContractId}>
                  <SelectTrigger><SelectValue placeholder="Sin contrato asociado" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin contrato</SelectItem>
                    {contracts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.service_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-xs text-slate-500">Nº Factura *</Label>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-slate-500">Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as CRMInvoiceStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INVOICE_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-slate-500">Fecha emisión *</Label>
              <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-slate-500">Fecha vencimiento</Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-slate-500">Concepto *</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del servicio" />
            </div>

            <div>
              <Label className="text-xs text-slate-500">Base imponible (€) *</Label>
              <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <Label className="text-xs text-slate-500">IVA (%)</Label>
              <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>

            <div className="col-span-2 flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-sm text-slate-600">
                <span>IVA: <strong>{numTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</strong></span>
              </div>
              <div className="text-base font-semibold text-slate-900">
                Total: {total.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </div>
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-slate-500">Notas internas</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={createInvoice.isPending || !clientId || numAmount <= 0}>
              {createInvoice.isPending ? 'Creando...' : 'Crear factura'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
