import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Award, AwardInsert } from "@/hooks/useAwards";

interface AwardFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  award?: Award | null;
  onSubmit: (data: AwardInsert) => void;
  isLoading?: boolean;
}

const CATEGORIES = ["PREMIO", "BEST", "TOP", "AWARD", "EXCELLENCE"];

export function AwardFormDialog({
  open,
  onOpenChange,
  award,
  onSubmit,
  isLoading,
}: AwardFormDialogProps) {
  const [formData, setFormData] = useState<AwardInsert>({
    name: "",
    category: "PREMIO",
    short_name: "",
    year: new Date().getFullYear().toString(),
    organization: "",
    display_order: 0,
    is_active: true,
    source_site: "int",
  });

  useEffect(() => {
    if (award) {
      setFormData({
        name: award.name,
        category: award.category,
        short_name: award.short_name,
        year: award.year,
        organization: award.organization,
        display_order: award.display_order,
        is_active: award.is_active,
        source_site: award.source_site || "int",
      });
    } else {
      setFormData({
        name: "",
        category: "PREMIO",
        short_name: "",
        year: new Date().getFullYear().toString(),
        organization: "",
        display_order: 0,
        is_active: true,
        source_site: "int",
      });
    }
  }, [award, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {award ? "Editar Award" : "Nuevo Award"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="XIX Edición Premios Emprendedores"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_name">Nombre corto *</Label>
              <Input
                id="short_name"
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                placeholder="EMPRENDEDORES"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Año *</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organización *</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Emprendedores"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_order">Orden</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between pt-6">
              <Label htmlFor="is_active">Activo</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : award ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
