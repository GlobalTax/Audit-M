import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("[AUTO_BLOG] Starting automatic blog generation...");

    // Check automation settings
    const { data: settings } = await supabase
      .from("blog_automation_settings")
      .select("*")
      .single();

    if (!settings?.is_enabled) {
      console.log("[AUTO_BLOG] Automation is disabled");
      return new Response(
        JSON.stringify({ success: false, message: "Automation disabled" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const articlesToGenerate = settings.articles_per_run || 1;

    // Get pending topics from queue
    const { data: topics, error: topicsError } = await supabase
      .from("blog_topics_queue")
      .select("*")
      .eq("status", "pending")
      .order("priority", { ascending: true })
      .order("created_at", { ascending: true })
      .limit(articlesToGenerate);

    if (topicsError) {
      throw new Error(`Failed to fetch topics: ${topicsError.message}`);
    }

    if (!topics || topics.length === 0) {
      console.log("[AUTO_BLOG] No pending topics in queue");
      return new Response(
        JSON.stringify({ success: true, message: "No pending topics", generated: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let generatedCount = 0;
    const results: any[] = [];

    for (const topic of topics) {
      try {
        console.log(`[AUTO_BLOG] Processing topic: ${topic.topic}`);

        // Mark as processing
        await supabase
          .from("blog_topics_queue")
          .update({ status: "processing", updated_at: new Date().toISOString() })
          .eq("id", topic.id);

        // Generate the article
        const generateResponse = await fetch(
          `${supabaseUrl}/functions/v1/generate-blog-article`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              prompt: `Write a comprehensive, SEO-optimized article about: ${topic.topic}. 
              
Target keywords to include naturally: ${topic.target_keywords?.join(", ") || "none specified"}.

This is for an international business audience interested in setting up companies in Spain. 
Focus on practical, actionable information with specific steps, costs, and timelines where applicable.
Include real examples and data points to build credibility.`,
              tone: settings.default_tone || "professional",
              language: topic.target_language || "both",
            }),
          }
        );

        if (!generateResponse.ok) {
          const errorText = await generateResponse.text();
          throw new Error(`Generation failed: ${errorText}`);
        }

        const articleData = await generateResponse.json();

        if (articleData.error) {
          throw new Error(articleData.error);
        }

        // Create the blog post
        const slug_es = generateSlug(articleData.title_es);
        const slug_en = generateSlug(articleData.title_en || articleData.title_es);

        const sourceSite = topic.target_site === "international" ? "international" : "domestic";

        const { data: newPost, error: insertError } = await supabase
          .from("blog_posts")
          .insert({
            title_es: articleData.title_es,
            title_en: articleData.title_en,
            slug_es,
            slug_en,
            excerpt_es: articleData.excerpt_es,
            excerpt_en: articleData.excerpt_en,
            content_es: articleData.content_es,
            content_en: articleData.content_en,
            category: articleData.category,
            tags: articleData.tags,
            seo_title_es: articleData.seo_title_es,
            seo_title_en: articleData.seo_title_en,
            seo_description_es: articleData.seo_description_es,
            seo_description_en: articleData.seo_description_en,
            featured_image: articleData.featured_image_url,
            read_time: articleData.read_time,
            author_id: "00000000-0000-0000-0000-000000000000", // System author
            author_name: "NRRO Editorial Team",
            author_specialization: "International Business Advisory",
            status: settings.auto_publish ? "published" : "draft",
            published_at: settings.auto_publish ? new Date().toISOString() : null,
            source_site: sourceSite,
            shared_sites: topic.target_site === "both" ? ["domestic", "international"] : null,
          })
          .select()
          .single();

        if (insertError) {
          throw new Error(`Insert failed: ${insertError.message}`);
        }

        // Update queue with success
        await supabase
          .from("blog_topics_queue")
          .update({
            status: "completed",
            generated_post_id: newPost.id,
            processed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", topic.id);

        generatedCount++;
        results.push({
          topic: topic.topic,
          post_id: newPost.id,
          slug: slug_en,
          status: "success",
        });

        console.log(`[AUTO_BLOG] Successfully generated: ${articleData.title_en}`);

        // Rate limit between generations
        await new Promise((resolve) => setTimeout(resolve, 2000));

      } catch (error: any) {
        console.error(`[AUTO_BLOG] Error processing topic ${topic.topic}:`, error);

        // Mark as failed
        await supabase
          .from("blog_topics_queue")
          .update({
            status: "failed",
            error_message: error.message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", topic.id);

        results.push({
          topic: topic.topic,
          status: "failed",
          error: error.message,
        });
      }
    }

    // Update automation settings with last run time
    await supabase
      .from("blog_automation_settings")
      .update({
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    console.log(`[AUTO_BLOG] Completed. Generated ${generatedCount} articles.`);

    return new Response(
      JSON.stringify({
        success: true,
        generated: generatedCount,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("[AUTO_BLOG] Fatal error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});