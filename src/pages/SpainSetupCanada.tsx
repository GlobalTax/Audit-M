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

const SpainSetupCanada = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & NIE Requirements" },
    { id: "tax-treaty", label: "Canada-Spain Tax Treaty" },
    { id: "why-spain", label: "Why Spain for Canadian Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "Can a Canadian corporation establish a subsidiary in Spain?",
      answer: "Yes. Canadian corporations commonly establish Spanish subsidiaries (typically an SL with €3,000 minimum capital). The Canadian parent holds shares in the Spanish entity, providing limited liability protection and clear corporate separation."
    },
    {
      question: "How does the Canada-Spain Tax Treaty work?",
      answer: "The bilateral tax treaty reduces withholding taxes on dividends (5-15%), interest (0-15%), and royalties (0-10%), and provides mechanisms to claim foreign tax credits to avoid double taxation on business profits."
    },
    {
      question: "What visa options do Canadians have for working in Spain?",
      answer: "Canadians need a work visa/permit to work in Spain. Options include: highly qualified professional visa (faster processing), entrepreneur visa for innovative projects, or Golden Visa with €500,000+ investment. Standard work permit through local hiring is also possible."
    },
    {
      question: "Do I need to be in Spain to incorporate a company?",
      answer: "No. Canadians can grant power of attorney to a Spanish representative who completes the process on their behalf. You will need an NIE (obtained at Spanish consulates in Canada), but physical presence isn't required for incorporation."
    },
    {
      question: "Does CETA (Canada-EU Trade Agreement) benefit my Spanish subsidiary?",
      answer: "Yes. CETA provides preferential market access, reduced tariffs, and mutual recognition of professional qualifications. Your Spanish subsidiary can leverage CETA for both EU market access and improved trade terms with Canada."
    },
    {
      question: "Can Canadian executives qualify for Spain's Beckham Law?",
      answer: "Yes, if you relocate to Spain as an employee and haven't been a Spanish tax resident in the past 5 years. This provides a flat 24% tax rate (vs. up to 47%) for 6 years—potentially significant savings compared to Canadian rates."
    },
    {
      question: "What are the CRA reporting requirements for my Spanish company?",
      answer: "As a Canadian with foreign affiliate(s), you may need to file T1134 (Foreign Affiliate Information Return) and potentially T1135 (Foreign Property Report). Your Spanish profits may be subject to Canadian foreign accrual property income (FAPI) rules."
    },
    {
      question: "How long does the full process take for Canadian investors?",
      answer: "The NIE can take 2-4 weeks via Spanish consulates in Canada (Toronto, Vancouver, Montreal). Total incorporation timeline is typically 8-12 weeks, depending on document preparation and appointment availability."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_canada_spain_global_nrro");
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
    trackEvent(`cta_${ctaType}_canada_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for Canadian Investors"
        description="Expert guidance for Canadian companies establishing operations in Spain. Navigate CETA benefits, Canada-Spain tax treaty, and visa requirements for Canadians."
        keywords="Canadian company Spain, CETA Spain, Canada Spain tax treaty, Canadian investor Spain, Canadian business Spain, Canadian subsidiary Spain"
        canonicalUrl="/spain-company-setup-canada"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "Canadian Investors", url: "https://global.nrro.es/spain-company-setup-canada" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">Canada → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              Canadian Companies Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Your gateway to the European market. Leverage CETA benefits, the Canada-Spain Tax Treaty, 
              and Spain's strategic position for transatlantic expansion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request Canada-Spain Consultation
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
                  Download Canada Investor Guide
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
                  Canada-Specific Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for Canadian Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Globe,
                      title: "CETA Advantages",
                      description: "Canada-EU trade agreement provides tariff reductions, investment protection, and market access benefits."
                    },
                    {
                      icon: Building2,
                      title: "Corporate Structure",
                      description: "Spanish SL is comparable to Canadian private corporation. €3,000 minimum capital vs. no minimum in Canada."
                    },
                    {
                      icon: DollarSign,
                      title: "CRA Reporting",
                      description: "Foreign affiliate rules (T1134, T1135) and FAPI considerations for your Spanish entity."
                    },
                    {
                      icon: Scale,
                      title: "Tax Treaty Benefits",
                      description: "Reduced withholding rates and foreign tax credits prevent double taxation."
                    },
                    {
                      icon: MapPin,
                      title: "Strategic Location",
                      description: "Spain offers ideal time zone overlap with both Canada (6-9h ahead) and European markets."
                    },
                    {
                      icon: Shield,
                      title: "Bilateral Relations",
                      description: "Strong Canada-Spain diplomatic and trade ties with growing bilateral investment."
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
                  Visa & NIE Requirements for Canadians
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
                          "Apply at Spanish consulates (Toronto, Vancouver, Montreal, Ottawa)",
                          "Processing time: 2-4 weeks",
                          "Required: passport, EX-15 form, proof of economic interest"
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
                          "Highly Qualified Professional Visa: for executives and specialists",
                          "Entrepreneur Visa: for innovative business projects",
                          "Golden Visa: €500,000+ investment in real estate or business",
                          "Intra-Company Transfer: for Canadian company employees"
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
                      <strong>Beckham Law Opportunity:</strong> If you relocate to Spain as an employee of your Spanish company and haven't been a Spanish tax resident in the past 5 years, you may qualify for a flat 24% income tax rate for 6 years.
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
                  Canada-Spain Tax Treaty Benefits
                </h2>
                <p className="text-muted-foreground mb-8">
                  The comprehensive tax treaty between Canada and Spain ensures efficient cross-border 
                  taxation with reduced withholding rates and clear profit allocation rules.
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
                        <td className="py-3 px-4 text-muted-foreground">5% if 10%+ voting power</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Interest</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0-15%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% for certain bank loans</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Royalties</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0-10%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% for copyright royalties</td>
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
                  Why Canadian Companies Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Globe, title: "EU Market Access", description: "Full access to 450M consumers via CETA and EU single market" },
                    { icon: MapPin, title: "Time Zone Bridge", description: "6-9 hours ahead—overlap with both Canada and European markets" },
                    { icon: Users, title: "Talent Pool", description: "Skilled, multilingual workforce at competitive costs" },
                    { icon: DollarSign, title: "Cost Advantages", description: "Lower operating costs than Northern Europe or Canada" },
                    { icon: Building2, title: "Growing Sectors", description: "Renewables, tech, life sciences, and tourism opportunities" },
                    { icon: Briefcase, title: "LATAM Gateway", description: "Historic ties and common language with Latin America" }
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
                  Timeline for Canadian Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "NIE Application", duration: "2-4 weeks", description: "Apply at Spanish consulate in Canada (Toronto, Vancouver, Montreal)" },
                    { phase: "Phase 2", title: "Document Preparation", duration: "1-2 weeks", description: "Apostille Canadian documents, prepare bylaws, open preliminary account" },
                    { phase: "Phase 3", title: "Incorporation", duration: "3-5 weeks", description: "Notarization, Commercial Registry inscription, obtain CIF/NIF" },
                    { phase: "Phase 4", title: "Operational Setup", duration: "1-2 weeks", description: "Bank account activation, tax registrations, payroll if hiring" }
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
                    <strong>Total estimated timeline:</strong> 8-12 weeks from initial engagement to operational status. 
                    Timeline can be accelerated if NIE is obtained in advance or using power of attorney.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for Canadian Investors
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
                        onClick={() => trackEvent("faq_expand_canada_spain_global_nrro")}
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
                  Our team has experience helping Canadian companies navigate the complexities of Spanish 
                  market entry. Get a customized roadmap for your expansion.
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
        currentPage="/spain-company-setup-canada"
        title="More Spain Business Resources"
      />

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupCanada;
