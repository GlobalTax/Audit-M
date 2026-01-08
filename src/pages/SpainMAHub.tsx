import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
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
  CheckCircle,
  ArrowRight,
  Award,
  Factory,
  Cpu,
  HeartPulse,
  ShoppingBag,
  Home,
  Utensils,
  Leaf,
  Wrench
} from "lucide-react";
import { Link } from "react-router-dom";
import { InternationalServicesContactForm } from "@/components/international/InternationalServicesContactForm";

const SpainMAHub = () => {
  const processPhases = [
    { phase: 1, title: "Target Identification", duration: "2-4 weeks", icon: Target },
    { phase: 2, title: "Preliminary Assessment", duration: "2-3 weeks", icon: Search },
    { phase: 3, title: "Due Diligence", duration: "4-8 weeks", icon: FileSearch },
    { phase: 4, title: "Deal Structuring", duration: "2-4 weeks", icon: Handshake },
    { phase: 5, title: "Signing & Closing", duration: "2-4 weeks", icon: FileSignature },
    { phase: 6, title: "Post-Merger Integration", duration: "Ongoing", icon: Building2 },
  ];

  const maServices = [
    { 
      title: "Buy-Side Advisory", 
      description: "End-to-end support for international acquirers",
      href: "/spain-ma-gateway"
    },
    { 
      title: "Sell-Side Advisory", 
      description: "Preparing and executing company sales",
      href: "/services/private-equity-venture-capital"
    },
    { 
      title: "Due Diligence", 
      description: "Legal, tax, labour, and commercial review",
      href: "/spain-ma-gateway#contact-form"
    },
    { 
      title: "Transaction Tax", 
      description: "Tax structuring and optimization",
      href: "/services/tax-advisory"
    },
    { 
      title: "Post-Merger Integration", 
      description: "Day-one readiness and operational transition",
      href: "/spain-ma-gateway#contact-form"
    },
    { 
      title: "PE/VC Services", 
      description: "Specialized support for fund transactions",
      href: "/services/private-equity-venture-capital"
    },
  ];

  const targetSectors = [
    { name: "Manufacturing & Industrial", icon: Factory },
    { name: "Technology & Software", icon: Cpu },
    { name: "Healthcare & Life Sciences", icon: HeartPulse },
    { name: "Retail & Consumer", icon: ShoppingBag },
    { name: "Real Estate & Infrastructure", icon: Home },
    { name: "Professional Services", icon: Briefcase },
    { name: "Food & Beverage", icon: Utensils },
    { name: "Energy & Renewables", icon: Leaf },
  ];

  const acquirerProfiles = [
    "Private equity funds seeking Spanish platforms",
    "Strategic corporates entering the Spanish market",
    "Family offices acquiring operating businesses",
    "International groups consolidating Spanish operations",
    "Infrastructure and real estate investors",
  ];

  const resources = [
    { title: "M&A Due Diligence Checklist", status: "Coming Soon" },
    { title: "Spain M&A Market Report", status: "Coming Soon" },
    { title: "Valuation Guide", status: "Coming Soon" },
    { title: "Post-Merger Integration Playbook", status: "Coming Soon" },
  ];

  return (
    <>
      <Meta
        title="Spain M&A Hub | Acquire a Business in Spain | NRRO"
        description="Complete M&A resource center for international acquirers. Due diligence, deal structuring, post-merger integration, and sector expertise for Spanish acquisitions."
        keywords="spain m&a, acquire business spain, spain acquisition, spain due diligence, spanish m&a advisory, buy company spain"
        canonicalUrl="https://global.nrro.es/spain-ma-hub"
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Spain M&A Hub", url: "https://global.nrro.es/spain-ma-hub" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BadgeHero>
              <Briefcase className="w-3 h-3 mr-1" />
              M&A Advisory
            </BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Spain M&A Hub
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl mb-8">
              Your complete resource center for acquiring businesses in Spain. 
              Due diligence, deal structuring, and post-merger integration—guided 
              by 30+ years of cross-border transaction experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/spain-ma-gateway">
                  Start Your Acquisition
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="#contact-form">
                  Talk to M&A Expert
                </a>
              </Button>
            </div>
            
            {/* Trust Stats */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/10 mt-8">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Building2 className="w-4 h-4 text-primary" />
                <span>€500M+ Deal Volume</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Award className="w-4 h-4 text-primary" />
                <span>50+ Transactions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Globe className="w-4 h-4 text-primary" />
                <span>12 Sectors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Page Featured Card */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-primary mb-2 block">
                    Pillar Page
                  </span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
                    Acquire a Business in Spain
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The definitive guide to buying a company in Spain. End-to-end M&A 
                    advisory from target identification to post-merger integration.
                  </p>
                  <Button asChild>
                    <Link to="/spain-ma-gateway">
                      Read Full Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="flex justify-center md:justify-end gap-4">
                  <div className="text-center p-4 bg-background rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-primary">6</div>
                    <div className="text-xs text-muted-foreground">Phase Process</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-primary">3-6</div>
                    <div className="text-xs text-muted-foreground">Months Average</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-xs text-muted-foreground">Deals Closed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* M&A Services Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              M&A Advisory Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support across the entire transaction lifecycle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maServices.map((service, index) => (
              <Link key={index} to={service.href}>
                <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* M&A Process Overview */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              6-Phase M&A Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that maximizes value while minimizing risk.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processPhases.map((phase) => (
              <div 
                key={phase.phase}
                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <phase.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Phase {phase.phase} • {phase.duration}
                  </div>
                  <div className="font-medium text-foreground">
                    {phase.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/spain-ma-gateway">
                See Full Process Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Industry Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Target Sectors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across key Spanish industries with active M&A markets.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {targetSectors.map((sector, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <sector.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acquirer Profile */}
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
              {acquirerProfiles.map((profile, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/50"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Stats */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Proven M&A Experience
            </h2>
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

      {/* Resources Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              M&A Tools & Guides
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {resources.map((resource, index) => (
              <div 
                key={index}
                className="p-4 bg-background rounded-lg border border-border/50 text-center"
              >
                <Wrench className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <div className="font-medium text-foreground text-sm mb-1">
                  {resource.title}
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {resource.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
                Discuss Your Acquisition
              </h2>
              <p className="text-lg text-muted-foreground">
                Share your acquisition objectives and our M&A team will respond within 24 hours.
              </p>
            </div>
            
            <InternationalServicesContactForm />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Ready to Acquire in Spain?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Our M&A advisory team has completed 50+ transactions totaling €500M+. 
            Let's discuss your acquisition strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#contact-form">
                Schedule M&A Consultation
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/spain-ma-gateway">
                Read Acquisition Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpainMAHub;
