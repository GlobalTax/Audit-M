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

// Static sitemap entries for global.nrro.es
const sitemapEntries: SitemapEntry[] = [
  // Core Pages
  { url: '/', priority: 1.0, changefreq: 'weekly', category: 'Core' },
  
  // Pillar Pages
  { url: '/set-up-in-spain', priority: 0.9, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/services', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  { url: '/international-services', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  { url: '/case-studies', priority: 0.9, changefreq: 'weekly', category: 'Core' },
  
  // Spain Setup Cluster
  { url: '/legal-structures-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/spain-business-bank-account', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/set-up-company-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/nie-spain-foreigners', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/startup-company-setup-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  { url: '/fast-company-registration-spain', priority: 0.8, changefreq: 'weekly', category: 'Spain Setup' },
  
  // Geographic Targeting
  { url: '/spain-company-setup-usa', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  { url: '/spain-company-setup-uk', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  { url: '/spain-company-setup-uae', priority: 0.8, changefreq: 'monthly', category: 'Geographic' },
  
  // Compliance & Services
  { url: '/spanish-payroll-international', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  { url: '/spanish-subsidiary-compliance', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  { url: '/spain-ma-gateway', priority: 0.8, changefreq: 'monthly', category: 'Services' },
  
  // Calculators & Tools
  { url: '/beckham-law', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/beckham-law-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-labor-cost-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/spain-tax-residency-risk', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  { url: '/company-setup-calculator', priority: 0.8, changefreq: 'monthly', category: 'Calculators' },
  
  // Content Pages
  { url: '/blog', priority: 0.8, changefreq: 'weekly', category: 'Content' },
  { url: '/resources', priority: 0.8, changefreq: 'weekly', category: 'Content' },
  { url: '/testimonials', priority: 0.7, changefreq: 'monthly', category: 'Content' },
  
  // Lead Magnets
  { url: '/spain-company-setup-playbook', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-document-checklist', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  { url: '/spain-readiness-quiz', priority: 0.7, changefreq: 'monthly', category: 'Lead Magnets' },
  
  // Company Pages
  { url: '/about', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/team', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/methodology', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/sectors', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/strategy', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/careers', priority: 0.7, changefreq: 'monthly', category: 'Company' },
  { url: '/leave-review', priority: 0.5, changefreq: 'yearly', category: 'Company' },
  
  // Legal Pages
  { url: '/privacy', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/legal-notice', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/cookies', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/cookie-policy', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
  { url: '/terms', priority: 0.3, changefreq: 'yearly', category: 'Legal' },
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
