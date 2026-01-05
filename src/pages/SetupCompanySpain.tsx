import { LandingLayout } from '@/components/layout/LandingLayout';
import { HeroWithFormSection } from '@/components/company-setup/HeroWithFormSection';
import { QuickFactsBar } from '@/components/company-setup/QuickFactsBar';
import { CompanyTypesSection } from '@/components/company-setup/CompanyTypesSection';
import { CostComparisonSection } from '@/components/company-setup/CostComparisonSection';
import { TimelineCostsSection } from '@/components/company-setup/TimelineCostsSection';
import { GuaranteesSection } from '@/components/company-setup/GuaranteesSection';
import { StickyMobileCTA } from '@/components/company-setup/StickyMobileCTA';
import { RelatedResourcesSection } from '@/components/company-setup/RelatedResourcesSection';
import { TrustBarSection } from '@/components/landing-sections/TrustBarSection';
import { ProblemStatementSection } from '@/components/landing-sections/ProblemStatementSection';
import { ServicesGridSection } from '@/components/landing-sections/ServicesGridSection';
import { ClientLogosCarouselSection } from '@/components/landing-sections/ClientLogosCarouselSection';
import { ProcessStepsSection } from '@/components/landing-sections/ProcessStepsSection';
import { TestimonialsSection } from '@/components/landing-sections/TestimonialsSection';
import { FAQSection } from '@/components/landing-sections/FAQSection';
import { CTAFinalSection } from '@/components/landing-sections/CTAFinalSection';
import { ContactFormSection } from '@/components/landing-sections/ContactFormSection';
import { Meta } from '@/components/seo/Meta';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { BASE_DOMAIN } from '@/lib/seoUtils';
import { Building2, Calculator, FileCheck, Landmark } from 'lucide-react';

export const SetupCompanySpain = () => {
  const heroData = {
    badge: "Trusted by 300+ International Companies",
    title: "Set Up Your Company in Spain",
    subtitle: "Strategic legal and tax guidance for entrepreneurs, foreign investors, and international groups establishing operations in Spain. From incorporation to ongoing compliance.",
    trustPoints: [
      "+70 lawyers & advisors at your service",
      "Full legal, tax & corporate support",
      "100% remote process available"
    ],
    formTitle: "Get Your Free Consultation",
    formSubtitle: "Average response time: 2 hours"
  };

  const trustBarStats = [
    { 
      value: '300+', 
      label: 'Companies Established',
      description: 'Successful company formations across Spain supporting international entrepreneurs'
    },
    { 
      value: '15+', 
      label: 'Years Experience',
      description: 'Specialized expertise in Spanish corporate law and business setup procedures'
    },
    { 
      value: '50+', 
      label: 'Countries Served',
      description: 'International clients from Europe, Americas, Asia and beyond trust our services'
    },
    { 
      value: '98%', 
      label: 'Client Satisfaction',
      description: 'Exceptional service quality with dedicated support throughout the entire process'
    }
  ];

  const problemStatement = {
    title: "Navigating Spain's Corporate Framework",
    description: "Establishing a company in Spain involves navigating complex corporate, tax and compliance frameworks. From selecting the right legal structure to understanding fiscal obligations and ongoing requirements, international investors need specialized guidance to ensure proper incorporation and optimize their operations.",
    challenges: [
      "Understanding Spanish corporate law and optimal legal structures",
      "Navigating tax implications and cross-border considerations",
      "Meeting ongoing compliance, bookkeeping and regulatory requirements",
      "Coordinating with Spanish authorities and financial institutions"
    ]
  };

  const services = [
    {
      icon: Building2,
      title: "Company Incorporation",
      description: "Drafting of bylaws, articles, shareholder structures and corporate documentation tailored to your business needs.",
      features: [
        "Legal structure selection",
        "Corporate documentation",
        "Shareholder agreements",
        "Bylaws drafting"
      ]
    },
    {
      icon: Calculator,
      title: "Tax & Fiscal Structuring",
      description: "Optimized tax planning adapted to activity, ownership and international structure for maximum efficiency.",
      features: [
        "Tax optimization strategies",
        "Cross-border structuring",
        "Fiscal planning",
        "International taxation"
      ]
    },
    {
      icon: FileCheck,
      title: "Registered Office & Compliance",
      description: "Ongoing support including bookkeeping, payroll, VAT, corporate books, and resolutions to keep you compliant.",
      features: [
        "Registered office services",
        "Bookkeeping & accounting",
        "Payroll management",
        "VAT compliance"
      ]
    },
    {
      icon: Landmark,
      title: "Banking, NIE & Documentation",
      description: "We assist throughout the private process of opening accounts and obtaining documentation—without acting as public institutions.",
      features: [
        "Bank account setup guidance",
        "NIE documentation support",
        "Power of attorney",
        "Administrative coordination"
      ]
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "We analyze your business objectives, structure needs, and cross-border considerations to provide tailored advice.",
      duration: "1-2 days"
    },
    {
      number: 2,
      title: "Corporate Planning",
      description: "Design of the optimal legal and tax structure, including shareholder agreements and governance framework.",
      duration: "1 week"
    },
    {
      number: 3,
      title: "Drafting of Documents",
      description: "Preparation of all corporate documentation, bylaws, articles of association, and required legal instruments.",
      duration: "1-2 weeks"
    },
    {
      number: 4,
      title: "Appointment & Incorporation",
      description: "We coordinate the notarial appointment, signature of documents, and formal registration procedures.",
      duration: "2-3 weeks"
    },
    {
      number: 5,
      title: "Post-incorporation Support",
      description: "Ongoing assistance with compliance, bookkeeping, banking, tax filings, and corporate governance.",
      duration: "Continuous"
    }
  ];

  const testimonials = [
    {
      quote: "Navarro's team made our Spanish expansion seamless. Their expertise in cross-border structuring was invaluable.",
      author: "James Patterson",
      position: "CEO",
      company: "Tech Ventures Ltd",
      country: "🇬🇧 United Kingdom"
    },
    {
      quote: "Professional, responsive, and highly knowledgeable. They guided us through every step of setting up our subsidiary in Barcelona.",
      author: "Marie Laurent",
      position: "CFO",
      company: "InvestCorp SA",
      country: "🇫🇷 France"
    },
    {
      quote: "The tax structuring advice saved us significant costs. Their international focus is exactly what we needed.",
      author: "Thomas Mueller",
      position: "Managing Partner",
      company: "Global Assets GmbH",
      country: "🇩🇪 Germany"
    }
  ];

  const faqs = [
    {
      question: "What are the steps to register a company in Spain?",
      answer: "The main steps include: (1) obtaining a negative name certificate from the Central Commercial Registry, (2) opening a bank account and depositing share capital, (3) obtaining NIE/NIF for shareholders and directors, (4) drafting bylaws and corporate documents, (5) signing the public deed before a notary, and (6) registering with the Commercial Registry and Tax Agency. Our team handles each step on your behalf."
    },
    {
      question: "How long does company registration take in Spain?",
      answer: "The typical timeline is 4-6 weeks from initial consultation to full incorporation. This includes 1-3 days for name reservation, 2-4 weeks for NIE processing (if needed), 1-2 weeks for bank account opening, and 2-4 weeks for registry inscription. Express procedures can reduce this to 2-3 weeks in urgent cases."
    },
    {
      question: "What documents are required to incorporate a company in Spain?",
      answer: "Required documents include valid passports or national ID cards for all shareholders and directors, proof of address (utility bill or bank statement), the negative name certificate, bank certificate of capital deposit, and drafted bylaws. For foreign documents, apostille or legalization and sworn translation into Spanish are typically required."
    },
    {
      question: "Do foreign founders need a NIE or NIF to set up a company?",
      answer: "Yes, all shareholders and directors require a Spanish tax identification number. EU citizens need a NIE (Número de Identificación de Extranjero), while non-EU individuals also require a NIE. The company itself receives a NIF (Número de Identificación Fiscal) upon registration. We assist with all tax ID applications as part of our service."
    },
    {
      question: "What is the minimum capital requirement for a Spanish company?",
      answer: "For a Sociedad Limitada (SL), the most common structure for SMEs, the minimum share capital is €3,000, which must be fully paid at incorporation. For a Sociedad Anónima (SA), the minimum is €60,000, with at least 25% paid at incorporation. Branch offices have no capital requirement as they are extensions of the parent company."
    },
    {
      question: "What types of legal structures are available in Spain?",
      answer: "The main structures are: Sociedad Limitada (SL) – ideal for SMEs with limited liability and flexible governance; Sociedad Anónima (SA) – suited for larger companies or those seeking external investment; Branch Office (Sucursal) – an extension of a foreign parent company; and Representative Office – for non-commercial activities only. We help you choose the optimal structure based on your business goals."
    },
    {
      question: "Can I set up a company in Spain remotely without traveling?",
      answer: "Yes, the entire incorporation process can be completed remotely using powers of attorney. You grant a representative in Spain the authority to act on your behalf for all notarial appointments, document signings, and administrative procedures. You don't need to travel to Spain at any point. We handle all in-person requirements."
    },
    {
      question: "Do company directors need to be Spanish residents?",
      answer: "No, directors of a Spanish company do not need to be Spanish residents or nationals. There are no nationality or residency requirements for directors or shareholders. However, all directors must obtain a NIE for tax purposes. The company must have a registered office address in Spain, which we can provide."
    },
    {
      question: "What are the ongoing tax and compliance obligations?",
      answer: "Spanish companies must file quarterly VAT returns (Modelo 303), annual corporate tax returns (Modelo 200), and maintain proper accounting records compliant with Spanish GAAP. Additional obligations include annual accounts filing with the Commercial Registry, monthly/quarterly payroll tax withholdings if you have employees, and maintaining corporate books. We provide comprehensive ongoing compliance support."
    },
    {
      question: "How much does it cost to set up a company in Spain?",
      answer: "Typical costs for an SL include: notary fees (€300-€800), Commercial Registry fees (€150-€400), share capital deposit (€3,000 minimum), NIE applications (€50-€150 each), and professional advisory fees (€2,000-€6,000). Total first-year investment typically ranges from €6,000 to €15,000 depending on complexity. Use our calculator for a personalized estimate."
    },
    {
      question: "Can a foreign company open a branch office in Spain?",
      answer: "Yes, foreign companies can establish a branch office (sucursal) in Spain. A branch is not a separate legal entity but an extension of the parent company, which remains fully liable for branch obligations. Branches must register with the Commercial Registry and comply with Spanish tax and accounting requirements. This structure is often chosen for initial market testing."
    },
    {
      question: "What is the role of a notary in Spanish company formation?",
      answer: "The notary plays a central role in Spanish company incorporation. They verify the identity of founders, ensure legal compliance of the bylaws, witness the signing of the public deed of incorporation, and certify the documents for registration. The notarized deed is mandatory for Commercial Registry inscription. Our team coordinates all notarial appointments and can represent you via power of attorney."
    }
  ];

  const ctaFinal = {
    title: "Ready to Start Your Project in Spain?",
    description: "Schedule a consultation with our legal and tax advisors to discuss your company setup needs.",
    primaryCta: {
      text: "Schedule Consultation",
      url: "#contacto"
    },
    secondaryCta: {
      text: "Call Us Now",
      url: "tel:+34931222888"
    }
  };

  return (
    <LandingLayout>
      <Meta
        title="Set Up a Company in Spain | Expert Legal & Tax Advisors | Navarro"
        description="Set up your company in Spain with expert legal and tax advisors. Company incorporation, tax structuring, compliance support for entrepreneurs and foreign investors."
        keywords="set up company spain, incorporate spain, spain company formation, form company spain, start operations spain, spanish company setup, business registration spain"
        canonicalUrl={`${BASE_DOMAIN}/en/set-up-company-spain`}
        slugs={{
          es: '/crear-empresa-espana',
          ca: '/ca/crear-empresa-espanya',
          en: '/en/set-up-company-spain'
        }}
      />
      <FAQSchema faqs={faqs} />

      {/* Hero with integrated form */}
      <HeroWithFormSection {...heroData} />
      
      {/* Quick Facts Bar */}
      <QuickFactsBar />
      
      {/* Trust Stats */}
      <TrustBarSection overline="Our Impact" stats={trustBarStats} />
      
      {/* Problem Statement */}
      <ProblemStatementSection {...problemStatement} />
      
      {/* Company Types Comparison */}
      <CompanyTypesSection />
      
      {/* Services Grid */}
      <ServicesGridSection 
        title="What We Do"
        subtitle="Our Services"
        services={services}
      />
      
      {/* Cost Comparison: Spain vs Other Countries */}
      <CostComparisonSection />
      
      {/* Timeline & Costs Section */}
      <TimelineCostsSection />
      
      {/* Client Logos */}
      <ClientLogosCarouselSection />
      
      {/* Process Steps */}
      <ProcessStepsSection
        title="Our Process"
        subtitle="How We Work"
        steps={processSteps}
      />
      
      {/* Guarantees Section */}
      <GuaranteesSection />
      
      {/* Testimonials with flags */}
      <TestimonialsSection
        title="What Our Clients Say"
        subtitle="Trusted by entrepreneurs and investors worldwide"
        testimonials={testimonials}
      />
      
      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about setting up a company in Spain"
        faqs={faqs}
      />
      
      {/* Related Resources */}
      <RelatedResourcesSection />
      
      {/* Final CTA */}
      <CTAFinalSection {...ctaFinal} />
      
      {/* Contact Form */}
      <ContactFormSection
        title="Get Started Today"
        subtitle="Fill out the form below and our team will contact you within 24 hours"
        landingVariant="company-setup-spain"
      />
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </LandingLayout>
  );
};
