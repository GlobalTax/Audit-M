import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoUpload } from "./LogoUpload";

interface LogoData {
  name: string;
  logo_url: string;
  website_url?: string;
}

interface LogoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (logo: LogoData) => void;
  initialData?: LogoData;
  mode: "create" | "edit";
}

export const LogoFormDialog = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  mode,
}: LogoFormDialogProps) => {
  const [formData, setFormData] = useState<LogoData>({
    name: "",
    logo_url: "",
    website_url: "",
  });

  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
    } else if (!open) {
      setFormData({ name: "", logo_url: "", website_url: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.logo_url) {
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  const isValid = formData.name.trim() && formData.logo_url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Logo" : "Edit Logo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Company name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Microsoft"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              Logo <span className="text-destructive">*</span>
            </Label>
            <LogoUpload
              value={formData.logo_url}
              onChange={(url) => setFormData({ ...formData, logo_url: url })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL (optional)</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url || ""}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              {mode === "create" ? "Add Logo" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
