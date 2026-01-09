export interface PresentationData {
  // Optional recipient
  recipientName?: string;
  recipientCompany?: string;
  
  // Format
  format: 'landscape' | 'portrait';
  language: 'en' | 'es';
  
  // Sections to include
  sections: {
    aboutUs: boolean;
    keyFigures: boolean;
    practiceAreas: boolean;
    team: boolean;
    sectors: boolean;
    references: boolean;
    whyNrro: boolean;
    contact: boolean;
  };
  
  // Custom date
  presentationDate: string;
}

export const DEFAULT_SECTIONS = {
  aboutUs: true,
  keyFigures: true,
  practiceAreas: true,
  team: false,
  sectors: false,
  references: false,
  whyNrro: true,
  contact: true,
};

export const SECTION_LABELS = {
  en: {
    aboutUs: 'About Us',
    keyFigures: 'Key Figures',
    practiceAreas: 'Practice Areas',
    team: 'Leadership Team',
    sectors: 'Industry Sectors',
    references: 'Client References',
    whyNrro: 'Why NRRO',
    contact: 'Contact',
  },
  es: {
    aboutUs: 'Sobre Nosotros',
    keyFigures: 'Cifras Clave',
    practiceAreas: 'Áreas de Práctica',
    team: 'Equipo Directivo',
    sectors: 'Sectores de Actividad',
    references: 'Referencias de Clientes',
    whyNrro: 'Por Qué NRRO',
    contact: 'Contacto',
  },
};
