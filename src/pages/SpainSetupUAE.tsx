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
  Home,
  Briefcase,
  Shield,
  Clock,
  MapPin,
  AlertCircle
} from "lucide-react";

const SpainSetupUAE = () => {
  const { trackEvent } = useAnalytics();
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents = [
    { id: "key-considerations", label: "Key Considerations" },
    { id: "visa-nie", label: "Visa & Golden Visa" },
    { id: "tax-strategy", label: "Tax Strategy" },
    { id: "why-spain", label: "Why Spain for UAE Investors" },
    { id: "timeline", label: "Process Timeline" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const faqs = [
    {
      question: "Is there a tax treaty between UAE and Spain?",
      answer: "No, there is currently no Double Taxation Agreement between UAE and Spain. However, since UAE has no corporate or personal income tax for most activities, the practical impact is limited. The key consideration is proper structuring to avoid unnecessary Spanish withholding taxes on distributions."
    },
    {
      question: "How does Spain's Golden Visa program work for UAE investors?",
      answer: "UAE nationals can obtain a Spanish Golden Visa (investor residence permit) through: real estate investment of €500,000+, business investment creating jobs or with significant socioeconomic impact, or financial assets of €1-2M. The visa provides residence rights for the investor and family, with a path to permanent residence and citizenship."
    },
    {
      question: "Do UAE documents need special legalization for Spain?",
      answer: "Yes. UAE is not a member of the Hague Apostille Convention, so UAE documents require full consular legalization (not just apostille). This involves: notarization in UAE → UAE Ministry of Foreign Affairs → Spanish Embassy legalization → sworn translation in Spain. Allow 3-4 weeks for this process."
    },
    {
      question: "Can I set up a company in Spain from a Dubai free zone?",
      answer: "Yes, a Dubai free zone company can be the shareholder of a Spanish SL. However, consider that free zone entities may face additional scrutiny regarding substance requirements. Proper documentation of the free zone company's beneficial ownership is essential for Spanish compliance."
    },
    {
      question: "What's the minimum investment for the Golden Visa?",
      answer: "The most common route is real estate investment of €500,000+ (must be unencumbered by debt). Alternative routes include: €1M in Spanish bank deposits, €1M in Spanish company shares, €2M in Spanish government bonds, or a business project deemed of 'general interest'."
    },
    {
      question: "How are dividends from my Spanish company taxed?",
      answer: "Without a tax treaty, Spain applies 19% withholding tax on dividends paid to UAE shareholders. However, if structured through an appropriate holding company in a treaty jurisdiction, this rate may be reduced. We can advise on compliant tax optimization strategies."
    },
    {
      question: "Can family members be included in the Golden Visa?",
      answer: "Yes, the Golden Visa extends to: spouse or partner, children under 18 (or adult dependents), and parents if they depend on the main applicant. All family members receive the same residence rights and can work in Spain."
    },
    {
      question: "Do I need to live in Spain to maintain my Golden Visa?",
      answer: "No. Unlike other residence permits, the Golden Visa has no minimum stay requirement. You only need to visit Spain once to activate it and then at least once per renewal period (every 2 years initially, then every 5 years)."
    }
  ];

  useEffect(() => {
    trackEvent("page_view_uae_spain_global_nrro");
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
    trackEvent(`cta_${ctaType}_uae_spain_global_nrro`);
  };

  return (
    <>
      <Meta
        title="Setting Up a Company in Spain for UAE Investors"
        description="Strategic guidance for Emirati and Dubai-based investors entering the Spanish market. Golden Visa, investment structuring, and GCC-Spain business advisory."
        keywords="UAE company Spain, Dubai business Spain, Emirati investor Spain, Golden Visa Spain UAE, GCC investment Spain, free zone company Spain"
        canonicalUrl="/spain-company-setup-uae"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Set Up in Spain", url: "https://global.nrro.es/set-up-in-spain" },
          { name: "UAE Investors", url: "https://global.nrro.es/spain-company-setup-uae" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BadgeHero className="mb-6">UAE → Spain Business Setup</BadgeHero>
            <h1 className="hero-title mb-6">
              UAE Investors Setting Up in Spain
            </h1>
            <p className="text-lead text-white/70 mb-8 max-w-2xl">
              Strategic entry into the European market for Emirati and Dubai-based investors. 
              Leverage Spain's Golden Visa, establish EU operations, and diversify your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleCTAClick("hero_consultation")}
                asChild
              >
                <Link to="#contact">
                  Request UAE-Spain Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleCTAClick("hero_golden_visa")}
                asChild
              >
                <Link to="#visa-nie">
                  Explore Golden Visa Options
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
                  GCC-Specific Factors
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Key Considerations for UAE Investors
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Scale,
                      title: "No Tax Treaty",
                      description: "Spain and UAE have no DTA. However, UAE's 0% tax means the focus is on minimizing Spanish withholding taxes."
                    },
                    {
                      icon: FileText,
                      title: "Document Legalization",
                      description: "UAE isn't in the Hague Convention—documents need full consular legalization, not just apostille."
                    },
                    {
                      icon: Home,
                      title: "Golden Visa Pathway",
                      description: "€500,000+ real estate or business investment qualifies for residence rights without minimum stay."
                    },
                    {
                      icon: Building2,
                      title: "Free Zone Considerations",
                      description: "Dubai free zone entities can invest in Spain, but substance requirements must be documented."
                    },
                    {
                      icon: Globe,
                      title: "EU Market Access",
                      description: "Spanish entity provides gateway to 450M consumers and full EU single market operations."
                    },
                    {
                      icon: Shield,
                      title: "Asset Diversification",
                      description: "Euro-denominated assets in stable EU jurisdiction provide portfolio diversification."
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

              {/* Golden Visa Section */}
              <section id="visa-nie" className="bg-muted/30 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-xl">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Investor Residence
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Spain's Golden Visa for UAE Investors
                </h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Spain's Golden Visa program offers UAE investors a straightforward path to EU residence 
                    through qualifying investments, with no minimum stay requirements.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background rounded-lg p-6 border border-border/50">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Home className="h-5 w-5 text-primary" />
                        Real Estate Route
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Investment: €500,000+ in property",
                          "Property must be unencumbered by debt",
                          "Can be residential, commercial, or land",
                          "Multiple properties can be combined",
                          "Rental income is permitted"
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
                        <Briefcase className="h-5 w-5 text-primary" />
                        Business/Financial Routes
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "€1M in Spanish company shares",
                          "€1M in Spanish bank deposits",
                          "€2M in Spanish government bonds",
                          "Business project creating jobs",
                          "Venture capital in Spanish startups"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-background rounded-lg p-6 border border-border/50">
                    <h3 className="text-lg font-medium mb-4">Golden Visa Benefits</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Residence Rights", value: "Full EU" },
                        { label: "Family Included", value: "Yes" },
                        { label: "Minimum Stay", value: "None" },
                        { label: "Path to Citizenship", value: "10 years" }
                      ].map((item, i) => (
                        <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-xl font-bold text-primary">{item.value}</p>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => handleCTAClick("golden_visa_consultation")} asChild>
                      <Link to="#contact">
                        Discuss Golden Visa Options
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Tax Strategy Section */}
              <section id="tax-strategy">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Tax Planning
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  Tax Strategy Without a Treaty
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-200">No UAE-Spain Tax Treaty</p>
                      <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mt-1">
                        Unlike many jurisdictions, there is no Double Taxation Agreement between UAE and Spain. 
                        This requires careful structuring to optimize tax efficiency.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="font-medium mb-4">Without Optimization</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Spanish Corporate Tax</span>
                          <span className="font-medium">25%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Dividend Withholding</span>
                          <span className="font-medium">19%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">UAE Tax</span>
                          <span className="font-medium">0%</span>
                        </li>
                        <li className="flex justify-between border-t pt-3">
                          <span className="text-muted-foreground">Effective Combined Rate</span>
                          <span className="font-medium text-destructive">~39%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                      <h3 className="font-medium mb-4">With Proper Structuring</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Spanish Corporate Tax</span>
                          <span className="font-medium">25%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Optimized Withholding*</span>
                          <span className="font-medium text-primary">0-5%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">UAE Tax</span>
                          <span className="font-medium">0%</span>
                        </li>
                        <li className="flex justify-between border-t pt-3">
                          <span className="text-muted-foreground">Effective Combined Rate</span>
                          <span className="font-medium text-primary">~25-28%</span>
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-4">
                        *Through compliant holding structures in treaty jurisdictions
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    onClick={() => handleCTAClick("tax_strategy")}
                    asChild
                  >
                    <Link to="#contact">
                      Request Tax Structuring Consultation
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
                  Why UAE Investors Choose Spain
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Globe, title: "EU Gateway", description: "Full access to 450M consumers and EU single market from one base" },
                    { icon: Home, title: "Golden Visa", description: "Residence rights for family with minimal stay requirements" },
                    { icon: MapPin, title: "Strategic Location", description: "Bridge between Europe, Middle East, and North Africa" },
                    { icon: Building2, title: "Asset Diversification", description: "Stable Euro-denominated investments in established EU economy" },
                    { icon: Users, title: "Lifestyle Quality", description: "World-class healthcare, education, and Mediterranean lifestyle" },
                    { icon: Shield, title: "Property Rights", description: "Strong legal protection for foreign investors and property owners" }
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
                  Timeline for UAE Investors
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Phase 1", title: "Document Legalization", duration: "3-4 weeks", description: "Full consular legalization of UAE documents (Ministry of Foreign Affairs + Spanish Embassy)" },
                    { phase: "Phase 2", title: "NIE & Bank Account", duration: "2-3 weeks", description: "Obtain tax ID and open Spanish bank account for capital deposit" },
                    { phase: "Phase 3", title: "Incorporation", duration: "3-5 weeks", description: "Notarization, Commercial Registry filing, obtain company CIF/NIF" },
                    { phase: "Phase 4", title: "Golden Visa (if applicable)", duration: "2-4 weeks", description: "Submit residence application after investment completion" }
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
                    <strong>Total estimated timeline:</strong> 8-12 weeks for company incorporation. 
                    Add 2-4 weeks for Golden Visa processing if pursuing investor residence.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                  Common Questions
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-2 mb-8">
                  FAQ for UAE Investors
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
                        onClick={() => trackEvent("faq_expand_uae_spain_global_nrro")}
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
                  Ready to Enter the European Market?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Our team has extensive experience helping GCC investors establish presence in Spain. 
                  Get a customized roadmap for your investment and business objectives.
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

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainSetupUAE;
