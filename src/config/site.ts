// Site configuration for multi-site architecture
// This file determines which site's data to show/create

export type SiteSource = 'es' | 'int';

// IMPORTANT: Change this value based on the deployment
// 'es' = audit.es (Spain)
// 'int' = global.audit.es (International)
export const SITE_SOURCE: SiteSource = 'int';

export const SITE_CONFIG = {
  es: {
    name: 'Audit',
    domain: 'audit.es',
    defaultLanguage: 'es',
    footer: {
      brandName: 'Audit',
      tagline: 'Auditoría rigurosa. Resultados de confianza.',
      headOffice: 'Barcelona',
      headOfficeAddress: 'Calle Ausias March 36 Pr\n08010 Barcelona',
      otherOffices: ['Madrid', 'Girona', 'Lleida', 'Tarragona'],
      copyright: 'Audit',
    },
  },
  int: {
    name: 'Audit Global',
    domain: 'global.audit.es',
    defaultLanguage: 'en',
    footer: {
      brandName: 'Audit Global',
      tagline: 'Rigorous auditing. Trusted results.',
      headOffice: 'Barcelona',
      headOfficeAddress: 'Calle Ausias March 36 Pr\n08010 Barcelona',
      otherOffices: ['Madrid', 'Girona', 'Lleida', 'Tarragona', 'Palma de Mallorca', 'Zaragoza', 'Valencia'],
      copyright: 'Audit Global',
    },
  },
} as const;

export const getCurrentSiteConfig = () => SITE_CONFIG[SITE_SOURCE];
