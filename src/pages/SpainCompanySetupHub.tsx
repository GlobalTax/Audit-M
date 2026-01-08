import { Link } from "react-router-dom";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";
import { 
  Scale, 
  FileText, 
  CreditCard, 
  BadgeCheck, 
  Rocket, 
  Zap,
  ArrowRight,
  Calculator,
  BookOpen,
  ClipboardCheck,
  MessageSquareQuote,
  Building2,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Spain Company Setup", url: "https://global.nrro.es/spain-company-setup" }
];

const clusterPages = [
  {
    title: "Choosing the Right Legal Structure",
    description: "SL, SA, branch, or subsidiary? Understand the pros, cons, and tax implications of each option.",
    href: "/legal-structures-spain",
    icon: Scale,
    badge: "Essential"
  },
  {
    title: "Step-by-Step Company Formation",
    description: "Complete walkthrough of the incorporation process, from name reservation to Commercial Registry.",
    href: "/set-up-company-spain",
    icon: FileText,
    badge: null
  },
  {
    title: "Opening a Corporate Bank Account",
    description: "How to open a business bank account in Spain, required documents, and recommended banks.",
    href: "/spain-business-bank-account",
    icon: CreditCard,
    badge: null
  },
  {
    title: "NIE for Foreign Founders",
    description: "Everything you need to know about obtaining your Spanish tax ID number as a non-resident.",
    href: "/nie-spain-foreigners",
    icon: BadgeCheck,
    badge: null
  },
  {
    title: "Tech Startup Setup",
    description: "Specialized guidance for technology companies including Startup Law benefits and investor structures.",
    href: "/startup-company-setup-spain",
    icon: Rocket,
    badge: "Tech"
  },
  {
    title: "Express Company Registration",
    description: "24-48 hour fast-track incorporation for standard Sociedad Limitada formations.",
    href: "/fast-company-registration-spain",
    icon: Zap,
    badge: "Fast Track"
  }
];

const geographicPages = [
  {
    title: "For US Companies",
    description: "Specific considerations for American businesses entering Spain.",
    href: "/spain-company-setup-usa",
    flag: "🇺🇸"
  },
  {
    title: "For UK Companies",
    description: "Post-Brexit guidance for British businesses expanding to Spain.",
    href: "/spain-company-setup-uk",
    flag: "🇬🇧"
  },
  {
    title: "For UAE Companies",
    description: "MENA region expansion into the European market via Spain.",
    href: "/spain-company-setup-uae",
    flag: "🇦🇪"
  }
];

const relatedTools = [
  {
    title: "Setup Calculator",
    description: "Estimate costs and timeline",
    href: "/spain-setup-calculator",
    icon: Calculator
  },
  {
    title: "Company Setup Playbook",
    description: "Step-by-step guide PDF",
    href: "/spain-company-setup-playbook",
    icon: BookOpen
  },
  {
    title: "Document Checklist",
    description: "Required documents list",
    href: "/spain-document-checklist",
    icon: ClipboardCheck
  },
  {
    title: "Readiness Quiz",
    description: "Assess your preparedness",
    href: "/spain-readiness-quiz",
    icon: MessageSquareQuote
  }
];

const SpainCompanySetupHub = () => {
  return (
    <>
      <Meta
        title="Spain Company Setup Hub | Complete Business Formation Guide | NRRO"
        description="Your complete resource center for establishing a company in Spain. Legal structures, bank accounts, NIE, and step-by-step guides for international founders."
        canonicalUrl="https://global.nrro.es/spain-company-setup"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero>Complete Guide</BadgeHero>
            <h1 className="hero-title mt-6 mb-6">
              Spain Company Setup Hub
            </h1>
            <p className="text-lead text-white/80 max-w-2xl mx-auto mb-10">
              Everything you need to establish your business in Spain. From choosing the right legal structure to opening your bank account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/set-up-in-spain">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Page Featured */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/set-up-in-spain" className="block group">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="font-mono font-light text-xs tracking-wide uppercase text-primary mb-4">
                      Pillar Page
                    </span>
                    <CardTitle className="text-2xl md:text-3xl font-normal mb-4 group-hover:text-primary transition-colors">
                      How to Set Up a Company in Spain
                    </CardTitle>
                    <CardDescription className="text-base mb-6">
                      The definitive guide covering everything from legal requirements and timelines to costs and compliance. Your starting point for Spanish market entry.
                    </CardDescription>
                    <div className="flex items-center text-primary font-medium">
                      Read the Complete Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="bg-muted/50 p-8 md:p-12 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-primary">10</div>
                        <div className="text-sm text-muted-foreground">Step Process</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">4-8</div>
                        <div className="text-sm text-muted-foreground">Weeks Average</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">€3K</div>
                        <div className="text-sm text-muted-foreground">Min Capital (SL)</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">500+</div>
                        <div className="text-sm text-muted-foreground">Companies Helped</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Setup Process Pages Grid */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Setup Process
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Detailed Guides for Every Step
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusterPages.map((page, index) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={page.href} className="block h-full group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <page.icon className="h-6 w-6" />
                        </div>
                        {page.badge && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {page.badge}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors mt-4">
                        {page.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {page.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-sm text-primary font-medium">
                        Learn More
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Pages */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Country-Specific Guides
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Expanding from Your Country?
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Tailored guidance for businesses from key markets entering Spain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {geographicPages.map((page, index) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={page.href} className="block group">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardHeader>
                      <div className="text-5xl mb-4">{page.flag}</div>
                      <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                        {page.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {page.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Free Resources
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Tools & Resources
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {relatedTools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={tool.href} className="block group">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30 h-full">
                    <CardContent className="pt-6">
                      <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-6 text-white/60" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6">
              Ready to Establish Your Business in Spain?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our international advisory team has helped 500+ companies successfully enter the Spanish market. Let's discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/spain-setup-calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Cost Estimate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Sticky CTA */}
      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainCompanySetupHub;
