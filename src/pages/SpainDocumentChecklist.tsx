import { Meta } from "@/components/seo/Meta";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeHero } from "@/components/ui/badge-hero";
import { ChecklistDownloadForm } from "@/components/checklist/ChecklistDownloadForm";
import { SpainSetupStickyCTA } from "@/components/spain-setup/SpainSetupStickyCTA";
import { RelatedResourcesGrid } from "@/components/spain-setup/RelatedResourcesGrid";
import { 
  FileCheck, 
  ClipboardList, 
  Building2, 
  Globe2,
  Download,
  Shield,
  Clock,
  CheckCircle,
  FileText,
  Users,
  Star
} from "lucide-react";

const breadcrumbItems = [
  { name: "Home", url: "https://global.nrro.es" },
  { name: "Spain Setup", url: "https://global.nrro.es/spain-company-setup" },
  { name: "Document Checklist", url: "https://global.nrro.es/spain-document-checklist" }
];

const faqs = [
  {
    question: "What documents do I need to set up a company in Spain?",
    answer: "You'll need parent company documents (certificate of incorporation, board resolutions, power of attorney), director/shareholder identification (passport, NIE), and formation documents (Negative Name Certificate, bank certificate, draft bylaws). Our checklist covers 40+ specific documents by category."
  },
  {
    question: "Do my documents need to be apostilled?",
    answer: "Yes, documents from Hague Convention countries require an Apostille. Documents from non-member countries need full diplomatic legalization. All non-Spanish documents also require certified/sworn translation. Our checklist includes detailed legalization requirements."
  },
  {
    question: "What is an NIE and how do I get one?",
    answer: "An NIE (Número de Identificación de Extranjero) is a tax identification number required for all directors and shareholders. It can be obtained at Spanish consulates abroad or police stations in Spain. Processing takes 2-4 weeks. Our checklist includes NIE application requirements."
  },
  {
    question: "Is this checklist suitable for all entity types?",
    answer: "Yes, the checklist covers requirements for SL (Sociedad Limitada), SA (Sociedad Anónima), branch offices, and subsidiaries. It includes entity-specific notes highlighting different requirements for each structure."
  }
];

const SpainDocumentChecklist = () => {
  return (
    <>
      <Meta
        title="Spain Company Setup Document Checklist | Free Template Download | NRRO"
        description="Download our free Spain company setup document checklist. Complete template covering parent company docs, director requirements, NIE, apostille & legalization requirements."
        canonicalUrl="https://global.nrro.es/spain-document-checklist"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <BadgeHero>
                <Download className="w-3 h-3 mr-1" />
                Free Download — Editable Template
              </BadgeHero>
              
              <h1 className="hero-title">
                Spain Company Setup{" "}
                <span className="text-primary">Document Checklist</span>
              </h1>
              
              <p className="text-lead text-white/70 max-w-xl">
                Never miss a required document. Our comprehensive checklist covers every document 
                you'll need—organized by category, with legalization and NIE requirements explained.
              </p>

              {/* Trust Points */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>40+ Document Items</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Entity-Specific Notes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Foreigner Instructions</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden pt-4">
                <Button size="lg" className="w-full" asChild>
                  <a href="#download-form">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free Checklist
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="hidden lg:block" id="download-form">
              <Card className="border-white/10 shadow-xl bg-white/5 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-normal text-white">
                      Download Your Free Checklist
                    </h2>
                    <p className="text-white/70 mt-2">
                      Get instant access via email
                    </p>
                  </div>
                  <ChecklistDownloadForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-foreground mb-4">
              What You'll Get
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to prepare your documentation correctly the first time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  Complete Document Inventory
                </h3>
                <p className="text-muted-foreground">
                  40+ document items organized by category: parent company docs, director requirements, 
                  formation documents, and post-incorporation essentials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  Entity-Specific Guidance
                </h3>
                <p className="text-muted-foreground">
                  Clear notes for SL, SA, Branch, and Subsidiary structures. Know exactly 
                  which documents apply to your specific entity type.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  International Requirements
                </h3>
                <p className="text-muted-foreground">
                  Complete NIE instructions, apostille vs. full legalization guide, 
                  sworn translation requirements, and document validity periods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-sm text-muted-foreground">Companies Assisted</p>
              </Card>
              <Card className="text-center p-6">
                <p className="text-4xl font-bold text-primary mb-2">30+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </Card>
              <Card className="text-center p-6">
                <p className="text-4xl font-bold text-primary mb-2">40+</p>
                <p className="text-sm text-muted-foreground">Countries Served</p>
              </Card>
              <Card className="text-center p-6">
                <p className="text-4xl font-bold text-primary mb-2">99%</p>
                <p className="text-sm text-muted-foreground">First-Time Approval</p>
              </Card>
            </div>

            {/* Testimonial */}
            <Card className="p-8 bg-background">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg text-foreground mb-6">
                "The document checklist saved us weeks of back-and-forth with the notary. 
                Every requirement was clearly explained, and we had everything ready on the first attempt."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Michael R.</p>
                  <p className="text-sm text-muted-foreground">CFO, Tech Startup (UK)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section className="lg:hidden py-20 bg-background" id="download-form-mobile">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 shadow-xl max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-normal text-foreground">
                  Download Your Free Checklist
                </h2>
                <p className="text-muted-foreground mt-2">
                  Get instant access via email
                </p>
              </div>
              <ChecklistDownloadForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-normal text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Need Professional Document Preparation?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our team handles document collection, legalization coordination, and notary preparation. 
            Focus on your business while we manage the paperwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/contact">
                <FileText className="w-4 h-4 mr-2" />
                Request Document Preparation Quote
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="/spain-company-setup-playbook">
                <Download className="w-4 h-4 mr-2" />
                Get Full Setup Playbook
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedResourcesGrid 
        currentPage="/spain-document-checklist"
        title="More Spain Business Resources"
        excludeTypes={['guide']}
      />

      {/* Trust Footer */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>Updated January 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <SpainSetupStickyCTA />
    </>
  );
};

export default SpainDocumentChecklist;
