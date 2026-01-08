export interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  category: string;
  lastmod?: string;
}

export const SITEMAP_DOMAIN = 'https://global.nrro.es';

export const sitemapEntries: SitemapEntry[] = [
  // === CORE PAGES (Priority 1.0) ===
  { url: '/', priority: 1.0, changefreq: 'weekly', category: 'Core' },
  
  // === PILLAR PAGES (Priority 0.9) ===
  { url: '/set-up-in-spain', priority: 0.9, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/services', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  { url: '/international-services', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  { url: '/case-studies', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  
  // === SPAIN SETUP CLUSTER (Priority 0.8) ===
  { url: '/legal-structures-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/spain-business-bank-account', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/set-up-company-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/nie-spain-foreigners', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/startup-company-setup-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/fast-company-registration-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  
  // === GEOGRAPHIC TARGETING (Priority 0.8) ===
  { url: '/spain-company-setup-usa', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  { url: '/spain-company-setup-uk', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  { url: '/spain-company-setup-uae', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  
  // === COMPLIANCE & SERVICES (Priority 0.8) ===
  { url: '/spanish-payroll-international', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  { url: '/spanish-subsidiary-compliance', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  { url: '/spain-ma-gateway', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  
  // === CALCULATORS & TOOLS (Priority 0.8) ===
  { url: '/beckham-law', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/beckham-law-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-labor-cost-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-tax-residency-risk', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/company-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  
  // === CONTENT PAGES (Priority 0.7-0.8) ===
  { url: '/blog', priority: 0.8, changefreq: 'weekly', category: 'Content' },
  { url: '/resources', priority: 0.8, changefreq: 'weekly', category: 'Content' },
  { url: '/testimonials', priority: 0.7, changefreq: 'monthly', category: 'Content' },
  
  // === LEAD MAGNETS (Priority 0.7) ===
  { url: '/spain-company-setup-playbook', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-document-checklist', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-readiness-quiz', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  
  // === COMPANY PAGES (Priority 0.7) ===
  { url: '/about', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/team', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/methodology', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/sectors', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/strategy', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/careers', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/leave-review', priority: 0.5, changefreq: 'yearly', category: 'Company' },
  
  // === LEGAL PAGES (Priority 0.3) ===
  { url: '/privacy', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/legal-notice', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/cookies', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/cookie-policy', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/terms', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
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
