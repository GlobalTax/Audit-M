import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PlaybookLeadRequest {
  fullName: string;
  email: string;
  companyName: string;
  jobTitle?: string;
  country: string;
  timeline?: string;
  playbookName: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface AssetConfig {
  downloadUrl: string;
  emailSubject: string;
  assetTitle: string;
  assetDescription: string;
  whatsInside: string[];
}

function getAssetConfig(playbookName: string): AssetConfig {
  const configs: Record<string, AssetConfig> = {
    "spain-company-setup": {
      downloadUrl: "https://global.nrro.es/downloads/spain-company-setup-playbook.pdf",
      emailSubject: "Your Spain Company Setup Playbook is Ready",
      assetTitle: "Spain Company Setup Playbook",
      assetDescription: "We're excited to support your expansion into the Spanish market.",
      whatsInside: [
        "12-step company setup roadmap",
        "Complete document checklist (25+ items)",
        "Week-by-week timeline breakdown",
        "Compliance framework and obligations",
        "12 costly mistakes to avoid"
      ]
    },
    "spain-document-checklist": {
      downloadUrl: "https://global.nrro.es/downloads/spain-document-checklist.pdf",
      emailSubject: "Your Spain Document Checklist is Ready",
      assetTitle: "Spain Company Setup Document Checklist",
      assetDescription: "Your complete document preparation guide is ready for download.",
      whatsInside: [
        "40+ document items by category",
        "Entity-specific requirements (SL, SA, Branch)",
        "NIE application instructions",
        "Apostille & legalization guide",
        "Document validity periods"
      ]
    }
  };

  return configs[playbookName] || configs["spain-company-setup"];
}

function generateEmailHtml(fullName: string, config: AssetConfig): string {
  const whatsInsideHtml = config.whatsInside.map(item => `<li>${item}</li>`).join("\n");
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; margin-bottom: 10px;">Your Download is Ready!</h1>
      </div>
      
      <p>Dear ${fullName},</p>
      
      <p>Thank you for downloading the <strong>${config.assetTitle}</strong>. ${config.assetDescription}</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${config.downloadUrl}" 
           style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Download Now
        </a>
      </div>
      
      <h3 style="color: #1a1a1a; margin-top: 30px;">What's Inside:</h3>
      <ul style="padding-left: 20px;">
        ${whatsInsideHtml}
      </ul>
      
      <h3 style="color: #1a1a1a; margin-top: 30px;">Ready for Personalized Guidance?</h3>
      <p>Our international advisory team has helped 500+ companies establish their presence in Spain. If you'd like to discuss your specific requirements:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://global.nrro.es/contact" 
           style="display: inline-block; background-color: transparent; color: #0066cc; padding: 12px 24px; text-decoration: none; border: 2px solid #0066cc; border-radius: 6px; font-weight: 600;">
          Schedule a Consultation
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #666; font-size: 14px;">
        Best regards,<br>
        <strong>NRRO International Advisory Team</strong><br>
        <a href="https://global.nrro.es" style="color: #0066cc;">global.nrro.es</a>
      </p>
      
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        You're receiving this email because you requested the ${config.assetTitle}. 
        If you didn't request this, please ignore this email.
      </p>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: PlaybookLeadRequest = await req.json();
    console.log("Received playbook lead request:", { ...body, email: "***" });

    // Validate required fields
    if (!body.fullName || !body.email || !body.companyName || !body.country) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get client info from headers
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                      req.headers.get("x-real-ip") || 
                      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from("playbook_leads")
      .insert({
        full_name: body.fullName,
        email: body.email.toLowerCase().trim(),
        company_name: body.companyName,
        job_title: body.jobTitle || null,
        country: body.country,
        timeline: body.timeline || null,
        playbook_name: body.playbookName || "spain-company-setup",
        source_site: "international",
        ip_address: ipAddress,
        user_agent: userAgent,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        utm_content: body.utm_content || null,
        utm_term: body.utm_term || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to save lead");
    }

    console.log("Lead saved successfully:", lead.id);

    // Send confirmation email with download link
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Get asset-specific configuration
        const assetConfig = getAssetConfig(body.playbookName);

        const { error: emailError } = await resend.emails.send({
          from: "NRRO International <noreply@nrro.es>",
          to: [body.email],
          subject: assetConfig.emailSubject,
          html: generateEmailHtml(body.fullName, assetConfig),
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          // Don't throw - lead is saved, email failure shouldn't fail the request
        } else {
          console.log("Confirmation email sent successfully");
        }

        // Send internal notification
        await resend.emails.send({
          from: "NRRO Leads <noreply@nrro.es>",
          to: ["international@nrro.es"],
          subject: `[Playbook Download] ${body.companyName} - ${body.country}`,
          html: `
            <h2>New Playbook Download</h2>
            <p><strong>Playbook:</strong> ${body.playbookName}</p>
            <hr>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Company:</strong> ${body.companyName}</p>
            <p><strong>Job Title:</strong> ${body.jobTitle || "Not provided"}</p>
            <p><strong>Country:</strong> ${body.country}</p>
            <p><strong>Timeline:</strong> ${body.timeline || "Not provided"}</p>
            <hr>
            <p><strong>UTM Source:</strong> ${body.utm_source || "Direct"}</p>
            <p><strong>UTM Medium:</strong> ${body.utm_medium || "-"}</p>
            <p><strong>UTM Campaign:</strong> ${body.utm_campaign || "-"}</p>
          `,
        });

      } catch (emailError) {
        console.error("Email service error:", emailError);
        // Continue - don't fail the request
      }
    } else {
      console.warn("RESEND_API_KEY not configured - skipping emails");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Playbook request received. Check your email for the download link.",
        leadId: lead.id 
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );

  } catch (error) {
    console.error("Handler error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
};

serve(handler);
