import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting case studies translation to English...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
      skipped: 0
    };

    console.log('📝 Fetching case studies...');
    const { data: caseStudies, error: caseStudiesError } = await supabase
      .from('case_studies')
      .select('*')
      .or('title_en.is.null,slug_en.is.null');

    if (caseStudiesError) {
      console.error('Error fetching case studies:', caseStudiesError);
      throw caseStudiesError;
    }

    console.log(`Found ${caseStudies?.length || 0} case studies to translate`);

    for (const caseStudy of caseStudies || []) {
      try {
        console.log(`  Translating: ${caseStudy.title_es || caseStudy.title}`);

        if (caseStudy.title_en && caseStudy.slug_en) {
          console.log(`  ⏭️  Skipped (already translated): ${caseStudy.title_es || caseStudy.title}`);
          results.skipped++;
          continue;
        }

        const { data: dataEn, error: errorEn } = await supabase.functions.invoke('translate-content', {
          body: { 
            text: {
              title: caseStudy.title_es || caseStudy.title,
              hero_title: caseStudy.hero_title_es || caseStudy.hero_title,
              hero_subtitle: caseStudy.hero_subtitle_es || caseStudy.hero_subtitle || '',
              challenge: caseStudy.challenge_es || caseStudy.challenge,
              solution: caseStudy.solution_es || caseStudy.solution,
              results_summary: caseStudy.results_summary_es || caseStudy.results_summary,
              detailed_content: caseStudy.detailed_content_es || caseStudy.detailed_content || '',
              testimonial_text: caseStudy.testimonial_text_es || caseStudy.testimonial_text || '',
              meta_title: caseStudy.meta_title_es || caseStudy.meta_title || '',
              meta_description: caseStudy.meta_description_es || caseStudy.meta_description || '',
            }, 
            targetLang: 'en', 
            sourceLang: 'es' 
          }
        });

        if (errorEn) throw errorEn;

        const translatedEn = dataEn.translatedText;

        const { error: updateError } = await supabase
          .from('case_studies')
          .update({
            title_en: translatedEn.title,
            slug_en: generateSlug(translatedEn.title),
            hero_title_en: translatedEn.hero_title,
            hero_subtitle_en: translatedEn.hero_subtitle,
            challenge_en: translatedEn.challenge,
            solution_en: translatedEn.solution,
            results_summary_en: translatedEn.results_summary,
            detailed_content_en: translatedEn.detailed_content,
            testimonial_text_en: translatedEn.testimonial_text,
            meta_title_en: translatedEn.meta_title,
            meta_description_en: translatedEn.meta_description,
            updated_at: new Date().toISOString(),
          })
          .eq('id', caseStudy.id);

        if (updateError) throw updateError;

        console.log(`  ✅ Case study translated: ${caseStudy.title_es || caseStudy.title}`);
        results.success++;

        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`  ❌ Error translating ${caseStudy.title_es || caseStudy.title}:`, error);
        results.failed++;
        const errorMsg = error instanceof Error ? error.message : String(error);
        results.errors.push(`${caseStudy.title_es || caseStudy.title}: ${errorMsg}`);
      }
    }

    console.log('🎉 Case studies translation to English complete!');
    console.log('Results:', results);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Case studies translation completed',
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('💥 Fatal error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMsg 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
