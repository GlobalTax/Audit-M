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
import { InternationalServicesContactForm } from "@/components/international/InternationalServicesContactForm";
import { InternationalServicesFAQ } from "@/components/international/InternationalServicesFAQ";

const services = [
  {
    id: "international-accounting",
    icon: Calculator,
    title: "International Accounting Management",
    description: "Streamline your global financial operations with consolidated reporting and full compliance with international accounting standards across all jurisdictions.",
    benefits: [
      "Multi-entity financial consolidation under IFRS and local GAAP",
      "Real-time management reporting and performance dashboards",
      "End-to-end audit preparation and regulatory filing support"
    ],
    cta: "Explore This Service",
    slug: "international-accounting-management",
    metaTitle: "International Accounting Services",
    metaDescription: "Global accounting management with IFRS compliance, multi-entity consolidation and real-time reporting for multinational operations."
  },
  {
    id: "international-tax",
    icon: FileText,
    title: "International Tax Management",
    description: "Optimize your global tax position through strategic planning and rigorous compliance, minimizing exposure while maximizing efficiency across borders.",
    benefits: [
      "Double taxation treaty analysis and optimization",
      "Cross-border tax structuring and M&A due diligence",
      "Proactive compliance monitoring and risk mitigation"
    ],
    cta: "Explore This Service",
    slug: "international-tax-management",
    metaTitle: "International Tax Advisory Services",
    metaDescription: "Cross-border tax planning and compliance for multinationals. Optimize your global tax position with expert advisory."
  },
  {
    id: "international-payroll",
    icon: Users,
    title: "International Payroll Management",
    description: "Deliver accurate, timely payroll across multiple countries with full alignment to local labour laws and social security requirements.",
    benefits: [
      "Multi-country payroll processing and administration",
      "Expatriate compensation and benefits management",
      "Labour cost analysis and workforce planning support"
    ],
    cta: "Explore This Service",
    slug: "international-payroll-management",
    metaTitle: "International Payroll Services",
    metaDescription: "Multi-country payroll and workforce compliance for global teams. Accurate, timely and fully compliant across jurisdictions."
  },
  {
    id: "corporate-legal",
    icon: Scale,
    title: "Corporate Legal Services",
    description: "Establish and maintain your international presence with expert legal advisory on entity formation, governance, and ongoing regulatory compliance.",
    benefits: [
      "Company incorporation and corporate structuring",
      "Commercial contract drafting, review, and negotiation",
      "Ongoing corporate governance and compliance support"
    ],
    cta: "Explore This Service",
    slug: "corporate-legal-services",
    metaTitle: "Corporate Legal Services for Business",
    metaDescription: "Entity formation, governance and contracts for international companies. Expert legal advisory for cross-border operations."
  },
  {
    id: "treasury-management",
    icon: Wallet,
    title: "Treasury Management",
    description: "Maximize liquidity and minimize financial risk through expert monitoring and management of your international cash flows and funding structures.",
    benefits: [
      "Cross-border cash flow optimization and forecasting",
      "Foreign exchange risk management strategies",
      "Intercompany funding and working capital advisory"
    ],
    cta: "Explore This Service",
    slug: "treasury-management",
    metaTitle: "Treasury & Cash Management Advisory",
    metaDescription: "Optimize global liquidity and manage FX risk. Expert treasury advisory for multinational cash flow management."
  },
  {
    id: "transfer-pricing",
    icon: ArrowRightLeft,
    title: "Transfer Pricing",
    description: "Ensure full compliance with intercompany pricing regulations across all jurisdictions, backed by robust documentation and defensible policies.",
    benefits: [
      "Transfer pricing policy design and implementation",
      "Benchmarking studies and contemporaneous documentation",
      "Advance pricing agreements and dispute resolution support"
    ],
    cta: "Explore This Service",
    slug: "transfer-pricing",
    metaTitle: "Transfer Pricing Compliance Services",
    metaDescription: "Intercompany pricing compliance and documentation. Defensible transfer pricing policies for multinational groups."
  },
  {
    id: "local-presence",
    icon: Building2,
    title: "Local Presence & Governance Support",
    description: "Establish a compliant local presence in Spain through professional domiciliation services and experienced local director appointments.",
    benefits: [
      "Registered office and business address services",
      "Nominee and local director appointments",
      "Corporate secretarial and board meeting support"
    ],
    cta: "Explore This Service",
    slug: "local-presence-governance-support",
    metaTitle: "Local Presence & Governance in Spain",
    metaDescription: "Registered office, local directors and governance support. Establish compliant presence in Spain for foreign companies."
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
        title="International Services | Global Advisory"
        description="End-to-end legal, tax, accounting and payroll services for businesses expanding across borders. Trusted by multinationals in 50+ jurisdictions."
        keywords="international business services, global tax advisory, multinational payroll, cross-border compliance"
        canonicalUrl="/international-services"
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
                Your Strategic Partner for<br />International Business
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed max-w-3xl mx-auto">
                Integrated legal, tax, accounting and labour advisory for multinational companies, foreign investors, and businesses expanding across borders.
              </p>
              
              <p className="text-base text-white/60 mb-10">
                Barcelona headquarters. Global expertise. Trusted in 50+ jurisdictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-medium">
                  <Link to="/contact">
                    Schedule an International Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <a href="#contact">
                    Download Services Brochure
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-16 md:py-20 bg-muted/30 border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              {/* USP 1 */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Multi-Jurisdictional Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Operate confidently across borders with a team that understands the regulatory, legal, and fiscal nuances of each market you enter.
                </p>
                <ul className="mt-4 space-y-2 text-left">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Advisors with hands-on experience in 50+ jurisdictions worldwide</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Deep knowledge of local regulations, tax codes, and compliance requirements</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Seamless coordination across countries for unified operations</span>
                  </li>
                </ul>
              </div>

              {/* USP 2 */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Outcome-Focused Strategic Planning
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every recommendation we make is designed to deliver measurable business results — from cost savings to risk reduction and accelerated growth.
                </p>
                <ul className="mt-4 space-y-2 text-left">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Tax optimization strategies that reduce your global effective tax rate</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Proactive risk mitigation to avoid penalties and operational disruptions</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Scalable solutions that evolve with your international expansion</span>
                  </li>
                </ul>
              </div>

              {/* USP 3 */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Integrated Legal, Tax, Accounting & Labour Support
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work with a single partner who aligns all disciplines — eliminating silos, reducing complexity, and ensuring consistent advice across your organization.
                </p>
                <ul className="mt-4 space-y-2 text-left">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>One team coordinating legal, fiscal, accounting, and HR matters</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Consistent policies and documentation across all your entities</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Faster decision-making with streamlined communication and reporting</span>
                  </li>
                </ul>
              </div>

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

        {/* Contact Form Section */}
        <section id="contact" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <InternationalServicesContactForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <InternationalServicesFAQ />

        {/* Global CTA Section */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                Ready to Simplify Your International Compliance?
              </h2>
              
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Our international advisory team is ready to help you navigate cross-border complexities with confidence. Whether you're entering Spain, restructuring operations, or optimizing your global tax position, we're here to guide every step.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-primary">
                  <Link to="/contact">
                    Start Your Global Compliance Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <a href="#contact">
                    Download Our International Brochure
                  </a>
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
