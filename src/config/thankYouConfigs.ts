import { LucideIcon, Mail, Calendar, FileText, Calculator, Users, Scale, Zap, Rocket, Building2, CheckCircle, BookOpen, ClipboardList } from 'lucide-react';

export interface ThankYouConfig {
  variant: string;
  source: string;
  specialistType: string;
  meta: {
    title: string;
    description: string;
  };
  nextSteps: {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: boolean;
  }[];
  resources: {
    title: string;
    description: string;
    url: string;
    icon: LucideIcon;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  resourcesSubtitle: string;
}

const defaultNextSteps = [
  {
    icon: Mail,
    title: 'Check Your Inbox',
    description: "We've sent you a confirmation email with details about what happens next."
  },
  {
    icon: Calendar,
    title: 'Book a Call',
    description: 'Schedule a consultation to discuss your specific needs.',
    action: true
  },
  {
    icon: FileText,
    title: 'Prepare Your Questions',
    description: 'Think about your requirements, timeline expectations, and any specific concerns.'
  }
];

export const thankYouConfigs: Record<string, ThankYouConfig> = {
  payroll: {
    variant: 'payroll',
    source: 'spanish-payroll-international',
    specialistType: 'payroll specialist',
    meta: {
      title: 'Thank You | Your Payroll Request Has Been Received | NRRO',
      description: 'Thank you for your interest in our Spanish payroll services. A specialist will contact you within 1 business day.'
    },
    nextSteps: [
      {
        icon: Mail,
        title: 'Check Your Inbox',
        description: "We've sent you a confirmation email with details about what happens next."
      },
      {
        icon: Calendar,
        title: 'Book a Call',
        description: 'Schedule a 15-minute consultation to discuss your specific payroll needs.',
        action: true
      },
      {
        icon: FileText,
        title: 'Prepare Your Questions',
        description: 'Think about your team size, current payroll challenges, and timeline expectations.'
      }
    ],
    resources: [
      {
        title: 'Beckham Law Calculator',
        description: 'See if your employees qualify for the 24% flat tax rate',
        url: '/beckham-law-calculator',
        icon: Calculator
      },
      {
        title: 'Spain Labor Cost Calculator',
        description: 'Estimate total employment costs including Social Security',
        url: '/spain-labor-cost-calculator',
        icon: Users
      },
      {
        title: 'Spain Company Setup Playbook',
        description: 'Complete guide to establishing your Spanish entity',
        url: '/spain-company-setup-playbook',
        icon: FileText
      }
    ],
    testimonial: {
      quote: "NRRO took the complexity out of Spanish payroll. Monthly filings, Social Security—everything handled without us having to think about it. Exactly what we needed as a US company expanding to Barcelona.",
      author: 'Sarah Mitchell',
      role: 'CFO, TechVentures Inc.'
    },
    stats: [
      { value: '300+', label: 'Payrolls Managed' },
      { value: '50+', label: 'Countries Served' },
      { value: '99%', label: 'On-Time Filing' }
    ],
    resourcesSubtitle: 'Learn more about Spanish employment and payroll requirements.'
  },

  subsidiary: {
    variant: 'subsidiary',
    source: 'spanish-subsidiary-compliance',
    specialistType: 'compliance specialist',
    meta: {
      title: 'Thank You | Your Compliance Request Has Been Received | NRRO',
      description: 'Thank you for your interest in our Spanish subsidiary compliance services. A specialist will contact you within 1 business day.'
    },
    nextSteps: defaultNextSteps,
    resources: [
      {
        title: 'Spain Company Setup Playbook',
        description: 'Complete guide to establishing your Spanish entity',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Document Checklist',
        description: 'Required documents for Spanish company operations',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'Legal Structures Spain',
        description: 'Compare SL, SA, and branch office options',
        url: '/legal-structures-spain',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "Managing our Spanish subsidiary compliance from London was a nightmare until we found NRRO. Now everything runs smoothly—VAT, accounts, registry filings, all handled.",
      author: 'James Richardson',
      role: 'Finance Director, UK Holdings Ltd.'
    },
    stats: [
      { value: '200+', label: 'Subsidiaries Managed' },
      { value: '30+', label: 'Years Experience' },
      { value: '100%', label: 'Compliance Rate' }
    ],
    resourcesSubtitle: 'Explore resources for managing your Spanish subsidiary.'
  },

  'tech-startup': {
    variant: 'tech-startup',
    source: 'startup-company-setup-spain',
    specialistType: 'startup specialist',
    meta: {
      title: 'Thank You | Your Startup Setup Request Has Been Received | NRRO',
      description: 'Thank you for your interest in setting up your tech startup in Spain. A specialist will contact you within 1 business day.'
    },
    nextSteps: [
      {
        icon: Mail,
        title: 'Check Your Inbox',
        description: "We've sent you a confirmation email with your startup setup timeline."
      },
      {
        icon: Calendar,
        title: 'Book a Call',
        description: 'Schedule a call to discuss your cap table, funding timeline, and visa needs.',
        action: true
      },
      {
        icon: Rocket,
        title: 'Prepare Your Documents',
        description: 'Gather founder passports, business plan outline, and any existing investor commitments.'
      }
    ],
    resources: [
      {
        title: 'Beckham Law Calculator',
        description: 'See if founders qualify for the 24% flat tax rate',
        url: '/beckham-law-calculator',
        icon: Calculator
      },
      {
        title: 'Spain Company Setup Playbook',
        description: 'Complete guide from idea to incorporation',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Setup Calculator',
        description: 'Estimate your total setup costs and timeline',
        url: '/spain-setup-calculator',
        icon: Calculator
      }
    ],
    testimonial: {
      quote: "From signing the engagement letter to having a fully operational Spanish SL took exactly 30 days. NRRO's startup package made everything seamless.",
      author: 'Laura Schmidt',
      role: 'Co-founder, TechBCN'
    },
    stats: [
      { value: '150+', label: 'Startups Launched' },
      { value: '4,000+', label: 'Tech Ecosystem Network' },
      { value: '30', label: 'Days Average Setup' }
    ],
    resourcesSubtitle: 'Resources tailored for tech founders launching in Spain.'
  },

  nie: {
    variant: 'nie',
    source: 'nie-spain-foreigners',
    specialistType: 'immigration specialist',
    meta: {
      title: 'Thank You | Your NIE Request Has Been Received | NRRO',
      description: 'Thank you for your NIE express service request. We will contact you within 1 business day to start the process.'
    },
    nextSteps: [
      {
        icon: Mail,
        title: 'Check Your Inbox',
        description: "We've sent you an email with the documents we'll need from you."
      },
      {
        icon: Calendar,
        title: 'Book a Call',
        description: 'Optional: speak with our immigration team for any specific questions.',
        action: true
      },
      {
        icon: CheckCircle,
        title: 'Prepare Your Documents',
        description: 'Passport scan, proof of address, and reason for NIE application.'
      }
    ],
    resources: [
      {
        title: 'Spain Company Setup Playbook',
        description: 'Everything you need to know about setting up in Spain',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Document Checklist',
        description: 'Full list of required documents for company setup',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'Legal Structures Spain',
        description: 'Choose the right company structure for your business',
        url: '/legal-structures-spain',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "I was dreading the NIE process—heard horror stories about 3-hour queues. NRRO got mine in 5 days without me having to go to any government office. Worth every euro.",
      author: 'Michael Chen',
      role: 'Digital Nomad, UK'
    },
    stats: [
      { value: '500+', label: 'NIEs Processed' },
      { value: '99%', label: 'Success Rate' },
      { value: '7', label: 'Days Average' }
    ],
    resourcesSubtitle: 'Resources to help you with your Spanish documentation.'
  },

  express: {
    variant: 'express',
    source: 'fast-company-registration-spain',
    specialistType: 'formation specialist',
    meta: {
      title: 'Thank You | Your Express Setup Request Has Been Received | NRRO',
      description: 'Thank you for choosing our express company registration. Your dedicated Express Manager will contact you within 2 hours.'
    },
    nextSteps: [
      {
        icon: Mail,
        title: 'Check Your Inbox',
        description: "Your Express Manager details and timeline are on their way."
      },
      {
        icon: Zap,
        title: 'Express Onboarding Call',
        description: 'Your manager will call within 2 hours to kick off the process.',
        action: true
      },
      {
        icon: FileText,
        title: 'Document Upload',
        description: 'Be ready to upload passports and any existing company documents.'
      }
    ],
    resources: [
      {
        title: 'Document Checklist',
        description: 'Complete list of required documents',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'Setup Calculator',
        description: 'Understand the full cost breakdown',
        url: '/spain-setup-calculator',
        icon: Calculator
      },
      {
        title: 'Legal Structures Spain',
        description: 'Compare your options',
        url: '/legal-structures-spain',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "Company registered in 28 days. Literally impossible to do it faster. Unbelievable service.",
      author: 'Laura Schmidt',
      role: 'Managing Director, Germany'
    },
    stats: [
      { value: '30', label: 'Days Guaranteed' },
      { value: '100+', label: 'Express Clients' },
      { value: '50%', label: 'Refund if Late' }
    ],
    resourcesSubtitle: 'Resources to prepare for your express setup.'
  },

  calculator: {
    variant: 'calculator',
    source: 'company-setup-calculator',
    specialistType: 'advisory specialist',
    meta: {
      title: 'Thank You | Your Cost Report Has Been Sent | NRRO',
      description: 'Thank you for using our calculator. Check your inbox for the detailed cost breakdown.'
    },
    nextSteps: defaultNextSteps,
    resources: [
      {
        title: 'Spain Company Setup Playbook',
        description: 'Step-by-step guide to company formation',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Document Checklist',
        description: 'All required documents in one place',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'Legal Structures Spain',
        description: 'Compare SL, SA, and other options',
        url: '/legal-structures-spain',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "The cost estimate from the calculator was spot-on. No hidden surprises during the actual setup process.",
      author: 'David Park',
      role: 'Founder, E-commerce Startup'
    },
    stats: [
      { value: '300+', label: 'Companies Formed' },
      { value: '15+', label: 'Years Experience' },
      { value: '98%', label: 'Client Satisfaction' }
    ],
    resourcesSubtitle: 'Take the next step in your Spain company setup journey.'
  },

  'company-setup': {
    variant: 'company-setup',
    source: 'set-up-company-spain',
    specialistType: 'setup specialist',
    meta: {
      title: 'Thank You | Your Company Setup Request Has Been Received | NRRO',
      description: 'Thank you for your interest in setting up a company in Spain. Our team will contact you within 1 business day.'
    },
    nextSteps: defaultNextSteps,
    resources: [
      {
        title: 'Spain Company Setup Playbook',
        description: 'Complete 50-page guide to company formation',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Document Checklist',
        description: 'Every document you need, explained',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'Setup Calculator',
        description: 'Estimate your costs and timeline',
        url: '/spain-setup-calculator',
        icon: Calculator
      }
    ],
    testimonial: {
      quote: "Setting up our tech startup in Barcelona was straightforward thanks to their step-by-step guidance. They handled everything from NIE applications to notary coordination.",
      author: 'Elena Rossi',
      role: 'CEO & Co-founder, Tech Startup, Italy'
    },
    stats: [
      { value: '300+', label: 'Companies Established' },
      { value: '50+', label: 'Countries Served' },
      { value: '98%', label: 'Client Satisfaction' }
    ],
    resourcesSubtitle: 'Explore our resources to prepare for your Spain company setup.'
  },

  herencias: {
    variant: 'herencias',
    source: 'herencias-barcelona',
    specialistType: 'abogado de sucesiones',
    meta: {
      title: 'Gracias | Solicitud Recibida | NRRO',
      description: 'Gracias por contactarnos. Un especialista en herencias le contactará en menos de 24 horas.'
    },
    nextSteps: [
      {
        icon: Mail,
        title: 'Revisa tu email',
        description: 'Te hemos enviado un correo de confirmación con los próximos pasos.'
      },
      {
        icon: Calendar,
        title: 'Agenda una llamada',
        description: 'Programa una consulta gratuita con nuestro equipo de sucesiones.',
        action: true
      },
      {
        icon: FileText,
        title: 'Prepara la documentación',
        description: 'Certificado de defunción, testamento (si existe), documentación de los bienes.'
      }
    ],
    resources: [
      {
        title: 'Calculadora de Herencias',
        description: 'Estima el reparto según el Codi Civil Català',
        url: '#calculadora',
        icon: Calculator
      },
      {
        title: 'Guía de Sucesiones',
        description: 'Todo sobre herencias en Cataluña',
        url: '/services/herencias',
        icon: Scale
      },
      {
        title: 'Impuesto de Sucesiones',
        description: 'Cómo optimizar la carga fiscal',
        url: '/services/fiscalidad',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "Heredamos una finca en el Empordà con 4 hermanos. Nos ayudaron a negociar la partición sin llegar a juicio. Proceso transparente y rápido.",
      author: 'Marta G.',
      role: 'Barcelona'
    },
    stats: [
      { value: '500+', label: 'Herencias Tramitadas' },
      { value: '30+', label: 'Años de Experiencia' },
      { value: '98%', label: 'Casos Resueltos' }
    ],
    resourcesSubtitle: 'Recursos útiles para entender el proceso sucesorio en Cataluña.'
  },

  default: {
    variant: 'default',
    source: 'general-contact',
    specialistType: 'advisory team',
    meta: {
      title: 'Thank You | Your Request Has Been Received | NRRO',
      description: 'Thank you for contacting us. Our team will respond within 1 business day.'
    },
    nextSteps: defaultNextSteps,
    resources: [
      {
        title: 'Spain Company Setup Playbook',
        description: 'Complete guide to establishing your Spanish entity',
        url: '/spain-company-setup-playbook',
        icon: BookOpen
      },
      {
        title: 'Document Checklist',
        description: 'Required documents for Spanish company setup',
        url: '/spain-document-checklist',
        icon: ClipboardList
      },
      {
        title: 'International Services',
        description: 'Explore our full range of services',
        url: '/international-services',
        icon: Building2
      }
    ],
    testimonial: {
      quote: "Professional, responsive, and thorough. Exactly what you need when navigating Spanish business regulations.",
      author: 'International Client',
      role: 'European Expansion Project'
    },
    stats: [
      { value: '300+', label: 'Companies Served' },
      { value: '50+', label: 'Countries' },
      { value: '30+', label: 'Years Experience' }
    ],
    resourcesSubtitle: 'Explore our resources while you wait.'
  }
};
