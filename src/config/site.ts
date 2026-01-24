// Site configuration for multi-site architecture
// This file determines which site's data to show/create

export type SiteSource = 'es' | 'int' | 'audit';

// IMPORTANT: Change this value based on the deployment
// 'es' = navarro.es (Spain)
// 'int' = global.navarro.es (International)
// 'audit' = audit.es (Audit services)
export const SITE_SOURCE: SiteSource = 'audit';

export const SITE_CONFIG = {
  es: {
    name: 'Navarro',
    domain: 'navarro.es',
    defaultLanguage: 'es',
    sourceFilter: 'es',
    footer: {
      brandName: 'Navarro',
      tagline: 'Asesoría integral. Resultados de confianza.',
      headOffice: 'Barcelona',
      headOfficeAddress: 'Calle Ausias March 36 Pr\n08010 Barcelona',
      otherOffices: ['Madrid', 'Girona', 'Lleida', 'Tarragona'],
      copyright: 'Navarro',
    },
  },
  int: {
    name: 'Navarro Global',
    domain: 'global.navarro.es',
    defaultLanguage: 'en',
    sourceFilter: 'int',
    footer: {
      brandName: 'Navarro Global',
      tagline: 'Rigorous advisory. Trusted results.',
      headOffice: 'Barcelona',
      headOfficeAddress: 'Calle Ausias March 36 Pr\n08010 Barcelona',
      otherOffices: ['Madrid', 'Girona', 'Lleida', 'Tarragona', 'Palma de Mallorca', 'Zaragoza', 'Valencia'],
      copyright: 'Navarro Global',
    },
  },
  audit: {
    name: 'Audit',
    domain: 'audit.es',
    defaultLanguage: 'es',
    sourceFilter: 'navarro_asesores', // Maps to source_site in DB
    footer: {
      brandName: 'Audit',
      tagline: 'Auditoría rigurosa. Resultados de confianza.',
      headOffice: 'Barcelona',
      headOfficeAddress: 'Calle Ausias March 36 Pr\n08010 Barcelona',
      otherOffices: ['Madrid', 'Girona', 'Lleida', 'Tarragona'],
      copyright: 'Audit',
    },
  },
} as const;

export const getCurrentSiteConfig = () => SITE_CONFIG[SITE_SOURCE];
export const getSourceFilter = () => SITE_CONFIG[SITE_SOURCE].sourceFilter;
