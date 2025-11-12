import { ContactLead } from "@/hooks/useContactLeads";
import { exportToCSV, exportToExcel } from "./exportUtils";
import { format } from "date-fns";

interface ExportContactLeadData {
  Fecha: string;
  Nombre: string;
  Email: string;
  Empresa: string;
  Asunto: string;
  Mensaje: string;
  "Tipo de Servicio": string;
  Estado: string;
  "IP Address": string;
  "Respondido el": string;
  "Notas de Respuesta": string;
}

export const exportContactLeadsToCSV = (leads: ContactLead[], filename?: string) => {
  const exportData: ExportContactLeadData[] = leads.map((lead) => ({
    Fecha: format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
    Nombre: lead.name,
    Email: lead.email,
    Empresa: lead.company || "N/A",
    Asunto: lead.subject,
    Mensaje: lead.message,
    "Tipo de Servicio": lead.service_type ? lead.service_type.replace('_', ' ') : "N/A",
    Estado: lead.email_sent ? "Respondido" : "Pendiente",
    "IP Address": lead.ip_address || "N/A",
    "Respondido el": lead.responded_at ? format(new Date(lead.responded_at), "dd/MM/yyyy HH:mm") : "N/A",
    "Notas de Respuesta": lead.response_notes || "N/A",
  }));

  const defaultFilename = `contactos-${format(new Date(), "yyyy-MM-dd")}.csv`;
  exportToCSV(exportData, filename || defaultFilename);
};

export const exportContactLeadsToExcel = (leads: ContactLead[], filename?: string) => {
  const exportData: ExportContactLeadData[] = leads.map((lead) => ({
    Fecha: format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
    Nombre: lead.name,
    Email: lead.email,
    Empresa: lead.company || "N/A",
    Asunto: lead.subject,
    Mensaje: lead.message,
    "Tipo de Servicio": lead.service_type ? lead.service_type.replace('_', ' ') : "N/A",
    Estado: lead.email_sent ? "Respondido" : "Pendiente",
    "IP Address": lead.ip_address || "N/A",
    "Respondido el": lead.responded_at ? format(new Date(lead.responded_at), "dd/MM/yyyy HH:mm") : "N/A",
    "Notas de Respuesta": lead.response_notes || "N/A",
  }));

  const defaultFilename = `contactos-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
  exportToExcel(exportData, filename || defaultFilename);
};
