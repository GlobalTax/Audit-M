const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Enriching company from URL:', formattedUrl);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: [
          {
            type: 'json',
            schema: {
              type: 'object',
              properties: {
                description: { type: 'string', description: 'Brief description of the company and what they do' },
                sector: { type: 'string', description: 'Industry or sector the company operates in' },
                phone: { type: 'string', description: 'Main contact phone number' },
                email: { type: 'string', description: 'Main contact email address' },
                address: { type: 'string', description: 'Physical street address' },
                city: { type: 'string', description: 'City name' },
                postal_code: { type: 'string', description: 'Postal or ZIP code' },
                country: { type: 'string', description: 'Country name' },
              },
            },
            prompt: 'Extract company information from this website. Look for contact details, about page content, and footer information. Return only factual data found on the page.',
          },
        ],
        onlyMainContent: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Firecrawl request failed (${response.status})` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the JSON data from the response
    const extractedData = data?.data?.json || data?.json || {};

    console.log('Enrichment data extracted:', JSON.stringify(extractedData));

    return new Response(
      JSON.stringify({ success: true, data: extractedData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error enriching company:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
