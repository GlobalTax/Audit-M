import { useState, useEffect } from "react";
import { Meta } from "@/components/seo/Meta";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Users, 
  Phone, 
  ArrowRight, 
  BookOpen, 
  Calculator as CalcIcon,
  ClipboardCheck,
  CheckCircle2
} from "lucide-react";
import { LaborCostForm } from "@/components/labor-calculator/LaborCostForm";
import { LaborCostResults } from "@/components/labor-calculator/LaborCostResults";
import { LaborCostLeadForm } from "@/components/labor-calculator/LaborCostLeadForm";
import { 
  LaborCostInputs, 
  LaborCostResults as LaborCostResultsType, 
  calculateLaborCosts 
} from "@/lib/laborCostCalculatorLogic";
import { useAnalytics } from "@/hooks/useAnalytics";

const trustPoints = [
  "1000+ international clients",
  "Spain payroll experts",
  "2025 rates included",
];

const relatedResources = [
  {
    icon: BookOpen,
    title: "Spain Company Setup Playbook",
    description: "Complete guide to establishing your business in Spain",
    href: "/spain-company-setup-playbook",
  },
  {
    icon: ClipboardCheck,
    title: "Document Checklist",
    description: "40+ documents needed for company registration",
    href: "/spain-document-checklist",
  },
  {
    icon: CalcIcon,
    title: "Setup Cost Calculator",
    description: "Estimate incorporation costs and timeline",
    href: "/spain-setup-calculator",
  },
];

export default function SpainLaborCostCalculator() {
  const { trackEvent } = useAnalytics();
  const [inputs, setInputs] = useState<LaborCostInputs | null>(null);
  const [results, setResults] = useState<LaborCostResultsType | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    trackEvent("labor_calculator_view_global_nrro");
  }, [trackEvent]);

  const handleCalculate = (formInputs: LaborCostInputs) => {
    setIsCalculating(true);
    
    trackEvent("labor_calculator_submit_global_nrro", {
      gross_salary: formInputs.grossSalary,
      contract_type: formInputs.contractType,
      employees: formInputs.numberOfEmployees,
      industry_risk: formInputs.industryRisk,
    });

    // Simulate brief calculation delay for UX
    setTimeout(() => {
      const calculatedResults = calculateLaborCosts(formInputs);
      setInputs(formInputs);
      setResults(calculatedResults);
      setIsCalculating(false);

      trackEvent("labor_calculator_result_view_global_nrro", {
        total_employer_cost: calculatedResults.totalMonthlyEmployerCost,
        net_salary: calculatedResults.netSalary,
      });
    }, 500);
  };

  const handleCTAClick = (ctaType: string) => {
    trackEvent(`labor_calculator_cta_${ctaType}_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Spain Labor Cost Calculator | Payroll Cost Estimator | NRRO"
        description="Calculate the true cost of hiring employees in Spain. Estimate employer social security contributions, net salary, and total monthly labor costs with our free calculator."
        keywords="labor costs Spain, payroll cost calculator Spain, employer social security Spain, hiring costs Spain, Spain payroll estimator"
        canonicalUrl="/spain-labor-cost-calculator"
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BadgeHero>Free Estimation Tool</BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Spain Labor Cost Calculator
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl">
              Understand the true cost of hiring in Spain. Estimate employer contributions, net salary, and total monthly labor costs for your Spanish workforce.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Form */}
            <div>
              <div className="mb-6">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-2 block">
                  Step 1
                </span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Enter Employment Details
                </h2>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <LaborCostForm 
                    onCalculate={handleCalculate}
                    isCalculating={isCalculating}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div>
              <div className="mb-6">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-2 block">
                  Step 2
                </span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Your Estimated Labor Costs
                </h2>
              </div>

              {results && inputs ? (
                <LaborCostResults 
                  results={results}
                  grossSalary={inputs.grossSalary}
                  numberOfEmployees={inputs.numberOfEmployees}
                />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-16 text-center">
                    <CalcIcon className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter your employment details and click "Calculate" to see your estimated labor costs.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture + CTAs Section */}
      {results && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Lead Capture Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Download Detailed Report
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Get a PDF with your complete labor cost breakdown, annual projections, and recommended next steps.
                  </p>
                </CardHeader>
                <CardContent>
                  <LaborCostLeadForm 
                    calculatorInputs={inputs ? {
                      grossSalary: inputs.grossSalary,
                      contractType: inputs.contractType,
                      numberOfEmployees: inputs.numberOfEmployees,
                      industryRisk: inputs.industryRisk,
                    } : undefined}
                    results={results ? {
                      totalMonthlyEmployerCost: results.totalMonthlyEmployerCost,
                      netSalary: results.netSalary,
                      totalAnnualEmployerCost: results.totalAnnualEmployerCost,
                    } : undefined}
                  />
                </CardContent>
              </Card>

              {/* CTAs */}
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1">Request Payroll Quote</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get a customized proposal for payroll management, social security registration, and ongoing compliance.
                        </p>
                        <Button asChild onClick={() => handleCTAClick("quote")}>
                          <Link to="/contact?service=payroll">
                            Request Quote
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1">Speak with a Payroll Specialist</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Have questions about your estimate? Book a free 20-minute call with our Spain payroll experts.
                        </p>
                        <Button variant="outline" asChild onClick={() => handleCTAClick("call")}>
                          <Link to="/contact?type=call">
                            Schedule a Call
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Resources */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Related Tools
            </span>
            <h2 className="text-2xl md:text-3xl font-normal text-foreground">
              More Spain Business Resources
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.href} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={resource.href}>
                        View Resource
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
