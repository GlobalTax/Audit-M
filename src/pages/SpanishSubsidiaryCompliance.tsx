import { Meta } from '@/components/seo/Meta';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Building2, 
  FileText,
  Calendar,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Globe,
  Users
} from 'lucide-react';
import { TrustBar } from '@/components/company-setup/shared/TrustBar';
import { CompanySetupForm } from '@/components/company-setup/shared/CompanySetupForm';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SpanishSubsidiaryCompliance = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      title: 'Missed quarterly VAT filings',
      description: 'Quarterly Modelo 303 deadlines with automatic penalties'
    },
    {
      icon: FileText,
      title: 'Annual accounts not filed',
      description: 'Commercial Registry filing within 7 months of year-end'
    },
    {
      icon: Clock,
      title: 'Commercial Registry lapses',
      description: 'Director appointments and corporate changes require registration'
    },
    {
      icon: BarChart3,
      title: 'Transfer pricing gaps',
      description: 'Intercompany transactions need proper documentation'
    },
  ];

  const services = [
    {
      icon: BarChart3,
      title: 'Monthly/Quarterly Accounting',
      description: 'Spanish GAAP or IFRS-compliant bookkeeping with reporting to HQ',
      items: ['Chart of accounts mapping', 'Monthly close process', 'Variance analysis']
    },
    {
      icon: FileText,
      title: 'Tax Compliance',
      description: 'All recurring tax filings handled on time',
      items: ['Quarterly VAT (Modelo 303)', 'Annual Corporate Tax (Modelo 200)', 'Withholding declarations']
    },
    {
      icon: Building2,
      title: 'Corporate Maintenance',
      description: 'Keep your entity in good standing',
      items: ['Annual accounts filing', 'Director documentation', 'Corporate book maintenance']
    },
    {
      icon: Globe,
      title: 'HQ Integration',
      description: 'Seamless reporting to your group finance team',
      items: ['Consolidated reporting', 'Intercompany reconciliation', 'Audit support']
    },
  ];

  const processSteps = [
    {
      step: 'Onboarding',
      title: 'Connect to Your Systems',
      description: 'We integrate with your ERP or accounting systems, map chart of accounts, and set up reporting templates.',
      duration: '1-2 weeks'
    },
    {
      step: 'Monthly',
      title: 'Automated Bookkeeping',
      description: 'We process transactions, reconcile accounts, and prepare monthly management reports.',
      duration: 'Ongoing'
    },
    {
      step: 'Quarterly/Annual',
      title: 'Filings Done, Summaries to HQ',
      description: 'We handle all tax filings, annual accounts, and provide clear summaries for group reporting.',
      duration: 'Per schedule'
    },
  ];

  const pricingTiers = [
    { 
      tier: 'Starter', 
      description: 'Small subsidiary',
      range: '€500 – €800/month',
      features: ['Up to 50 transactions/month', 'Quarterly VAT', 'Annual accounts']
    },
    { 
      tier: 'Standard', 
      description: 'Mid-size operations',
      range: '€800 – €1,500/month',
      features: ['Up to 200 transactions/month', 'All tax filings', 'Monthly reporting']
    },
    { 
      tier: 'Enterprise', 
      description: 'Complex operations',
      range: 'Custom',
      features: ['Unlimited transactions', 'Transfer pricing support', 'Dedicated team']
    },
  ];

  const faqs = [
    {
      question: 'Can you work with our group\'s ERP?',
      answer: 'Yes, we integrate with most major ERP systems including SAP, Oracle, NetSuite, Microsoft Dynamics, and others. We can receive data via secure file transfer, API, or we can work with exported reports. Our goal is to fit into your existing workflow, not disrupt it.'
    },
    {
      question: 'Do you provide English-language reports?',
      answer: 'Absolutely. All our reports to HQ are in English. We maintain the official books in Spanish (as required by law), but all management reporting, variance analysis, and summaries are delivered in English. We can also adapt formats to match your group reporting templates.'
    },
    {
      question: 'What about intercompany transactions?',
      answer: 'We handle intercompany reconciliation as part of our service. We ensure proper documentation, maintain the transfer pricing file (TP documentation is mandatory for transactions over €250k), and coordinate with your group tax team on pricing policies.'
    },
    {
      question: 'How do you handle the annual audit?',
      answer: 'If your subsidiary requires a statutory audit (based on size thresholds), we work directly with your auditors. We prepare all schedules, respond to audit queries, and ensure a smooth process. Many of our clients pass audits with zero adjustments.'
    },
    {
      question: 'What happens if we miss a deadline?',
      answer: 'We don\'t miss deadlines—that\'s our commitment. We have automated calendaring and multiple review processes. However, if you come to us with past-due filings, we can help regularize your situation and minimize penalties through voluntary disclosure procedures.'
    },
    {
      question: 'Can you help us close the subsidiary if needed?',
      answer: 'Yes, we handle subsidiary liquidations and closures. This includes final tax filings, deregistration from all authorities, Commercial Registry closure, and distribution of remaining assets. We can guide you through the process or handle it entirely.'
    },
  ];

  const trustStats = [
    { value: '150+', label: 'Subsidiaries Managed' },
    { value: '25+', label: 'Years Experience' },
    { value: '50+', label: 'Countries Served' },
    { value: '0', label: 'Missed Deadlines' },
  ];

  return (
    <>
      <Meta
        title="Spanish Subsidiary Compliance | Accounting, Tax & Registry | NRRO"
        description="Ongoing compliance for your Spanish subsidiary. Monthly accounting, VAT, corporate tax, annual accounts, and Commercial Registry filings—all handled by Barcelona-based experts."
        canonicalUrl="https://global.nrro.es/spanish-subsidiary-compliance"
      />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero className="mb-6">Subsidiary Compliance Experts</BadgeHero>
            <h1 className="hero-title mb-6">
              Your Spanish Subsidiary Compliance—Handled
            </h1>
            <p className="text-lead text-white/80 mb-8 max-w-2xl mx-auto">
              Accounting, VAT, corporate tax, annual accounts, and Commercial Registry filings—so your group stays compliant in Spain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" asChild>
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a 15-Minute Call
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/contact?service=compliance">
                  Request Compliance Quote
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

      {/* What HQ Needs to Know */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Common Pain Points
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                What HQ Needs to Know
              </h2>
              <p className="text-lg text-muted-foreground">
                Spanish subsidiary compliance involves multiple recurring obligations. Missing any of them creates risk for your group.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-destructive/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Compliance Services */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Our Services
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Compliance Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything your subsidiary needs to stay compliant in Spain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                          <p className="text-muted-foreground text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2 pl-16">
                        {service.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How We Integrate with HQ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Our Process
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                How We Integrate with HQ
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

      {/* Pricing Guide */}
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
                Predictable monthly fees based on your subsidiary's complexity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={index === 1 ? 'border-primary border-2' : ''}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="font-medium text-lg mb-1">{tier.tier}</div>
                      <div className="text-sm text-muted-foreground mb-3">{tier.description}</div>
                      <div className="text-2xl font-bold text-primary">{tier.range}</div>
                    </div>
                    <div className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              All plans include quarterly VAT, annual corporate tax, and annual accounts filing. Additional services quoted separately.
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
                Compliance FAQs
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

      {/* CTA Final */}
      <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Ready to Simplify Subsidiary Compliance?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Get a quote tailored to your subsidiary's requirements.
              </p>
            </div>

            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="p-8">
                <CompanySetupForm
                  landingVariant="subsidiary-compliance"
                  conversionType="compliance-quote"
                  submitButtonText="Get Compliance Quote"
                />
                <p className="text-center text-sm text-white/50 mt-4">
                  Confidential. No obligation. Reply within 1 business day.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};