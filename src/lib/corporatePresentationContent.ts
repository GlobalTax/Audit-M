import { getCurrentSiteConfig } from '@/config/site';

const siteConfig = getCurrentSiteConfig();
const brandName = siteConfig.footer.brandName;
const domain = siteConfig.domain;

export const presentationContent = {
  en: {
    // Cover
    coverTitle: brandName,
    coverSubtitle: 'Audit & Assurance Services',
    coverTagline: 'Rigorous auditing. Trusted results.',

    // About Us
    aboutTitle: `About ${brandName}`,
    aboutText: `${brandName} is a professional audit firm based in Barcelona, registered with the ROAC (Official Register of Auditors) and member of the ICJCE (Institute of Chartered Accountants of Spain).

We provide independent, high-quality audit and assurance services to companies of all sizes, from SMEs to large corporate groups, applying International Standards on Auditing adapted to Spain (NIA-ES).

Our team of experienced auditors combines technical rigour with a deep understanding of business sectors, ensuring that every engagement delivers clarity, reliability, and value.`,

    aboutHighlights: [
      'ROAC-registered audit firm',
      'Member of ICJCE',
      'NIA-ES / ISA compliant methodologies',
      'Serving clients across multiple sectors',
    ],

    // Key Figures
    keyFiguresTitle: `${brandName} at a Glance`,
    keyFigures: [
      { value: '20+', label: 'Years of Experience' },
      { value: '300+', label: 'Audits Completed' },
      { value: '25+', label: 'Audit Professionals' },
      { value: '15+', label: 'Sectors Covered' },
      { value: '€500M+', label: 'Assets Audited' },
      { value: '100%', label: 'ROAC Compliance' },
    ],

    // Service Areas (previously Practice Areas)
    serviceAreasTitle: 'Our Service Areas',
    serviceAreas: [
      {
        name: 'Statutory Audit',
        description: 'Independent audit of annual accounts in accordance with NIA-ES, providing assurance to shareholders and stakeholders.',
      },
      {
        name: 'Consolidation Audit',
        description: 'Audit of consolidated financial statements for corporate groups under NOFCAC and IFRS standards.',
      },
      {
        name: 'Financial Due Diligence',
        description: 'In-depth financial analysis for M&A transactions, investments, and corporate restructurings.',
      },
      {
        name: 'Grant & Subsidy Audit',
        description: 'Justification and compliance audits for public subsidies, EU funds, and grant programmes.',
      },
      {
        name: 'Limited Review & Agreed Procedures',
        description: 'ISRE 2400/2410 limited reviews and ISRS 4400 agreed-upon procedures for specific assurance needs.',
      },
      {
        name: 'Internal Audit & Advisory',
        description: 'Internal control assessment, risk evaluation, and process improvement recommendations.',
      },
    ],

    // Team
    teamTitle: 'Leadership Team',
    teamMembers: [
      {
        name: 'Managing Partner',
        role: 'ROAC Auditor',
        credentials: 'Chartered Auditor & Economist',
      },
      {
        name: 'Audit Partner',
        role: 'ROAC Auditor',
        credentials: 'Financial Audit Specialist',
      },
      {
        name: 'Technical Partner',
        role: 'ROAC Auditor',
        credentials: 'IFRS & Consolidation Expert',
      },
      {
        name: 'Advisory Partner',
        role: 'Internal Audit',
        credentials: 'Risk & Compliance Specialist',
      },
    ],

    // Sectors
    sectorsTitle: 'Industry Experience',
    sectors: [
      'Technology & SaaS',
      'Real Estate & Construction',
      'Manufacturing & Industrial',
      'Hospitality & Tourism',
      'Financial Services',
      'Healthcare & Life Sciences',
      'Retail & E-commerce',
      'Non-Profit & Foundations',
    ],

    // References
    referencesTitle: 'Client Testimonials',
    references: [
      {
        quote: `"${brandName} brought transparency and rigour to our annual audit process. Their team was thorough and professional."`,
        author: 'CFO, Technology Company',
      },
      {
        quote: '"Their knowledge of NIA-ES standards and sector-specific risks gave us full confidence in the audit results."',
        author: 'CEO, Industrial Group',
      },
    ],

    // Why Us
    whyUsTitle: `Why Choose ${brandName}`,
    whyUs: [
      {
        title: 'Independence & Objectivity',
        description: 'Strict adherence to independence requirements ensuring impartial, trustworthy audit opinions.',
      },
      {
        title: 'Technical Rigour',
        description: 'Full compliance with NIA-ES (ISA) standards and continuous professional development.',
      },
      {
        title: 'Sector Expertise',
        description: 'Deep understanding of industry-specific risks, regulations, and accounting particularities.',
      },
      {
        title: 'Senior Attention',
        description: 'Direct involvement of ROAC-registered partners in every audit engagement.',
      },
      {
        title: 'Integrated Advisory',
        description: 'Beyond the audit opinion: actionable recommendations to strengthen internal controls and governance.',
      },
    ],

    // Contact
    contactTitle: 'Get in Touch',
    contactInfo: {
      address: siteConfig.footer.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 93 XXX XXXX',
      email: `info@${domain}`,
      web: domain,
    },

    // Footer
    footer: `${brandName} · Confidential`,
    preparedFor: 'Prepared for',
    date: 'Date',
  },

  es: {
    // Cover
    coverTitle: brandName,
    coverSubtitle: 'Auditoría y Servicios de Aseguramiento',
    coverTagline: 'Auditoría rigurosa. Resultados de confianza.',

    // About Us
    aboutTitle: `Sobre ${brandName}`,
    aboutText: `${brandName} es una firma de auditoría profesional con sede en Barcelona, inscrita en el ROAC (Registro Oficial de Auditores de Cuentas) y miembro del ICJCE (Instituto de Censores Jurados de Cuentas de España).

Prestamos servicios de auditoría y aseguramiento independientes y de alta calidad a empresas de todos los tamaños, desde pymes hasta grandes grupos corporativos, aplicando las Normas Internacionales de Auditoría adaptadas a España (NIA-ES).

Nuestro equipo de auditores experimentados combina rigor técnico con un profundo conocimiento sectorial, garantizando que cada encargo aporte claridad, fiabilidad y valor.`,

    aboutHighlights: [
      'Firma inscrita en el ROAC',
      'Miembro del ICJCE',
      'Metodologías conformes NIA-ES / ISA',
      'Clientes en múltiples sectores',
    ],

    // Key Figures
    keyFiguresTitle: `${brandName} en Cifras`,
    keyFigures: [
      { value: '20+', label: 'Años de Experiencia' },
      { value: '300+', label: 'Auditorías Realizadas' },
      { value: '25+', label: 'Profesionales de Auditoría' },
      { value: '15+', label: 'Sectores Cubiertos' },
      { value: '€500M+', label: 'Activos Auditados' },
      { value: '100%', label: 'Cumplimiento ROAC' },
    ],

    // Service Areas
    serviceAreasTitle: 'Áreas de Servicio',
    serviceAreas: [
      {
        name: 'Auditoría de Cuentas Anuales',
        description: 'Auditoría independiente de cuentas anuales conforme a NIA-ES, proporcionando seguridad a accionistas y grupos de interés.',
      },
      {
        name: 'Auditoría de Consolidación',
        description: 'Auditoría de estados financieros consolidados para grupos corporativos bajo normas NOFCAC y NIIF.',
      },
      {
        name: 'Due Diligence Financiera',
        description: 'Análisis financiero en profundidad para transacciones de M&A, inversiones y reestructuraciones corporativas.',
      },
      {
        name: 'Auditoría de Subvenciones',
        description: 'Auditorías de justificación y cumplimiento para subvenciones públicas, fondos europeos y programas de ayudas.',
      },
      {
        name: 'Revisión Limitada y Procedimientos Acordados',
        description: 'Revisiones limitadas ISRE 2400/2410 y procedimientos acordados ISRS 4400 para necesidades específicas.',
      },
      {
        name: 'Auditoría Interna y Asesoramiento',
        description: 'Evaluación de controles internos, análisis de riesgos y recomendaciones de mejora de procesos.',
      },
    ],

    // Team
    teamTitle: 'Equipo Directivo',
    teamMembers: [
      {
        name: 'Socio Director',
        role: 'Auditor ROAC',
        credentials: 'Auditor Censor y Economista',
      },
      {
        name: 'Socio de Auditoría',
        role: 'Auditor ROAC',
        credentials: 'Especialista en Auditoría Financiera',
      },
      {
        name: 'Socio Técnico',
        role: 'Auditor ROAC',
        credentials: 'Experto en NIIF y Consolidación',
      },
      {
        name: 'Socio de Advisory',
        role: 'Auditoría Interna',
        credentials: 'Especialista en Riesgos y Cumplimiento',
      },
    ],

    // Sectors
    sectorsTitle: 'Experiencia Sectorial',
    sectors: [
      'Tecnología y SaaS',
      'Inmobiliario y Construcción',
      'Industria y Manufactura',
      'Hostelería y Turismo',
      'Servicios Financieros',
      'Salud y Ciencias de la Vida',
      'Retail y E-commerce',
      'Entidades Sin Ánimo de Lucro',
    ],

    // References
    referencesTitle: 'Testimonios de Clientes',
    references: [
      {
        quote: `"${brandName} aportó transparencia y rigor a nuestro proceso de auditoría anual. Su equipo fue exhaustivo y profesional."`,
        author: 'CFO, Empresa Tecnológica',
      },
      {
        quote: '"Su conocimiento de las NIA-ES y los riesgos sectoriales nos dio plena confianza en los resultados de la auditoría."',
        author: 'CEO, Grupo Industrial',
      },
    ],

    // Why Us
    whyUsTitle: `Por Qué Elegir ${brandName}`,
    whyUs: [
      {
        title: 'Independencia y Objetividad',
        description: 'Cumplimiento estricto de los requisitos de independencia, garantizando opiniones de auditoría imparciales y fiables.',
      },
      {
        title: 'Rigor Técnico',
        description: 'Cumplimiento íntegro de las NIA-ES (ISA) y desarrollo profesional continuo.',
      },
      {
        title: 'Conocimiento Sectorial',
        description: 'Profundo conocimiento de riesgos, regulaciones y particularidades contables de cada sector.',
      },
      {
        title: 'Atención de Socios',
        description: 'Participación directa de socios inscritos en el ROAC en cada encargo de auditoría.',
      },
      {
        title: 'Asesoramiento Integrado',
        description: 'Más allá de la opinión de auditoría: recomendaciones accionables para fortalecer controles internos y gobernanza.',
      },
    ],

    // Contact
    contactTitle: 'Contacto',
    contactInfo: {
      address: siteConfig.footer.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 93 XXX XXXX',
      email: `info@${domain}`,
      web: domain,
    },

    // Footer
    footer: `${brandName} · Confidencial`,
    preparedFor: 'Preparado para',
    date: 'Fecha',
  },

  ca: {
    // Cover
    coverTitle: brandName,
    coverSubtitle: "Auditoria i Serveis d'Assegurament",
    coverTagline: 'Auditoria rigorosa. Resultats de confiança.',

    // About Us
    aboutTitle: `Sobre ${brandName}`,
    aboutText: `${brandName} és una firma d'auditoria professional amb seu a Barcelona, inscrita al ROAC (Registre Oficial d'Auditors de Comptes) i membre de l'ICJCE (Institut de Censors Jurats de Comptes d'Espanya).

Prestem serveis d'auditoria i assegurament independents i d'alta qualitat a empreses de totes les mides, des de pimes fins a grans grups corporatius, aplicant les Normes Internacionals d'Auditoria adaptades a Espanya (NIA-ES).

El nostre equip d'auditors experimentats combina rigor tècnic amb un profund coneixement sectorial, garantint que cada encàrrec aporti claredat, fiabilitat i valor.`,

    aboutHighlights: [
      'Firma inscrita al ROAC',
      "Membre de l'ICJCE",
      'Metodologies conformes NIA-ES / ISA',
      'Clients en múltiples sectors',
    ],

    // Key Figures
    keyFiguresTitle: `${brandName} en Xifres`,
    keyFigures: [
      { value: '20+', label: "Anys d'Experiència" },
      { value: '300+', label: 'Auditories Realitzades' },
      { value: '25+', label: "Professionals d'Auditoria" },
      { value: '15+', label: 'Sectors Coberts' },
      { value: '€500M+', label: 'Actius Auditats' },
      { value: '100%', label: 'Compliment ROAC' },
    ],

    // Service Areas
    serviceAreasTitle: 'Àrees de Servei',
    serviceAreas: [
      {
        name: 'Auditoria de Comptes Anuals',
        description: "Auditoria independent de comptes anuals d'acord amb les NIA-ES, proporcionant seguretat a accionistes i grups d'interès.",
      },
      {
        name: 'Auditoria de Consolidació',
        description: "Auditoria d'estats financers consolidats per a grups corporatius sota normes NOFCAC i NIIF.",
      },
      {
        name: 'Due Diligence Financera',
        description: "Anàlisi financera en profunditat per a transaccions de M&A, inversions i reestructuracions corporatives.",
      },
      {
        name: 'Auditoria de Subvencions',
        description: "Auditories de justificació i compliment per a subvencions públiques, fons europeus i programes d'ajudes.",
      },
      {
        name: 'Revisió Limitada i Procediments Acordats',
        description: 'Revisions limitades ISRE 2400/2410 i procediments acordats ISRS 4400 per a necessitats específiques.',
      },
      {
        name: 'Auditoria Interna i Assessorament',
        description: "Avaluació de controls interns, anàlisi de riscos i recomanacions de millora de processos.",
      },
    ],

    // Team
    teamTitle: 'Equip Directiu',
    teamMembers: [
      {
        name: 'Soci Director',
        role: 'Auditor ROAC',
        credentials: 'Auditor Censor i Economista',
      },
      {
        name: "Soci d'Auditoria",
        role: 'Auditor ROAC',
        credentials: "Especialista en Auditoria Financera",
      },
      {
        name: 'Soci Tècnic',
        role: 'Auditor ROAC',
        credentials: 'Expert en NIIF i Consolidació',
      },
      {
        name: "Soci d'Advisory",
        role: 'Auditoria Interna',
        credentials: 'Especialista en Riscos i Compliment',
      },
    ],

    // Sectors
    sectorsTitle: 'Experiència Sectorial',
    sectors: [
      'Tecnologia i SaaS',
      'Immobiliari i Construcció',
      'Indústria i Manufactura',
      'Hostaleria i Turisme',
      'Serveis Financers',
      'Salut i Ciències de la Vida',
      'Retail i E-commerce',
      'Entitats Sense Ànim de Lucre',
    ],

    // References
    referencesTitle: 'Referències de Clients',
    references: [
      {
        quote: `"${brandName} va aportar transparència i rigor al nostre procés d'auditoria anual. El seu equip va ser exhaustiu i professional."`,
        author: 'CFO, Empresa Tecnològica',
      },
      {
        quote: '"El seu coneixement de les NIA-ES i els riscos sectorials ens va donar plena confiança en els resultats de l\'auditoria."',
        author: 'CEO, Grup Industrial',
      },
    ],

    // Why Us
    whyUsTitle: `Per Què Escollir ${brandName}`,
    whyUs: [
      {
        title: 'Independència i Objectivitat',
        description: "Compliment estricte dels requisits d'independència, garantint opinions d'auditoria imparcials i fiables.",
      },
      {
        title: 'Rigor Tècnic',
        description: 'Compliment íntegre de les NIA-ES (ISA) i desenvolupament professional continu.',
      },
      {
        title: 'Coneixement Sectorial',
        description: 'Profund coneixement de riscos, regulacions i particularitats comptables de cada sector.',
      },
      {
        title: 'Atenció de Socis',
        description: "Participació directa de socis inscrits al ROAC en cada encàrrec d'auditoria.",
      },
      {
        title: 'Assessorament Integrat',
        description: "Més enllà de l'opinió d'auditoria: recomanacions accionables per enfortir controls interns i governança.",
      },
    ],

    // Contact
    contactTitle: 'Contacte',
    contactInfo: {
      address: siteConfig.footer.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 93 XXX XXXX',
      email: `info@${domain}`,
      web: domain,
    },

    // Footer
    footer: `${brandName} · Confidencial`,
    preparedFor: 'Preparat per a',
    date: 'Data',
  },
};
