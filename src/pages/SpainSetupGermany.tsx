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
  Euro,
  Briefcase,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

const SpainSetupGermany = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & NIE Requirements" },
    { id: "tax-treaty", label: "Germany-Spain Tax Treaty" },
    { id: "why-spain", label: "Why Spain for German Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "Can I convert my German GmbH structure to operate in Spain?",
      answer: "German GmbHs can operate in Spain through a branch (Zweigniederlassung) or by establishing a Spanish subsidiary (SL). The Spanish SL is very similar to a GmbH in structure, with €3,000 minimum capital versus €25,000 for GmbH."
    },
    {
      question: "How does the Germany-Spain Tax Treaty work?",
      answer: "The bilateral tax treaty eliminates double taxation through tax credits and reduced withholding rates. Dividends face 0-15% withholding (0% for qualifying parent-subsidiary relationships under EU directives), interest 0%, and royalties 0-5%."
    },
    {
      question: "Do German citizens need special permits to work in Spain?",
      answer: "No. As EU citizens, Germans have full freedom to live and work in Spain. For stays over 3 months, you need to register for a Certificado de Registro (straightforward administrative process)."
    },
    {
      question: "What are the main cost advantages of Spain vs. Germany?",
      answer: "Spain offers approximately 30-40% lower labor costs, 20-30% lower real estate costs, and competitive corporate tax rates (25% vs. Germany's 30% effective rate including trade tax). Operating costs are significantly lower while maintaining EU-level quality."
    },
    {
      question: "Can German executives benefit from Spain's Beckham Law?",
      answer: "Yes. If you relocate to Spain and haven't been a Spanish tax resident in the past 5 years, you can opt for a flat 24% tax on Spanish-source employment income for 6 years, potentially saving significantly compared to German rates up to 45%."
    },
    {
      question: "How does social security work between Germany and Spain?",
      answer: "EU coordination rules apply. You can remain in the German system temporarily (A1 certificate for posted workers up to 24 months) or transition to Spanish social security. Contributions paid in either country count toward your pension rights in both."
    },
    {
      question: "Is there a German-Spanish Chamber of Commerce that can help?",
      answer: "Yes, the German-Spanish Chamber of Commerce (Cámara de Comercio Alemana para España) is very active with offices in Madrid and Barcelona. They provide networking and market entry support, and we work alongside them on many projects."
    },
    {
      question: "How long does the full setup process take for German companies?",
      answer: "As EU citizens with streamlined procedures, German investors can typically complete the full process in 4-6 weeks. This is faster than non-EU investors who need visa processing."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_germany_spain_global_nrro");
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
    trackEvent(`cta_${ctaType}_germany_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for German Investors"
        description="Expert guidance for German companies (GmbH, AG) establishing operations in Spain. Navigate EU regulations, Germany-Spain tax treaty, and fast-track EU citizen setup."
        keywords="German company Spain, GmbH to SL, deutsche Firma Spanien, Germany Spain tax treaty, German investor Spain, German business Spain"
        canonicalUrl="/spain-company-setup-germany"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "German Investors", url: "https://global.nrro.es/spain-company-setup-germany" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">Germany → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              German Companies Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Strategic expansion for German businesses. Leverage EU freedoms, the Germany-Spain 
              Tax Treaty, and Spain's cost advantages to grow your European footprint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request Germany-Spain Consultation
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
                  Download Setup Guide
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
                  Germany-Specific Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for German Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Building2,
                      title: "GmbH → Spanish SL",
                      description: "Spanish SL offers similar limited liability with only €3,000 minimum capital (vs. €25,000 for GmbH)."
                    },
                    {
                      icon: Euro,
                      title: "40% Cost Savings",
                      description: "Labor costs 30-40% lower than Germany. Real estate and operational expenses significantly reduced."
                    },
                    {
                      icon: Scale,
                      title: "Lower Tax Burden",
                      description: "Spain's 25% corporate tax vs. Germany's ~30% effective rate (including Gewerbesteuer)."
                    },
                    {
                      icon: Globe,
                      title: "EU Single Market",
                      description: "Full access to EU market from a more cost-effective Southern European base."
                    },
                    {
                      icon: Users,
                      title: "Skilled Workforce",
                      description: "Strong technical talent, especially in Barcelona and Madrid tech hubs."
                    },
                    {
                      icon: Shield,
                      title: "Familiar Legal Framework",
                      description: "EU-harmonized company law, accounting standards, and GDPR compliance."
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
                  EU Citizen Advantages
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Visa & NIE for German Citizens
                </h2>
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-primary">
                      🇪🇺 EU Advantage: German citizens enjoy full freedom of movement and simplified company setup.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background rounded-lg p-6 border border-border/50">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        NIE (Tax ID Number)
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Required for company formation and tax matters",
                          "Apply at Spanish consulates in Germany (Berlin, Munich, Frankfurt, etc.)",
                          "Processing time: 1-2 weeks for EU citizens",
                          "Can also be obtained directly in Spain at any police station"
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
                        Residency (if relocating)
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "No visa or work permit required",
                          "Register for Certificado de Registro if staying 3+ months",
                          "Immediate work rights—start employment from day one",
                          "Family members also benefit from EU freedom of movement"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tax Treaty Section */}
              <section id="tax-treaty">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Double Taxation Prevention
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Germany-Spain Tax Treaty Benefits
                </h2>
                <p className="text-muted-foreground mb-8">
                  The comprehensive tax treaty between Germany and Spain, combined with EU directives, 
                  provides excellent conditions for cross-border investment and profit repatriation.
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
                        <td className="py-3 px-4 text-primary font-medium">0-15%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% for 10%+ parent-subsidiary (EU directive)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Interest</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0%</td>
                        <td className="py-3 px-4 text-muted-foreground">EU Interest & Royalties Directive</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Royalties</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0-5%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% between related companies (EU)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Business Profits</td>
                        <td className="py-3 px-4 text-muted-foreground">25%</td>
                        <td className="py-3 px-4 text-primary font-medium">25%*</td>
                        <td className="py-3 px-4 text-muted-foreground">*Only taxed where PE is located</td>
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
                      Request Tax Optimization Analysis
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
                  Why German Companies Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Euro, title: "Cost Arbitrage", description: "30-40% lower operating costs while remaining in the EU" },
                    { icon: MapPin, title: "Mediterranean Hub", description: "Strategic location for Southern Europe, North Africa, and LATAM" },
                    { icon: Globe, title: "Trade Relations", description: "Strong German-Spanish trade with established business corridors" },
                    { icon: Users, title: "German Community", description: "Large German expat community and active German-Spanish Chamber" },
                    { icon: Building2, title: "Industrial Base", description: "Strong automotive, renewables, and manufacturing sectors" },
                    { icon: Briefcase, title: "Quality of Life", description: "Climate and lifestyle attractive for German talent and families" }
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
                  Timeline for German Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "NIE Application", duration: "1-2 weeks", description: "Fast EU citizen process—can be done at consulate or in Spain" },
                    { phase: "Phase 2", title: "Document Preparation", duration: "1 week", description: "Translate and apostille German documents, draft Spanish bylaws" },
                    { phase: "Phase 3", title: "Incorporation", duration: "2-3 weeks", description: "Notary appointment, Commercial Registry inscription, CIF issuance" },
                    { phase: "Phase 4", title: "Operational Setup", duration: "1 week", description: "Bank account opening, tax registrations, payroll setup if hiring" }
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
                    <strong>Total estimated timeline:</strong> 4-6 weeks from initial engagement to operational status. 
                    Significantly faster than non-EU investors due to simplified procedures.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for German Investors
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
                        onClick={() => trackEvent("faq_expand_germany_spain_global_nrro")}
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
                  Our team has extensive experience with German-Spanish cross-border matters. 
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
        currentPage="/spain-company-setup-germany"
        title="More Spain Business Resources"
      />

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupGermany;
