import { Meta } from "@/components/seo/Meta";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SpainSetupSidebar } from "@/components/spain-setup/SpainSetupSidebar";
import { InternationalServicesContactForm } from "@/components/international/InternationalServicesContactForm";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";
import { RelatedResourcesGrid } from "@/components/spain-setup/RelatedResourcesGrid";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Users, 
  Scale, 
  Globe, 
  DollarSign,
  Briefcase,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

const SpainSetupUSA = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & NIE Requirements" },
    { id: "tax-treaty", label: "US-Spain Tax Treaty" },
    { id: "why-spain", label: "Why Spain for US Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "Can I use my US LLC structure to operate in Spain?",
      answer: "US LLCs are not recognized as legal entities in Spain and can create complex tax issues due to their 'check-the-box' status. We typically recommend establishing a Spanish SL (Sociedad Limitada) as your operating entity, with your US LLC as the parent shareholder."
    },
    {
      question: "How does the US-Spain Tax Treaty prevent double taxation?",
      answer: "The 1990 US-Spain Tax Treaty provides mechanisms to avoid double taxation through foreign tax credits, reduced withholding rates on dividends (5-15%), interest (10%), and royalties (5-10%), plus provisions for determining tax residency in ambiguous situations."
    },
    {
      question: "Do I need to be physically present in Spain to incorporate?",
      answer: "No. US investors can grant power of attorney to a Spanish representative who can complete the incorporation process on their behalf. However, you will need a Spanish NIE (tax identification number), which can be obtained through Spanish consulates in the US."
    },
    {
      question: "What are the FATCA implications for my Spanish company?",
      answer: "As a US person with ownership in a foreign company, you must comply with FATCA reporting requirements, including Form 8938 (FBAR) for foreign financial accounts and potentially Form 5471 for controlled foreign corporations. Spanish banks will also report to the IRS."
    },
    {
      question: "Can I qualify for Spain's Beckham Law as a US executive?",
      answer: "Yes, if you relocate to Spain as an employee of your Spanish company and haven't been a Spanish tax resident in the previous 5 years. This allows you to pay a flat 24% income tax rate (vs. up to 47%) for 6 years."
    },
    {
      question: "What's the minimum capital requirement for a Spanish company?",
      answer: "A Spanish SL requires minimum share capital of €3,000 (fully paid at incorporation). An SA requires €60,000 (25% paid at incorporation). Most US investors choose the SL structure for its flexibility and lower requirements."
    },
    {
      question: "How long does the full setup process take for US investors?",
      answer: "With all documents prepared, incorporation takes 3-5 weeks. However, obtaining your NIE from a US-based Spanish consulate typically adds 2-4 weeks. Total timeline is usually 6-10 weeks from start to operational status."
    },
    {
      question: "Is there an E-2 visa equivalent for Spain?",
      answer: "Spain doesn't have an E-2 equivalent, but offers the Entrepreneur Visa for innovative business projects and the Golden Visa for investments of €500,000+. For regular employment in your Spanish company, a work visa/permit is required."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_usa_spain_global_nrro");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

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

  const handleCTAClick = (ctaType: string) => {
    trackEvent(`cta_${ctaType}_usa_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for US Investors"
        description="Expert guidance for American companies establishing operations in Spain. Navigate US-Spain tax treaties, LLC vs SL considerations, and visa requirements."
        keywords="US company Spain, American business Spain, US-Spain tax treaty, US investor Spain, LLC Spain, US subsidiary Spain"
        canonicalUrl="/spain-company-setup-usa"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "US Investors", url: "https://global.nrro.es/spain-company-setup-usa" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">US → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              US Companies Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Expert guidance for American businesses expanding to Spain. Navigate LLC-to-SL structuring, 
              leverage the US-Spain Tax Treaty, and establish compliant EU operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request US-Spain Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleCTAClick("hero_guide")}
                asChild
              >
                <Link to="/spain-company-setup-playbook">
                  Download US Investor Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3 space-y-20">
              
              {/* Key Considerations Section */}
              <section id="key-considerations">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  US-Specific Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for US Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Building2,
                      title: "LLC vs. Spanish SL",
                      description: "US LLCs aren't recognized in Spain. A Spanish SL provides similar liability protection with clear tax treatment."
                    },
                    {
                      icon: DollarSign,
                      title: "FATCA Compliance",
                      description: "As a US person, you'll have additional reporting obligations. Spanish banks report to the IRS under FATCA."
                    },
                    {
                      icon: Scale,
                      title: "Tax Treaty Benefits",
                      description: "The 1990 US-Spain Treaty reduces withholding taxes and prevents double taxation through foreign tax credits."
                    },
                    {
                      icon: Globe,
                      title: "EU Market Access",
                      description: "Your Spanish entity provides full access to the 450M consumer EU single market with passporting rights."
                    },
                    {
                      icon: Briefcase,
                      title: "Transfer Pricing",
                      description: "Intercompany transactions between US parent and Spanish subsidiary must follow arm's length principles."
                    },
                    {
                      icon: Shield,
                      title: "State Tax Considerations",
                      description: "Some US states may still tax income from your Spanish operations. Structure matters for overall tax efficiency."
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-border/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Visa & NIE Section */}
              <section id="visa-nie" className="bg-muted/30 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-xl">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Immigration Requirements
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Visa & NIE Requirements for US Citizens
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background rounded-lg p-6 border border-border/50">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        NIE (Tax ID Number)
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Required for all shareholders and directors",
                          "Apply at Spanish consulates in US (NYC, LA, Chicago, Miami, etc.)",
                          "Processing time: 2-4 weeks",
                          "Required documents: passport, application form, proof of economic interest"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-background rounded-lg p-6 border border-border/50">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Visa Options
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "No E-2 equivalent—Spain uses different visa categories",
                          "Entrepreneur Visa: for innovative business projects",
                          "Golden Visa: €500,000+ investment (real estate or business)",
                          "Work Visa: if employed by your Spanish company"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Beckham Law Opportunity:</strong> If you relocate to Spain as an employee of your Spanish company and haven't been a Spanish tax resident in the past 5 years, you may qualify for a flat 24% income tax rate (vs. up to 47%) for 6 years.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tax Treaty Section */}
              <section id="tax-treaty">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Double Taxation Prevention
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  US-Spain Tax Treaty Benefits
                </h2>
                <p className="text-muted-foreground mb-8">
                  The 1990 US-Spain Tax Treaty provides significant benefits for American investors, 
                  reducing withholding taxes and preventing double taxation on cross-border income.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Income Type</th>
                        <th className="text-left py-3 px-4 font-medium">Standard Rate</th>
                        <th className="text-left py-3 px-4 font-medium">Treaty Rate</th>
                        <th className="text-left py-3 px-4 font-medium">Conditions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Dividends</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">5-15%</td>
                        <td className="py-3 px-4 text-muted-foreground">5% if 10%+ ownership</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Interest</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">10%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% for certain bank interest</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Royalties</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">5-10%</td>
                        <td className="py-3 px-4 text-muted-foreground">5% for film royalties</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Capital Gains</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">Usually 0%</td>
                        <td className="py-3 px-4 text-muted-foreground">Taxed only in residence country</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-8">
                  <Button 
                    variant="outline"
                    onClick={() => handleCTAClick("treaty_analysis")}
                    asChild
                  >
                    <Link to="#contact">
                      Request Treaty Analysis for Your Situation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Why Spain Section */}
              <section id="why-spain" className="bg-muted/30 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-xl">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Strategic Advantages
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Why US Companies Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Globe, title: "EU Gateway", description: "Full access to 450M consumers and EU single market passporting rights" },
                    { icon: MapPin, title: "Time Zone Bridge", description: "6-9 hours ahead of US—overlap with both US and Asian markets" },
                    { icon: Users, title: "Skilled Workforce", description: "Highly educated talent at 30-40% lower costs than US/Northern Europe" },
                    { icon: DollarSign, title: "R&D Incentives", description: "Patent Box regime with 60% reduction on IP income" },
                    { icon: Building2, title: "Tech Hub Growth", description: "Barcelona & Madrid emerging as major European tech centers" },
                    { icon: Briefcase, title: "LATAM Connection", description: "Cultural and language bridge to Latin American markets" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline Section */}
              <section id="timeline">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Process Overview
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Timeline for US Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "NIE Application", duration: "2-4 weeks", description: "Apply through Spanish consulate in your US city" },
                    { phase: "Phase 2", title: "Document Preparation", duration: "1-2 weeks", description: "Apostille US documents, prepare bylaws, open bank account" },
                    { phase: "Phase 3", title: "Incorporation", duration: "3-5 weeks", description: "Notarization, Commercial Registry, obtain CIF/NIF" },
                    { phase: "Phase 4", title: "Operational Setup", duration: "1-2 weeks", description: "Bank account activation, tax registrations, payroll setup" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        {index < 3 && <div className="w-px h-full bg-border mt-2" />}
                      </div>
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">{item.phase}</span>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{item.duration}</span>
                        </div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Total estimated timeline:</strong> 6-10 weeks from initial engagement to operational status. 
                    Timeline can be shortened if NIE is already obtained or expedited processing is available.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for US Investors
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="border border-border/50 rounded-lg px-4"
                    >
                      <AccordionTrigger 
                        className="text-left font-medium hover:no-underline"
                        onClick={() => trackEvent("faq_expand_usa_spain_global_nrro")}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Contact Section */}
              <section id="contact" className="bg-muted/30 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-xl">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Get Started
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-4">
                  Ready to Establish Your Spanish Operations?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Our team specializes in helping US companies navigate the complexities of Spanish market entry. 
                  Get a customized roadmap for your expansion.
                </p>
                <InternationalServicesContactForm />
              </section>

            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <SpainSetupSidebar 
                tableOfContents={tableOfContents}
                activeSection={activeSection}
              />
            </aside>
          </div>
        </div>
      </div>

      <RelatedResourcesGrid 
        currentPage="/spain-setup-usa"
        title="More Spain Business Resources"
      />

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupUSA;
