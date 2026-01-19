import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Embedded data for tool responses
const LEGAL_STRUCTURES = {
  sl: {
    name: "Sociedad Limitada (SL)",
    minCapital: 3000,
    liability: "Limited to capital contribution",
    timeline: "3-5 weeks",
    setupCosts: { min: 2500, max: 5000 },
    annualCosts: { min: 1500, max: 4000 },
    taxRate: "25% (15% first 2 years)",
    idealFor: ["SMEs", "Startups", "Family businesses", "Professional services"],
    pros: ["Low capital (€3,000)", "Simple governance", "Limited liability", "Lower costs"],
    cons: ["Share transfer restrictions", "Cannot issue bonds"]
  },
  sa: {
    name: "Sociedad Anónima (SA)",
    minCapital: 60000,
    liability: "Limited to capital contribution",
    timeline: "4-6 weeks",
    setupCosts: { min: 4000, max: 8000 },
    annualCosts: { min: 5000, max: 15000 },
    taxRate: "25%",
    idealFor: ["Large corporations", "IPO candidates", "Regulated industries"],
    pros: ["Enhanced credibility", "Freely transferable shares", "Can issue bonds"],
    cons: ["High capital (€60,000)", "Complex governance", "Higher costs"]
  },
  branch: {
    name: "Branch Office (Sucursal)",
    minCapital: 0,
    liability: "Parent company fully liable",
    timeline: "4-6 weeks",
    setupCosts: { min: 3000, max: 6000 },
    annualCosts: { min: 2000, max: 5000 },
    taxRate: "25% on Spanish profits",
    idealFor: ["Market testing", "Temporary operations", "Sales offices"],
    pros: ["No minimum capital", "Simpler structure", "Easier to close"],
    cons: ["Parent fully liable", "Less local credibility", "Tax limitations"]
  },
  subsidiary: {
    name: "Subsidiary (Filial)",
    minCapital: 3000,
    liability: "Limited - parent protected",
    timeline: "3-5 weeks",
    setupCosts: { min: 3000, max: 6000 },
    annualCosts: { min: 2000, max: 6000 },
    taxRate: "25%",
    idealFor: ["Long-term market entry", "Risk isolation", "Tax planning"],
    pros: ["Full parent liability protection", "Local credibility", "Access to incentives"],
    cons: ["More complex setup", "Transfer pricing rules", "Separate accounting"]
  }
};

const BECKHAM_RATE = 0.24;
const BECKHAM_HIGH_RATE = 0.47;
const BECKHAM_THRESHOLD = 600000;

const IRPF_BRACKETS = [
  { min: 0, max: 12450, rate: 0.19 },
  { min: 12450, max: 20200, rate: 0.24 },
  { min: 20200, max: 35200, rate: 0.30 },
  { min: 35200, max: 60000, rate: 0.37 },
  { min: 60000, max: 300000, rate: 0.45 },
  { min: 300000, max: Infinity, rate: 0.47 },
];

function calculateProgressiveIRPF(income: number): number {
  let totalTax = 0;
  let remainingIncome = income;
  
  for (const bracket of IRPF_BRACKETS) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    totalTax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  
  return totalTax;
}

function calculateBeckhamTax(income: number): number {
  if (income <= BECKHAM_THRESHOLD) {
    return income * BECKHAM_RATE;
  }
  return BECKHAM_THRESHOLD * BECKHAM_RATE + (income - BECKHAM_THRESHOLD) * BECKHAM_HIGH_RATE;
}

// Tool definitions for the AI
const TOOLS = [
  {
    type: "function",
    function: {
      name: "calculate_setup_costs",
      description: "Calculate estimated costs and timeline for setting up a company in Spain based on company type and founder residency",
      parameters: {
        type: "object",
        properties: {
          company_type: {
            type: "string",
            enum: ["sl", "sa", "branch", "subsidiary"],
            description: "Type of company: sl (Sociedad Limitada), sa (Sociedad Anónima), branch (Branch Office), subsidiary"
          },
          is_non_eu: {
            type: "boolean",
            description: "Whether founders are non-EU (requires NIE)"
          }
        },
        required: ["company_type"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "compare_legal_structures",
      description: "Compare different legal structures for setting up a company in Spain (SL, SA, Branch, Subsidiary)",
      parameters: {
        type: "object",
        properties: {
          structures: {
            type: "array",
            items: { type: "string", enum: ["sl", "sa", "branch", "subsidiary"] },
            description: "Which structures to compare. If empty, compares all."
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "calculate_beckham_savings",
      description: "Calculate tax savings under Spain's Beckham Law (special tax regime) compared to standard IRPF",
      parameters: {
        type: "object",
        properties: {
          annual_salary: {
            type: "number",
            description: "Gross annual salary in EUR"
          }
        },
        required: ["annual_salary"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_nie_info",
      description: "Get information about NIE (Foreigner Identification Number) requirements and process in Spain",
      parameters: {
        type: "object",
        properties: {}
      }
    }
  },
  {
    type: "function",
    function: {
      name: "suggest_entity_type",
      description: "Suggest the best legal structure based on user's business criteria",
      parameters: {
        type: "object",
        properties: {
          annual_revenue: {
            type: "string",
            enum: ["under_500k", "500k_2m", "over_2m"],
            description: "Expected annual revenue"
          },
          liability_priority: {
            type: "string",
            enum: ["critical", "moderate", "low"],
            description: "How important is parent company liability protection"
          },
          duration: {
            type: "string",
            enum: ["short", "medium", "long"],
            description: "Planned duration: short (1-2 years), medium (3-5), long (permanent)"
          },
          seeking_investors: {
            type: "boolean",
            description: "Whether the company plans to seek external investors"
          }
        },
        required: ["annual_revenue"]
      }
    }
  }
];

// Tool execution functions
function executeCalculateSetupCosts(args: { company_type: string; is_non_eu?: boolean }) {
  const structure = LEGAL_STRUCTURES[args.company_type as keyof typeof LEGAL_STRUCTURES];
  if (!structure) return { error: "Unknown company type" };
  
  let minCost = structure.setupCosts.min;
  let maxCost = structure.setupCosts.max;
  
  if (args.is_non_eu) {
    minCost += 150;
    maxCost += 400;
  }
  
  return {
    type: "setup_costs",
    data: {
      company_type: structure.name,
      timeline: structure.timeline,
      setup_costs: { min: minCost, max: maxCost },
      minimum_capital: structure.minCapital,
      annual_costs: structure.annualCosts,
      nie_required: args.is_non_eu || false,
      tax_rate: structure.taxRate
    }
  };
}

function executeCompareLegalStructures(args: { structures?: string[] }) {
  const toCompare = args.structures?.length 
    ? args.structures 
    : ["sl", "sa", "branch", "subsidiary"];
  
  const comparison = toCompare.map(key => {
    const s = LEGAL_STRUCTURES[key as keyof typeof LEGAL_STRUCTURES];
    return {
      id: key,
      name: s.name,
      min_capital: s.minCapital,
      liability: s.liability,
      timeline: s.timeline,
      setup_costs: `€${s.setupCosts.min.toLocaleString()} - €${s.setupCosts.max.toLocaleString()}`,
      ideal_for: s.idealFor.slice(0, 2).join(", ")
    };
  });
  
  return { type: "comparison_table", data: comparison };
}

function executeCalculateBeckhamSavings(args: { annual_salary: number }) {
  const salary = args.annual_salary;
  const standardTax = calculateProgressiveIRPF(salary);
  const beckhamTax = calculateBeckhamTax(salary);
  const annualSavings = standardTax - beckhamTax;
  const sixYearSavings = annualSavings * 6;
  
  return {
    type: "beckham_calculation",
    data: {
      gross_salary: salary,
      standard_irpf: {
        tax: Math.round(standardTax),
        effective_rate: ((standardTax / salary) * 100).toFixed(1) + "%",
        net_salary: Math.round(salary - standardTax)
      },
      beckham_law: {
        tax: Math.round(beckhamTax),
        effective_rate: salary <= BECKHAM_THRESHOLD ? "24%" : "24% + 47%",
        net_salary: Math.round(salary - beckhamTax)
      },
      savings: {
        annual: Math.round(annualSavings),
        six_years: Math.round(sixYearSavings),
        percentage: ((annualSavings / standardTax) * 100).toFixed(0) + "%"
      },
      eligibility_note: "Subject to meeting residency and employment requirements"
    }
  };
}

function executeGetNieInfo() {
  return {
    type: "nie_info",
    data: {
      what_is_nie: "NIE (Número de Identificación de Extranjero) is Spain's tax identification number for foreigners",
      who_needs_it: ["Non-EU shareholders", "Non-EU directors", "Anyone conducting business in Spain"],
      timeline: "1-4 weeks depending on application method",
      methods: [
        { method: "In Spain (Police station)", time: "1-2 weeks", notes: "Requires appointment" },
        { method: "Spanish Consulate abroad", time: "2-4 weeks", notes: "Varies by country" },
        { method: "Through legal representative", time: "2-3 weeks", notes: "Recommended for convenience" }
      ],
      cost: "€10-15 government fee + professional fees if using representative",
      required_documents: ["Valid passport", "Application form EX-15", "Proof of reason (company docs)", "Passport photos"]
    }
  };
}

function executeSuggestEntityType(args: { annual_revenue: string; liability_priority?: string; duration?: string; seeking_investors?: boolean }) {
  const scores = { sl: 0, sa: 0, branch: 0, subsidiary: 0 };
  
  // Revenue scoring
  if (args.annual_revenue === "under_500k") {
    scores.sl += 3; scores.branch += 2; scores.subsidiary += 2;
  } else if (args.annual_revenue === "500k_2m") {
    scores.sl += 2; scores.sa += 1; scores.subsidiary += 2;
  } else {
    scores.sa += 3; scores.sl += 1; scores.subsidiary += 2;
  }
  
  // Liability scoring
  if (args.liability_priority === "critical") {
    scores.subsidiary += 3; scores.sl += 2; scores.sa += 2;
  } else if (args.liability_priority === "low") {
    scores.branch += 3;
  }
  
  // Duration scoring
  if (args.duration === "short") {
    scores.branch += 3;
  } else if (args.duration === "long") {
    scores.subsidiary += 3; scores.sl += 2; scores.sa += 2;
  }
  
  // Investor scoring
  if (args.seeking_investors) {
    scores.sa += 3;
  }
  
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const recommendation = sorted[0][0];
  const alternative = sorted[1][0];
  
  return {
    type: "entity_recommendation",
    data: {
      recommended: LEGAL_STRUCTURES[recommendation as keyof typeof LEGAL_STRUCTURES].name,
      recommended_id: recommendation,
      reason: `Best fit based on your ${args.annual_revenue.replace("_", "-")} revenue expectations`,
      alternative: LEGAL_STRUCTURES[alternative as keyof typeof LEGAL_STRUCTURES].name,
      details: LEGAL_STRUCTURES[recommendation as keyof typeof LEGAL_STRUCTURES]
    }
  };
}

function executeTool(name: string, args: unknown) {
  switch (name) {
    case "calculate_setup_costs":
      return executeCalculateSetupCosts(args as { company_type: string; is_non_eu?: boolean });
    case "compare_legal_structures":
      return executeCompareLegalStructures(args as { structures?: string[] });
    case "calculate_beckham_savings":
      return executeCalculateBeckhamSavings(args as { annual_salary: number });
    case "get_nie_info":
      return executeGetNieInfo();
    case "suggest_entity_type":
      return executeSuggestEntityType(args as { annual_revenue: string; liability_priority?: string; duration?: string; seeking_investors?: boolean });
    default:
      return { error: "Unknown tool" };
  }
}

const SYSTEM_PROMPT = `You are an intelligent AI assistant for NRRO International, a professional legal, tax, accounting, and labour advisory firm headquartered in Barcelona, Spain.

You have access to TOOLS that provide REAL DATA. USE THEM when users ask about:
- Company setup costs or timelines → use calculate_setup_costs
- Comparing SL vs SA vs Branch vs Subsidiary → use compare_legal_structures  
- Beckham Law tax savings → use calculate_beckham_savings (ask for salary if not provided)
- NIE requirements → use get_nie_info
- Which entity type is best for them → use suggest_entity_type

IMPORTANT BEHAVIOR:
1. When a user asks about costs, timelines, or comparisons, ALWAYS use the appropriate tool to get real data
2. Present tool results in a clear, structured format with actual numbers
3. After showing data, briefly explain what it means and suggest next steps
4. If you need more info to use a tool (like salary for Beckham calculation), ask for it specifically
5. Always recommend consulting with NRRO experts for personalized advice

FORMATTING GUIDELINES:
- Use markdown tables for comparisons
- Use bullet points for lists
- Bold key numbers and savings
- Keep explanations concise after showing data
- End with a relevant resource link when appropriate

Resources to mention:
- Spain Company Setup Calculator: /spain-setup-calculator
- Beckham Law Calculator: /beckham-law-calculator
- Legal Structures Comparator: /legal-structures-comparator
- Document Checklist: /spain-document-checklist
- Contact: /contact`;

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

    // First call with tools
    const initialResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
        tools: TOOLS,
        tool_choice: "auto",
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!initialResponse.ok) {
      if (initialResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (initialResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await initialResponse.text();
      console.error("AI gateway error:", initialResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const initialData = await initialResponse.json();
    const choice = initialData.choices?.[0];
    
    // Check if we need to execute tools
    if (choice?.message?.tool_calls && choice.message.tool_calls.length > 0) {
      const toolCalls = choice.message.tool_calls;
      const toolResults: Array<{ role: string; tool_call_id: string; content: string }> = [];
      
      for (const toolCall of toolCalls) {
        const args = JSON.parse(toolCall.function.arguments || "{}");
        const result = executeTool(toolCall.function.name, args);
        toolResults.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        });
      }
      
      // Second call with tool results - this one streams
      const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            choice.message,
            ...toolResults
          ],
          stream: true,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!followUpResponse.ok) {
        const errorText = await followUpResponse.text();
        console.error("AI gateway follow-up error:", followUpResponse.status, errorText);
        return new Response(
          JSON.stringify({ error: "AI service error" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(followUpResponse.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }
    
    // No tool calls - stream the response directly
    const streamResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    return new Response(streamResponse.body, {
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
