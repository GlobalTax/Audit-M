export interface ProposalService {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  monthlyFee: number;
  annualFee?: number;
  isOneTime?: boolean;
}

export interface ProposalData {
  // Client info
  clientName: string;
  companyName: string;
  clientEmail: string;
  clientPhone?: string;
  industry?: string;
  
  // Proposal info
  proposalDate: string;
  validUntil: string;
  proposalNumber: string;
  
  // Services
  selectedServices: ProposalService[];
  
  // Optional
  additionalNotes?: string;
  paymentTerms?: string;
  
  // Language
  language: 'en' | 'es';
}

export const AVAILABLE_SERVICES = [
  {
    id: 'fiscal',
    name: 'Tax Advisory',
    nameEs: 'Asesoría Fiscal',
    description: 'Comprehensive tax planning, compliance, and optimization strategies including corporate tax, VAT, and international tax structuring.',
    descriptionEs: 'Planificación fiscal integral, cumplimiento y estrategias de optimización incluyendo impuesto de sociedades, IVA y estructuración fiscal internacional.',
  },
  {
    id: 'accounting',
    name: 'Accounting Services',
    nameEs: 'Contabilidad',
    description: 'Full bookkeeping, financial statements preparation, management reporting, and annual accounts filing.',
    descriptionEs: 'Llevanza contable completa, preparación de estados financieros, reporting de gestión y depósito de cuentas anuales.',
  },
  {
    id: 'labor',
    name: 'Labour & Payroll',
    nameEs: 'Laboral y Nóminas',
    description: 'Payroll processing, employment contracts, social security compliance, and HR advisory including hiring and terminations.',
    descriptionEs: 'Gestión de nóminas, contratos laborales, cumplimiento de seguridad social y asesoramiento en RRHH incluyendo altas y bajas.',
  },
  {
    id: 'corporate',
    name: 'Corporate Legal',
    nameEs: 'Legal Corporativo',
    description: 'Company formation, corporate governance, commercial contracts, and regulatory compliance.',
    descriptionEs: 'Constitución de sociedades, gobierno corporativo, contratos mercantiles y cumplimiento normativo.',
  },
  {
    id: 'international-tax',
    name: 'International Tax',
    nameEs: 'Fiscalidad Internacional',
    description: 'Cross-border tax planning, double taxation treaty analysis, transfer pricing, and permanent establishment advisory.',
    descriptionEs: 'Planificación fiscal transfronteriza, análisis de convenios de doble imposición, precios de transferencia y asesoramiento sobre establecimiento permanente.',
  },
  {
    id: 'global-mobility',
    name: 'Global Mobility',
    nameEs: 'Movilidad Internacional',
    description: 'Expatriate tax advisory, Beckham Law applications, work permits, and international assignment structuring.',
    descriptionEs: 'Asesoramiento fiscal de expatriados, solicitudes de Ley Beckham, permisos de trabajo y estructuración de asignaciones internacionales.',
  },
] as const;

export type ServiceId = typeof AVAILABLE_SERVICES[number]['id'];
