import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewPayload {
  fullName: string;
  companyName: string;
  jobTitle?: string;
  country: string;
  serviceUsed: string;
  rating: number;
  reviewText: string;
  permissionToPublish: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: ReviewPayload = await req.json();

    // Validate required fields
    if (
      !payload.fullName ||
      !payload.companyName ||
      !payload.country ||
      !payload.serviceUsed ||
      !payload.rating ||
      !payload.reviewText
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate rating range
    if (payload.rating < 1 || payload.rating > 5) {
      return new Response(
        JSON.stringify({ error: "Rating must be between 1 and 5" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate review text length
    if (payload.reviewText.length < 50 || payload.reviewText.length > 1000) {
      return new Response(
        JSON.stringify({
          error: "Review must be between 50 and 1000 characters",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get IP and user agent from request
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
    const userAgent = req.headers.get("user-agent") || null;

    // Insert review into database
    const { data, error } = await supabase
      .from("review_submissions")
      .insert({
        full_name: payload.fullName.trim(),
        company_name: payload.companyName.trim(),
        job_title: payload.jobTitle?.trim() || null,
        country: payload.country.trim(),
        service_used: payload.serviceUsed,
        rating: payload.rating,
        review_text: payload.reviewText.trim(),
        permission_to_publish: payload.permissionToPublish,
        ip_address: ipAddress,
        user_agent: userAgent,
        source_site: "international",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting review:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit review" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Review submitted successfully:", data.id);

    // Send notification email to admin (optional - using Resend)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "NRRO International <noreply@nrro.es>",
            to: ["international@nrro.es"],
            subject: `New Review Submission: ${payload.rating}★ from ${payload.companyName}`,
            html: `
              <h2>New Client Review Submitted</h2>
              <p><strong>Name:</strong> ${payload.fullName}</p>
              <p><strong>Company:</strong> ${payload.companyName}</p>
              <p><strong>Job Title:</strong> ${payload.jobTitle || "N/A"}</p>
              <p><strong>Country:</strong> ${payload.country}</p>
              <p><strong>Service:</strong> ${payload.serviceUsed}</p>
              <p><strong>Rating:</strong> ${"★".repeat(payload.rating)}${"☆".repeat(5 - payload.rating)}</p>
              <hr>
              <p><strong>Review:</strong></p>
              <blockquote style="border-left: 3px solid #ccc; padding-left: 12px; margin-left: 0;">
                ${payload.reviewText}
              </blockquote>
              <hr>
              <p style="color: #666; font-size: 12px;">
                Review ID: ${data.id}<br>
                Permission to publish: ${payload.permissionToPublish ? "Yes" : "No"}
              </p>
            `,
          }),
        });
        console.log("Admin notification email sent");
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing review submission:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
