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
  AlertTriangle,
  Briefcase,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

const SpainSetupUK = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & NIE Requirements" },
    { id: "tax-treaty", label: "UK-Spain Tax Treaty" },
    { id: "why-spain", label: "Why Spain for UK Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "How has Brexit affected UK companies setting up in Spain?",
      answer: "Post-Brexit, UK companies are now treated as third-country (non-EU) entities. This means: UK Ltd companies can no longer freely provide services across the EU; UK nationals need work permits and visas; and the 90-day Schengen limit now applies. However, establishing a Spanish subsidiary restores full EU market access."
    },
    {
      question: "Do I need a visa to run my Spanish company from the UK?",
      answer: "For short visits (under 90 days in any 180-day period), no visa is required. However, if you need to spend extended time in Spain managing your company, you'll need a work visa or consider the Digital Nomad Visa if working remotely. Directors can be non-resident, but operational involvement may trigger tax residency."
    },
    {
      question: "What's the difference between a UK Ltd and Spanish SL?",
      answer: "Both are limited liability structures, but with key differences: minimum capital (£1 vs €3,000), director requirements (UK allows corporate directors, Spain requires individuals), annual filing requirements, and tax rates (UK 19-25% vs Spain 25%, with lower rates for small companies)."
    },
    {
      question: "Can I transfer my UK company to Spain instead of creating a new one?",
      answer: "Cross-border company migration is complex post-Brexit. It's typically more practical to establish a new Spanish SL and either wind down the UK Ltd or restructure as a UK parent with Spanish subsidiary. We can advise on the most tax-efficient approach."
    },
    {
      question: "How does the UK-Spain Tax Treaty help my business?",
      answer: "The UK-Spain Tax Treaty prevents double taxation through mechanisms like reduced withholding rates (10-15% on dividends vs 19% standard), foreign tax credits, and clear residency tie-breaker rules. It remains in force post-Brexit."
    },
    {
      question: "What happens to my UK VAT registration?",
      answer: "Post-Brexit, UK VAT registrations don't cover EU sales. Your Spanish company will need its own Spanish VAT (IVA) registration. However, you may be able to deregister from UK VAT if you no longer make UK taxable supplies."
    },
    {
      question: "Can UK nationals still work in Spain?",
      answer: "Yes, but you now need a work permit. Options include: employed worker visa, entrepreneur visa, highly qualified professional visa, or the new Digital Nomad Visa. Those who were resident before January 2021 have protected rights under the Withdrawal Agreement."
    },
    {
      question: "What are the social security implications for UK directors?",
      answer: "UK nationals working in Spain are now subject to Spanish social security. The UK-Spain Social Security Agreement (signed 2019) allows for some coordination of benefits and pension rights, but you should review your specific situation."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_uk_spain_global_nrro");
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
    trackEvent(`cta_${ctaType}_uk_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for UK Investors"
        description="Post-Brexit guidance for British companies expanding to Spain. Navigate new UK-Spain requirements, residency rules, and cross-border compliance."
        keywords="UK company Spain, British business Spain, post-Brexit Spain, UK investor Spain, UK subsidiary Spain, Brexit company Spain"
        canonicalUrl="/spain-company-setup-uk"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "UK Investors", url: "https://global.nrro.es/spain-company-setup-uk" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">UK → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              UK Companies Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Brexit-proof your EU market access. Establish a Spanish subsidiary to maintain seamless 
              operations across the European single market with full compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request UK-Spain Consultation
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
                  Download UK Investor Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brexit Alert Banner */}
      <section className="bg-amber-500/10 border-b border-amber-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm">
              <strong>Post-Brexit Reality:</strong> UK companies are now third-country entities. 
              A Spanish subsidiary restores full EU single market access and service passporting rights.
            </p>
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
                  Post-Brexit Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for UK Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Globe,
                      title: "Lost EU Passporting",
                      description: "UK companies can no longer freely provide services across the EU. A Spanish entity restores this access."
                    },
                    {
                      icon: Clock,
                      title: "90-Day Schengen Rule",
                      description: "UK nationals are now limited to 90 days in any 180-day period without a visa. Plan accordingly."
                    },
                    {
                      icon: Users,
                      title: "Work Permit Requirements",
                      description: "UK nationals now need work permits to be employed in Spain. Directors can remain non-resident."
                    },
                    {
                      icon: Building2,
                      title: "Ltd vs. SL Comparison",
                      description: "Similar liability protection, but different capital requirements (£1 vs €3,000) and governance rules."
                    },
                    {
                      icon: Scale,
                      title: "VAT/IVA Implications",
                      description: "UK VAT doesn't cover EU sales post-Brexit. Your Spanish entity needs separate IVA registration."
                    },
                    {
                      icon: Shield,
                      title: "Data Protection",
                      description: "UK-EU data transfers now require additional safeguards. A Spanish entity simplifies GDPR compliance."
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
                  Visa & NIE Requirements for UK Citizens
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
                          "Apply at Spanish consulates in UK (London, Manchester, Edinburgh)",
                          "Processing time: 2-3 weeks",
                          "Can also be obtained in Spain with appointment"
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
                          "Short visits: 90/180 days visa-free",
                          "Digital Nomad Visa: remote workers earning €2,000+/month",
                          "Entrepreneur Visa: for innovative business projects",
                          "Work Visa: if employed by Spanish company"
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
                      <strong>Withdrawal Agreement Rights:</strong> UK nationals who were legally resident in Spain before 1 January 2021 retain their right to live and work in Spain under the Withdrawal Agreement protections.
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
                  UK-Spain Tax Treaty Benefits
                </h2>
                <p className="text-muted-foreground mb-8">
                  The UK-Spain Tax Treaty (2013) remains fully in force post-Brexit, providing important 
                  protections against double taxation for cross-border business activities.
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
                        <td className="py-3 px-4 text-primary font-medium">10-15%</td>
                        <td className="py-3 px-4 text-muted-foreground">10% if 10%+ ownership</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Interest</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0%</td>
                        <td className="py-3 px-4 text-muted-foreground">Full exemption at source</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Royalties</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0%</td>
                        <td className="py-3 px-4 text-muted-foreground">Full exemption at source</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Capital Gains</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">Usually 0%</td>
                        <td className="py-3 px-4 text-muted-foreground">Taxed in residence country</td>
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
                  Why UK Companies Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Globe, title: "EU Market Restoration", description: "Regain full access to 450M consumers and service passporting rights" },
                    { icon: MapPin, title: "Same Time Zone", description: "GMT+1/GMT+2—minimal disruption to UK business hours and team coordination" },
                    { icon: Users, title: "English Proficiency", description: "Strong English language skills in business community, especially Barcelona/Madrid" },
                    { icon: Building2, title: "Established UK Links", description: "Strong bilateral trade relationship and familiar business culture" },
                    { icon: Briefcase, title: "Cost Advantages", description: "Lower operational costs than UK while maintaining EU standards" },
                    { icon: Shield, title: "Stable Legal System", description: "Civil law jurisdiction with strong property rights and contract enforcement" }
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
                  Timeline for UK Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "NIE Application", duration: "2-3 weeks", description: "Apply through Spanish consulate in London, Manchester, or Edinburgh" },
                    { phase: "Phase 2", title: "Document Preparation", duration: "1-2 weeks", description: "Apostille UK documents, prepare bylaws, arrange capital deposit" },
                    { phase: "Phase 3", title: "Incorporation", duration: "3-5 weeks", description: "Notarization, Commercial Registry filing, obtain CIF/NIF" },
                    { phase: "Phase 4", title: "Operational Setup", duration: "1-2 weeks", description: "Bank account activation, IVA registration, payroll configuration" }
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
                    <strong>Total estimated timeline:</strong> 6-9 weeks from initial engagement to operational status. 
                    UK proximity allows for faster document processing compared to other third countries.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for UK Investors
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
                        onClick={() => trackEvent("faq_expand_uk_spain_global_nrro")}
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
                  Ready to Restore Your EU Market Access?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Our team specializes in helping UK companies navigate post-Brexit complexities. 
                  Get a customized roadmap for your Spanish expansion.
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
        currentPage="/spain-setup-uk"
        title="More Spain Business Resources"
      />

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupUK;
