// Site configuration for multi-site architecture
// This file determines which site's data to show/create

export type SiteSource = 'es' | 'int';

// IMPORTANT: Change this value based on the deployment
// 'es' = nrro.es (Spain)
// 'int' = int.nrro.es (International)
export const SITE_SOURCE: SiteSource = 'int';

export const SITE_CONFIG = {
  es: {
    name: 'Navarro Tax & Legal',
    domain: 'nrro.es',
    defaultLanguage: 'es',
  },
  int: {
    name: 'Navarro International',
    domain: 'int.nrro.es',
    defaultLanguage: 'en',
  },
} as const;

export const getCurrentSiteConfig = () => SITE_CONFIG[SITE_SOURCE];
