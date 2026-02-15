import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import type { EnrichmentData } from '@/lib/api/firecrawl';

interface CRMEnrichDialogProps {
  open: boolean;
  onClose: () => void;
  enrichedData: EnrichmentData;
  currentData: Record<string, string | null | undefined>;
  onApply: (fieldsToUpdate: Partial<EnrichmentData>) => void;
  isApplying?: boolean;
}

const FIELD_LABELS: Record<string, string> = {
  description: 'Descripción / Notas',
  sector: 'Sector',
  phone: 'Teléfono',
  email: 'Email',
  address: 'Dirección fiscal',
  city: 'Ciudad',
  postal_code: 'Código postal',
  country: 'País',
};

const FIELD_TO_CLIENT_KEY: Record<string, string> = {
  description: 'notes',
  sector: 'sector',
  phone: 'phone',
  email: 'email',
  address: 'fiscal_address',
  city: 'city',
  postal_code: 'postal_code',
  country: 'country',
};

export function CRMEnrichDialog({ open, onClose, enrichedData, currentData, onApply, isApplying }: CRMEnrichDialogProps) {
  const fields = Object.entries(enrichedData).filter(([_, value]) => value && String(value).trim());

  const [selected, setSelected] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    fields.forEach(([key]) => {
      const clientKey = FIELD_TO_CLIENT_KEY[key] || key;
      if (!currentData[clientKey] || !String(currentData[clientKey]).trim()) {
        initial.add(key);
      }
    });
    return initial;
  });

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleApply = () => {
    const updates: Partial<EnrichmentData> = {};
    selected.forEach((key) => {
      (updates as any)[key] = (enrichedData as any)[key];
    });
    onApply(updates);
  };

  if (fields.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sin datos encontrados</DialogTitle>
            <DialogDescription>No se ha podido extraer información de la web de esta empresa.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            Datos extraídos de la web
          </DialogTitle>
          <DialogDescription>
            Selecciona los campos que quieres actualizar. Los campos vacíos se preseleccionan automáticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[400px] overflow-y-auto py-2">
          {fields.map(([key, value]) => {
            const clientKey = FIELD_TO_CLIENT_KEY[key] || key;
            const current = currentData[clientKey];
            const isEmpty = !current || !String(current).trim();

            return (
              <label
                key={key}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-200 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selected.has(key)}
                  onCheckedChange={() => toggle(key)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{FIELD_LABELS[key] || key}</span>
                    {isEmpty && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">vacío</span>
                    )}
                  </div>
                  <p className="text-sm text-indigo-600 mt-0.5 truncate">{String(value)}</p>
                  {!isEmpty && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">Actual: {String(current)}</p>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleApply}
            disabled={selected.size === 0 || isApplying}
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-700"
          >
            {isApplying ? 'Guardando...' : `Aplicar ${selected.size} campo${selected.size !== 1 ? 's' : ''}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
