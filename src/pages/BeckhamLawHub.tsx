import { Link } from "react-router-dom";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  Shield,
  ArrowRight,
  BookOpen,
  Users,
  Briefcase,
  Laptop,
  Award,
  Percent,
  Globe,
  AlertTriangle,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Beckham Law Hub", url: "https://global.nrro.es/beckham-law-hub" }
];

const toolsAndCalculators = [
  {
    title: "Beckham Law Calculator",
    description: "Calculate your tax savings comparing 24% flat rate vs. standard IRPF progressive rates.",
    href: "/beckham-law-calculator",
    icon: Calculator,
    badge: "Most Popular"
  },
  {
    title: "Tax Residency Risk Assessment",
    description: "Evaluate your Spanish tax residency risk based on official criteria and get personalized recommendations.",
    href: "/spain-tax-residency-risk",
    icon: Shield,
    badge: null
  },
  {
    title: "Labor Cost Calculator",
    description: "Understand the full cost of employment in Spain including social security and benefits.",
    href: "/spain-labor-cost-calculator",
    icon: Briefcase,
    badge: null
  }
];

const eligibleProfiles = [
  {
    title: "C-Suite Executives",
    description: "CEOs, CFOs, and senior management relocating to lead Spanish operations or regional headquarters.",
    icon: Award,
    examples: ["Regional Directors", "Managing Directors", "Chief Officers"]
  },
  {
    title: "Tech Professionals",
    description: "Software engineers, product managers, and tech leaders joining Spanish tech companies or startups.",
    icon: Laptop,
    examples: ["Software Engineers", "CTOs", "Product Managers"]
  },
  {
    title: "Remote Workers",
    description: "Digital nomads and remote employees moving to Spain while working for foreign employers.",
    icon: Globe,
    examples: ["Digital Nomads", "Remote Employees", "Freelancers"]
  },
  {
    title: "Athletes & Artists",
    description: "Professional athletes, performers, and artists with Spanish contracts or residency.",
    icon: Users,
    examples: ["Football Players", "Artists", "Entertainers"]
  }
];

const keyBenefits = [
  {
    stat: "24%",
    label: "Flat Tax Rate",
    description: "vs. up to 47% standard rate"
  },
  {
    stat: "6",
    label: "Years Duration",
    description: "Plus the year of arrival"
  },
  {
    stat: "€600K+",
    label: "Potential Savings",
    description: "On €200K annual income"
  },
  {
    stat: "0%",
    label: "Wealth Tax",
    description: "On foreign assets"
  }
];

const relatedResources = [
  {
    title: "Beckham Law Complete Guide",
    description: "In-depth explanation of eligibility, application process, and benefits.",
    href: "/ley-beckham",
    icon: BookOpen
  },
  {
    title: "Company Setup Playbook",
    description: "Complete guide to establishing your company in Spain.",
    href: "/spain-company-setup-playbook",
    icon: FileText
  }
];

const BeckhamLawHub = () => {
  return (
    <>
      <Meta
        title="Beckham Law Hub | Spain Special Tax Regime Resource Center | NRRO"
        description="Complete resource center for Spain's Beckham Law special tax regime. Tax calculators, eligibility assessment, and expert guidance for expats and relocating professionals."
        canonicalUrl="https://global.nrro.es/beckham-law-hub"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero>Special Tax Regime</BadgeHero>
            <h1 className="hero-title mt-6 mb-6">
              Beckham Law Resource Center
            </h1>
            <p className="text-lead text-white/80 max-w-2xl mx-auto mb-10">
              Everything you need to understand and benefit from Spain's special tax regime for inbound workers. Pay just 24% tax on your Spanish income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/beckham-law-calculator">
                  Calculate Your Savings
                  <Calculator className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/ley-beckham">Read Full Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Stats */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary">{benefit.stat}</div>
                <div className="font-medium mt-2">{benefit.label}</div>
                <div className="text-sm text-muted-foreground">{benefit.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Calculators */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Interactive Tools
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Calculators & Assessments
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {toolsAndCalculators.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={tool.href} className="block h-full group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        {tool.badge && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors mt-4">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-sm text-primary font-medium">
                        Open Tool
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

      {/* Eligible Profiles */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Who Qualifies
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Eligible Professional Profiles
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              The Beckham Law applies to individuals who become Spanish tax residents through work or directorship roles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibleProfiles.map((profile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                      <profile.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-medium mt-4">
                      {profile.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">
                      {profile.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {profile.examples.map((example) => (
                        <span key={example} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {example}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-amber-200 bg-amber-50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-900 mb-2">
                    Key Eligibility Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>Must not have been a Spanish tax resident in the 5 years prior to relocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>Relocation must be due to an employment contract or company directorship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>Application must be made within 6 months of starting work in Spain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>Work must be performed primarily in Spain (limited foreign work allowed)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Learn More
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
              Related Resources
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {relatedResources.map((resource, index) => (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={resource.href} className="block group">
                  <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <resource.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
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
            <Percent className="h-12 w-12 mx-auto mb-6 text-white/60" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6">
              Ready to Optimize Your Spanish Taxes?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our tax experts have helped hundreds of expats and relocating professionals apply for and benefit from the Beckham Law regime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/contact">
                  Schedule a Tax Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/beckham-law-calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Savings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BeckhamLawHub;
