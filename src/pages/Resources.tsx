import { Meta } from "@/components/seo/Meta";
import { NewsletterSignup } from "@/components/resources/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  ClipboardCheck, 
  BarChart3, 
  Calculator,
  Coins,
  FileText,
  Globe,
  Video,
  Percent,
  Shield,
  Briefcase
} from "lucide-react";

// Spain Setup Resources - Static featured items
const spainSetupResources = [
  {
    id: "playbook",
    title: "Spain Company Setup Playbook",
    description: "Complete 12-step guide with timelines, checklists, and compliance requirements for establishing your business in Spain.",
    type: "Guide",
    icon: BookOpen,
    href: "/spain-company-setup-playbook",
    badge: "Most Popular",
  },
  {
    id: "checklist",
    title: "Document Checklist Template",
    description: "40+ document checklist with NIE instructions, apostille requirements, and entity-specific guidance.",
    type: "Template",
    icon: ClipboardCheck,
    href: "/spain-document-checklist",
    badge: "Free Download",
  },
  {
    id: "quiz",
    title: "Business Setup Readiness Score",
    description: "10-question assessment to evaluate your readiness and get personalized recommendations.",
    type: "Assessment",
    icon: BarChart3,
    href: "/spain-readiness-quiz",
    badge: "Interactive",
  },
  {
    id: "calculator",
    title: "Cost & Timeline Calculator",
    description: "Estimate setup costs and timeline based on your entity type, residency, and staffing plans.",
    type: "Tool",
    icon: Calculator,
    href: "/spain-setup-calculator",
    badge: null,
  },
  {
    id: "labor-calculator",
    title: "Labor Cost Calculator",
    description: "Calculate true hiring costs including employer contributions, IRPF, and net salary estimates.",
    type: "Tool",
    icon: Coins,
    href: "/spain-labor-cost-calculator",
    badge: "New",
  },
  {
    id: "beckham-calculator",
    title: "Beckham Law Calculator",
    description: "Compare standard IRPF vs the 24% flat tax rate under Spain's special expat regime.",
    type: "Tool",
    icon: Percent,
    href: "/beckham-law-calculator",
    badge: "New",
  },
  {
    id: "residency-risk",
    title: "Tax Residency Risk Assessment",
    description: "Assess your risk of being considered a Spanish tax resident based on official criteria.",
    type: "Assessment",
    icon: Shield,
    href: "/spain-tax-residency-risk",
    badge: "New",
  },
  {
    id: "ma-gateway",
    title: "Spain M&A Gateway",
    description: "End-to-end advisory for international acquirers. Due diligence, deal structuring, and post-merger integration.",
    type: "Service",
    icon: Briefcase,
    href: "/spain-ma-gateway",
    badge: "New",
  },
];

// Coming soon resource types
const comingSoonResources = [
  {
    icon: FileText,
    title: "White Papers",
    description: "In-depth analysis on cross-border tax, transfer pricing, and compliance",
  },
  {
    icon: Globe,
    title: "Country Guides",
    description: "Market entry playbooks for key European and Latin American markets",
  },
  {
    icon: Video,
    title: "Webinars",
    description: "Expert-led sessions on international business topics",
  },
];

const Resources = () => {
  return (
    <>
      <Meta
        title="Global Business Resources | NRRO International"
        description="Expert guides, templates, and tools for establishing your business in Spain. Free resources for global business leaders planning international expansion."
        keywords="spain company setup guide, international business resources, spain incorporation checklist, business setup calculator"
        canonicalUrl="/resources"
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BadgeHero>Knowledge Hub</BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Resources for Global Business Success
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl">
              Practical tools, templates, and guides to help you navigate the complexities of establishing and operating a business in Spain.
            </p>
          </div>
        </div>
      </section>

      {/* Spain Setup Resources Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Spain Expansion
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Spain Business Setup Toolkit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to establish your business presence in Spain — from initial planning to full incorporation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {spainSetupResources.slice(0, 4).map((resource) => {
              const IconComponent = resource.icon;
              
              return (
                <Card 
                  key={resource.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {resource.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {resource.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {resource.type}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to={resource.href}>
                        {resource.type === "Assessment" ? "Start Assessment" : "Access Resource"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spainSetupResources.slice(4).map((resource) => {
              const IconComponent = resource.icon;
              
              return (
                <Card 
                  key={resource.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {resource.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {resource.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {resource.type}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to={resource.href}>
                        {resource.type === "Assessment" ? "Start Assessment" : "Access Resource"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              More Resources in Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're expanding our resource library. Subscribe to be notified when new guides and tools become available.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {comingSoonResources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div 
                  key={resource.title}
                  className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl border border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted shrink-0">
                    <IconComponent className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Newsletter Signup */}
          <NewsletterSignup sourcePage="/resources" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Need Custom Guidance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our experts can provide tailored solutions for your specific international business challenges. Schedule a consultation to discuss your needs.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
