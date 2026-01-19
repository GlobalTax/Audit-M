import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadToNurture {
  id: string;
  email: string;
  name: string;
  lead_type: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting nurture email scheduler...");

    // Get all active sequences grouped by lead_type
    const { data: sequences, error: seqError } = await supabase
      .from("email_nurture_sequences")
      .select("*")
      .eq("is_active", true)
      .order("lead_type")
      .order("sequence_order");

    if (seqError) {
      throw new Error(`Failed to fetch sequences: ${seqError.message}`);
    }

    // Group sequences by lead_type
    const sequencesByType = sequences.reduce((acc: Record<string, any[]>, seq) => {
      if (!acc[seq.lead_type]) acc[seq.lead_type] = [];
      acc[seq.lead_type].push(seq);
      return acc;
    }, {});

    let totalSent = 0;

    // Process playbook leads
    const { data: playbookLeads } = await supabase
      .from("playbook_leads")
      .select("id, email, full_name, playbook_name, created_at")
      .gte("created_at", new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()); // Last 14 days

    if (playbookLeads) {
      for (const lead of playbookLeads) {
        const leadType = lead.playbook_name || "spain-company-setup";
        const leadSequences = sequencesByType[leadType];
        
        if (!leadSequences) continue;

        const daysSinceCreation = Math.floor(
          (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24)
        );

        for (const seq of leadSequences) {
          if (daysSinceCreation >= seq.delay_days) {
            // Check if already sent
            const { data: existing } = await supabase
              .from("nurture_email_log")
              .select("id")
              .eq("lead_id", lead.id)
              .eq("lead_type", leadType)
              .eq("sequence_order", seq.sequence_order)
              .single();

            if (!existing) {
              // Send the email
              try {
                const response = await fetch(
                  `${supabaseUrl}/functions/v1/send-nurture-email`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${supabaseServiceKey}`,
                    },
                    body: JSON.stringify({
                      leadId: lead.id,
                      leadType: leadType,
                      email: lead.email,
                      name: lead.full_name,
                      sequenceOrder: seq.sequence_order,
                    }),
                  }
                );

                if (response.ok) {
                  totalSent++;
                  console.log(`Sent ${leadType} email ${seq.sequence_order} to ${lead.email}`);
                }
              } catch (e) {
                console.error(`Failed to send to ${lead.email}:`, e);
              }

              // Rate limit: wait 500ms between emails
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        }
      }
    }

    console.log(`Nurture scheduler completed. Sent ${totalSent} emails.`);

    return new Response(
      JSON.stringify({ success: true, emailsSent: totalSent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Nurture scheduler error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);