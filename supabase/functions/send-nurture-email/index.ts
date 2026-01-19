import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NurtureEmailRequest {
  leadId: string;
  leadType: string;
  email: string;
  name: string;
  sequenceOrder?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { leadId, leadType, email, name, sequenceOrder = 1 }: NurtureEmailRequest = await req.json();

    console.log(`Sending nurture email: ${leadType} sequence ${sequenceOrder} to ${email}`);

    // Check if this email was already sent
    const { data: existingLog } = await supabase
      .from("nurture_email_log")
      .select("id")
      .eq("lead_id", leadId)
      .eq("lead_type", leadType)
      .eq("sequence_order", sequenceOrder)
      .single();

    if (existingLog) {
      console.log(`Email already sent for lead ${leadId}, sequence ${sequenceOrder}`);
      return new Response(
        JSON.stringify({ success: true, message: "Email already sent" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the sequence template
    const { data: sequence, error: seqError } = await supabase
      .from("email_nurture_sequences")
      .select("*")
      .eq("lead_type", leadType)
      .eq("sequence_order", sequenceOrder)
      .eq("is_active", true)
      .single();

    if (seqError || !sequence) {
      console.log(`No sequence found for ${leadType} order ${sequenceOrder}`);
      return new Response(
        JSON.stringify({ success: false, message: "No sequence found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Personalize content
    const personalizedHtml = sequence.html_content
      .replace(/\{name\}/g, name || "there")
      .replace(/\{email\}/g, email);

    const personalizedSubject = sequence.subject.replace(/\{name\}/g, name || "there");

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #000; font-size: 24px; font-weight: 500; }
          a { color: #000; }
          ul, ol { padding-left: 20px; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        ${personalizedHtml}
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          NRRO International Advisory<br>
          Barcelona, Spain<br>
          <a href="https://global.nrro.es">global.nrro.es</a>
        </p>
        <p style="font-size: 11px; color: #999;">
          You received this email because you downloaded a resource from our website. 
          <a href="https://global.nrro.es/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
        </p>
      </body>
      </html>
    `;

    // Send email via Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NRRO International <hello@nrro.es>",
        to: [email],
        subject: personalizedSubject,
        html: emailBody,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      throw new Error(`Resend error: ${JSON.stringify(emailResult)}`);
    }

    console.log("Email sent successfully:", emailResult);

    // Log the sent email
    await supabase.from("nurture_email_log").insert({
      lead_id: leadId,
      lead_type: leadType,
      lead_email: email,
      sequence_id: sequence.id,
      sequence_order: sequenceOrder,
      status: "sent",
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending nurture email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);