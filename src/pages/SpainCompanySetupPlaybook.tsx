import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { PlaybookDownloadForm } from "@/components/playbook/PlaybookDownloadForm";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  CheckSquare, 
  Clock, 
  Shield, 
  AlertTriangle,
  Download,
  Users,
  Building2,
  Calendar,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const SpainCompanySetupPlaybook = () => {
  const faqItems = [
    {
      question: "Is this playbook really free?",
      answer: "Yes, completely free. We believe in providing value upfront. The playbook contains the same strategic guidance we share with our advisory clients."
    },
    {
      question: "How detailed is the setup checklist?",
      answer: "The playbook includes a comprehensive 12-step checklist covering every phase from initial planning through operational launch, with specific action items and responsible parties for each step."
    },
    {
      question: "Will I receive updates if regulations change?",
      answer: "Playbook subscribers receive periodic updates when significant regulatory changes affect the company setup process. You can unsubscribe at any time."
    },
    {
      question: "Can I share this playbook with my team?",
      answer: "Absolutely. We encourage you to share the playbook with your legal, finance, and operations teams. For additional copies with personalized guidance, contact us directly."
    }
  ];

  const benefits = [
    {
      icon: FileText,
      title: "Complete Setup Roadmap",
      description: "12-step process from initial planning to operational launch, with clear milestones and dependencies"
    },
    {
      icon: CheckSquare,
      title: "Document Checklist",
      description: "Comprehensive list of 25+ required documents for parent company, directors, and post-incorporation"
    },
    {
      icon: Clock,
      title: "Realistic Timeline",
      description: "Week-by-week breakdown showing what to expect, including factors that accelerate or delay your setup"
    },
    {
      icon: Shield,
      title: "Compliance Framework",
      description: "Ongoing obligations for corporate tax, VAT, payroll, and anti-avoidance rules you must know"
    },
    {
      icon: AlertTriangle,
      title: "Pitfalls to Avoid",
      description: "12 costly mistakes we've seen international companies make—and exactly how to avoid them"
    }
  ];

  return (
    <>
      <Meta
        title="Free Spain Company Setup Playbook | Download Your Complete Guide"
        description="Download our free 18-page Spain Company Setup Playbook. Get step-by-step checklists, timelines, compliance requirements, and expert insights for establishing your business in Spain."
        keywords="spain company setup guide, spain business registration checklist, spain corporate formation guide, spain company setup timeline, spain business compliance"
        canonicalUrl="https://global.nrro.es/spain-company-setup-playbook"
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://global.nrro.es" },
          { name: "Resources", url: "https://global.nrro.es/resources" },
          { name: "Spain Company Setup Playbook", url: "https://global.nrro.es/spain-company-setup-playbook" }
        ]}
      />
      
      <FAQSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <BadgeHero>
                <Download className="w-3 h-3 mr-1" />
                Free Download — 18 Pages
              </BadgeHero>
              
              <h1 className="hero-title">
                Spain Company Setup{" "}
                <span className="text-primary">Playbook</span>
              </h1>
              
              <p className="text-lead text-white/70 max-w-xl">
                Your complete guide to establishing a business presence in Spain. 
                Step-by-step checklists, timelines, compliance requirements, and 
                expert insights from 30+ years of experience.
              </p>
              
              {/* Trust Points */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>500+ Companies Established</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Users className="w-4 h-4 text-primary" />
                  <span>30+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Updated for 2025</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <Card className="border-white/10 shadow-xl bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4 mb-6">
                    <h2 className="text-2xl font-normal text-white">
                      Download Your Free Playbook
                    </h2>
                    <p className="text-white/70">
                      Get instant access to your comprehensive Spain company setup guide.
                    </p>
                  </div>
                  <PlaybookDownloadForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              What's Inside
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              18 pages of actionable insights, checklists, and strategic guidance 
              based on real-world experience establishing international companies in Spain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Companies Established</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">30+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
            
            {/* Testimonial */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <blockquote className="text-lg md:text-xl text-foreground italic mb-4">
                  "The NRRO playbook saved us months of research and helped us avoid costly 
                  mistakes. It was the perfect starting point for our Spanish market entry. 
                  The compliance checklist alone is worth its weight in gold."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">MH</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Michael Henderson</div>
                    <div className="text-sm text-muted-foreground">CFO, TechScale GmbH</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
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
            
            <div className="space-y-6">
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

      {/* Alternative CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Prefer to Speak with an Expert?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our international advisory team is ready to discuss your specific 
              requirements and create a tailored market entry strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="font-semibold"
                asChild
              >
                <Link to="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/set-up-in-spain">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Related Resources
            </span>
            <h2 className="text-3xl font-normal text-foreground">
              Continue Your Research
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-border/50 hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                  Set Up in Spain Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive overview of establishing your business presence in Spain.
                </p>
                <Link 
                  to="/set-up-in-spain" 
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                  Legal Structures in Spain
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare SL, SA, branches, and subsidiaries to choose the right structure.
                </p>
                <Link 
                  to="/legal-structures-spain" 
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                  International Services
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Full suite of cross-border legal, tax, and compliance advisory services.
                </p>
                <Link 
                  to="/international-services" 
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainCompanySetupPlaybook;
