import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  MapPin
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
    duration: "Week 1",
    category: "Planning",
    icon: Briefcase
  },
  { 
    number: 2, 
    title: "Legal Structure Selection", 
    description: "Choose between Sociedad Limitada (SL), Sociedad Anónima (SA), branch office, or subsidiary based on liability protection, tax implications, capital requirements, and governance flexibility.",
    duration: "Week 1-2",
    category: "Legal",
    icon: Scale
  },
  { 
    number: 3, 
    title: "Corporate Documentation", 
    description: "Draft comprehensive bylaws (estatutos), shareholder agreements, articles of association, and powers of attorney. All documents prepared in accordance with Spanish commercial law.",
    duration: "Week 2-3",
    category: "Legal",
    icon: FileText
  },
  { 
    number: 4, 
    title: "NIE/NIF Acquisition", 
    description: "Obtain tax identification numbers (NIE for individuals, NIF for entities) for all directors, shareholders, and the company itself. This is mandatory before any commercial activity.",
    duration: "Week 2-4",
    category: "Administrative",
    icon: BadgeCheck
  },
  { 
    number: 5, 
    title: "Notarial Incorporation", 
    description: "Execute the public deed of incorporation (escritura pública) before a Spanish notary. This formalizes the company's creation and requires capital deposit certification.",
    duration: "Week 4-5",
    category: "Legal",
    icon: Landmark
  },
  { 
    number: 6, 
    title: "Commercial Registry Filing", 
    description: "Register the company with the Mercantile Registry (Registro Mercantil) to obtain legal personality. The company can begin trading once registration is confirmed.",
    duration: "Week 5-7",
    category: "Administrative",
    icon: BookOpen
  },
  { 
    number: 7, 
    title: "Tax Authority Registration", 
    description: "Complete registration with the Spanish Tax Agency (AEAT) for VAT (IVA), corporate income tax (Impuesto sobre Sociedades), and payroll withholding obligations.",
    duration: "Week 6-8",
    category: "Compliance",
    icon: FileText
  },
  { 
    number: 8, 
    title: "Bank Account Opening", 
    description: "Establish corporate banking relationships with Spanish or international banks. This includes capital deposit accounts, operational accounts, and international payment capabilities.",
    duration: "Week 4-8",
    category: "Administrative",
    icon: CreditCard
  },
  { 
    number: 9, 
    title: "Payroll & Social Security Setup", 
    description: "Register with Social Security (Seguridad Social), establish payroll processing systems, prepare compliant employment contracts, and ensure full labor law compliance.",
    duration: "Week 7-10",
    category: "Compliance",
    icon: Users
  },
  { 
    number: 10, 
    title: "Operational Launch", 
    description: "Final compliance verification, industry-specific license applications, IT and operational infrastructure setup, and formal business activation. Your Spain operation is ready.",
    duration: "Week 10+",
    category: "Operational",
    icon: CheckCircle2
  }
];

const timelinePhases = [
  { 
    phase: 1, 
    title: "Planning & Strategy", 
    weeks: "Weeks 1-2",
    description: "Strategic assessment, structure selection, and project planning",
    color: "bg-blue-500"
  },
  { 
    phase: 2, 
    title: "Legal Formation", 
    weeks: "Weeks 2-5",
    description: "Documentation, NIE acquisition, and notarial incorporation",
    color: "bg-emerald-500"
  },
  { 
    phase: 3, 
    title: "Registration & Compliance", 
    weeks: "Weeks 5-8",
    description: "Registry filings, tax registration, and bank setup",
    color: "bg-amber-500"
  },
  { 
    phase: 4, 
    title: "Operational Setup", 
    weeks: "Weeks 8-12",
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
    question: "How long does it take to fully set up a company in Spain?", 
    answer: "The typical timeline is 8-12 weeks from initial consultation to full operational readiness. This includes legal formation (4-6 weeks), tax and registry processes (2-3 weeks), and payroll/HR setup (2-3 weeks). With expedited processing and experienced advisors, some formations can be completed in as little as 6 weeks." 
  },
  { 
    question: "What is the minimum capital required to form a Spanish company?", 
    answer: "For a Sociedad Limitada (SL), the most common structure for foreign investors, the minimum share capital is €3,000. For a Sociedad Anónima (SA), required for larger operations or public offerings, the minimum is €60,000 with at least 25% deposited at incorporation. Branch offices do not require separate capital as they operate under the parent company's liability." 
  },
  { 
    question: "Can foreign nationals be directors of a Spanish company?", 
    answer: "Yes, there are no nationality or residency requirements for directors of Spanish companies. Foreign nationals can serve as directors, though they will need to obtain a NIE (tax identification number). Board meetings can be held remotely, and powers of attorney can enable non-residents to fulfill most director obligations without physical presence." 
  },
  { 
    question: "Do I need to travel to Spain to set up a company?", 
    answer: "No, the entire process can be completed remotely using powers of attorney (poder notarial). We coordinate with Spanish notaries and can arrange for documentation to be executed at Spanish consulates in your country. Many clients complete their entire setup without stepping foot in Spain." 
  },
  { 
    question: "What ongoing compliance obligations exist for Spanish companies?", 
    answer: "Spanish companies must file quarterly VAT returns (Modelo 303), annual corporate tax returns (Modelo 200), monthly/quarterly payroll withholdings, annual accounts with the Commercial Registry, and beneficial ownership declarations. We provide comprehensive compliance calendar management to ensure you never miss a deadline." 
  },
  { 
    question: "Can I hire employees before the company is fully registered?", 
    answer: "No, you must complete Social Security registration before legally employing staff in Spain. However, we can structure the timeline to have HR setup running in parallel with registry processes, minimizing delays. In urgent cases, secondment arrangements from a parent company can provide interim solutions." 
  },
  { 
    question: "What are the tax implications for foreign shareholders?", 
    answer: "Spain has an extensive network of 90+ double taxation treaties. Dividends to non-residents are typically subject to 19% withholding tax, though treaties often reduce this to 5-15%. The EU Parent-Subsidiary Directive can eliminate withholding on qualifying intra-EU distributions. Proper structuring is essential to optimize tax efficiency." 
  },
  { 
    question: "Is Spain a good location for holding companies?", 
    answer: "Yes, Spain offers the ETVE (Entidad de Tenencia de Valores Extranjeros) regime, which provides participation exemption for dividends and capital gains from qualifying foreign subsidiaries. This makes Spain an attractive jurisdiction for European or Latin American holding structures, combining tax efficiency with EU membership benefits." 
  },
  { 
    question: "What support do you provide after company formation?", 
    answer: "We offer comprehensive ongoing services including monthly/annual accounting, tax return preparation and filing, payroll processing, corporate secretarial support, board meeting documentation, regulatory compliance monitoring, and strategic tax planning. Our clients receive a dedicated team familiar with their business from day one." 
  },
  { 
    question: "How does the Beckham Law benefit expatriate executives?", 
    answer: "The Beckham Law (Régimen Especial de Impatriados) allows qualifying individuals to pay a flat 24% tax rate on Spanish-source income up to €600,000 for 6 years, compared to progressive rates up to 47%. Foreign-source income (except employment income) is exempt. This applies to employees and, since 2023, to entrepreneurs and remote workers meeting specific criteria." 
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Set Up Your Business
          <span className="block text-primary-foreground/90">in Spain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          The definitive roadmap for foreign investors, multinational groups, and international entrepreneurs 
          establishing operations in Spain. From legal entity formation to full compliance—we guide you every step.
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

const TableOfContentsNav = ({ activeSection }: { activeSection: string }) => (
  <nav className="sticky top-24 bg-background border border-border rounded-lg p-4 shadow-sm">
    <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Contents</h3>
    <ul className="space-y-2">
      {tableOfContents.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
              activeSection === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const DefinitionSection = () => (
  <section id="what-it-means" className="py-20 bg-background scroll-mt-24">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4">Understanding the Process</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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
              <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                  <h4 className="font-semibold text-foreground text-sm mb-1">{phase.title}</h4>
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
                <h4 className="font-semibold text-foreground">{phase.title}</h4>
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
  onClick 
}: { 
  title: string; 
  description: string; 
  buttonText: string; 
  onClick: () => void 
}) => (
  <section className="py-16 bg-primary">
    <div className="container">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">{title}</h3>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{description}</p>
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                <h3 className="text-lg font-semibold text-foreground">{cost.category}</h3>
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
              <h4 className="font-semibold text-foreground mb-2">Typical Total Investment</h4>
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Establish Your Business in Spain?
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Join 500+ international companies that have successfully set up operations in Spain with our guidance. 
          Let's discuss your project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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

  const handleDownloadPlaybook = () => {
    trackEvent("cta_download_playbook_spain_setup_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "hero"
    });
    // In a real implementation, this would trigger a download or lead capture modal
    scrollToContact();
  };

  const handleBookConsultation = () => {
    trackEvent("cta_book_consultation_spain_setup_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "hero"
    });
    scrollToContact();
  };

  const handleDiscussProject = () => {
    trackEvent("cta_discuss_project_spain_setup_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "mid_page"
    });
    scrollToContact();
  };

  const handleGetQuote = () => {
    trackEvent("cta_custom_quote_spain_setup_global_nrro", {
      page: "set-up-in-spain",
      cta_position: "after_costs"
    });
    scrollToContact();
  };

  const handleAskExperts = () => {
    trackEvent("cta_ask_experts_spain_setup_global_nrro", {
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
        onSecondaryClick={handleBookConsultation}
      />

      {/* Main content with sidebar TOC */}
      <div className="relative">
        <div className="container py-12">
          <div className="flex gap-8">
            {/* Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContentsNav activeSection={activeSection} />
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              <DefinitionSection />
              <RoadmapSection />
              
              <CTABanner 
                title="Ready to Discuss Your Setup Project?"
                description="Our team of international business specialists can provide a customized roadmap for your specific situation."
                buttonText="Discuss Your Project"
                onClick={handleDiscussProject}
              />

              <TimelineSection />
              <CostsSection />

              <CTABanner 
                title="Need a Custom Quote?"
                description="Every business is unique. Get a detailed proposal tailored to your structure, timeline, and compliance needs."
                buttonText="Get a Custom Quote"
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
        onPrimaryClick={handleBookConsultation}
        onSecondaryClick={handleDownloadPlaybook}
      />

      <div id="contact-form">
        <ContactSection />
      </div>
    </Layout>
  );
};

export default SetUpInSpain;
