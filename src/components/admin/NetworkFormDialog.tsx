import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoUpload } from "./LogoUpload";

interface NetworkData {
  name: string;
  shortName: string;
  description: string;
  website_url: string;
  logo_url: string;
}

interface NetworkFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (network: NetworkData) => void;
  initialData?: NetworkData;
  mode: "create" | "edit";
}

export const NetworkFormDialog = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  mode,
}: NetworkFormDialogProps) => {
  const [formData, setFormData] = useState<NetworkData>({
    name: "",
    shortName: "",
    description: "",
    website_url: "",
    logo_url: "",
  });

  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
    } else if (!open) {
      setFormData({ name: "", shortName: "", description: "", website_url: "", logo_url: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.shortName.trim() || !formData.description.trim()) {
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  const isValid = formData.name.trim() && formData.shortName.trim() && formData.description.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Añadir Nueva Red" : "Editar Red"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Integra International"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortName">
                Nombre corto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="shortName"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                placeholder="Ej: II"
                required
              />
              <p className="text-xs text-muted-foreground">
                Se muestra si no hay logo
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Descripción <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción de la red internacional..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">URL del sitio web</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://www.ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo (opcional)</Label>
            <LogoUpload
              value={formData.logo_url}
              onChange={(url) => setFormData({ ...formData, logo_url: url })}
            />
            <p className="text-xs text-muted-foreground">
              Si no se sube logo, se mostrará el nombre corto
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              {mode === "create" ? "Añadir Red" : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
