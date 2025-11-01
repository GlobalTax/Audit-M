import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LogoUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onUploadProgress?: (progress: number) => void;
  className?: string;
}

export const LogoUpload = ({
  value,
  onChange,
  onUploadProgress,
  className = "",
}: LogoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "Solo se permiten imágenes JPG, PNG, SVG o WebP";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "El archivo debe ser menor a 2MB";
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    onUploadProgress?.(0);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("client-logos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("client-logos")
        .getPublicUrl(filePath);

      setUploadProgress(100);
      onUploadProgress?.(100);
      onChange(publicUrl);
      toast.success("Logo subido exitosamente");
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast.error(error.message || "Error al subir el logo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = (file: File) => {
    uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      const urlParts = value.split("/");
      const fileName = urlParts[urlParts.length - 1];
      
      const { error } = await supabase.storage
        .from("client-logos")
        .remove([fileName]);

      if (error) throw error;

      onChange("");
      toast.success("Logo eliminado");
    } catch (error: any) {
      console.error("Error removing logo:", error);
      toast.error("Error al eliminar el logo");
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/svg+xml,image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      {value ? (
        <div className="relative border-2 border-border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 flex items-center justify-center bg-muted rounded overflow-hidden">
              <img 
                src={value} 
                alt="Logo preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Logo cargado</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors hover:border-primary hover:bg-accent/50
            ${isDragging ? "border-primary bg-accent" : "border-border"}
            ${isUploading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <Upload className="h-8 w-8 text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  Subiendo... {uploadProgress}%
                </p>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Arrastra un logo aquí o haz clic
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, SVG o WebP (máx. 2MB)
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
