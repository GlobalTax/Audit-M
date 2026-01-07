import { Meta } from '@/components/seo/Meta';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, TrendingUp, Globe, DollarSign, CheckCircle2, Users } from 'lucide-react';
import { TrustBar } from '@/components/company-setup/shared/TrustBar';
import { CompanySetupForm } from '@/components/company-setup/shared/CompanySetupForm';
import { WhyChooseUs } from '@/components/company-setup/shared/WhyChooseUs';
import { useNavigate } from 'react-router-dom';

export const TechStartupSetup = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: Globe,
      title: 'Gateway to EU Market',
      description: '500M consumers, single market access',
      stat: '500M',
    },
    {
      icon: DollarSign,
      title: '40% Lower Costs',
      description: 'Than London/Berlin/Paris',
      stat: '-40%',
    },
    {
      icon: Users,
      title: 'Talent + Lifestyle',
      description: 'Lower employee churn, happy teams',
      stat: '95%',
    },
    {
      icon: TrendingUp,
      title: 'Growing Ecosystem',
      description: '4,000+ startups in Barcelona alone',
      stat: '4,000+',
    },
  ];

  const packageIncludes = [
    'SL company registration',
    'NIE for 2 founders',
    'Tax optimization strategy',
    'ENISA loan application support',
    'Founder-friendly cap table structure',
    'Stock options plan template',
    '1st year tax compliance',
    'Intro to investors & accelerators',
  ];

  const faqs = [
    {
      question: 'Can I raise funding before registering?',
      answer: 'Yes! You can sign term sheets and LOIs. We help structure the cap table correctly from day one.',
    },
    {
      question: 'How do stock options work in Spain?',
      answer: 'We set up a proper ESOP (Employee Stock Option Plan) that\'s investor-friendly and tax-efficient for employees.',
    },
    {
      question: 'What about the Beckham Law?',
      answer: 'Foreign founders can pay just 24% tax (vs 47%) for the first 6 years. We handle the application.',
    },
    {
      question: 'Can my team work remotely?',
      answer: 'Yes! Spain offers digital nomad visas. We help with the paperwork for your international team.',
    },
  ];

  return (
    <>
      <Meta
        title="Launch Your Tech Startup in Spain | Complete Setup Package"
        description="All-in-one startup setup: Company registration, tax strategy, visa support. Built for tech founders. €3,500 package. 30 days."
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero className="mb-6">
              <Rocket className="h-4 w-4 mr-2" />
              For Tech Founders
            </BadgeHero>
            <h1 className="hero-title mb-6">
              Launch Your Tech Startup in Spain
            </h1>
            <p className="text-lead text-white/80 mb-8">
              Legal setup + Tax strategy + Visa support. Built for founders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              <div>🤝 Partner of Barcelona Tech City</div>
              <div>•</div>
              <div>🚀 ACCIÓ Certified</div>
              <div>•</div>
              <div>📱 Mobile World Capital</div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why Spain for Tech */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Why Spain for Tech Startups?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                      <div className="font-medium mb-2">{benefit.title}</div>
                      <div className="text-sm text-muted-foreground">{benefit.description}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Startup Package */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal mb-4">Complete Startup Setup Package</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to launch properly
              </p>
            </div>

            <Card className="border-primary border-2">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-sm text-muted-foreground mb-2">All-Inclusive Package</div>
                  <div className="text-5xl font-bold text-primary mb-2">€3,500</div>
                  <div className="text-muted-foreground mb-4">Complete setup in 30 days</div>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className="text-muted-foreground">💳 50% upfront</span>
                    <span>•</span>
                    <span className="text-muted-foreground">💳 50% at registration</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {packageIncludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6 mb-8">
                  <h3 className="font-medium mb-4">Tech Ecosystem Access</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're not just lawyers, we're part of the ecosystem. Get intros to:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['22@ Barcelona', 'Pier01', 'IESE Angels', 'Antai Venture Builder', 'Barcelona Activa'].map(
                      (name, index) => (
                        <Badge key={index} variant="secondary">
                          {name}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <CompanySetupForm
                  landingVariant="tech-startup"
                  conversionType="full-service"
                  submitButtonText="Get Startup Quote"
                  onSuccess={() => navigate('/thank-you/tech-startup')}
                />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Confidential. No obligation. Reply within 1 business day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Tech-Specific FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-4">Success Story</Badge>
                <h3 className="text-2xl font-normal mb-4">From UK to Barcelona in 30 Days</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Client:</strong> SaaS startup, 3 UK founders
                  </p>
                  <p>
                    <strong className="text-foreground">Problem:</strong> Complex cap table with investor
                    commitments, needed investor-ready structure
                  </p>
                  <p>
                    <strong className="text-foreground">Solution:</strong> Clean SL setup + SOPs + ENISA €500k
                    secured
                  </p>
                  <p>
                    <strong className="text-foreground">Result:</strong> Series A within 18 months, now 25
                    employees
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};