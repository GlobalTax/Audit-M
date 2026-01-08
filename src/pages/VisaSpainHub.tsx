import { Link } from "react-router-dom";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight,
  Globe,
  Coins,
  Laptop,
  Briefcase,
  Rocket,
  GraduationCap,
  BadgeCheck,
  Shield,
  Calculator,
  FileText,
  Building2,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Visa & Immigration Hub", url: "https://global.nrro.es/visa-spain-hub" }
];

const visaTypes = [
  {
    title: "Golden Visa",
    description: "Investor residence permit for real estate purchases of €500K+ or significant capital investments.",
    icon: Coins,
    investment: "€500,000+",
    duration: "2 years (renewable)",
    benefits: ["EU travel access", "Family included", "No minimum stay", "Path to citizenship"],
    href: "/contact?visa=golden"
  },
  {
    title: "Digital Nomad Visa",
    description: "For remote workers employed by foreign companies or self-employed with international clients.",
    icon: Laptop,
    investment: "Income proof required",
    duration: "1 year (renewable to 3)",
    benefits: ["Work remotely", "Beckham Law eligible", "Family included", "EU residence"],
    href: "/contact?visa=digital-nomad"
  },
  {
    title: "Work Visa",
    description: "Standard employment visa for workers hired by Spanish-registered companies.",
    icon: Briefcase,
    investment: "Job contract required",
    duration: "1-2 years (renewable)",
    benefits: ["Full work rights", "Social security", "Family reunification", "Path to residency"],
    href: "/contact?visa=work"
  },
  {
    title: "Entrepreneur Visa",
    description: "For founders establishing innovative or economically significant businesses in Spain.",
    icon: Rocket,
    investment: "Business plan required",
    duration: "1 year (renewable)",
    benefits: ["Start a business", "Hire employees", "Startup Law benefits", "Family included"],
    href: "/contact?visa=entrepreneur"
  },
  {
    title: "Highly Qualified Professional",
    description: "Fast-track permit for senior executives, scientists, and highly skilled professionals.",
    icon: GraduationCap,
    investment: "€50K+ salary typically",
    duration: "2 years (renewable)",
    benefits: ["Fast processing", "Intra-company transfers", "EU Blue Card path", "Family included"],
    href: "/contact?visa=hqp"
  }
];

const countrySpecific = [
  {
    title: "For US Citizens",
    description: "Visa requirements, tax treaties, and considerations for Americans relocating to Spain.",
    href: "/spain-company-setup-usa",
    flag: "🇺🇸"
  },
  {
    title: "For UK Citizens",
    description: "Post-Brexit visa requirements and pathways for British nationals.",
    href: "/spain-company-setup-uk",
    flag: "🇬🇧"
  },
  {
    title: "For UAE Residents",
    description: "Pathways from the MENA region to Spanish and European residency.",
    href: "/spain-company-setup-uae",
    flag: "🇦🇪"
  }
];

const relatedTools = [
  {
    title: "NIE Application Guide",
    description: "Everything about the Spanish tax ID number",
    href: "/nie-spain-foreigners",
    icon: BadgeCheck
  },
  {
    title: "Tax Residency Assessment",
    description: "Evaluate your tax residency risk",
    href: "/spain-tax-residency-risk",
    icon: Shield
  },
  {
    title: "Beckham Law Calculator",
    description: "Calculate expat tax savings",
    href: "/beckham-law-calculator",
    icon: Calculator
  },
  {
    title: "Company Setup Guide",
    description: "Establish your Spanish entity",
    href: "/spain-company-setup",
    icon: Building2
  }
];

const immigrationStats = [
  { stat: "50K+", label: "Golden Visas Issued", description: "Since program launch" },
  { stat: "72h", label: "Digital Nomad Processing", description: "Average approval time" },
  { stat: "5 years", label: "Path to Citizenship", description: "For most visa holders" },
  { stat: "27", label: "EU Countries Access", description: "Schengen travel freedom" }
];

const VisaSpainHub = () => {
  return (
    <>
      <Meta
        title="Spain Visa & Immigration Hub | Work, Invest & Live in Spain | NRRO"
        description="Complete guide to Spanish visas and immigration. Golden Visa, Digital Nomad, Work Permits, and Entrepreneur Visas. Expert guidance for relocating to Spain."
        canonicalUrl="https://global.nrro.es/visa-spain-hub"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero>Immigration & Visas</BadgeHero>
            <h1 className="hero-title mt-6 mb-6">
              Spain Visa & Immigration Hub
            </h1>
            <p className="text-lead text-white/80 max-w-2xl mx-auto mb-10">
              Your gateway to living and working in Spain. Explore visa options, understand requirements, and navigate the immigration process with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/contact?service=immigration">
                  Start Your Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/nie-spain-foreigners">Get Your NIE First</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {immigrationStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.stat}</div>
                <div className="font-medium mt-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Visa Options
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Choose Your Path to Spain
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Multiple visa categories for investors, workers, entrepreneurs, and digital professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaTypes.map((visa, index) => (
              <motion.div
                key={visa.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <visa.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-medium mt-4">
                      {visa.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {visa.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground block">Investment</span>
                        <span className="font-medium">{visa.investment}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Duration</span>
                        <span className="font-medium">{visa.duration}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {visa.benefits.map((benefit) => (
                        <span key={benefit} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link to={visa.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NIE Featured Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/nie-spain-foreigners" className="block group">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="font-mono font-light text-xs tracking-wide uppercase text-primary mb-4">
                      First Step
                    </span>
                    <CardTitle className="text-2xl md:text-3xl font-normal mb-4 group-hover:text-primary transition-colors">
                      Get Your NIE Number
                    </CardTitle>
                    <CardDescription className="text-base mb-6">
                      The NIE (Número de Identificación de Extranjero) is required for almost all legal and financial activities in Spain. Start here before any visa application.
                    </CardDescription>
                    <div className="flex items-center text-primary font-medium">
                      NIE Application Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="bg-primary/5 p-8 md:p-12 flex items-center justify-center">
                    <div className="text-center">
                      <BadgeCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                      <div className="text-lg font-medium">Essential Document</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Required for banking, property, employment, and business
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Country-Specific */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Country-Specific Guides
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Guidance for Your Nationality
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {countrySpecific.map((country, index) => (
              <motion.div
                key={country.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={country.href} className="block group">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardHeader>
                      <div className="text-5xl mb-4">{country.flag}</div>
                      <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                        {country.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {country.description}
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
              Useful Tools
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Plan Your Move
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
              Ready to Make Spain Your Home?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our immigration experts will guide you through the visa process, from initial assessment to successful approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/contact?service=immigration">
                  Start Your Visa Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/spain-tax-residency-risk">
                  <Shield className="mr-2 h-4 w-4" />
                  Assess Tax Residency
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisaSpainHub;
