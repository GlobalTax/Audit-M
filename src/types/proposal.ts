export interface ProposalService {
  id: string;
  name: string;
  nameEs: string;
  nameCa: string;
  description: string;
  descriptionEs: string;
  descriptionCa: string;
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
  language: 'en' | 'es' | 'ca';
}

export const AVAILABLE_SERVICES = [
  {
    id: 'statutory-audit',
    name: 'Statutory Audit',
    nameEs: 'Auditoría de Cuentas Anuales',
    nameCa: 'Auditoria de Comptes Anuals',
    description: 'Independent audit of annual financial statements in accordance with ISA and Spanish auditing standards (NIA-ES). Includes planning, risk assessment, substantive testing, and issuance of audit report.',
    descriptionEs: 'Auditoría independiente de cuentas anuales conforme a las NIA-ES y normativa española de auditoría. Incluye planificación, evaluación de riesgos, pruebas sustantivas y emisión de informe de auditoría.',
    descriptionCa: 'Auditoria independent de comptes anuals d\'acord amb les NIA-ES i normativa espanyola d\'auditoria. Inclou planificació, avaluació de riscos, proves substantives i emissió d\'informe d\'auditoria.',
  },
  {
    id: 'consolidation-audit',
    name: 'Consolidation Audit',
    nameEs: 'Auditoría de Consolidación',
    nameCa: 'Auditoria de Consolidació',
    description: 'Audit of consolidated financial statements for corporate groups. Covers intercompany eliminations, goodwill assessment, and compliance with IFRS/Spanish GAAP consolidation requirements.',
    descriptionEs: 'Auditoría de estados financieros consolidados para grupos empresariales. Incluye eliminaciones intercompañía, evaluación de fondo de comercio y cumplimiento con NIIF/PGC en materia de consolidación.',
    descriptionCa: 'Auditoria d\'estats financers consolidats per a grups empresarials. Inclou eliminacions intercompanyia, avaluació de fons de comerç i compliment amb NIIF/PGC en matèria de consolidació.',
  },
  {
    id: 'financial-due-diligence',
    name: 'Financial Due Diligence',
    nameEs: 'Due Diligence Financiera',
    nameCa: 'Due Diligence Financera',
    description: 'Comprehensive financial review for M&A transactions, investments, and corporate restructurings. Analysis of historical financials, quality of earnings, working capital, and key risk identification.',
    descriptionEs: 'Revisión financiera integral para operaciones de M&A, inversiones y reestructuraciones corporativas. Análisis de estados financieros históricos, calidad de beneficios, capital circulante e identificación de riesgos clave.',
    descriptionCa: 'Revisió financera integral per a operacions de M&A, inversions i reestructuracions corporatives. Anàlisi d\'estats financers històrics, qualitat de beneficis, capital circulant i identificació de riscos clau.',
  },
  {
    id: 'grant-audit',
    name: 'Grant & Subsidy Audit',
    nameEs: 'Auditoría de Subvenciones',
    nameCa: 'Auditoria de Subvencions',
    description: 'Independent audit and justification of public grants and subsidies. Verification of eligible expenses, compliance with grant conditions, and issuance of required reports for funding bodies.',
    descriptionEs: 'Auditoría independiente y justificación de subvenciones y ayudas públicas. Verificación de gastos elegibles, cumplimiento de condiciones de la subvención y emisión de informes requeridos por organismos financiadores.',
    descriptionCa: 'Auditoria independent i justificació de subvencions i ajudes públiques. Verificació de despeses elegibles, compliment de condicions de la subvenció i emissió d\'informes requerits per organismes finançadors.',
  },
  {
    id: 'limited-review',
    name: 'Limited Review',
    nameEs: 'Revisión Limitada',
    nameCa: 'Revisió Limitada',
    description: 'Engagement providing limited assurance on financial statements through analytical procedures and inquiries, without full audit scope. Suitable for interim reporting or specific requirements.',
    descriptionEs: 'Encargo que proporciona aseguramiento limitado sobre estados financieros mediante procedimientos analíticos e indagaciones, sin el alcance completo de una auditoría. Adecuada para informes intermedios o requisitos específicos.',
    descriptionCa: 'Encàrrec que proporciona assegurament limitat sobre estats financers mitjançant procediments analítics i indagacions, sense l\'abast complet d\'una auditoria. Adequada per a informes intermedis o requisits específics.',
  },
  {
    id: 'expert-reports',
    name: 'Expert Reports & Valuations',
    nameEs: 'Informes Periciales y Valoraciones',
    nameCa: 'Informes Pericials i Valoracions',
    description: 'Expert financial reports for judicial proceedings, company valuations, fairness opinions, and independent expert assessments as required by Spanish corporate law.',
    descriptionEs: 'Informes periciales financieros para procedimientos judiciales, valoraciones de empresas, fairness opinions y dictámenes de experto independiente conforme a la legislación mercantil española.',
    descriptionCa: 'Informes pericials financers per a procediments judicials, valoracions d\'empreses, fairness opinions i dictàmens d\'expert independent d\'acord amb la legislació mercantil espanyola.',
  },
  {
    id: 'agreed-procedures',
    name: 'Agreed-Upon Procedures',
    nameEs: 'Procedimientos Acordados',
    nameCa: 'Procediments Acordats',
    description: 'Customized engagement performing specific procedures agreed with the client on defined financial information. Findings reported factually without providing assurance or opinion.',
    descriptionEs: 'Encargo personalizado realizando procedimientos específicos acordados con el cliente sobre información financiera definida. Los hallazgos se informan de forma factual sin proporcionar aseguramiento ni opinión.',
    descriptionCa: 'Encàrrec personalitzat realitzant procediments específics acordats amb el client sobre informació financera definida. Les troballes s\'informen de forma factual sense proporcionar assegurament ni opinió.',
  },
  {
    id: 'internal-audit',
    name: 'Internal Audit',
    nameEs: 'Auditoría Interna',
    nameCa: 'Auditoria Interna',
    description: 'Design and execution of internal audit plans, evaluation of internal controls, risk management processes, and operational efficiency assessments.',
    descriptionEs: 'Diseño y ejecución de planes de auditoría interna, evaluación de controles internos, procesos de gestión de riesgos y evaluaciones de eficiencia operativa.',
    descriptionCa: 'Disseny i execució de plans d\'auditoria interna, avaluació de controls interns, processos de gestió de riscos i avaluacions d\'eficiència operativa.',
  },
] as const;

export type ServiceId = typeof AVAILABLE_SERVICES[number]['id'];
