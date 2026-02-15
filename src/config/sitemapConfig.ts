import { getCurrentSiteConfig } from '@/config/site';

export interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  category: string;
  lastmod?: string;
}

export const SITEMAP_DOMAIN = `https://${getCurrentSiteConfig().domain}`;

export const sitemapEntries: SitemapEntry[] = [
  // === PÁGINAS PRINCIPALES ===
  { url: '/', priority: 1.0, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/servicios', priority: 0.9, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/case-studies', priority: 0.9, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/resources', priority: 0.8, changefreq: 'weekly', category: 'Páginas Principales' },
  { url: '/about', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/team', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/methodology', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/testimonials', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/careers', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },
  { url: '/sectors', priority: 0.7, changefreq: 'monthly', category: 'Páginas Principales' },

  // === SERVICIOS ESPECIALIZADOS ===
  { url: '/servicios/subvenciones', priority: 0.8, changefreq: 'weekly', category: 'Servicios' },

  // === LEGAL PAGES ===
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
