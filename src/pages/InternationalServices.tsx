import { Link } from "react-router-dom";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { 
  Calculator, 
  FileText, 
  Users, 
  Scale, 
  Wallet, 
  ArrowRightLeft, 
  Building2,
  ArrowRight,
  Globe,
  CheckCircle
} from "lucide-react";

const services = [
  {
    id: "international-accounting",
    icon: Calculator,
    title: "International Accounting Management",
    description: "Consolidation, reporting, and compliance with international accounting standards for multinational operations.",
    benefits: [
      "Multi-jurisdictional financial consolidation",
      "IFRS and local GAAP compliance",
      "Real-time reporting dashboards",
      "Audit preparation and support"
    ],
    cta: "Explore Accounting Services",
    slug: "international-accounting-management"
  },
  {
    id: "international-tax",
    icon: FileText,
    title: "International Tax Management",
    description: "Strategic tax planning and compliance to optimize your global tax position while minimizing risk.",
    benefits: [
      "Double taxation agreement optimization",
      "International tax structuring",
      "Transfer pricing documentation",
      "Tax due diligence for cross-border transactions"
    ],
    cta: "Explore Tax Services",
    slug: "international-tax-management"
  },
  {
    id: "international-payroll",
    icon: Users,
    title: "International Payroll Management",
    description: "Efficient payroll processing aligned with local labour legislation across multiple jurisdictions.",
    benefits: [
      "Multi-country payroll administration",
      "Social security and benefits compliance",
      "Expatriate payroll management",
      "Labour cost optimization"
    ],
    cta: "Explore Payroll Services",
    slug: "international-payroll-management"
  },
  {
    id: "corporate-legal",
    icon: Scale,
    title: "Corporate Legal Services",
    description: "Entity formation, legal advisory, and ongoing compliance support for international companies.",
    benefits: [
      "Company incorporation and structuring",
      "Corporate governance advisory",
      "Commercial contract drafting and review",
      "Regulatory compliance monitoring"
    ],
    cta: "Explore Legal Services",
    slug: "corporate-legal-services"
  },
  {
    id: "treasury-management",
    icon: Wallet,
    title: "Treasury Management",
    description: "Monitoring and managing international cash flows to optimize liquidity and minimize financial risk.",
    benefits: [
      "Cross-border cash flow optimization",
      "FX risk management",
      "Intercompany funding structures",
      "Working capital advisory"
    ],
    cta: "Explore Treasury Services",
    slug: "treasury-management"
  },
  {
    id: "transfer-pricing",
    icon: ArrowRightLeft,
    title: "Transfer Pricing",
    description: "Ensuring compliance with intercompany transaction regulations across all jurisdictions.",
    benefits: [
      "Transfer pricing policy development",
      "Documentation and benchmarking studies",
      "Advance pricing agreements (APAs)",
      "Tax authority dispute resolution"
    ],
    cta: "Explore Transfer Pricing",
    slug: "transfer-pricing"
  },
  {
    id: "local-presence",
    icon: Building2,
    title: "Local Presence & Governance Support",
    description: "International domiciliation and provision of local directors for compliant market presence.",
    benefits: [
      "Registered office services",
      "Nominee and local director services",
      "Corporate secretary services",
      "Board meeting and AGM support"
    ],
    cta: "Explore Governance Services",
    slug: "local-presence-governance-support"
  }
];

const InternationalServices = () => {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "International Services", url: "/international-services" }
  ];

  return (
    <>
      <Meta
        title="International Services | Global Legal, Tax & Advisory | NRRO"
        description="Comprehensive international legal, tax, accounting and labour advisory services for multinational companies and foreign investors expanding into Spain."
        canonicalUrl={`${window.location.origin}/international-services`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-white/20 text-white/90 bg-white/5">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Global Advisory Excellence
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
                International Services
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed max-w-3xl mx-auto">
                End-to-end legal, tax, accounting and labour solutions for multinational companies operating across borders.
              </p>
              
              <p className="text-base text-white/60">
                Barcelona headquarters. Global reach. Local expertise in 50+ jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <div className="bg-muted/30 border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>International Services</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8">
                What Are International Services?
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  For multinational companies and foreign investors, navigating cross-border operations requires more than local expertise — it demands a partner who understands the complexities of international compliance, tax optimization, and workforce management across jurisdictions.
                </p>
                <p>
                  Our International Services division provides integrated advisory solutions that help you establish, operate, and grow your business in Spain while maintaining compliance with global standards. From entity formation to ongoing governance, we serve as your strategic partner for international business success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 md:gap-10">
                {services.map((service, index) => (
                  <div 
                    key={service.id}
                    className="bg-background rounded-xl p-8 md:p-10 shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
                      {/* Icon & Title */}
                      <div className="flex-shrink-0 mb-6 lg:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-normal text-foreground">
                          {service.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-lg text-muted-foreground mb-6">
                          {service.description}
                        </p>

                        {/* Benefits */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-foreground/80">{benefit}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <Button asChild variant="outline" className="group">
                          <Link to={`/services/${service.slug}`}>
                            {service.cta}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                Ready to Expand Your Global Operations?
              </h2>
              
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Our international advisory team is ready to help you navigate cross-border complexities with confidence. Whether you're entering Spain, restructuring operations, or optimizing your global tax position, we're here to guide every step.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-primary">
                  <Link to="/contact">
                    Request International Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/services">
                    Explore All Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InternationalServices;
