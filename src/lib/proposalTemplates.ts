import { getCurrentSiteConfig } from '@/config/site';

const siteConfig = getCurrentSiteConfig();
const contact = siteConfig.footer;

export const proposalContent = {
  en: {
    companyName: contact.brandName,
    title: 'Professional Audit Services Proposal',
    subtitle: 'Independent Assurance for Your Business',

    aboutTitle: `About ${contact.brandName}`,
    aboutText: `${contact.brandName} is an independent audit firm registered with the ROAC (Official Registry of Auditors), providing rigorous and transparent audit services to companies of all sizes throughout Spain.

With a team of experienced auditors and a commitment to the highest professional standards, we deliver independent assurance that helps our clients build trust with stakeholders, comply with regulatory requirements, and strengthen their internal controls.

Our approach combines deep industry knowledge with the latest audit methodologies, ensuring thorough and efficient engagements tailored to each client's specific needs.`,

    credentialsTitle: 'Our Credentials',
    credentials: [
      'Registered with ROAC (Official Registry of Auditors)',
      'Member of ICJCE (Institute of Chartered Auditors)',
      'Compliance with ISA & NIA-ES Standards',
      'Experienced Multidisciplinary Team',
      'Presence in Barcelona, Madrid, and Girona',
    ],

    servicesTitle: 'Proposed Services',

    economicProposalTitle: 'Economic Proposal',
    tableHeaders: {
      service: 'Service',
      description: 'Scope',
      monthlyFee: 'Monthly Fee',
      annualFee: 'Annual Fee',
    },

    whyUsTitle: `Why ${contact.brandName}`,
    whyUs: [
      {
        title: 'Independence & Rigour',
        description: 'We maintain strict independence in every engagement, ensuring objective and reliable conclusions.',
      },
      {
        title: 'Industry Specialisation',
        description: 'Deep knowledge of key sectors including real estate, technology, non-profits, and family businesses.',
      },
      {
        title: 'Partner-Led Service',
        description: 'Direct access to audit partners throughout the engagement, with guaranteed response times.',
      },
      {
        title: 'Clear & Fixed Pricing',
        description: 'Transparent fees agreed upfront with no hidden costs. Budget with confidence.',
      },
    ],

    nextStepsTitle: 'Next Steps',
    nextSteps: [
      'Review and approve this proposal',
      'Sign the engagement letter (carta de encargo)',
      'Provide access to financial documentation',
      'Kick-off meeting and audit planning',
    ],

    contactTitle: 'Contact',
    contactInfo: {
      address: contact.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 933 000 000',
      email: `info@${siteConfig.domain}`,
      web: siteConfig.domain,
    },

    validityNote: 'This proposal is valid until',
    termsTitle: 'Terms & Conditions',
    defaultTerms: `• Fees are exclusive of VAT (21%)
• Invoiced upon completion of each audit phase
• Payment due within 30 days of invoice
• Engagement subject to independence verification
• Scope changes may require fee adjustment
• Audit report issuance subject to receipt of all required documentation`,

    footer: 'Confidential - For intended recipient only',
  },
  es: {
    companyName: contact.brandName,
    title: 'Propuesta de Servicios de Auditoría',
    subtitle: 'Aseguramiento Independiente para Tu Negocio',

    aboutTitle: `Sobre ${contact.brandName}`,
    aboutText: `${contact.brandName} es una firma de auditoría independiente inscrita en el ROAC (Registro Oficial de Auditores de Cuentas), que ofrece servicios de auditoría rigurosos y transparentes a empresas de todos los tamaños en España.

Con un equipo de auditores experimentados y un compromiso con los más altos estándares profesionales, proporcionamos aseguramiento independiente que ayuda a nuestros clientes a generar confianza con sus grupos de interés, cumplir con los requisitos regulatorios y fortalecer sus controles internos.

Nuestro enfoque combina un profundo conocimiento sectorial con las últimas metodologías de auditoría, garantizando encargos exhaustivos y eficientes adaptados a las necesidades específicas de cada cliente.`,

    credentialsTitle: 'Nuestras Credenciales',
    credentials: [
      'Inscritos en el ROAC (Registro Oficial de Auditores de Cuentas)',
      'Miembros del ICJCE (Instituto de Censores Jurados)',
      'Cumplimiento con NIA-ES y normativa ISA',
      'Equipo Multidisciplinar Experimentado',
      'Presencia en Barcelona, Madrid y Girona',
    ],

    servicesTitle: 'Servicios Propuestos',

    economicProposalTitle: 'Propuesta Económica',
    tableHeaders: {
      service: 'Servicio',
      description: 'Alcance',
      monthlyFee: 'Honorario Mensual',
      annualFee: 'Honorario Anual',
    },

    whyUsTitle: `Por Qué ${contact.brandName}`,
    whyUs: [
      {
        title: 'Independencia y Rigor',
        description: 'Mantenemos estricta independencia en cada encargo, garantizando conclusiones objetivas y fiables.',
      },
      {
        title: 'Especialización Sectorial',
        description: 'Profundo conocimiento de sectores clave incluyendo inmobiliario, tecnología, fundaciones y empresa familiar.',
      },
      {
        title: 'Servicio Directo con Socios',
        description: 'Acceso directo a los socios de auditoría durante todo el encargo, con tiempos de respuesta garantizados.',
      },
      {
        title: 'Precios Claros y Fijos',
        description: 'Honorarios transparentes acordados por anticipado sin costes ocultos.',
      },
    ],

    nextStepsTitle: 'Próximos Pasos',
    nextSteps: [
      'Revisar y aprobar esta propuesta',
      'Firmar la carta de encargo',
      'Facilitar acceso a la documentación financiera',
      'Reunión de arranque y planificación de la auditoría',
    ],

    contactTitle: 'Contacto',
    contactInfo: {
      address: contact.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 933 000 000',
      email: `info@${siteConfig.domain}`,
      web: siteConfig.domain,
    },

    validityNote: 'Esta propuesta es válida hasta',
    termsTitle: 'Términos y Condiciones',
    defaultTerms: `• Los honorarios no incluyen IVA (21%)
• Facturación por fases de trabajo completadas
• Pago a 30 días desde la emisión de la factura
• El encargo está sujeto a verificación de independencia
• Los cambios de alcance pueden requerir ajuste de honorarios
• La emisión del informe está sujeta a la recepción de toda la documentación requerida`,

    footer: 'Confidencial - Solo para el destinatario previsto',
  },
  ca: {
    companyName: contact.brandName,
    title: 'Proposta de Serveis d\'Auditoria',
    subtitle: 'Assegurament Independent per al Teu Negoci',

    aboutTitle: `Sobre ${contact.brandName}`,
    aboutText: `${contact.brandName} és una firma d'auditoria independent inscrita al ROAC (Registre Oficial d'Auditors de Comptes), que ofereix serveis d'auditoria rigorosos i transparents a empreses de totes les mides a Espanya.

Amb un equip d'auditors experimentats i un compromís amb els més alts estàndards professionals, proporcionem assegurament independent que ajuda els nostres clients a generar confiança amb els seus grups d'interès, complir amb els requisits regulatoris i enfortir els seus controls interns.

El nostre enfocament combina un profund coneixement sectorial amb les últimes metodologies d'auditoria, garantint encàrrecs exhaustius i eficients adaptats a les necessitats específiques de cada client.`,

    credentialsTitle: 'Les Nostres Credencials',
    credentials: [
      'Inscrits al ROAC (Registre Oficial d\'Auditors de Comptes)',
      'Membres de l\'ICJCE (Institut de Censors Jurats)',
      'Compliment amb NIA-ES i normativa ISA',
      'Equip Multidisciplinari Experimentat',
      'Presència a Barcelona, Madrid i Girona',
    ],

    servicesTitle: 'Serveis Proposats',

    economicProposalTitle: 'Proposta Econòmica',
    tableHeaders: {
      service: 'Servei',
      description: 'Abast',
      monthlyFee: 'Honorari Mensual',
      annualFee: 'Honorari Anual',
    },

    whyUsTitle: `Per Què ${contact.brandName}`,
    whyUs: [
      {
        title: 'Independència i Rigor',
        description: 'Mantenim estricta independència en cada encàrrec, garantint conclusions objectives i fiables.',
      },
      {
        title: 'Especialització Sectorial',
        description: 'Profund coneixement de sectors clau incloent immobiliari, tecnologia, fundacions i empresa familiar.',
      },
      {
        title: 'Servei Directe amb Socis',
        description: 'Accés directe als socis d\'auditoria durant tot l\'encàrrec, amb temps de resposta garantits.',
      },
      {
        title: 'Preus Clars i Fixos',
        description: 'Honoraris transparents acordats per avançat sense costos ocults.',
      },
    ],

    nextStepsTitle: 'Propers Passos',
    nextSteps: [
      'Revisar i aprovar aquesta proposta',
      'Signar la carta d\'encàrrec',
      'Facilitar accés a la documentació financera',
      'Reunió d\'arrencada i planificació de l\'auditoria',
    ],

    contactTitle: 'Contacte',
    contactInfo: {
      address: contact.headOfficeAddress.replace('\n', ' · '),
      phone: '+34 933 000 000',
      email: `info@${siteConfig.domain}`,
      web: siteConfig.domain,
    },

    validityNote: 'Aquesta proposta és vàlida fins al',
    termsTitle: 'Termes i Condicions',
    defaultTerms: `• Els honoraris no inclouen IVA (21%)
• Facturació per fases de treball completades
• Pagament a 30 dies des de l'emissió de la factura
• L'encàrrec està subjecte a verificació d'independència
• Els canvis d'abast poden requerir ajust d'honoraris
• L'emissió de l'informe està subjecta a la recepció de tota la documentació requerida`,

    footer: 'Confidencial - Només per al destinatari previst',
  },
};
