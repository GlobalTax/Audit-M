export interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  category: string;
  lastmod?: string;
}

export const SITEMAP_DOMAIN = 'https://global.nrro.es';

export const sitemapEntries: SitemapEntry[] = [
  // === PÁGINAS PRINCIPALES (14 URLs) ===
  { url: '/', priority: 1.0, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/services', priority: 0.9, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/international-services', priority: 0.9, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/case-studies', priority: 0.9, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/resources', priority: 0.8, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/about', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/team', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/methodology', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/sectors', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/strategy', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/testimonials', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/careers', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },

  // === SPAIN COMPANY SETUP CLUSTER (7 URLs) ===
  { url: '/set-up-in-spain', priority: 0.9, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/legal-structures-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/spain-business-bank-account', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/set-up-company-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/nie-spain-foreigners', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/startup-company-setup-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
  { url: '/fast-company-registration-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },

  // === GEOGRAPHIC TARGETING PAGES (3 URLs) ===
  { url: '/spain-company-setup-usa', priority: 0.8, changefreq: 'monthly', category: 'Geographic Targeting Pages' },
  { url: '/spain-company-setup-uk', priority: 0.8, changefreq: 'monthly', category: 'Geographic Targeting Pages' },
  { url: '/spain-company-setup-uae', priority: 0.8, changefreq: 'monthly', category: 'Geographic Targeting Pages' },

  // === COMPLIANCE & SERVICES (3 URLs) ===
  { url: '/spanish-payroll-international', priority: 0.8, changefreq: 'monthly', category: 'Compliance & Services' },
  { url: '/spanish-subsidiary-compliance', priority: 0.8, changefreq: 'monthly', category: 'Compliance & Services' },
  { url: '/spain-ma-gateway', priority: 0.8, changefreq: 'monthly', category: 'Compliance & Services' },

  // === CALCULATORS & TOOLS (6 URLs) ===
  { url: '/beckham-law', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },
  { url: '/beckham-law-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },
  { url: '/spain-labor-cost-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },
  { url: '/spain-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },
  { url: '/spain-tax-residency-risk', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },
  { url: '/company-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators & Tools' },

  // === LEAD MAGNETS (3 URLs) ===
  { url: '/spain-company-setup-playbook', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-document-checklist', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-readiness-quiz', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },

  // === OTHER (1 URL) ===
  { url: '/leave-review', priority: 0.5, changefreq: 'yearly', category: 'Other' },

  // === LEGAL PAGES (5 URLs) ===
  { url: '/privacy', priority: 0.3, changefreq: 'yearly', category: 'Legal Pages' },
  { url: '/legal-notice', priority: 0.3, changefreq: 'yearly', category: 'Legal Pages' },
  { url: '/cookies', priority: 0.3, changefreq: 'yearly', category: 'Legal Pages' },
  { url: '/cookie-policy', priority: 0.3, changefreq: 'yearly', category: 'Legal Pages' },
  { url: '/terms', priority: 0.3, changefreq: 'yearly', category: 'Legal Pages' },
];

export const generateSitemapXML = (entries: SitemapEntry[], domain: string = SITEMAP_DOMAIN): string => {
  const today = new Date().toISOString().split('T')[0];
  
  const urlEntries = entries.map(entry => `  <url>
    <loc>${domain}${entry.url}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const getSitemapCategories = (): string[] => {
  const categories = new Set(sitemapEntries.map(e => e.category));
  return Array.from(categories);
};
