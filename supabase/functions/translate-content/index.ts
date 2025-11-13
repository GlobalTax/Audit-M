import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_TRANSLATE_API_KEY = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLang, sourceLang = 'es' } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['ca', 'en'].includes(targetLang)) {
      return new Response(JSON.stringify({ error: 'Target language must be ca or en' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Función recursiva para traducir objetos JSON
    const translateValue = async (value: any): Promise<any> => {
      if (typeof value === 'string' && value.trim()) {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              q: value,
              source: sourceLang,
              target: targetLang,
              format: 'text',
            }),
          }
        );

        if (!response.ok) {
          const error = await response.text();
          console.error('Google Translate API error:', error);
          throw new Error(`Translation API error: ${response.status}`);
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
      } else if (Array.isArray(value)) {
        return Promise.all(value.map(item => translateValue(item)));
      } else if (typeof value === 'object' && value !== null) {
        const translated: any = {};
        for (const [key, val] of Object.entries(value)) {
          translated[key] = await translateValue(val);
        }
        return translated;
      }
      return value;
    };

    const translatedText = await translateValue(text);

    return new Response(JSON.stringify({ translatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in translate-content function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
