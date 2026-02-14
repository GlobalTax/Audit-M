import type { CRMClientStatus, CRMPipelineStage } from '@/hooks/useCRMClients';
import type { CRMContractStatus } from '@/hooks/useCRMContracts';
import type { CRMInteractionType } from '@/hooks/useCRMInteractions';

// --- Client constants ---

export const CLIENT_STATUS_COLORS: Record<CRMClientStatus, string> = {
  prospecto: 'bg-sky-100 text-sky-800',
  activo: 'bg-emerald-100 text-emerald-800',
  inactivo: 'bg-slate-100 text-slate-600',
  perdido: 'bg-red-100 text-red-700',
};

export const CLIENT_STATUS_LABELS: Record<CRMClientStatus, string> = {
  prospecto: 'Prospecto',
  activo: 'Activo',
  inactivo: 'Inactivo',
  perdido: 'Perdido',
};

// --- Pipeline constants ---

export const PIPELINE_LABELS: Record<CRMPipelineStage, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  propuesta: 'Propuesta enviada',
  negociacion: 'En negociación',
  cerrado_ganado: 'Cerrado',
  cerrado_perdido: 'Descartado',
};

export const PIPELINE_STAGE_COLORS: Record<CRMPipelineStage, { bg: string; text: string; accent: string }> = {
  nuevo: { bg: 'bg-sky-50', text: 'text-sky-700', accent: '#0ea5e9' },
  contactado: { bg: 'bg-blue-50', text: 'text-blue-700', accent: '#3b82f6' },
  propuesta: { bg: 'bg-violet-50', text: 'text-violet-700', accent: '#8b5cf6' },
  negociacion: { bg: 'bg-amber-50', text: 'text-amber-700', accent: '#f59e0b' },
  cerrado_ganado: { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: '#10b981' },
  cerrado_perdido: { bg: 'bg-slate-50', text: 'text-slate-500', accent: '#94a3b8' },
};

export const PIPELINE_STAGES: CRMPipelineStage[] = [
  'nuevo', 'contactado', 'propuesta', 'negociacion', 'cerrado_ganado', 'cerrado_perdido',
];

// --- Contract constants ---

export const CONTRACT_STATUS_COLORS: Record<CRMContractStatus, string> = {
  activo: 'bg-emerald-100 text-emerald-800',
  pausado: 'bg-amber-100 text-amber-800',
  finalizado: 'bg-slate-100 text-slate-600',
  renovacion_pendiente: 'bg-orange-100 text-orange-800',
};

export const CONTRACT_STATUS_LABELS: Record<CRMContractStatus, string> = {
  activo: 'Activo',
  pausado: 'Pausado',
  finalizado: 'Finalizado',
  renovacion_pendiente: 'Renovación Pendiente',
};

// --- Interaction constants ---

export const INTERACTION_TYPE_LABELS: Record<CRMInteractionType, string> = {
  llamada: 'Llamada',
  email: 'Email',
  reunion: 'Reunión',
  nota: 'Nota',
  tarea: 'Tarea',
};

// --- Audit-specific constants ---

export const AUDIT_SERVICE_TYPES = [
  'Auditoría de Cuentas Anuales',
  'Auditoría Fiscal',
  'Due Diligence',
  'Compliance',
  'Consultoría Fiscal',
  'Asesoría Legal',
  'Auditoría Interna',
  'Valoración de Empresas',
  'Reestructuración',
  'Otro',
] as const;

export const AUDIT_SECTORS = [
  'Tecnología',
  'Salud',
  'Inmobiliario',
  'Industrial',
  'Servicios Financieros',
  'Retail',
  'Energía',
  'Educación',
  'Hostelería',
  'Construcción',
  'Transporte',
  'Alimentación',
  'Otro',
] as const;

export const CLIENT_SOURCES = [
  'Web',
  'Referido',
  'LinkedIn',
  'Evento',
  'Llamada en frío',
  'Directorio profesional',
  'Partner',
  'Otro',
] as const;

// --- Helpers ---

export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_\\]/g, '\\$&');
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '0';
  return value.toLocaleString('es-ES');
}

export function getLocalDateTimeString(date: Date = new Date()): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function isContractExpiringSoon(endDate: string | null, withinDays = 30): boolean {
  if (!endDate) return false;
  const end = new Date(endDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= withinDays;
}

export function getDaysInStage(updatedAt: string): number {
  const diff = new Date().getTime() - new Date(updatedAt).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getRiskLevel(estimatedValue: number | null): 'high' | 'medium' | 'low' {
  if (!estimatedValue) return 'low';
  if (estimatedValue >= 50000) return 'high';
  if (estimatedValue >= 15000) return 'medium';
  return 'low';
}

export const RISK_LABELS = {
  high: { label: 'Alto valor', color: 'bg-rose-100 text-rose-700' },
  medium: { label: 'Valor medio', color: 'bg-amber-100 text-amber-700' },
  low: { label: 'Valor base', color: 'bg-slate-100 text-slate-600' },
};
