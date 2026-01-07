import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  Search, 
  FileSearch, 
  Handshake, 
  FileSignature, 
  Building2,
  Globe,
  TrendingUp,
  Users,
  Shield,
  Scale,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Phone,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { InternationalServicesContactForm } from "@/components/international/InternationalServicesContactForm";

const SpainMAGateway = () => {
  const faqItems = [
    {
      question: "What due diligence is required for Spanish acquisitions?",
      answer: "Comprehensive due diligence typically covers legal (corporate, contracts, litigation), tax (compliance, assessments, transfer pricing), labour (employment contracts, collective agreements, social security), commercial (customers, suppliers, IP), and regulatory aspects. The scope depends on deal size and sector."
    },
    {
      question: "How long does a typical acquisition take in Spain?",
      answer: "A standard M&A transaction takes 3-6 months from LOI to closing. Complex deals with regulatory approvals or multiple jurisdictions can take 9-12 months. We structure timelines to meet your strategic objectives while ensuring thorough due diligence."
    },
    {
      question: "What are the tax implications of acquiring a Spanish company?",
      answer: "Key considerations include transfer tax on shares (generally exempt for share deals), potential VAT implications for asset deals, stamp duty, and post-acquisition restructuring opportunities. Proper structuring can significantly optimize your tax position."
    },
    {
      question: "Can I acquire a company remotely?",
      answer: "Yes, with proper powers of attorney, most of the process can be managed remotely. However, we recommend at least one site visit for management meetings and final negotiations. Our team can represent you throughout the process."
    },
    {
      question: "What about employee rights during acquisition?",
      answer: "Spanish law provides strong employee protections during business transfers. Employees generally transfer automatically with their existing rights preserved. Understanding collective agreements and works council requirements is essential for smooth integration."
    },
    {
      question: "How do you identify suitable acquisition targets?",
      answer: "We leverage our 30+ year network across Spanish industries, work with business brokers, and conduct proactive searches based on your criteria. Many of our deals come from off-market opportunities through our established relationships."
    }
  ];

  const processPhases = [
    {
      phase: 1,
      title: "Target Identification",
      description: "Market mapping, criteria definition, and proprietary deal sourcing through our network",
      icon: Target,
      duration: "2-4 weeks"
    },
    {
      phase: 2,
      title: "Preliminary Assessment",
      description: "Initial valuation, financial review, and strategic fit analysis before LOI",
      icon: Search,
      duration: "2-3 weeks"
    },
    {
      phase: 3,
      title: "Due Diligence",
      description: "Comprehensive legal, tax, labour, and commercial review with risk assessment",
      icon: FileSearch,
      duration: "4-8 weeks"
    },
    {
      phase: 4,
      title: "Deal Structuring",
      description: "Transaction structure optimization, financing arrangements, and term negotiation",
      icon: Handshake,
      duration: "2-4 weeks"
    },
    {
      phase: 5,
      title: "Signing & Closing",
      description: "SPA execution, regulatory filings, and completion formalities",
      icon: FileSignature,
      duration: "2-4 weeks"
    },
    {
      phase: 6,
      title: "Post-Merger Integration",
      description: "Day-one readiness, governance setup, and operational transition support",
      icon: Building2,
      duration: "Ongoing"
    }
  ];

  const includedServices = [
    { title: "Legal Due Diligence", description: "Corporate, contracts, litigation, IP review" },
    { title: "Tax Due Diligence", description: "Compliance, structuring, and optimization" },
    { title: "Labour Review", description: "Employment, collective agreements, social security" },
    { title: "Commercial Assessment", description: "Customer, supplier, and market analysis" },
    { title: "Regulatory Check", description: "Permits, licenses, and compliance status" },
    { title: "Valuation Support", description: "Independent valuation and fairness opinions" },
    { title: "SPA Negotiation", description: "Contract drafting and deal term negotiation" },
    { title: "Integration Planning", description: "Post-close governance and operational transition" }
  ];

  const whySpain = [
    {
      icon: Globe,
      title: "Gateway to EU & LatAm",
      description: "Strategic location with cultural and business ties to 500M+ Spanish speakers globally"
    },
    {
      icon: TrendingUp,
      title: "Attractive Valuations",
      description: "Competitive multiples compared to Northern Europe with strong growth potential"
    },
    {
      icon: Users,
      title: "Succession Opportunities",
      description: "Large SME ecosystem with aging ownership seeking strategic buyers"
    },
    {
      icon: Shield,
      title: "Favorable Structuring",
      description: "Holding company regimes and tax treaties for efficient cross-border ownership"
    }
  ];

  const idealAcquirers = [
    "Private equity funds seeking Spanish platform or add-on investments",
    "Strategic corporates entering or expanding in the Spanish market",
    "Family offices acquiring operating businesses in Iberia",
    "International groups consolidating their Spanish operations",
    "Infrastructure and real estate investors targeting Spanish assets"
  ];

  return (
    <>
      <Meta
        title="Acquire a Business in Spain | M&A Advisory for International Buyers | NRRO"
        description="End-to-end M&A advisory for international acquirers in Spain. Due diligence, deal structuring, and post-merger integration from 30+ years of experience."
        keywords="acquire business spain, spain m&a advisory, buy company spain, spanish acquisition, spain due diligence, spain private equity"
        canonicalUrl="https://global.nrro.es/spain-ma-gateway"
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "International Services", url: "https://global.nrro.es/international-services" },
          { name: "Acquire a Business in Spain", url: "https://global.nrro.es/spain-ma-gateway" }
        ]}
      />
      
      <FAQSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BadgeHero>
              <Briefcase className="w-3 h-3 mr-1" />
              M&A Gateway
            </BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Acquire a Business in Spain{" "}
              <span className="text-primary">With Confidence</span>
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl mb-8">
              End-to-end M&A advisory for international acquirers. From target identification 
              to post-merger integration, we guide your Spanish acquisition with 30+ years 
              of cross-border transaction experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="#contact-form">
                  Discuss Your Acquisition
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/services/private-equity-venture-capital">
                  Explore PE/VC Services
                </Link>
              </Button>
            </div>
            
            {/* Trust Points */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/10 mt-8">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Award className="w-4 h-4 text-primary" />
                <span>30+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Building2 className="w-4 h-4 text-primary" />
                <span>€500M+ Deal Volume</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Globe className="w-4 h-4 text-primary" />
                <span>50+ Countries Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Acquire in Spain */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Market Opportunity
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Why Acquire in Spain?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Spain offers unique opportunities for international acquirers seeking 
              European expansion with attractive risk-adjusted returns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySpain.map((item, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our M&A Process */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              End-to-End M&A Advisory
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven six-phase approach that maximizes value while minimizing risk 
              throughout your Spanish acquisition journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processPhases.map((phase) => (
              <Card key={phase.phase} className="border-border/50 hover:border-primary/30 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <phase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Phase {phase.phase} • {phase.duration}
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Full Service
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Comprehensive M&A Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every aspect of your acquisition covered by specialists with 
              deep Spanish market expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {includedServices.map((service, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/50"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {service.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {service.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Placeholder */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Proven M&A Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team has advised on transactions across multiple sectors, 
              helping international acquirers successfully enter the Spanish market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">€500M+</div>
                <div className="text-sm text-muted-foreground">Transaction Volume</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Completed Deals</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Industry Sectors</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/case-studies">
                View Case Studies
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ideal Acquirer Profile */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
                Who We Serve
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
                Ideal Acquirer Profile
              </h2>
              <p className="text-lg text-muted-foreground">
                We work with sophisticated international buyers seeking strategic 
                acquisitions in the Spanish market.
              </p>
            </div>
            
            <div className="space-y-3">
              {idealAcquirers.map((acquirer, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/50"
                >
                  <Scale className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{acquirer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground">
                Common Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
                Start Your Spain Acquisition
              </h2>
              <p className="text-lg text-muted-foreground">
                Share your acquisition objectives and our M&A team will contact you 
                within 24 hours to discuss your opportunity.
              </p>
            </div>
            
            <Card className="border-border">
              <CardContent className="p-6 lg:p-8">
                <InternationalServicesContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Prefer to Speak Directly?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our M&A partners are available to discuss your acquisition strategy 
              and how we can support your Spanish market entry.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="font-semibold"
              asChild
            >
              <Link to="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Schedule a Call
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpainMAGateway;
