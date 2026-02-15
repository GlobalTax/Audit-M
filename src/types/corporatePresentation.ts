export interface PresentationData {
  // Optional recipient
  recipientName?: string;
  recipientCompany?: string;

  // Format
  format: 'landscape' | 'portrait';
  language: 'en' | 'es' | 'ca';

  // Sections to include
  sections: {
    aboutUs: boolean;
    keyFigures: boolean;
    serviceAreas: boolean;
    team: boolean;
    sectors: boolean;
    references: boolean;
    whyUs: boolean;
    contact: boolean;
  };

  // Custom date
  presentationDate: string;
}

export const DEFAULT_SECTIONS = {
  aboutUs: true,
  keyFigures: true,
  serviceAreas: true,
  team: false,
  sectors: false,
  references: false,
  whyUs: true,
  contact: true,
};

export const SECTION_LABELS = {
  en: {
    aboutUs: 'About Us',
    keyFigures: 'Key Figures',
    serviceAreas: 'Service Areas',
    team: 'Leadership Team',
    sectors: 'Industry Sectors',
    references: 'Client References',
    whyUs: 'Why Choose Us',
    contact: 'Contact',
  },
  es: {
    aboutUs: 'Sobre Nosotros',
    keyFigures: 'Cifras Clave',
    serviceAreas: 'Áreas de Servicio',
    team: 'Equipo Directivo',
    sectors: 'Sectores de Actividad',
    references: 'Referencias de Clientes',
    whyUs: 'Por Qué Elegirnos',
    contact: 'Contacto',
  },
  ca: {
    aboutUs: 'Sobre Nosaltres',
    keyFigures: 'Xifres Clau',
    serviceAreas: 'Àrees de Servei',
    team: 'Equip Directiu',
    sectors: "Sectors d'Activitat",
    references: 'Referències de Clients',
    whyUs: 'Per Què Escollir-nos',
    contact: 'Contacte',
  },
};
