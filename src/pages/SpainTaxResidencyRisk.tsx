import { useState, useEffect } from 'react';
import { Meta } from '@/components/seo/Meta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ResidencyRiskForm } from '@/components/residency-risk/ResidencyRiskForm';
import { ResidencyRiskResults } from '@/components/residency-risk/ResidencyRiskResults';
import { ResidencyLeadForm } from '@/components/residency-risk/ResidencyLeadForm';
import { ResidencyInputs, ResidencyRiskResults as RiskResults, assessResidencyRisk } from '@/lib/residencyRiskLogic';
import { Shield, AlertTriangle, Calendar, FileText, ArrowRight, CheckCircle, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SpainTaxResidencyRisk() {
  const [results, setResults] = useState<RiskResults | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('residency_risk_view_global_nrro');
  }, []);

  const handleAssess = (inputs: ResidencyInputs) => {
    setIsAssessing(true);
    
    trackEvent('residency_risk_submit_global_nrro', {
      days_in_spain: inputs.daysInSpain,
      income_location: inputs.primaryIncomeLocation,
      has_home: inputs.permanentHomeSpain,
    });

    // Simulate assessment delay for UX
    setTimeout(() => {
      const assessmentResults = assessResidencyRisk(inputs);
      setResults(assessmentResults);
      setIsAssessing(false);
      
      trackEvent('residency_risk_result_view_global_nrro', {
        risk_level: assessmentResults.riskLevel,
        score: assessmentResults.score,
        automatic_resident: assessmentResults.automaticResident,
      });
    }, 800);
  };

  return (
    <>
      <Meta
        title="Spain Tax Residency Risk Assessment | Free Tool | NRRO"
        description="Assess your risk of being considered a Spanish tax resident. Answer key questions about your situation and get personalized guidance on your tax obligations."
        keywords="spain tax residency, 183 days rule, spanish tax resident, fiscal residency spain, tax residency assessment, expat tax spain"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://global.nrro.es/' },
          { name: 'Resources', url: 'https://global.nrro.es/resources' },
          { name: 'Tax Residency Risk', url: 'https://global.nrro.es/spain-tax-residency-risk' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <BadgeHero>Free Risk Assessment</BadgeHero>
            
            <h1 className="hero-title">
              Spain Tax Residency Risk Assessment
            </h1>
            
            <p className="text-lead text-white/80 max-w-2xl mx-auto">
              Are you at risk of being considered a Spanish tax resident? Answer a few questions 
              about your situation to understand your exposure to Spanish tax obligations.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>Official Criteria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>183-Day Calculator</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/80" />
                <span>Personalized Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form Column */}
            <div>
              <ResidencyRiskForm 
                onAssess={handleAssess}
                isAssessing={isAssessing}
              />
            </div>

            {/* Results Column */}
            <div>
              {results ? (
                <ResidencyRiskResults results={results} />
              ) : (
                <Card className="border-dashed border-2 border-border/50 bg-white/50">
                  <CardContent className="pt-6">
                    <div className="text-center py-12 space-y-4">
                      <div className="inline-flex p-4 bg-muted rounded-full">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Your Assessment Will Appear Here</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Answer the questions on the left to receive your personalized risk assessment.
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
            <ResidencyLeadForm results={results || undefined} />
          </div>
        </div>
      </section>

      {/* Criteria Explanation */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Understanding the Rules
            </p>
            <h2 className="text-3xl md:text-4xl font-normal">
              Spanish Tax Residency Criteria
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              You may be considered a Spanish tax resident if you meet any ONE of these criteria:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">183 Days Rule</h3>
                <p className="text-muted-foreground text-sm">
                  Physical presence in Spain for more than 183 days during the calendar year 
                  automatically qualifies you as a tax resident.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Economic Center</h3>
                <p className="text-muted-foreground text-sm">
                  The principal base or center of your economic activities or interests 
                  is directly or indirectly located in Spain.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Vital Interests</h3>
                <p className="text-muted-foreground text-sm">
                  Your non-legally separated spouse and/or minor children habitually 
                  reside in Spain (rebuttable presumption).
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
                <Calculator className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Beckham Law Calculator</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  If you're becoming a resident, calculate potential savings under the special regime.
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/beckham-law-calculator">
                    Calculate Savings <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Beckham Law Guide</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete guide to eligibility and application for the impatriate regime.
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
              Need Expert Guidance on Your Tax Position?
            </h2>
            <p className="text-white/70 text-lg">
              Our international tax experts can provide a thorough review of your situation 
              and help you optimize your tax position in Spain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                <Link to="/contact">Request Tax Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/international-services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
