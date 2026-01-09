import { useState } from 'react';
import { Meta } from '@/components/seo/Meta';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { legalStructures } from '@/lib/legalStructuresData';
import { StructureCard } from '@/components/legal-comparator/StructureCard';
import { ComparisonTable } from '@/components/legal-comparator/ComparisonTable';
import { RecommendationQuiz } from '@/components/legal-comparator/RecommendationQuiz';
import { InternationalServicesContactForm } from '@/components/international/InternationalServicesContactForm';
import { ArrowRight, Scale, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion } from 'framer-motion';

export default function LegalStructuresComparator() {
  const [selectedStructures, setSelectedStructures] = useState<string[]>(['sl', 'subsidiary']);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [secondChoice, setSecondChoice] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  const toggleStructure = (id: string) => {
    setSelectedStructures(prev => {
      if (prev.includes(id)) {
        return prev.filter(s => s !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
    trackEvent('comparator_structure_toggled', { structure_id: id });
  };

  const handleQuizComplete = (rec: string, second: string) => {
    setRecommendation(rec);
    setSecondChoice(second);
    setSelectedStructures([rec, second]);
  };

  return (
    <>
      <Meta
        title="Spain Legal Structures Comparator | SL vs SA vs Branch | NRRO"
        description="Compare Spanish legal structures for your business: SL, SA, Branch Office, or Subsidiary. Interactive tool with personalized recommendations."
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <BadgeHero>Interactive Comparator</BadgeHero>
            <h1 className="hero-title mt-6 mb-6">
              Compare Spain Legal<br />Structures
            </h1>
            <p className="text-lead text-white/80 max-w-2xl">
              Not sure which legal structure is right for your Spanish operations? 
              Use our interactive comparator to understand the differences and get 
              a personalized recommendation.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button size="lg" asChild>
                <a href="#quiz">
                  Get Recommendation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="#compare">Compare All</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                Personalized Analysis
              </span>
              <h2 className="text-3xl md:text-4xl font-normal mt-4">
                Find Your Ideal Structure
              </h2>
              <p className="text-muted-foreground mt-4">
                Answer 5 quick questions to receive a tailored recommendation based on your specific needs.
              </p>
            </div>
            
            <RecommendationQuiz onComplete={handleQuizComplete} />
          </div>
        </div>
      </section>

      {/* Structure Cards Section */}
      <section id="compare" className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Select to Compare
            </span>
            <h2 className="text-3xl md:text-4xl font-normal mt-4">
              Choose Structures to Compare
            </h2>
            <p className="text-muted-foreground mt-4">
              Select up to 4 structures to see a detailed side-by-side comparison.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {legalStructures.map(structure => (
              <StructureCard
                key={structure.id}
                structure={structure}
                isSelected={selectedStructures.includes(structure.id)}
                isRecommended={recommendation === structure.id}
                onToggle={() => toggleStructure(structure.id)}
              />
            ))}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-normal">
                <Scale className="h-5 w-5 text-primary" />
                Side-by-Side Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonTable selectedStructures={selectedStructures} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                Expert Guidance
              </span>
              <h2 className="text-3xl md:text-4xl font-normal mt-4 mb-6">
                Get Personalized Advice
              </h2>
              <p className="text-muted-foreground mb-6">
                Our team of legal and tax experts can help you choose the optimal 
                structure for your specific situation, considering tax implications, 
                liability concerns, and operational needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Share your requirements</p>
                    <p className="text-sm text-muted-foreground">Tell us about your business plans for Spain</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Receive expert analysis</p>
                    <p className="text-sm text-muted-foreground">Our team reviews your situation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Get a tailored proposal</p>
                    <p className="text-sm text-muted-foreground">Complete setup plan with timeline and costs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-normal">Request Expert Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <InternationalServicesContactForm
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-normal mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Spain Company Setup Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive playbook covering the entire setup process.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/spain-company-setup-playbook">
                    Download Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Cost & Timeline Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant estimates for your company setup.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/spain-setup-calculator">
                    Calculate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Readiness Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take our quiz to assess your preparation level.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/spain-readiness-quiz">
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
