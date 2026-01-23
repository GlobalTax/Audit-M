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
  },
  int: {
    name: 'Audit Global',
    domain: 'global.audit.es',
    defaultLanguage: 'en',
  },
} as const;

export const getCurrentSiteConfig = () => SITE_CONFIG[SITE_SOURCE];
