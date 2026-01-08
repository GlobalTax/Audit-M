import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  FileText, 
  Users, 
  Shield, 
  Globe, 
  TrendingUp, 
  Scale, 
  Wallet,
  ChevronRight,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Landmark,
  CreditCard,
  BadgeCheck,
  Briefcase,
  MapPin,
  Calculator,
  ClipboardList,
  HelpCircle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Meta } from "@/components/seo/Meta";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAnalytics } from "@/hooks/useAnalytics";
import { InternationalServicesContactForm } from "@/components/international/InternationalServicesContactForm";
import { StickyMobileCTA } from "@/components/company-setup/StickyMobileCTA";
import { SpainSetupSidebar } from "@/components/spain-setup/SpainSetupSidebar";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";

// ============================================================================
// DATA
// ============================================================================

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" }
];

const tableOfContents = [
  { id: "what-it-means", label: "What Setting Up Means" },
  { id: "setup-roadmap", label: "10-Step Roadmap" },
  { id: "timeline", label: "Timeline & Phases" },
  { id: "costs", label: "Costs & Investment" },
  { id: "why-spain", label: "Why Spain" },
  { id: "faq", label: "FAQ" },
  { id: "related-services", label: "Related Services" },
];

const definitionPoints = [
  { 
    icon: Building2, 
    title: "Legal Entity Formation", 
    description: "Establishing a recognized legal structure (SL, SA, branch, or subsidiary) that provides limited liability and enables formal operations." 
  },
  { 
    icon: FileText, 
    title: "Tax & Fiscal Registration", 
    description: "Obtaining NIF, registering for VAT, corporate tax, and ensuring compliance with Spain's tax obligations from day one." 
  },
  { 
    icon: Users, 
    title: "Workforce Compliance", 
    description: "Setting up payroll, Social Security registration, employment contracts, and labor law compliance for your Spanish team." 
  },
  { 
    icon: Shield, 
    title: "Ongoing Governance", 
    description: "Establishing corporate secretarial functions, annual filings, board documentation, and regulatory compliance frameworks." 
  },
];

const setupRoadmap = [
  { 
    number: 1, 
    title: "Strategic Assessment", 
    description: "Evaluate your business objectives, target market, investment structure, and optimal entry strategy for Spain. We analyze your global corporate structure to recommend the most tax-efficient and operationally sound approach.",
    duration: "Pre-start",
    category: "Planning",
    icon: Briefcase
  },
  { 
    number: 2, 
    title: "Legal Structure Selection", 
    description: "Choose between Sociedad Limitada (SL), Sociedad Anónima (SA), branch office, or subsidiary based on liability protection, tax implications, capital requirements, and governance flexibility.",
    duration: "Week 1",
    category: "Legal",
    icon: Scale
  },
  { 
    number: 3, 
    title: "Corporate Documentation", 
    description: "Draft comprehensive bylaws (estatutos), shareholder agreements, articles of association, and powers of attorney. All documents prepared in accordance with Spanish commercial law.",
    duration: "Week 1-2",
    category: "Legal",
    icon: FileText
  },
  { 
    number: 4, 
    title: "NIE/NIF Acquisition", 
    description: "Obtain tax identification numbers (NIE for individuals, NIF for entities) for all directors, shareholders, and the company itself. This is mandatory before any commercial activity.",
    duration: "Pre-start*",
    category: "Administrative",
    icon: BadgeCheck
  },
  { 
    number: 5, 
    title: "Notarial Incorporation", 
    description: "Execute the public deed of incorporation (escritura pública) before a Spanish notary. This formalizes the company's creation and requires capital deposit certification.",
    duration: "Week 2-3",
    category: "Legal",
    icon: Landmark
  },
  { 
    number: 6, 
    title: "Commercial Registry Filing", 
    description: "Register the company with the Mercantile Registry (Registro Mercantil) to obtain legal personality. The company can begin trading once registration is confirmed.",
    duration: "Week 3-4",
    category: "Administrative",
    icon: BookOpen
  },
  { 
    number: 7, 
    title: "Tax Authority Registration", 
    description: "Complete registration with the Spanish Tax Agency (AEAT) for VAT (IVA), corporate income tax (Impuesto sobre Sociedades), and payroll withholding obligations.",
    duration: "Week 4-5",
    category: "Compliance",
    icon: FileText
  },
  { 
    number: 8, 
    title: "Bank Account Opening", 
    description: "Establish corporate banking relationships with Spanish or international banks. This includes capital deposit accounts, operational accounts, and international payment capabilities.",
    duration: "Week 3-5",
    category: "Administrative",
    icon: CreditCard
  },
  { 
    number: 9, 
    title: "Payroll & Social Security Setup", 
    description: "Register with Social Security (Seguridad Social), establish payroll processing systems, prepare compliant employment contracts, and ensure full labor law compliance.",
    duration: "Week 5-6",
    category: "Compliance",
    icon: Users
  },
  { 
    number: 10, 
    title: "Operational Launch", 
    description: "Final compliance verification, industry-specific license applications, IT and operational infrastructure setup, and formal business activation. Your Spain operation is ready.",
    duration: "Week 6",
    category: "Operational",
    icon: CheckCircle2
  }
];

const timelinePhases = [
  { 
    phase: 1, 
    title: "Planning & Strategy", 
    weeks: "Week 1",
    description: "Strategic assessment, structure selection, and project planning",
    color: "bg-blue-500"
  },
  { 
    phase: 2, 
    title: "Legal Formation", 
    weeks: "Weeks 1-3",
    description: "Documentation, NIE acquisition, and notarial incorporation",
    color: "bg-emerald-500"
  },
  { 
    phase: 3, 
    title: "Registration & Compliance", 
    weeks: "Weeks 3-5",
    description: "Registry filings, tax registration, and bank setup",
    color: "bg-amber-500"
  },
  { 
    phase: 4, 
    title: "Operational Setup", 
    weeks: "Weeks 4-6",
    description: "Payroll, HR compliance, and operational infrastructure",
    color: "bg-purple-500"
  },
  { 
    phase: 5, 
    title: "Ongoing Support", 
    weeks: "Continuous",
    description: "Accounting, tax filings, and corporate governance",
    color: "bg-primary"
  }
];

const costCategories = [
  {
    category: "Legal & Advisory Fees",
    range: "€3,000 - €8,000",
    includes: ["Corporate structuring advice", "Document drafting & review", "Notary coordination", "Registry filings management"],
    note: "Varies by complexity and structure type"
  },
  {
    category: "Government & Registry Fees",
    range: "€500 - €1,500",
    includes: ["Notary public fees", "Commercial Registry fees", "Tax registration costs", "Certified translations"],
    note: "Fixed official fees"
  },
  {
    category: "Share Capital",
    range: "€3,000 - €60,000+",
    includes: ["SL minimum: €3,000", "SA minimum: €60,000", "25% deposit required at incorporation", "Balance within defined timeline"],
    note: "Depends on legal structure"
  },
  {
    category: "Bank Setup",
    range: "€0 - €500",
    includes: ["Account opening fees", "Initial deposit requirements", "International transfer setup", "Corporate card issuance"],
    note: "Varies by bank"
  },
  {
    category: "Payroll & HR Setup",
    range: "€500 - €2,000",
    includes: ["Social Security registration", "Payroll system configuration", "Employment contract drafting", "Labor compliance audit"],
    note: "Per-employee costs additional"
  },
  {
    category: "Ongoing Compliance (Annual)",
    range: "€3,000 - €12,000+",
    includes: ["Accounting & bookkeeping", "Tax filings (quarterly + annual)", "Corporate secretarial services", "Audit fees (if required)"],
    note: "Based on activity volume"
  }
];

const whySpainAdvantages = [
  { 
    icon: Globe, 
    title: "Gateway to Europe & LATAM", 
    description: "Strategic location bridging European, Latin American, and African markets with established trade routes, shared language ties, and cultural affinity." 
  },
  { 
    icon: TrendingUp, 
    title: "Growing Economy", 
    description: "4th largest economy in the Eurozone with robust GDP growth, increasing foreign direct investment, and a resilient post-pandemic recovery trajectory." 
  },
  { 
    icon: Users, 
    title: "Skilled Workforce", 
    description: "Highly educated talent pool with multilingual capabilities, strong technical skills, and competitive labor costs compared to Northern Europe." 
  },
  { 
    icon: Building2, 
    title: "Business-Friendly Reforms", 
    description: "Recent regulatory reforms streamlining company formation, reducing bureaucracy, digitizing government services, and incentivizing foreign investment." 
  },
  { 
    icon: Scale, 
    title: "Legal Certainty", 
    description: "Stable legal framework within the EU, robust intellectual property protection, transparent regulatory environment, and access to European courts." 
  },
  { 
    icon: Wallet, 
    title: "Competitive Tax Incentives", 
    description: "Patent Box regime, generous R&D tax credits, Beckham Law for expatriate executives, and favorable holding company (ETVE) structures." 
  }
];

const faqs = [
  { 
    question: "What is the most common legal structure for foreign companies setting up in Spain?", 
    answer: "The Sociedad Limitada (SL) is the most common choice for foreign companies entering Spain. It offers limited liability protection, requires only €3,000 minimum capital, and provides flexibility in governance. For larger operations or specific regulatory requirements, a Sociedad Anónima (SA) may be more appropriate. Use our calculator for a personalized assessment." 
  },
  { 
    question: "When should I consider an SA instead of an SL?", 
    answer: "Choose a Sociedad Anónima (SA) when you need to raise capital through share issuance, operate in regulated industries like banking or insurance, or plan an eventual public listing. The SA requires €60,000 minimum capital (25% at incorporation) and has more formal governance requirements. For most SME operations, an SL is more cost-effective and administratively simpler." 
  },
  { 
    question: "Can I open a branch office instead of incorporating a subsidiary?", 
    answer: "Yes, a branch office (sucursal) allows you to operate in Spain as an extension of your foreign parent company. However, the parent assumes full liability for branch obligations. Branches require registration of parent company documents in Spain and create a permanent establishment for tax purposes. Subsidiaries offer better liability protection and may access specific Spanish tax incentives." 
  },
  { 
    question: "How long does it take to incorporate a company in Spain?", 
    answer: "With all documents ready, incorporation typically takes 3-5 weeks for an SL and 4-6 weeks for an SA. This includes notarial execution (1-2 days), Commercial Registry filing (2-4 weeks), and tax registration (1-2 weeks). NIE applications for non-EU nationals can add 2-4 weeks if not processed in advance. Our team can run multiple workstreams in parallel to minimize total timeline." 
  },
  { 
    question: "Can I accelerate the incorporation process?", 
    answer: "Yes, with proper preparation. Key accelerators include: obtaining NIEs before starting the formation process, using CIRCE (Centro de Información y Red de Creación de Empresas) for express 24-48 hour formations of standard SLs, having all parent company documentation apostilled and translated in advance, and pre-clearing the company name with the Central Commercial Registry." 
  },
  { 
    question: "What documents do foreign shareholders need to provide?", 
    answer: "Corporate shareholders must provide certificate of incorporation, good standing certificate, board resolution authorizing the Spanish entity, and articles of association—all apostilled and sworn-translated. Individual shareholders need passport copies and NIE numbers. Powers of attorney may be required if shareholders cannot attend notarization personally. Download our document checklist for the complete list." 
  },
  { 
    question: "What is an NIE and why is it required?", 
    answer: "The NIE (Número de Identificación de Extranjero) is the tax identification number for foreigners in Spain. It's mandatory for all directors, shareholders, and employees. NIEs are required to open bank accounts, sign notarial deeds, file tax returns, and execute most legal transactions. EU citizens can often obtain NIEs at Spanish police stations; non-EU nationals typically apply through Spanish consulates." 
  },
  { 
    question: "How do I open a corporate bank account in Spain?", 
    answer: "Opening a corporate account requires: registered incorporation deed, NIF (tax ID), NIE of authorized signatories, and proof of company activity. Major Spanish banks (Santander, BBVA, CaixaBank) and international banks with Spanish presence can accommodate corporate accounts. Initial capital deposit accounts can be opened pre-incorporation with the notarial deed draft. Allow 1-3 weeks for full account activation." 
  },
  { 
    question: "What are the employer obligations for hiring employees in Spain?", 
    answer: "Employers must: register with Social Security (Seguridad Social), register each employee within the hiring deadline, file monthly Social Security contributions (approximately 30% of gross salary), process monthly payroll with appropriate withholdings, and comply with Spanish labor law requirements including statutory benefits, working hours limits, and dismissal protections." 
  },
  { 
    question: "Do I need to register for payroll if I only have directors?", 
    answer: "It depends. Directors who are also majority shareholders (>25% ownership) are typically classified as self-employed (autónomo) rather than employees and are not processed through standard payroll. Non-shareholder directors or minority shareholder directors are generally treated as employees requiring payroll registration. We analyze each situation to determine the optimal and compliant approach." 
  },
  { 
    question: "What tax registrations are required after incorporation?", 
    answer: "After incorporation, you must register for: NIF (corporate tax ID, obtained automatically during incorporation), VAT (IVA) if conducting taxable activities, corporate income tax (Impuesto sobre Sociedades), payroll withholding tax (IRPF retentions) if hiring employees, and municipal business activity tax (IAE, typically exempt for companies under €1M turnover)." 
  },
  { 
    question: "Is VAT registration automatic when I incorporate?", 
    answer: "No, VAT (IVA) registration is a separate process submitted to the Spanish Tax Agency (AEAT) using Form 036 or 037. You can register before starting activities, but registration is mandatory before issuing VAT-bearing invoices. The standard VAT rate is 21%, with reduced rates of 10% and 4% for specific goods and services. Intra-EU transactions require additional ROI (VIES) registration." 
  },
  { 
    question: "What ongoing compliance obligations will I have?", 
    answer: "Ongoing obligations include: quarterly VAT returns (Model 303), annual VAT summary (Model 390), quarterly/monthly payroll withholdings (Model 111), annual corporate tax return (Model 200), annual accounts filing with the Commercial Registry, beneficial ownership declarations (RETIR), and annual confirmation of company data. We provide comprehensive compliance calendar management." 
  },
  { 
    question: "When do I need to appoint an auditor?", 
    answer: "Audit is mandatory if the company exceeds two of three thresholds for two consecutive years: total assets over €4M, annual revenue over €8M, or average employees exceeding 50. Groups of companies have consolidated audit requirements. Even when not mandatory, audited accounts may be beneficial for bank financing, investor relations, or parent company reporting requirements." 
  },
  { 
    question: "What are the typical costs for setting up a company in Spain?", 
    answer: "Total first-year investment typically ranges from €8,000-€15,000 for a standard SL, including: advisory fees (€3,000-€8,000), notary and registry fees (€500-€1,500), share capital (€3,000 minimum), and initial compliance setup. Ongoing annual costs for accounting, tax, and secretarial services typically range from €3,000-€12,000 depending on transaction volume. Use our cost calculator for a personalized estimate." 
  }
];

const relatedServices = [
  { title: "International Accounting Management", slug: "/services/international-accounting-management", description: "Full-service accounting for multinational operations" },
  { title: "International Tax Management", slug: "/services/international-tax-management", description: "Cross-border tax planning and compliance" },
  { title: "International Payroll Management", slug: "/services/international-payroll-management", description: "Multi-country payroll processing" },
  { title: "Corporate Legal Services", slug: "/services/corporate-legal-services", description: "Commercial law and corporate governance" },
  { title: "Local Presence & Governance Support", slug: "/services/local-presence-governance-support", description: "Director services and registered office" },
  { title: "Beckham Law Advisory", slug: "/beckham-law", description: "Expatriate tax regime optimization" }
];

// ============================================================================
// COMPONENTS
// ============================================================================

const HeroSection = ({ onPrimaryClick, onSecondaryClick }: { onPrimaryClick: () => void; onSecondaryClick: () => void }) => (
  <section className="relative bg-black py-24 md:py-32 lg:py-40 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/20" />
    
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    
    <div className="container relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 border-white/20 text-white/80 bg-white/5 backdrop-blur-sm px-4 py-2">
            <MapPin className="w-4 h-4 mr-2" />
            Trusted by 500+ International Companies
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-title text-white mb-6"
        >
          Set Up Your Business
          <span className="block text-primary-foreground/90">in Spain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          The definitive roadmap for foreign investors, multinational groups, and international entrepreneurs 
          establishing operations in Spain. From legal entity formation to full compliance—we guide you every step.
        </motion.p>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-sm text-white/50 mb-10"
        >
          40+ page guide · No email required to start reading · Instant download
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            onClick={onPrimaryClick}
            className="bg-white text-black hover:bg-white/90 font-semibold px-8"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Spain Setup Playbook
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onSecondaryClick}
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Consultation
          </Button>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "25+", label: "Years Experience" },
            { value: "500+", label: "Companies Formed" },
            { value: "8-12", label: "Weeks Average" },
            { value: "98%", label: "Client Retention" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// TableOfContentsNav removed - now using SpainSetupSidebar component

// Quick Resources Grid
const QuickResourcesSection = ({ 
  onPlaybook, 
  onChecklist, 
  onCalculator, 
  onQuiz 
}: { 
  onPlaybook: () => void; 
  onChecklist: () => void; 
  onCalculator: () => void; 
  onQuiz: () => void;
}) => {
  const resources = [
    {
      icon: Download,
      title: "Download Playbook",
      description: "40+ page setup guide",
      onClick: onPlaybook,
      badge: "Free"
    },
    {
      icon: ClipboardList,
      title: "Get Checklist",
      description: "Required documents list",
      onClick: onChecklist,
      badge: "Free"
    },
    {
      icon: Calculator,
      title: "Cost Calculator",
      description: "Instant cost estimate",
      onClick: onCalculator,
      badge: "Free"
    },
    {
      icon: HelpCircle,
      title: "Readiness Quiz",
      description: "2-minute assessment",
      onClick: onQuiz,
      badge: "Free"
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Quick Resources
            </span>
            <h2 className="text-2xl md:text-3xl font-normal text-foreground mt-2">
              Free Tools to Get Started
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={resource.onClick}
                className="group bg-background border border-border rounded-xl p-5 text-left hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{resource.badge}</Badge>
                </div>
                <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DefinitionSection = () => (
  <section id="what-it-means" className="py-20 bg-background scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Understanding the Process</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-6">
          What Does "Setting Up in Spain" Mean for International Businesses?
        </h2>
        
        <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
          <p>
            For foreign investors, multinational corporations, and international entrepreneurs, setting up in Spain 
            represents far more than simple company registration. It's a comprehensive process of establishing a 
            legally compliant, operationally ready business presence within the Spanish and European markets.
          </p>
          <p>
            Unlike informal arrangements or contractor relationships, a formal Spanish setup provides legal 
            personality, limited liability protection, access to EU markets, credibility with Spanish clients 
            and partners, and the foundation for sustainable growth in Southern Europe.
          </p>
          <p>
            The process involves navigating Spanish commercial law, tax regulations, employment legislation, 
            and administrative requirements—each with specific timelines, documentation, and compliance obligations 
            that differ significantly from other jurisdictions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {definitionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-muted/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const RoadmapSection = () => {
  const categoryColors: Record<string, string> = {
    Planning: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Legal: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Administrative: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Compliance: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    Operational: "bg-primary/10 text-primary border-primary/20"
  };

  return (
    <section id="setup-roadmap" className="py-20 bg-muted/30 scroll-mt-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">Step-by-Step Guide</Badge>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            10-Step Setup Roadmap
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            A proven methodology refined over 25+ years of helping international businesses establish 
            successful operations in Spain.
          </p>

          <div className="space-y-6">
            {setupRoadmap.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-medium text-foreground">{step.title}</h3>
                      <Badge variant="outline" className={categoryColors[step.category]}>
                        {step.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineSection = () => (
  <section id="timeline" className="py-20 bg-background scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Project Timeline</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
          Timeline & Phases
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          A typical Spain setup project follows five distinct phases, with most companies achieving 
          full operational status within 8-12 weeks.
        </p>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-border" />
          
          <div className="grid grid-cols-5 gap-4">
            {timelinePhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className={`w-4 h-4 ${phase.color} rounded-full mx-auto mb-4 relative z-10 ring-4 ring-background`} />
                
                <div className="text-center">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Phase {phase.phase}</div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{phase.title}</h4>
                  <div className="text-xs text-primary font-medium mb-2">{phase.weeks}</div>
                  <p className="text-xs text-muted-foreground">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {timelinePhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 ${phase.color} rounded-full`} />
                {index < timelinePhases.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>
              <div className="pb-6">
                <div className="text-xs font-semibold text-muted-foreground">Phase {phase.phase}</div>
                <h4 className="font-medium text-foreground">{phase.title}</h4>
                <div className="text-sm text-primary font-medium">{phase.weeks}</div>
                <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTABanner = ({ 
  title, 
  description, 
  buttonText, 
  microcopy,
  onClick 
}: { 
  title: string; 
  description: string; 
  buttonText: string; 
  microcopy?: string;
  onClick: () => void 
}) => (
  <section className="py-16 bg-primary">
    <div className="container">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-normal text-primary-foreground mb-4">{title}</h3>
        <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">{description}</p>
        {microcopy && (
          <p className="text-sm text-primary-foreground/60 mb-6">{microcopy}</p>
        )}
        <Button 
          size="lg" 
          onClick={onClick}
          className="bg-white text-primary hover:bg-white/90 font-semibold"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  </section>
);

const CostsSection = () => (
  <section id="costs" className="py-20 bg-muted/30 scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Investment Overview</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
          Costs & Investment Categories
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Understanding the full investment required helps you plan effectively. Here's a transparent 
          breakdown of typical costs for establishing a company in Spain.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {costCategories.map((cost, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-foreground">{cost.category}</h3>
                <span className="text-xl font-bold text-primary">{cost.range}</span>
              </div>
              <ul className="space-y-2 mb-4">
                {cost.includes.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                {cost.note}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Typical Total Investment</h4>
              <p className="text-muted-foreground text-sm">
                For a standard SL formation with basic setup, expect to invest <strong>€8,000 - €15,000</strong> in 
                the first year including formation, capital, and initial compliance. This excludes operational 
                costs like rent, salaries, and ongoing accounting which vary based on business activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhySpainSection = () => (
  <section id="why-spain" className="py-20 bg-background scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Strategic Advantages</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
          Why Spain: Business Value & Strategic Advantages
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Spain offers a unique combination of market access, talent, infrastructure, and incentives 
          that make it an ideal base for international expansion.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whySpainAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-muted/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <advantage.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <section id="faq" className="py-20 bg-muted/30 scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Common Questions</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Answers to the most common questions from international companies setting up in Spain.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="bg-background border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Have a question not covered here?</p>
          <Button onClick={onCtaClick}>
            Ask Our Experts
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const RelatedServicesSection = () => (
  <section id="related-services" className="py-20 bg-background scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Explore More</Badge>
        <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
          Related Services
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Discover our full range of services designed to support international businesses in Spain.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedServices.map((service, index) => (
            <Link
              key={index}
              to={service.slug}
              className="group bg-muted/50 border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-muted transition-all"
            >
              <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <span className="text-sm text-primary font-medium inline-flex items-center">
                Learn more
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FinalCTASection = ({ onPrimaryClick, onSecondaryClick }: { onPrimaryClick: () => void; onSecondaryClick: () => void }) => (
  <section className="py-20 bg-black">
    <div className="container">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-normal text-white mb-6">
          Ready to Establish Your Business in Spain?
        </h2>
        <p className="text-lg text-white/70 mb-4 max-w-2xl mx-auto">
          Join 500+ international companies that have successfully set up operations in Spain with our guidance. 
          Let's discuss your project.
        </p>
        <p className="text-sm text-white/50 mb-10">
          Free consultation · No commitment · Response within 24 hours
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            onClick={onPrimaryClick}
            className="bg-white text-black hover:bg-white/90 font-semibold"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Consultation
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onSecondaryClick}
            className="border-white/30 text-white hover:bg-white/10 font-semibold"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Playbook
          </Button>
        </div>
        <p className="text-xs text-white/40">
          Trusted by multinationals from 50+ countries · 98% client satisfaction rate
        </p>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-20 bg-muted/30">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Get Started</Badge>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            Start Your Spain Setup Project
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete the form below and our international team will contact you within 24 hours.
          </p>
        </div>
        <InternationalServicesContactForm />
      </div>
    </div>
  </section>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SetUpInSpain = () => {
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hero CTAs
  const handleDownloadPlaybook = () => {
    trackEvent("playbook_download_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "hero",
      resource_type: "playbook"
    });
    navigate("/spain-company-setup-playbook");
  };

  const handleBookConsultation = (position: string) => {
    trackEvent("consultation_request_global_nrro", {
      page: "set-up-in-spain",
      cta_position: position
    });
    scrollToContact();
  };

  // Resource CTAs
  const handlePlaybookClick = (position: string) => {
    trackEvent("playbook_download_global_nrro", {
      page: "set-up-in-spain",
      cta_position: position,
      resource_type: "playbook"
    });
    navigate("/spain-company-setup-playbook");
  };

  const handleChecklistClick = (position: string) => {
    trackEvent("checklist_download_global_nrro", {
      page: "set-up-in-spain",
      cta_position: position,
      resource_type: "checklist"
    });
    navigate("/spain-document-checklist");
  };

  const handleCalculatorClick = (position: string) => {
    trackEvent("calculator_start_global_nrro", {
      page: "set-up-in-spain",
      cta_position: position,
      resource_type: "calculator"
    });
    navigate("/spain-setup-calculator");
  };

  const handleQuizClick = (position: string) => {
    trackEvent("readiness_quiz_start_global_nrro", {
      page: "set-up-in-spain",
      cta_position: position,
      resource_type: "quiz"
    });
    navigate("/spain-readiness-quiz");
  };

  // Mid-page CTAs
  const handleDiscussProject = () => {
    trackEvent("cta_discuss_project_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "mid_page_1"
    });
    scrollToContact();
  };

  const handleGetQuote = () => {
    trackEvent("cta_custom_quote_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "mid_page_2"
    });
    scrollToContact();
  };

  const handleCalculatorMidPage = () => {
    trackEvent("calculator_start_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "mid_page_3"
    });
    navigate("/spain-setup-calculator");
  };

  const handleAskExperts = () => {
    trackEvent("cta_ask_experts_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "faq_section"
    });
    scrollToContact();
  };

  return (
    <Layout>
      <Meta
        title="Set Up in Spain | Complete Guide for International Business"
        description="Expert guide to establishing your business in Spain. Legal, tax, and compliance roadmap for foreign investors and multinational companies. 25+ years experience."
        keywords="set up business spain, establish company spain, foreign investment spain, spain business setup guide, SL formation spain"
        canonicalUrl="/set-up-in-spain"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <HeroSection 
        onPrimaryClick={handleDownloadPlaybook}
        onSecondaryClick={() => handleBookConsultation("hero")}
      />

      {/* Quick Resources Section */}
      <QuickResourcesSection
        onPlaybook={() => handlePlaybookClick("quick_resources")}
        onChecklist={() => handleChecklistClick("quick_resources")}
        onCalculator={() => handleCalculatorClick("quick_resources")}
        onQuiz={() => handleQuizClick("quick_resources")}
      />

      {/* Main content with sidebar TOC */}
      <div className="relative">
        <div className="container py-12">
          <div className="flex gap-8">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SpainSetupSidebar 
                  tableOfContents={tableOfContents}
                  activeSection={activeSection}
                  showTableOfContents={true}
                />
              </div>
            </div>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              <DefinitionSection />
              <RoadmapSection />
              
              <CTABanner 
                title="Ready to Discuss Your Setup Project?"
                description="Our team of international business specialists can provide a customized roadmap for your specific situation."
                buttonText="Discuss Your Project"
                microcopy="Free initial consultation · No obligation"
                onClick={handleDiscussProject}
              />

              <TimelineSection />

              <CTABanner 
                title="Estimate Your Costs & Timeline"
                description="Use our free calculator to get an instant estimate based on your company type and requirements."
                buttonText="Use Our Free Calculator"
                microcopy="Takes 30 seconds · Personalized results"
                onClick={handleCalculatorMidPage}
              />

              <CostsSection />

              <CTABanner 
                title="Need a Custom Quote?"
                description="Every business is unique. Get a detailed proposal tailored to your structure, timeline, and compliance needs."
                buttonText="Get a Custom Quote"
                microcopy="Response within 24 hours"
                onClick={handleGetQuote}
              />

              <WhySpainSection />
              <FAQSection onCtaClick={handleAskExperts} />
              <RelatedServicesSection />
            </main>
          </div>
        </div>
      </div>

      <FinalCTASection 
        onPrimaryClick={() => handleBookConsultation("final_section")}
        onSecondaryClick={() => handlePlaybookClick("final_section")}
      />

      <div id="contact-form">
        <ContactSection />
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA
        primaryText="Book Consultation"
        primaryUrl="#contact-form"
      />
      
      <SpainSetupStickyCTA />
    </Layout>
  );
};

export default SetUpInSpain;
