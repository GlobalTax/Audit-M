import type { CRMClientStatus, CRMPipelineStage } from '@/hooks/useCRMClients';
import type { CRMContractStatus } from '@/hooks/useCRMContracts';
import type { CRMInteractionType } from '@/hooks/useCRMInteractions';

// --- Client constants ---

export const CLIENT_STATUS_COLORS: Record<CRMClientStatus, string> = {
  prospecto: 'bg-blue-100 text-blue-800',
  activo: 'bg-green-100 text-green-800',
  inactivo: 'bg-gray-100 text-gray-800',
  perdido: 'bg-red-100 text-red-800',
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
  propuesta: 'Propuesta',
  negociacion: 'Negociación',
  cerrado_ganado: 'Cerrado Ganado',
  cerrado_perdido: 'Cerrado Perdido',
};

export const PIPELINE_STAGES: CRMPipelineStage[] = [
  'nuevo', 'contactado', 'propuesta', 'negociacion', 'cerrado_ganado', 'cerrado_perdido',
];

// --- Contract constants ---

export const CONTRACT_STATUS_COLORS: Record<CRMContractStatus, string> = {
  activo: 'bg-green-100 text-green-800',
  pausado: 'bg-yellow-100 text-yellow-800',
  finalizado: 'bg-gray-100 text-gray-800',
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

// --- Helpers ---

/** Sanitize search term for use in Supabase ilike queries (escapes % and _) */
export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_\\]/g, '\\$&');
}

/** Format currency in EUR with Spanish locale, with null safety */
export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '0';
  return value.toLocaleString('es-ES');
}

/** Get local datetime string for datetime-local inputs (YYYY-MM-DDTHH:mm) */
export function getLocalDateTimeString(date: Date = new Date()): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

/** Check if a contract is expiring within the given number of days */
export function isContractExpiringSoon(endDate: string | null, withinDays = 30): boolean {
  if (!endDate) return false;
  const end = new Date(endDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= withinDays;
}
