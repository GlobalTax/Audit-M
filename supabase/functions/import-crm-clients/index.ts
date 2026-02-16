import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClientRow {
  nombre_cliente: string;
  nombre_empresa: string;
  cif: string;
  ubicacion: string;
  ventas_2022: number | null;
  ventas_2023: number | null;
  ventas_2024: number | null;
  ebitda_2022: number | null;
  ebitda_2023: number | null;
  ebitda_2024: number | null;
  margen_ebitda_2022: number | null;
  margen_ebitda_2023: number | null;
  margen_ebitda_2024: number | null;
  beneficio_neto_2022: number | null;
  beneficio_neto_2023: number | null;
  beneficio_neto_2024: number | null;
  multiplo: number | null;
  caja: number | null;
  deuda: number | null;
  num_empleados: number | null;
  num_clientes: number | null;
  ranking: number | null;
  contacto: string | null;
  posicion: string | null;
  mail: string | null;
  linkedin: string | null;
  comentarios: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { clients } = await req.json() as { clients: ClientRow[] };

    if (!clients || !Array.isArray(clients)) {
      return new Response(JSON.stringify({ error: "clients array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const records = clients
      .filter((c) => c.nombre_empresa && c.nombre_empresa.trim() !== "")
      .map((c) => ({
        name: c.nombre_empresa.trim(),
        nif_cif: c.cif || null,
        city: c.ubicacion || null,
        client_type: "empresa",
        status: "prospecto",
        pipeline_stage: "nuevo",
        source: "excel_import",
        source_site: "audit",
        total_facturacion: c.ventas_2024,
        num_empleados: c.num_empleados,
        caja: c.caja,
        deuda: c.deuda,
        ranking_position: c.ranking,
        contact_person: c.contacto,
        contact_position: c.posicion,
        contact_email: c.mail,
        contact_linkedin: c.linkedin,
        comentarios: c.comentarios,
        notes: c.nombre_cliente || null,
        financial_data: {
          ventas: { "2022": c.ventas_2022, "2023": c.ventas_2023, "2024": c.ventas_2024 },
          ebitda: { "2022": c.ebitda_2022, "2023": c.ebitda_2023, "2024": c.ebitda_2024 },
          margen_ebitda: { "2022": c.margen_ebitda_2022, "2023": c.margen_ebitda_2023, "2024": c.margen_ebitda_2024 },
          beneficio_neto: { "2022": c.beneficio_neto_2022, "2023": c.beneficio_neto_2023, "2024": c.beneficio_neto_2024 },
          multiplo: c.multiplo,
          num_clientes: c.num_clientes,
        },
      }));

    const { data, error } = await supabase
      .from("crm_clients")
      .insert(records)
      .select("id, name");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ inserted: data?.length || 0, clients: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
