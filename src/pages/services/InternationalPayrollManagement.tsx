import { Meta } from '@/components/seo/Meta';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  Calculator,
  FileText,
  Calendar,
  ArrowRight,
  AlertTriangle,
  Users,
  Building2,
  Receipt
} from 'lucide-react';
import { TrustBar } from '@/components/company-setup/shared/TrustBar';
import { GlobalContactForm } from '@/components/international/GlobalContactForm';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const InternationalPayrollManagement = () => {
  const painPoints = [
    {
      icon: AlertTriangle,
      title: 'Hiring without a local entity',
      description: 'Complex EOR arrangements or compliance gaps when you lack a Spanish subsidiary'
    },
    {
      icon: Calculator,
      title: 'Managing tax withholdings remotely',
      description: 'IRPF calculations change based on personal circumstances and residency status'
    },
    {
      icon: FileText,
      title: 'Social Security compliance confusion',
      description: 'Multiple filing deadlines, contribution types, and registration requirements'
    },
    {
      icon: Clock,
      title: 'Late filings and penalties',
      description: 'Missed deadlines result in automatic fines and potential labor inspections'
    },
  ];

  const services = [
    'Monthly payroll processing',
    'Social Security registration & filings',
    'Tax withholding calculations (IRPF)',
    'Payslips & annual statements',
    'Employee contracts & terminations',
    'Beckham Law payroll handling',
    'Year-end tax reporting (Modelo 190)',
    'Integration with group reporting',
  ];

  const processSteps = [
    {
      step: 'Setup',
      title: 'We Register Your Company',
      description: 'We handle Social Security registration and configure your payroll system to Spanish requirements.',
      duration: '1-2 weeks'
    },
    {
      step: 'Monthly',
      title: 'You Send Monthly Changes',
      description: 'Send hours worked, new hires, salary adjustments, or terminations. We process everything.',
      duration: 'By 25th of month'
    },
    {
      step: 'Delivery',
      title: 'We Deliver & File',
      description: 'Monthly cost summary to HQ, payslips to employees, and all filings to Spanish authorities.',
      duration: 'Automatic'
    },
  ];

  const pricingTiers = [
    { employees: '1-5 employees', range: '€150 – €300/month' },
    { employees: '6-20 employees', range: '€300 – €600/month' },
    { employees: '20+ employees', range: 'Custom pricing' },
  ];

  const faqs = [
    {
      question: 'Do we need a Spanish entity to hire employees in Spain?',
      answer: 'Yes, to employ workers directly in Spain, you need either a Spanish company (SL or SA), a branch office, or you can use an Employer of Record (EOR) arrangement. We can help you set up a Spanish entity or advise on the best structure for your situation.'
    },
    {
      question: 'Can you handle contractor payments in Spain?',
      answer: 'We can advise on contractor arrangements and ensure proper classification. However, Spanish authorities scrutinize contractor relationships closely—misclassification can result in significant penalties. We recommend proper employment for ongoing roles.'
    },
    {
      question: 'What about Ley Beckham employees?',
      answer: 'We specialize in Beckham Law payroll. These employees have a flat 24% tax rate on Spanish income, but require specific payroll configuration and reporting. We handle all the complexities, including the dual reporting requirements.'
    },
    {
      question: 'How do you handle terminations?',
      answer: 'We calculate severance based on Spanish labor law, prepare all documentation, and ensure proper Social Security deregistration. We also advise on the process to minimize legal risk and can coordinate with labor lawyers if needed.'
    },
    {
      question: 'What reports do we receive monthly?',
      answer: 'You receive a comprehensive monthly package: individual payslips (in Spanish and English if needed), a cost summary for HQ, Social Security filing confirmations, and a tax withholding summary. All reports can be formatted to integrate with your group reporting.'
    },
    {
      question: 'Can you integrate with our existing HR systems?',
      answer: 'Yes, we work with most major HRIS platforms and can adapt our reporting to match your internal systems. We can receive data via secure file transfer, API integration, or simple spreadsheet templates.'
    },
  ];

  const trustStats = [
    { value: '300+', label: 'Payrolls Managed' },
    { value: '50+', label: 'Countries Served' },
    { value: '15+', label: 'Years Experience' },
    { value: '99%', label: 'On-Time Filing Rate' },
  ];

  return (
    <>
      <Meta
        title="Payroll in Spain for International Companies | NRRO"
        description="End-to-end Spanish payroll management for foreign companies. Monthly processing, Social Security, IRPF withholdings, and HQ reporting by Barcelona experts."
        canonicalUrl="https://global.nrro.es/services/international-payroll-management"
      />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero className="mb-6">Payroll in Spain</BadgeHero>
            <h1 className="hero-title mb-6">
              Spanish Payroll Management for International Companies
            </h1>
            <p className="text-lead text-white/80 mb-8 max-w-2xl mx-auto">
              Monthly payroll processing, Social Security compliance, tax withholdings, and reporting—handled by Barcelona-based experts who understand international business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" asChild>
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Call
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/contact?service=payroll">
                  Get a Payroll Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-white/50">
              Confidential. No obligation. We reply within 1 business day.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar stats={trustStats} />

      {/* Pain Points Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Common Challenges
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Why Payroll in Spain Can Be Complex
              </h2>
              <p className="text-lg text-muted-foreground">
                International companies face unique challenges when managing Spanish payroll remotely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Card key={index} className="border-destructive/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">{point.title}</h3>
                        <p className="text-muted-foreground">{point.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Our Services
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                What We Handle
              </h2>
              <p className="text-lg text-muted-foreground">
                Complete payroll management so you can focus on growing your business in Spain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Our Process
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                How It Works
              </h2>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">{step.title}</h3>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{step.duration}</span>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Transparent Pricing
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Pricing Guide
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear, predictable monthly fees based on your team size.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={index === 1 ? 'border-primary border-2' : ''}>
                  <CardContent className="p-6 text-center">
                    <div className="font-medium mb-2">{tier.employees}</div>
                    <div className="text-2xl font-bold text-primary">{tier.range}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Includes monthly processing, payslips, Social Security filings, and HQ reporting. Additional services quoted separately.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Questions Answered
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Payroll FAQs
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium text-left py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Let's Discuss Your Spanish Payroll Needs
              </h2>
              <p className="text-lg text-white/70">
                Get a quote tailored to your team size and requirements.
              </p>
            </div>

            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="p-8">
                <GlobalContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default InternationalPayrollManagement;
