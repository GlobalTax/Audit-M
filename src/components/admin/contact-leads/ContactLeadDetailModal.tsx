import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { ContactLead } from "@/hooks/useContactLeads";
import { useState } from "react";

interface ContactLeadDetailModalProps {
  lead: ContactLead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, emailSent: boolean, responseNotes?: string) => void;
  onDelete: (id: string) => void;
}

export const ContactLeadDetailModal = ({
  lead,
  open,
  onOpenChange,
  onUpdateStatus,
  onDelete,
}: ContactLeadDetailModalProps) => {
  const [responseNotes, setResponseNotes] = useState(lead?.response_notes || "");

  if (!lead) return null;

  const handleSaveResponse = () => {
    onUpdateStatus(lead.id, true, responseNotes);
    onOpenChange(false);
  };

  const emailTemplate = `Estimado/a ${lead.name},

Gracias por contactar con NRRO Tax & Legal.

Hemos recibido su consulta y nuestro equipo la está revisando. Nos pondremos en contacto con usted en las próximas 24-48 horas.

Si necesita asistencia urgente, no dude en llamarnos al +34 XXX XXX XXX.

Saludos cordiales,
Equipo NRRO Tax & Legal`;

  const mailtoLink = `mailto:${lead.email}?subject=Re: ${lead.subject}&body=${encodeURIComponent(emailTemplate)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalle del Contacto</span>
            <Badge variant={lead.email_sent ? "default" : "secondary"}>
              {lead.email_sent ? "Respondido" : "Pendiente"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Cliente */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Nombre</Label>
              <p className="font-medium">{lead.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{lead.email}</p>
            </div>
            {lead.company && (
              <div>
                <Label className="text-muted-foreground">Empresa</Label>
                <p className="font-medium">{lead.company}</p>
              </div>
            )}
            {lead.service_type && (
              <div>
                <Label className="text-muted-foreground">Tipo de Servicio</Label>
                <p className="font-medium capitalize">{lead.service_type.replace('_', ' ')}</p>
              </div>
            )}
          </div>

          {/* Asunto */}
          <div>
            <Label className="text-muted-foreground">Asunto</Label>
            <p className="font-medium mt-1">{lead.subject}</p>
          </div>

          {/* Mensaje */}
          <div>
            <Label className="text-muted-foreground">Mensaje</Label>
            <div className="mt-1 p-4 bg-muted/50 rounded-md">
              <p className="whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>

          {/* Información Técnica */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-md">
            <div>
              <Label className="text-xs text-muted-foreground">Fecha de Contacto</Label>
              <p className="text-sm">{format(new Date(lead.created_at), "dd/MM/yyyy HH:mm")}</p>
            </div>
            {lead.ip_address && (
              <div>
                <Label className="text-xs text-muted-foreground">IP Address</Label>
                <p className="text-sm font-mono">{lead.ip_address}</p>
              </div>
            )}
            {lead.user_agent && (
              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground">User Agent</Label>
                <p className="text-xs font-mono text-muted-foreground truncate">{lead.user_agent}</p>
              </div>
            )}
          </div>

          {/* Estado de Respuesta */}
          {lead.responded_at && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-md border border-green-200 dark:border-green-800">
              <Label className="text-sm font-medium text-green-800 dark:text-green-200">
                Respondido el {format(new Date(lead.responded_at), "dd/MM/yyyy HH:mm")}
              </Label>
              {lead.response_notes && (
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">{lead.response_notes}</p>
              )}
            </div>
          )}

          {/* Notas de Respuesta */}
          <div>
            <Label htmlFor="response-notes">Notas de Respuesta (Interno)</Label>
            <Textarea
              id="response-notes"
              value={responseNotes}
              onChange={(e) => setResponseNotes(e.target.value)}
              placeholder="Agregar notas sobre la respuesta o seguimiento..."
              rows={4}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-wrap gap-2 sm:justify-between">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar este contacto?")) {
                  onDelete(lead.id);
                  onOpenChange(false);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(mailtoLink, '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Responder
            </Button>
            {!lead.email_sent ? (
              <Button
                size="sm"
                onClick={handleSaveResponse}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Marcar Respondido
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(lead.id, false)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Marcar Pendiente
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
