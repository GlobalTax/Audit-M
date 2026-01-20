import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBulkCreateContactLeads } from "@/hooks/useContactLeads";
import { Loader2, Upload, FileSpreadsheet, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Papa from "papaparse";

interface ImportLeadsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CSVRow {
  nombre?: string;
  name?: string;
  email?: string;
  telefono?: string;
  phone?: string;
  empresa?: string;
  company?: string;
  asunto?: string;
  subject?: string;
  mensaje?: string;
  message?: string;
  origen?: string;
  source?: string;
  servicio?: string;
  service?: string;
}

interface ParsedLead {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  lead_source: string;
  service_type: string | null;
  isValid: boolean;
  errors: string[];
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const mapLeadSource = (source: string | undefined): string => {
  if (!source) return "whatsapp";
  const lower = source.toLowerCase();
  if (lower.includes("whatsapp") || lower.includes("wa")) return "whatsapp";
  if (lower.includes("phone") || lower.includes("telefono") || lower.includes("tel")) return "phone";
  if (lower.includes("web")) return "web";
  if (lower.includes("referr") || lower.includes("referido")) return "referral";
  return "other";
};

export function ImportLeadsDialog({ open, onOpenChange }: ImportLeadsDialogProps) {
  const [parsedLeads, setParsedLeads] = useState<ParsedLead[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const bulkCreate = useBulkCreateContactLeads();

  const parseCSV = useCallback((file: File) => {
    setFileName(file.name);
    
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const leads: ParsedLead[] = results.data.map((row) => {
          const errors: string[] = [];
          const name = row.nombre || row.name || "";
          const email = row.email || "";
          const phone = row.telefono || row.phone || null;
          const company = row.empresa || row.company || null;
          const subject = row.asunto || row.subject || "Consulta vía WhatsApp";
          const message = row.mensaje || row.message || "Contacto importado desde CSV";
          const lead_source = mapLeadSource(row.origen || row.source);
          const service_type = row.servicio || row.service || null;

          if (!name || name.length < 2) errors.push("Nombre requerido");
          if (!email || !validateEmail(email)) errors.push("Email inválido");

          return {
            name,
            email,
            phone,
            company,
            subject,
            message,
            lead_source,
            service_type,
            isValid: errors.length === 0,
            errors,
          };
        });
        setParsedLeads(leads);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
        parseCSV(file);
      }
    },
    [parseCSV]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseCSV(file);
    }
  };

  const handleImport = async () => {
    type ServiceType = "empresa_familiar" | "financial_planning" | "legal_advisory" | "other" | "tax_advisory";
    const validServiceTypes: ServiceType[] = ["empresa_familiar", "financial_planning", "legal_advisory", "other", "tax_advisory"];
    
    const validLeads = parsedLeads.filter((l) => l.isValid);
    await bulkCreate.mutateAsync(
      validLeads.map((l) => ({
        name: l.name,
        email: l.email,
        phone: l.phone,
        company: l.company,
        subject: l.subject,
        message: l.message,
        lead_source: l.lead_source,
        service_type: l.service_type && validServiceTypes.includes(l.service_type as ServiceType) 
          ? l.service_type as ServiceType 
          : null,
        email_sent: false,
      }))
    );
    setParsedLeads([]);
    setFileName(null);
    onOpenChange(false);
  };

  const validCount = parsedLeads.filter((l) => l.isValid).length;
  const invalidCount = parsedLeads.filter((l) => !l.isValid).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Importar Leads desde CSV
          </DialogTitle>
          <DialogDescription>
            Sube un archivo CSV con las columnas: nombre/name, email, telefono/phone, empresa/company, asunto/subject, mensaje/message, origen/source
          </DialogDescription>
        </DialogHeader>

        {parsedLeads.length === 0 ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Arrastra un archivo CSV aquí o
            </p>
            <label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span>Seleccionar archivo</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setParsedLeads([]);
                  setFileName(null);
                }}
              >
                Cambiar archivo
              </Button>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-4 w-4" />
                {validCount} válidos
              </div>
              {invalidCount > 0 && (
                <div className="flex items-center gap-1 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {invalidCount} con errores
                </div>
              )}
            </div>

            <div className="max-h-[300px] overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Estado</th>
                    <th className="p-2 text-left">Nombre</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Origen</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedLeads.map((lead, idx) => (
                    <tr
                      key={idx}
                      className={cn(
                        "border-t",
                        !lead.isValid && "bg-destructive/5"
                      )}
                    >
                      <td className="p-2">
                        {lead.isValid ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <span
                            className="text-destructive text-xs"
                            title={lead.errors.join(", ")}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </span>
                        )}
                      </td>
                      <td className="p-2">{lead.name || "-"}</td>
                      <td className="p-2">{lead.email || "-"}</td>
                      <td className="p-2 capitalize">{lead.lead_source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleImport}
                disabled={validCount === 0 || bulkCreate.isPending}
              >
                {bulkCreate.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Importar {validCount} leads
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
