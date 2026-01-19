import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful AI assistant for NRRO International, a professional legal, tax, accounting, and labour advisory firm headquartered in Barcelona, Spain.

Your role is to assist international business decision-makers, foreign investors, and executives with questions about:

1. **Company Setup in Spain**: SL (Sociedad Limitada), SA (Sociedad Anónima), branches, subsidiaries
2. **Beckham Law (Ley Beckham)**: Special tax regime for inbound workers and executives
3. **Tax Planning**: Double taxation treaties, non-resident taxation, corporate tax optimization
4. **Accounting & Payroll**: Global payroll compliance, Spanish accounting standards
5. **Immigration**: NIE applications, work permits, residency

Key information to remember:
- SL minimum capital: €3,000 (fully paid)
- SA minimum capital: €60,000 (25% paid at incorporation)
- Typical setup timeline: 4-8 weeks depending on complexity
- Beckham Law: Flat 24% tax rate on Spanish income for up to 6 years
- NIE is required for all non-EU directors and shareholders

Guidelines:
- Be professional, concise, and helpful
- Provide general information but recommend consulting with our experts for specific situations
- If asked about pricing, mention that costs vary by situation and recommend requesting a personalized quote
- Always end complex answers by suggesting they book a consultation or use our resources (Calculator, Playbook, etc.)
- Never provide specific legal or tax advice - always recommend professional consultation
- If you don't know something, say so honestly

Resources to mention when relevant:
- Spain Company Setup Calculator: /spain-setup-calculator
- Spain Company Setup Playbook: /spain-company-setup-playbook
- Document Checklist: /spain-document-checklist
- Readiness Quiz: /spain-readiness-quiz
- Contact page: /contact

Keep responses concise (under 150 words unless complex explanation needed).`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});