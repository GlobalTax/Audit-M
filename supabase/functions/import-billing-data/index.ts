import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Allow either Bearer auth (admin user) or internal service key header
    const authHeader = req.headers.get("Authorization");
    const internalKey = req.headers.get("x-internal-key");
    
    if (internalKey === serviceKey) {
      // Internal call - allowed
    } else if (authHeader?.startsWith("Bearer ")) {
      // Verify user is admin
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: claimsData, error: claimsError } = await userClient.auth.getUser(token);
      if (claimsError || !claimsData.user) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: corsHeaders });
      }

      // Use service role to check admin
      const adminCheck = createClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data: roles } = await adminCheck
        .from("user_roles")
        .select("role")
        .eq("user_id", claimsData.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        return new Response(JSON.stringify({ error: "Admin role required" }), { status: 403, headers: corsHeaders });
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Use service role to bypass RLS
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check admin role
    const { data: roles } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", claimsData.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin role required" }), { status: 403, headers: corsHeaders });
    }

    const { invoices } = await req.json();
    if (!Array.isArray(invoices) || invoices.length === 0) {
      return new Response(JSON.stringify({ error: "No invoices provided" }), { status: 400, headers: corsHeaders });
    }

    // Step 1: Get or create clients
    const clientNames = [...new Set(invoices.map((inv: any) => inv.client_name as string))];
    const { data: existingClients } = await admin
      .from("crm_clients")
      .select("id, name")
      .in("name", clientNames);

    const clientMap: Record<string, string> = {};
    (existingClients ?? []).forEach((c: any) => { clientMap[c.name] = c.id; });

    // Create missing clients
    const missingClients = clientNames.filter((n) => !clientMap[n]);
    if (missingClients.length > 0) {
      const { data: created, error: createErr } = await admin
        .from("crm_clients")
        .insert(missingClients.map((name) => ({ name, status: "activo", pipeline_stage: "cerrado_ganado" })))
        .select("id, name");

      if (createErr) {
        console.error("Error creating clients:", createErr);
        return new Response(JSON.stringify({ error: createErr.message }), { status: 500, headers: corsHeaders });
      }
      (created ?? []).forEach((c: any) => { clientMap[c.name] = c.id; });
    }

    // Step 2: Insert invoices
    const invoiceRows = invoices.map((inv: any, idx: number) => ({
      client_id: clientMap[inv.client_name],
      invoice_number: inv.invoice_number || `FAC-2025-${String(idx + 1).padStart(3, "0")}`,
      issue_date: inv.issue_date || "2025-12-31",
      amount: inv.amount || 0,
      tax_amount: inv.tax_amount || 0,
      total_amount: inv.total_amount || inv.amount || 0,
      status: inv.status || "pagada",
      service_description: inv.service_description || "",
      service_type: inv.service_type || null,
      notes: inv.notes || null,
    }));

    // Insert in batches of 50
    let inserted = 0;
    for (let i = 0; i < invoiceRows.length; i += 50) {
      const batch = invoiceRows.slice(i, i + 50);
      const { error: insertErr } = await admin.from("crm_invoices").insert(batch);
      if (insertErr) {
        console.error(`Batch error at ${i}:`, insertErr);
        return new Response(
          JSON.stringify({ error: insertErr.message, inserted }),
          { status: 500, headers: corsHeaders }
        );
      }
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        clients_created: missingClients.length,
        invoices_inserted: inserted,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
