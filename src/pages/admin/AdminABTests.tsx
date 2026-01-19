import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FlaskConical, TrendingUp, Users, Target, RefreshCw } from "lucide-react";
import { format, subDays } from "date-fns";

// Predefined A/B tests configuration
const AB_TEST_CONFIG = {
  hero_cta_text: {
    name: "Hero CTA Text",
    description: "Testing different CTA button text on the homepage hero",
    variants: {
      A: "Request Consultation",
      B: "Start Your Spain Journey"
    },
    page: "/"
  },
  contact_form_layout: {
    name: "Contact Form Layout", 
    description: "Testing single column vs two column form layout",
    variants: {
      A: "Single Column",
      B: "Two Column"
    },
    page: "/contact"
  },
  playbook_cta_position: {
    name: "Playbook CTA Position",
    description: "Testing CTA button position on playbook page",
    variants: {
      A: "Above Form",
      B: "Below Benefits"
    },
    page: "/spain-company-setup-playbook"
  },
  calculator_results_style: {
    name: "Calculator Results Style",
    description: "Testing expanded vs compact results display",
    variants: {
      A: "Expanded Cards",
      B: "Compact Table"
    },
    page: "/spain-setup-calculator"
  }
};

type TestName = keyof typeof AB_TEST_CONFIG;

interface ABTestData {
  test_name: string;
  variant: string;
  impressions: number;
  conversions: number;
  conversion_rate: number;
}

export default function AdminABTests() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");
  const [selectedTest, setSelectedTest] = useState<TestName>("hero_cta_text");

  const { data: testData, isLoading, refetch } = useQuery({
    queryKey: ["ab-test-results", dateRange],
    queryFn: async () => {
      // This would typically query from an analytics database
      // For now, we'll simulate data based on what would be tracked
      const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
      const startDate = subDays(new Date(), days);
      
      // Simulated data structure - in production, this would come from GA4 or a dedicated analytics table
      const mockData: Record<TestName, ABTestData[]> = {
        hero_cta_text: [
          { test_name: "hero_cta_text", variant: "A", impressions: 1250, conversions: 45, conversion_rate: 3.6 },
          { test_name: "hero_cta_text", variant: "B", impressions: 1180, conversions: 52, conversion_rate: 4.4 }
        ],
        contact_form_layout: [
          { test_name: "contact_form_layout", variant: "A", impressions: 890, conversions: 78, conversion_rate: 8.8 },
          { test_name: "contact_form_layout", variant: "B", impressions: 920, conversions: 95, conversion_rate: 10.3 }
        ],
        playbook_cta_position: [
          { test_name: "playbook_cta_position", variant: "A", impressions: 456, conversions: 34, conversion_rate: 7.5 },
          { test_name: "playbook_cta_position", variant: "B", impressions: 478, conversions: 41, conversion_rate: 8.6 }
        ],
        calculator_results_style: [
          { test_name: "calculator_results_style", variant: "A", impressions: 312, conversions: 28, conversion_rate: 9.0 },
          { test_name: "calculator_results_style", variant: "B", impressions: 298, conversions: 31, conversion_rate: 10.4 }
        ]
      };

      return mockData;
    }
  });

  const currentTestData = testData?.[selectedTest] || [];
  const testConfig = AB_TEST_CONFIG[selectedTest];

  const calculateLift = () => {
    if (currentTestData.length < 2) return null;
    const variantA = currentTestData.find(d => d.variant === "A");
    const variantB = currentTestData.find(d => d.variant === "B");
    if (!variantA || !variantB) return null;
    
    const lift = ((variantB.conversion_rate - variantA.conversion_rate) / variantA.conversion_rate) * 100;
    return lift;
  };

  const lift = calculateLift();
  const winner = lift !== null ? (lift > 0 ? "B" : "A") : null;

  const chartData = currentTestData.map(d => ({
    name: `Variant ${d.variant}`,
    variant: d.variant,
    impressions: d.impressions,
    conversions: d.conversions,
    rate: d.conversion_rate
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-normal mb-2">A/B Test Results</h1>
          <p className="text-muted-foreground">Monitor and analyze conversion experiments</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={(v: "7d" | "30d" | "90d") => setDateRange(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Test Selector */}
      <Tabs value={selectedTest} onValueChange={(v) => setSelectedTest(v as TestName)} className="mb-8">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          {Object.entries(AB_TEST_CONFIG).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
              {config.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Test Details */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  {testConfig.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {testConfig.description}
                </CardDescription>
              </div>
              <Badge variant="secondary">{testConfig.page}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground mb-1">Variant A (Control)</p>
                <p className="font-medium">{testConfig.variants.A}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground mb-1">Variant B (Treatment)</p>
                <p className="font-medium">{testConfig.variants.B}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
                <p className="text-2xl font-bold">
                  {currentTestData.reduce((sum, d) => sum + d.impressions, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Conversions</p>
                <p className="text-2xl font-bold">
                  {currentTestData.reduce((sum, d) => sum + d.conversions, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lift (B vs A)</p>
                <p className={`text-2xl font-bold ${lift !== null && lift > 0 ? 'text-green-600' : lift !== null && lift < 0 ? 'text-red-600' : ''}`}>
                  {lift !== null ? `${lift > 0 ? '+' : ''}${lift.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-500/10">
                <FlaskConical className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Winner</p>
                <p className="text-2xl font-bold">
                  {winner ? `Variant ${winner}` : 'Inconclusive'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Conversion Rate by Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 'dataMax']} unit="%" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Conversion Rate']}
                  />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.variant === winner ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Impressions vs Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impressions" fill="hsl(var(--muted-foreground))" name="Impressions" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="hsl(var(--primary))" name="Conversions" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variant Details Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Variant Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Variant</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-right py-3 px-4 font-medium">Impressions</th>
                  <th className="text-right py-3 px-4 font-medium">Conversions</th>
                  <th className="text-right py-3 px-4 font-medium">Conv. Rate</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTestData.map((row) => (
                  <tr key={row.variant} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <Badge variant={row.variant === "A" ? "secondary" : "default"}>
                        Variant {row.variant}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {testConfig.variants[row.variant as "A" | "B"]}
                    </td>
                    <td className="py-3 px-4 text-right">{row.impressions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{row.conversions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium">{row.conversion_rate.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-center">
                      {winner === row.variant ? (
                        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                          Winner
                        </Badge>
                      ) : (
                        <Badge variant="outline">Control</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
