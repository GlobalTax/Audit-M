import { useState, useEffect } from 'react';
import { Meta } from '@/components/seo/Meta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { BeckhamCalculatorForm } from '@/components/beckham-calculator/BeckhamCalculatorForm';
import { BeckhamCalculatorResults } from '@/components/beckham-calculator/BeckhamCalculatorResults';
import { BeckhamLeadForm } from '@/components/beckham-calculator/BeckhamLeadForm';
import { BeckhamInputs, BeckhamResults, calculateBeckhamComparison } from '@/lib/beckhamCalculatorLogic';
import { Calculator, TrendingDown, Shield, Clock, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function BeckhamLawCalculator() {
  const [results, setResults] = useState<BeckhamResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('beckham_calculator_view_global_nrro');
  }, []);

  const handleCalculate = (inputs: BeckhamInputs) => {
    setIsCalculating(true);
    
    trackEvent('beckham_calculator_submit_global_nrro', {
      gross_salary: inputs.grossAnnualSalary,
      additional_income: inputs.additionalIncome,
      region: inputs.autonomousCommunity,
    });

    // Simulate calculation delay for UX
    setTimeout(() => {
      const calculatedResults = calculateBeckhamComparison(inputs);
      setResults(calculatedResults);
      setIsCalculating(false);
      
      trackEvent('beckham_calculator_result_view_global_nrro', {
        annual_savings: calculatedResults.annualSavings,
        savings_percentage: calculatedResults.savingsPercentage,
      });
    }, 500);
  };

  return (
    <>
      <Meta
        title="Beckham Law Tax Calculator | Compare IRPF vs 24% Flat Rate | NRRO"
        description="Calculate your potential tax savings under Spain's Beckham Law. Compare progressive IRPF rates vs the flat 24% special tax regime for expats and international executives."
        keywords="beckham law calculator, spain expat tax, impatriate regime, IRPF comparison, 24% flat tax spain, beckham law savings"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://global.nrro.es/' },
          { name: 'Resources', url: 'https://global.nrro.es/resources' },
          { name: 'Beckham Law Calculator', url: 'https://global.nrro.es/beckham-law-calculator' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <BadgeHero>Free Tax Calculator</BadgeHero>
            
            <h1 className="hero-title">
              Beckham Law Tax Calculator
            </h1>
            
            <p className="text-lead text-white/80 max-w-2xl mx-auto">
              Discover how much you could save with Spain's special tax regime for international professionals. 
              Compare standard IRPF rates vs the flat 24% Beckham Law rate.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>2025 Tax Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>Regional Variations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>6-Year Projections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form Column */}
            <div>
              <BeckhamCalculatorForm 
                onCalculate={handleCalculate}
                isCalculating={isCalculating}
              />
            </div>

            {/* Results Column */}
            <div>
              {results ? (
                <BeckhamCalculatorResults results={results} />
              ) : (
                <Card className="border-dashed border-2 border-border/50 bg-white/50">
                  <CardContent className="pt-6">
                    <div className="text-center py-12 space-y-4">
                      <div className="inline-flex p-4 bg-muted rounded-full">
                        <Calculator className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Your Results Will Appear Here</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Enter your income details and click "Calculate" to see your potential savings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <BeckhamLeadForm results={results || undefined} />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Why Beckham Law
            </p>
            <h2 className="text-3xl md:text-4xl font-normal">
              Key Benefits of the Beckham Law
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Lower Tax Rate</h3>
                <p className="text-muted-foreground text-sm">
                  Pay just 24% flat rate on Spanish income instead of progressive rates up to 47%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Wealth Tax Exemption</h3>
                <p className="text-muted-foreground text-sm">
                  Exempt from Spanish wealth tax on assets located outside of Spain.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">6-Year Duration</h3>
                <p className="text-muted-foreground text-sm">
                  Benefit from the special regime for up to 6 consecutive tax years.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-normal">Related Resources</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Beckham Law Guide</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete guide to eligibility, application process, and requirements.
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/ley-beckham">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Tax Residency Risk</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Assess your risk of being considered a Spanish tax resident.
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/spain-tax-residency-risk">
                    Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <Calculator className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Labor Cost Calculator</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Calculate total employer costs for hiring in Spain.
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/spain-labor-cost-calculator">
                    Calculate <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-normal">
              Ready to Apply for the Beckham Law?
            </h2>
            <p className="text-white/70 text-lg">
              Our tax experts can guide you through the entire application process and 
              ensure you maximize your savings under the special regime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                <Link to="/contact">Request Expert Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/ley-beckham">Learn More About Beckham Law</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
