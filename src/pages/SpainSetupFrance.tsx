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

const SpainSetupFrance = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & NIE Requirements" },
    { id: "tax-treaty", label: "France-Spain Tax Treaty" },
    { id: "why-spain", label: "Why Spain for French Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "Can I use my French SAS or SARL structure to operate in Spain?",
      answer: "French companies (SAS, SARL, SA) can operate in Spain through a branch office (sucursal) or by establishing a Spanish subsidiary (SL or SA). The choice depends on your business objectives, liability preferences, and tax optimization strategy."
    },
    {
      question: "How does the France-Spain Tax Treaty prevent double taxation?",
      answer: "The bilateral tax treaty between France and Spain eliminates double taxation through tax credits and reduced withholding rates on dividends (0-15%), interest (0-10%), and royalties (0-5%). France residents can credit Spanish taxes against French tax liability."
    },
    {
      question: "Do French citizens need a visa to work in Spain?",
      answer: "No. As EU citizens, French nationals have the right to live and work in Spain without a visa. You only need to register with Spanish authorities if staying longer than 3 months (obtain a Certificado de Registro de Ciudadano de la Unión)."
    },
    {
      question: "What's the process for obtaining an NIE as a French citizen?",
      answer: "French citizens can obtain an NIE easily at any Spanish police station (Oficina de Extranjeros) or through the Spanish consulate in France. As EU citizens, the process is faster (1-2 weeks) and simpler than for non-EU nationals."
    },
    {
      question: "Can French executives qualify for Spain's Beckham Law?",
      answer: "Yes, if you haven't been a Spanish tax resident in the previous 5 years. The Beckham Law allows a flat 24% tax rate on Spanish-source income for 6 years, which can be beneficial compared to France's progressive rates up to 45%."
    },
    {
      question: "What are the social security implications for French employees working in Spain?",
      answer: "EU regulations allow coordination of social security. You can potentially remain in the French system temporarily (A1 certificate for posted workers) or switch to Spain's system. We advise on the optimal approach based on your situation."
    },
    {
      question: "How long does company setup take for French investors?",
      answer: "Since French citizens don't need visas and can obtain NIEs quickly, the process is typically 4-6 weeks from start to operational status—faster than for non-EU investors."
    },
    {
      question: "Is Spain a good base for accessing French-speaking African markets?",
      answer: "Absolutely. Spain offers excellent connectivity to North Africa and growing trade links with Francophone West Africa. Combined with Spain's lower operating costs and EU membership, it's an excellent regional hub."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_france_spain_global_nrro");
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
    trackEvent(`cta_${ctaType}_france_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for French Investors"
        description="Expert guidance for French companies establishing operations in Spain. Navigate EU regulations, France-Spain tax treaty, and streamlined setup for EU citizens."
        keywords="French company Spain, société française Espagne, France Spain tax treaty, French investor Spain, SAS to SL, French business Spain"
        canonicalUrl="/spain-company-setup-france"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "French Investors", url: "https://global.nrro.es/spain-company-setup-france" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">France → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              French Companies Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Seamless EU expansion for French businesses. Leverage your EU citizen advantages 
              for fast-track setup, and optimize with the France-Spain Tax Treaty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request France-Spain Consultation
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
                  France-Specific Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for French Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Building2,
                      title: "SAS/SARL to Spanish SL",
                      description: "Familiar corporate structures. Spanish SL offers similar flexibility to French SARL with €3,000 minimum capital."
                    },
                    {
                      icon: Globe,
                      title: "EU Freedom of Establishment",
                      description: "As a French company, you can freely establish a subsidiary or branch in Spain under EU law."
                    },
                    {
                      icon: Euro,
                      title: "Lower Operating Costs",
                      description: "Spain offers 20-30% lower labor costs than France while maintaining similar productivity levels."
                    },
                    {
                      icon: Scale,
                      title: "Tax Treaty Benefits",
                      description: "Reduced withholding taxes and clear rules on profit allocation between French parent and Spanish subsidiary."
                    },
                    {
                      icon: Users,
                      title: "Social Security Coordination",
                      description: "EU regulations allow flexible social security planning between France and Spain."
                    },
                    {
                      icon: Shield,
                      title: "VAT Simplification",
                      description: "Intra-EU transactions benefit from reverse charge mechanism and simplified VAT reporting."
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
                  Visa & NIE for French Citizens
                </h2>
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-primary">
                      🇪🇺 EU Advantage: French citizens enjoy simplified procedures and faster processing times.
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
                          "Required for all shareholders and directors",
                          "Apply at any Spanish police station or consulate in France",
                          "Processing time: 1-2 weeks (faster than non-EU)",
                          "Required documents: passport, EX-15 form, proof of economic reason"
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
                          "No visa required—EU freedom of movement",
                          "Register for Certificado de Registro after 3 months",
                          "Full work rights from day one",
                          "Access to Spanish public healthcare (with S1 form or local registration)"
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
                  France-Spain Tax Treaty Benefits
                </h2>
                <p className="text-muted-foreground mb-8">
                  The bilateral tax convention between France and Spain ensures efficient cross-border 
                  taxation and prevents double taxation on business profits, dividends, and other income.
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
                        <td className="py-3 px-4 text-muted-foreground">0% for 10%+ parent-subsidiary</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Interest</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0-10%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% for related companies</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Royalties</td>
                        <td className="py-3 px-4 text-muted-foreground">19%</td>
                        <td className="py-3 px-4 text-primary font-medium">0-5%</td>
                        <td className="py-3 px-4 text-muted-foreground">0% under EU Interest & Royalties Directive</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Business Profits</td>
                        <td className="py-3 px-4 text-muted-foreground">25%</td>
                        <td className="py-3 px-4 text-primary font-medium">25%*</td>
                        <td className="py-3 px-4 text-muted-foreground">*Only taxed in country of PE</td>
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
                      Request Tax Planning Analysis
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
                  Why French Companies Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Euro, title: "30% Lower Costs", description: "Significant savings on labor, real estate, and operations vs. France" },
                    { icon: MapPin, title: "Geographic Proximity", description: "Easy access—2h flight or 6h drive from Paris to Barcelona" },
                    { icon: Users, title: "Cultural Affinity", description: "Similar business culture and language accessibility for French speakers" },
                    { icon: Globe, title: "LATAM Gateway", description: "Strong ties to Spanish-speaking Latin American markets" },
                    { icon: Building2, title: "Tech Ecosystem", description: "Thriving startup scenes in Barcelona and Madrid" },
                    { icon: Briefcase, title: "Quality of Life", description: "Attractive for French talent seeking better climate and lifestyle" }
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
                  Timeline for French Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "NIE Application", duration: "1-2 weeks", description: "Fast-track EU citizen process at Spanish consulate or in Spain" },
                    { phase: "Phase 2", title: "Document Preparation", duration: "1 week", description: "Prepare bylaws, apostille French documents if needed" },
                    { phase: "Phase 3", title: "Incorporation", duration: "2-3 weeks", description: "Notarization, Commercial Registry, obtain CIF/NIF" },
                    { phase: "Phase 4", title: "Operational Setup", duration: "1 week", description: "Bank account, tax registrations, social security" }
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
                    Faster than non-EU investors thanks to simplified NIE and no visa requirements.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for French Investors
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
                        onClick={() => trackEvent("faq_expand_france_spain_global_nrro")}
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
                  Our team includes French-speaking advisors experienced in France-Spain cross-border matters. 
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
        currentPage="/spain-company-setup-france"
        title="More Spain Business Resources"
      />

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupFrance;
