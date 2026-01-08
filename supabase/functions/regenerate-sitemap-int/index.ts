import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITEMAP_DOMAIN = 'https://global.nrro.es';

interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: string;
  category: string;
  lastmod?: string;
}

// Static sitemap entries for global.nrro.es (42 URLs)
const sitemapEntries: SitemapEntry[] = [
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

  // === SPAIN COMPANY SETUP CLUSTER (8 URLs) ===
  { url: '/spain-company-setup', priority: 0.9, changefreq: 'weekly', category: 'Spain Company Setup Cluster' },
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

function generateSitemapXML(entries: SitemapEntry[]): string {
  const today = new Date().toISOString().split('T')[0];
  
  const urlEntries = entries.map(entry => `  <url>
    <loc>${SITEMAP_DOMAIN}${entry.url}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

async function uploadSitemapToStorage(supabase: any, xmlContent: string): Promise<string> {
  const fileName = 'sitemap-int.xml';
  const bucketName = 'public-files';
  
  // Check if bucket exists, create if not
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b: any) => b.name === bucketName);
  
  if (!bucketExists) {
    console.log(`[SITEMAP-INT] Creating bucket: ${bucketName}`);
    await supabase.storage.createBucket(bucketName, { public: true });
  }

  // Upload the sitemap
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, xmlContent, {
      contentType: 'application/xml',
      upsert: true
    });

  if (error) {
    console.error('[SITEMAP-INT] Upload error:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  console.log(`[SITEMAP-INT] Sitemap uploaded successfully: ${urlData.publicUrl}`);
  return urlData.publicUrl;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[SITEMAP-INT] Starting sitemap regeneration for global.nrro.es');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate the XML
    const xmlContent = generateSitemapXML(sitemapEntries);
    console.log(`[SITEMAP-INT] Generated sitemap with ${sitemapEntries.length} URLs`);

    // Upload to storage
    const publicUrl = await uploadSitemapToStorage(supabase, xmlContent);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sitemap regenerated successfully',
        url: publicUrl,
        urlCount: sitemapEntries.length,
        generatedAt: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[SITEMAP-INT] Error:', errorMessage);
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
