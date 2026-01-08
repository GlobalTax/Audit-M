import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Meta } from '@/components/seo/Meta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SpainSetupSidebar } from '@/components/spain-setup/SpainSetupSidebar';
import { SpainSetupStickyCTA } from '@/components/spain-setup/SpainSetupStickyCTA';
import { InternationalServicesContactForm } from '@/components/international/InternationalServicesContactForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { 
  CreditCard, 
  Building2, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Download,
  Clock,
  Globe,
  Shield,
  Users,
  Landmark,
  BadgeCheck,
  Banknote
} from 'lucide-react';

const tableOfContents = [
  { id: "introduction", label: "Why You Need a Spanish Bank Account" },
  { id: "capital-requirements", label: "Capital Requirements" },
  { id: "required-documents", label: "Required Documents" },
  { id: "bank-options", label: "Bank Comparison" },
  { id: "deposit-process", label: "Capital Deposit Process" },
  { id: "operational-account", label: "Operational Account" },
  { id: "challenges", label: "Common Challenges" },
  { id: "faq", label: "FAQ" },
];

const capitalRequirements = [
  { entity: "Sociedad Limitada (SL)", minCapital: "€3,000", depositRequired: "100%", notes: "Most common for SMEs and startups" },
  { entity: "Sociedad Anónima (SA)", minCapital: "€60,000", depositRequired: "25% (€15,000)", notes: "Balance within 5 years" },
  { entity: "Branch Office (Sucursal)", minCapital: "€0", depositRequired: "N/A", notes: "Parent company liable" },
  { entity: "Subsidiary (SL form)", minCapital: "€3,000", depositRequired: "100%", notes: "Separate legal entity" },
];

const corporateDocuments = [
  "Certificate of Incorporation (apostilled)",
  "Certificate of Good Standing (apostilled)",
  "Board Resolution authorizing account opening",
  "Memorandum & Articles of Association",
  "UBO (Ultimate Beneficial Owner) declaration",
  "Parent company financial statements (last 2 years)",
];

const individualDocuments = [
  "Valid passport (notarized copy)",
  "NIE (Foreigner Identification Number)",
  "Proof of address (utility bill, max 3 months old)",
  "Tax residency certificate (if applicable)",
];

const postIncorporationDocuments = [
  "Registered Incorporation Deed (Escritura)",
  "NIF (Tax Identification Number)",
  "Commercial Registry Certificate",
];

const bankComparison = [
  { bank: "Santander", intlFocus: "Excellent", onlineBanking: "Full", englishSupport: "Yes", openingTime: "2-3 weeks", notes: "Best for global companies" },
  { bank: "BBVA", intlFocus: "Very Good", onlineBanking: "Full", englishSupport: "Yes", openingTime: "2-4 weeks", notes: "Strong digital platform" },
  { bank: "CaixaBank", intlFocus: "Good", onlineBanking: "Full", englishSupport: "Limited", openingTime: "2-3 weeks", notes: "Largest branch network" },
  { bank: "Banco Sabadell", intlFocus: "Good", onlineBanking: "Full", englishSupport: "Yes", openingTime: "2-3 weeks", notes: "SME-friendly" },
  { bank: "N26 Business", intlFocus: "Digital only", onlineBanking: "Full", englishSupport: "Yes", openingTime: "1-2 weeks", notes: "Limited for capital deposits" },
];

const depositSteps = [
  { step: 1, title: "Select Bank Partner", duration: "Day 1-3", description: "Choose a bank based on your international operations, language support, and specific needs." },
  { step: 2, title: "Submit KYC Documentation", duration: "Day 3-7", description: "Provide all required corporate and individual documents for compliance review." },
  { step: 3, title: "Account Pre-Approval", duration: "Day 7-14", description: "Bank compliance team reviews documentation and approves account opening." },
  { step: 4, title: "Capital Deposit", duration: "Day 14-15", description: "Transfer minimum share capital from your home country bank account." },
  { step: 5, title: "Certificate Issuance", duration: "Day 15-17", description: "Bank issues official capital deposit certificate for notarization." },
  { step: 6, title: "Notarial Deed", duration: "Day 17+", description: "Present certificate to notary for incorporation deed execution." },
];

const challenges = [
  { 
    title: "KYC Compliance Delays", 
    icon: Clock,
    description: "Banks require extensive documentation for international clients. Missing or improperly formatted documents can delay account opening by weeks.",
    solution: "We prepare a complete KYC package in advance, ensuring all documents are apostilled, translated, and formatted according to each bank's specific requirements."
  },
  { 
    title: "Non-Resident Complications", 
    icon: Globe,
    description: "Non-EU residents face additional scrutiny. Some banks may be reluctant to open accounts for companies with no Spanish operations yet.",
    solution: "We work with banks experienced in international clients and can facilitate introductions to relationship managers who understand cross-border business."
  },
  { 
    title: "Documentation Rejections", 
    icon: AlertTriangle,
    description: "Incorrect apostilles, outdated certificates, or missing UBO information are common rejection reasons.",
    solution: "Our team validates all documents before submission, ensuring they meet Spanish banking standards and regulatory requirements."
  },
  { 
    title: "Remote Account Opening", 
    icon: Users,
    description: "While some procedures can be done remotely, many banks require at least one in-person meeting.",
    solution: "We can represent you through powers of attorney for most banking procedures, minimizing the need for physical presence in Spain."
  },
];

const faqItems = [
  {
    question: "Can I open a Spanish business bank account as a non-resident?",
    answer: "Yes, non-residents can open corporate bank accounts in Spain. You'll need a NIE (tax identification number), valid passport, and company documentation. The process may involve additional KYC requirements and potentially an in-person meeting, though many banks now offer video verification options."
  },
  {
    question: "Do I need an NIE to open a corporate bank account in Spain?",
    answer: "Yes, all directors and authorized signatories must have NIEs. For corporate shareholders, the parent company must be registered with Spanish tax authorities (obtaining a NIF). NIEs should be obtained before starting the bank account opening process."
  },
  {
    question: "How long does it take to open a business bank account in Spain?",
    answer: "Typically 2-4 weeks from initial application to full account activation. The timeline depends on the bank, the completeness of your documentation, and whether the bank requires additional KYC verification for non-EU applicants."
  },
  {
    question: "Can I open the account remotely without visiting Spain?",
    answer: "Partially. Pre-incorporation capital deposit accounts can often be opened with documentation submitted remotely. However, many banks require at least one in-person KYC meeting. Powers of attorney can be used for subsequent transactions."
  },
  {
    question: "What is the difference between a capital deposit account and an operational account?",
    answer: "A capital deposit account is a restricted account opened before incorporation solely to receive the minimum share capital. Once incorporation is complete and registered, this converts or transfers to a full operational account with normal banking features."
  },
  {
    question: "Which Spanish bank is best for international companies?",
    answer: "Santander and BBVA offer the best international capabilities with English-speaking staff and global networks. Sabadell is excellent for SMEs. The choice depends on your specific needs—multi-currency requirements, international payments, or local branch access."
  },
  {
    question: "What happens if my account application is rejected?",
    answer: "Rejections are typically due to incomplete documentation, unclear business purpose, or compliance concerns. We help clients understand rejection reasons and either address the issues with the same bank or redirect to a more suitable banking partner."
  },
  {
    question: "Can I use a digital bank like N26 for my Spanish company?",
    answer: "Digital banks can work for operational accounts but typically cannot issue capital deposit certificates required for incorporation. We recommend using a traditional bank for initial setup, then adding digital banking for operational convenience."
  },
  {
    question: "Do I need to deposit the full share capital before incorporation?",
    answer: "For an SL, yes—the full €3,000 must be deposited. For an SA, only 25% (€15,000 of €60,000) is required at incorporation, with the balance due within the timeline specified in the bylaws (typically 1-5 years)."
  },
  {
    question: "What are the ongoing banking costs for a Spanish company?",
    answer: "Typical monthly fees range from €15-50 for basic business accounts. International transfer fees, card issuance, and premium services cost additional. Many banks offer reduced fees for startups or companies with significant transaction volumes."
  },
];

const SpainBusinessBankAccount = () => {
  const [activeSection, setActiveSection] = useState("");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view_bank_account_global_nrro', {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Set Up in Spain', url: '/set-up-in-spain' },
    { name: 'Business Bank Account', url: '/spain-business-bank-account' },
  ];

  const handleFAQExpand = (value: string) => {
    if (value) {
      trackEvent('faq_expand_bank_account_global_nrro', { question_id: value });
    }
  };

  return (
    <>
      <Meta
        title="Open a Business Bank Account in Spain | Complete Guide"
        description="How to open a corporate bank account in Spain. Capital deposit requirements, documents needed, bank comparisons, and step-by-step process for foreign investors."
        keywords="business bank account Spain, corporate account Spain, capital deposit Spain, open company bank account Spain, Spanish bank for foreigners"
        canonicalUrl="/spain-business-bank-account"
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-white/30 text-white/80">
              Banking & Capital
            </Badge>
            <h1 className="hero-title text-white mb-6">
              Opening a Business Bank Account in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-3xl">
              A practical guide for international investors navigating Spanish corporate banking. From capital deposits to operational accounts—everything you need to establish banking relationships for your Spanish entity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link to="/spain-document-checklist">
                  <Download className="h-5 w-5" />
                  Download Document Checklist
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/contact">
                  <CreditCard className="h-5 w-5" />
                  Request Banking Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sidebar for Desktop */}
      <div className="hidden lg:block fixed right-8 top-24 w-72 z-40">
        <SpainSetupSidebar 
          tableOfContents={tableOfContents}
          activeSection={activeSection}
          showTableOfContents={true}
        />
      </div>

      {/* Introduction Section */}
      <section id="introduction" className="py-20 md:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Banking Essentials
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Why You Need a Spanish Bank Account
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                A Spanish corporate bank account is essential for any business operating in Spain. Beyond the legal requirement to deposit share capital before incorporation, you'll need banking facilities for receiving payments, paying suppliers, processing payroll, and meeting tax obligations.
              </p>
              <p>
                For foreign investors, Spanish banking can present unique challenges—different documentation requirements, language barriers, and compliance procedures designed for the local market. Understanding these requirements in advance significantly streamlines your company formation process.
              </p>
              <p>
                This guide covers the complete banking journey: from opening a pre-incorporation capital deposit account to establishing full operational banking with international payment capabilities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Card>
                <CardContent className="pt-6">
                  <Banknote className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Capital Deposit</h3>
                  <p className="text-muted-foreground text-sm">Required before notarization to prove share capital availability</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Building2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Operational Banking</h3>
                  <p className="text-muted-foreground text-sm">Full banking services for day-to-day business operations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">International Payments</h3>
                  <p className="text-muted-foreground text-sm">Multi-currency capabilities for cross-border transactions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Requirements Section */}
      <section id="capital-requirements" className="py-20 md:py-28 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Share Capital
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Capital Requirements by Entity Type
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
              Spanish law mandates minimum share capital for limited liability companies. This capital must be deposited in a Spanish bank account and certified before the notarial deed can be executed.
            </p>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity Type</TableHead>
                      <TableHead>Minimum Capital</TableHead>
                      <TableHead>Deposit Required</TableHead>
                      <TableHead className="hidden md:table-cell">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capitalRequirements.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.entity}</TableCell>
                        <TableCell>{item.minCapital}</TableCell>
                        <TableCell>{item.depositRequired}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Important Note</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    The capital deposit certificate must show the exact company name (as reserved with the Central Commercial Registry) and the names of the founding shareholders. Any discrepancy will require a new certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section id="required-documents" className="py-20 md:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Documentation
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Required Documents for Account Opening
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
              Spanish banks require comprehensive documentation for corporate account opening. All foreign documents must be apostilled and accompanied by sworn translations into Spanish.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    For Corporate Shareholders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {corporateDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    For Individual Shareholders/Directors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {individualDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Post-Incorporation Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  To convert your capital deposit account to a full operational account, you'll need:
                </p>
                <ul className="space-y-3">
                  {postIncorporationDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild className="gap-2">
                <Link to="/spain-document-checklist">
                  <Download className="h-4 w-4" />
                  Download Complete Checklist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Comparison Section */}
      <section id="bank-options" className="py-20 md:py-28 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Bank Options
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Spanish Bank Comparison for International Companies
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
              Not all Spanish banks are equally equipped to handle international corporate clients. Here's how the major options compare for foreign investors.
            </p>

            <Card>
              <CardContent className="pt-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank</TableHead>
                      <TableHead>International Focus</TableHead>
                      <TableHead className="hidden md:table-cell">Online Banking</TableHead>
                      <TableHead>English Support</TableHead>
                      <TableHead>Opening Time</TableHead>
                      <TableHead className="hidden lg:table-cell">Best For</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankComparison.map((bank, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{bank.bank}</TableCell>
                        <TableCell>{bank.intlFocus}</TableCell>
                        <TableCell className="hidden md:table-cell">{bank.onlineBanking}</TableCell>
                        <TableCell>{bank.englishSupport}</TableCell>
                        <TableCell>{bank.openingTime}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{bank.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Recommended for Global Companies
                </h4>
                <p className="text-muted-foreground text-sm">
                  Santander and BBVA offer the strongest international capabilities with dedicated teams for foreign corporate clients, multi-currency accounts, and global correspondent banking networks.
                </p>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Note on Digital Banks
                </h4>
                <p className="text-muted-foreground text-sm">
                  Digital banks like N26 Business are excellent for operational banking but typically cannot provide capital deposit certificates. Use traditional banks for incorporation, then add digital banking later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Deposit Process Section */}
      <section id="deposit-process" className="py-20 md:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Step-by-Step
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              The Capital Deposit Process
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
              From selecting a bank to obtaining your capital certificate—here's the complete timeline for establishing your pre-incorporation banking.
            </p>

            <div className="space-y-4">
              {depositSteps.map((step, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-stretch">
                      <div className="w-20 bg-primary/10 flex flex-col items-center justify-center p-4 shrink-0">
                        <span className="text-2xl font-bold text-primary">{step.step}</span>
                        <span className="text-xs text-primary/70">Step</span>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                          <Badge variant="outline" className="w-fit">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-2">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Total Timeline</h4>
              <p className="text-muted-foreground">
                The complete capital deposit process typically takes <strong>2-3 weeks</strong> from initial bank application to certificate issuance. This timeline can be accelerated with complete documentation and an established banking relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Account Section */}
      <section id="operational-account" className="py-20 md:py-28 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Post-Incorporation
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Opening an Operational Account
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Once your company is registered with the Commercial Registry, your capital deposit account converts or transfers to a full operational account. This provides complete banking functionality:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Domestic Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      'Receive payments from Spanish clients',
                      'Pay suppliers and service providers',
                      'Process employee payroll',
                      'Pay taxes and Social Security',
                      'Corporate debit/credit cards',
                      'Direct debit for recurring payments'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">International Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      'SWIFT/SEPA international transfers',
                      'Multi-currency sub-accounts',
                      'Foreign exchange services',
                      'Trade finance facilities',
                      'Letters of credit',
                      'International payment platforms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-20 md:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Common Issues
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Common Challenges & How We Solve Them
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
              International clients often face obstacles when opening Spanish bank accounts. Here's how NRRO helps navigate these challenges.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <challenge.icon className="h-5 w-5 text-primary" />
                      {challenge.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground/70 mb-1">Challenge</p>
                      <p className="text-muted-foreground text-sm">{challenge.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">Our Solution</p>
                      <p className="text-muted-foreground text-sm">{challenge.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Questions & Answers
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible onValueChange={handleFAQExpand}>
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 md:py-28 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
              Related Resources
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
              Continue Your Spain Setup Journey
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Landmark className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Legal Structures</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Compare SL, SA, branch, and subsidiary options for your Spanish entity.
                  </p>
                  <Button variant="ghost" className="gap-2 p-0" asChild>
                    <Link to="/legal-structures-spain">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Document Checklist</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Complete list of documents required for incorporation and banking.
                  </p>
                  <Button variant="ghost" className="gap-2 p-0" asChild>
                    <Link to="/spain-document-checklist">
                      Download <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">NIE Guide</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    How to obtain your NIE—required for bank account opening.
                  </p>
                  <Button variant="ghost" className="gap-2 p-0" asChild>
                    <Link to="/nie-spain-foreigners">
                      Read Guide <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary/5 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
              Need Help Opening Your Spanish Bank Account?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our team has established relationships with major Spanish banks and can guide you through the account opening process, from documentation to activation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Request Banking Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/spain-setup-calculator">
                  Calculate Setup Costs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 text-center">
              Get Started
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8 text-center">
              Contact Our Spain Banking Team
            </h2>
            <InternationalServicesContactForm />
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainBusinessBankAccount;
