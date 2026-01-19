import { useState, useEffect } from "react";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeHero } from "@/components/ui/badge-hero";
import { SetupCalculatorForm } from "@/components/calculator/SetupCalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { CalculatorResultsTeaser } from "@/components/calculator/CalculatorResultsTeaser";
import { CalculatorLeadForm } from "@/components/calculator/CalculatorLeadForm";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";
import { RelatedResourcesGrid } from "@/components/spain-setup/RelatedResourcesGrid";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { 
  Calculator, 
  ArrowRight, 
  RefreshCw, 
  Phone, 
  FileText, 
  Shield, 
  Clock, 
  Building2 
} from "lucide-react";
import { 
  calculateAll, 
  type CalculatorInputs, 
  type CalculatorResults as Results 
} from "@/lib/calculatorLogic";

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Spain Setup", url: "https://global.nrro.es/spain-company-setup" },
  { name: "Setup Calculator", url: "https://global.nrro.es/spain-setup-calculator" }
];

export default function SpainSetupCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { trackEvent } = useAnalytics();

  // Track page view
  useEffect(() => {
    trackEvent("calculator_view_global_nrro", {
      page_location: window.location.pathname,
    });
  }, [trackEvent]);

  const handleCalculate = (calculatorInputs: CalculatorInputs) => {
    setIsCalculating(true);
    
    // Track calculation event
    trackEvent("calculator_submit_global_nrro", {
      company_type: calculatorInputs.companyType,
      founder_residency: calculatorInputs.founderResidency,
      planned_employees: calculatorInputs.plannedEmployees,
      need_local_director: calculatorInputs.needLocalDirector,
    });

    // Simulate brief calculation time for UX
    setTimeout(() => {
      const calculatedResults = calculateAll(calculatorInputs);
      setInputs(calculatorInputs);
      setResults(calculatedResults);
      setIsCalculating(false);

      // Track result view
      trackEvent("calculator_result_view_global_nrro", {
        estimated_weeks_min: calculatedResults.timeline.minWeeks,
        estimated_weeks_max: calculatedResults.timeline.maxWeeks,
        estimated_cost_min: calculatedResults.costs.minTotal,
        estimated_cost_max: calculatedResults.costs.maxTotal,
      });
    }, 500);
  };

  const handleReset = () => {
    setInputs(null);
    setResults(null);
    setIsUnlocked(false);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    trackEvent("calculator_unlocked_global_nrro", {
      company_type: inputs?.companyType,
    });
  };

  return (
    <>
      <Meta
        title="Spain Setup Cost & Timeline Calculator | NRRO International"
        description="Estimate your Spain company setup costs and timeline. Get instant estimates for SL, SA, branch, or subsidiary formation based on your specific requirements."
        keywords="Spain company setup cost, SL formation timeline, Spain incorporation calculator, business setup Spain estimate"
        canonicalUrl="/spain-setup-calculator"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <BadgeHero>
              <Calculator className="w-3 h-3 mr-1" />
              Free Estimation Tool
            </BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Spain Setup Cost & Timeline Calculator
            </h1>
            
            <p className="text-lead text-white/70 mb-8">
              Get instant estimates for your Spanish company formation. Select your 
              entity type, residency status, and staffing plans to see projected 
              costs and timelines.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>500+ companies incorporated</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>All entity types</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {!results ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
                    Tell Us About Your Plans
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Answer four quick questions to receive your personalized cost and timeline estimate.
                  </p>
                </div>

                <SetupCalculatorForm 
                  onCalculate={handleCalculate} 
                  isCalculating={isCalculating} 
                />
              </>
            ) : !isUnlocked ? (
              /* Show Teaser with Email Gate */
              <CalculatorResultsTeaser 
                results={results} 
                inputs={inputs!} 
                onUnlock={handleUnlock}
                onReset={handleReset}
              />
            ) : (
              /* Show Full Results After Email Capture */
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Your Complete Estimate
                  </h2>
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>

                <CalculatorResults results={results} inputs={inputs!} />

                {/* Result CTAs */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>Request Personalized Quote</CardTitle>
                      <CardDescription>
                        Get a detailed proposal tailored to your specific situation, 
                        including exact fees and timeline.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        asChild 
                        className="w-full"
                        onClick={() => trackEvent("calculator_cta_quote_global_nrro")}
                      >
                        <Link to="/contact?service=company-setup">
                          Request Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                        <Phone className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <CardTitle>Schedule a Call</CardTitle>
                      <CardDescription>
                        Speak directly with our Spain incorporation specialists 
                        to discuss your requirements.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        asChild 
                        className="w-full"
                        onClick={() => trackEvent("calculator_cta_call_global_nrro")}
                      >
                        <Link to="/contact?type=call">
                          Book a Call
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedResourcesGrid 
        currentPage="/spain-setup-calculator"
        title="Continue Your Spain Expansion Planning"
        excludeTypes={['calculator']}
      />

      {/* Sticky CTA */}
      <SpainSetupStickyCTA />
    </>
  );
}
