import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Scale, FileText, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Terms() {
  const lastUpdate = "January 2025";
  
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Legal Notice", url: "/legal-notice" },
    { name: "Terms of Service", url: "/terms" },
  ];

  return (
    <>
      <Meta
        title="Terms of Service | Navarro International"
        description="General terms and conditions for professional services provided by Navarro International group companies."
        keywords="terms of service, professional services, legal advisory, tax advisory, accounting services"
        canonicalUrl="/terms"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-primary-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-foreground/90 font-light">
              Terms and conditions for professional services
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
                <BreadcrumbLink asChild>
                  <Link to="/legal-notice">Legal</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Last Update */}
            <div className="text-sm text-muted-foreground border-l-4 border-accent pl-4">
              <p><strong>Last updated:</strong> {lastUpdate}</p>
            </div>

            {/* Section 1: Service Provider Entities */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                1. Service Provider Entities
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  These terms govern the provision of professional services by the entities of the <strong>Navarro Business Group</strong>, including legal, tax, accounting, and payroll services.
                </p>
                <p>
                  These conditions apply to all engagements with group clients, supplementing the specific terms set forth in the proposal or quote accepted by each client.
                </p>

                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Navarro Business Group
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Joint service providers:
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4 mb-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Navarro, Legal Y Tributario S.L.P.
                  </h3>
                  <ul className="list-none space-y-1 text-sm">
                    <li><strong className="text-foreground">Tax ID (CIF):</strong> B67261552</li>
                    <li><strong className="text-foreground">Legal Form:</strong> Professional Limited Liability Company</li>
                    <li><strong className="text-foreground">Activity:</strong> Legal, tax, and fiscal advisory</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-4 mb-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Capittal Transacciones S.L.
                  </h3>
                  <ul className="list-none space-y-1 text-sm">
                    <li><strong className="text-foreground">Tax ID (CIF):</strong> B02721918</li>
                    <li><strong className="text-foreground">Activity:</strong> M&A origination and intermediation</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-4 mb-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Navarro Empresarial S.L.
                  </h3>
                  <ul className="list-none space-y-1 text-sm">
                    <li><strong className="text-foreground">Tax ID (CIF):</strong> B58068800</li>
                    <li><strong className="text-foreground">Activity:</strong> Tax, payroll, and accounting advisory services</li>
                  </ul>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 mt-6">
                  <h4 className="font-semibold text-foreground mb-3">Group Contact Information</h4>
                  <ul className="list-none space-y-2">
                    <li>
                      <strong className="text-foreground">Address:</strong> Ausias March 36 Principal, 08010 Barcelona, Spain
                    </li>
                    <li>
                      <strong className="text-foreground">Email:</strong>{" "}
                      <a href="mailto:info@nrro.es" className="text-accent hover:underline">
                        info@nrro.es
                      </a>
                    </li>
                    <li>
                      <strong className="text-foreground">Phone:</strong> +34 934 593 600
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: Nature of Services */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                2. Nature of Services
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  The Navarro Business Group provides professional services in the following areas:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Scale className="h-5 w-5 text-accent" />
                      Legal
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Civil, commercial, corporate, and contractual advisory.
                    </p>
                  </div>

                  <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      Tax
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Preparation and filing of tax returns, tax planning, and representation before tax authorities.
                    </p>
                  </div>

                  <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Accounting
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Bookkeeping in accordance with accounting standards, closings, and preparation of annual accounts.
                    </p>
                  </div>

                  <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      Payroll & Labor
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Payroll management, contracts, social security, and labor relations advisory.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary p-4 mt-4">
                  <p className="text-sm text-foreground">
                    <strong>Service Types:</strong> Services may be provided on a <strong>recurring basis (monthly retainer)</strong> or on a <strong>project basis (per engagement)</strong>.
                  </p>
                </div>

                <p className="mt-4">
                  Any modification or expansion of services must be agreed in writing between the parties.
                </p>
              </div>
            </div>

            {/* Section 3: Fees and Invoicing */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                3. Fees and Invoicing
              </h2>
              <div className="space-y-3 text-foreground">
                <ul className="list-none space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">3.1</span>
                    <span>Fees are established according to the economic proposal accepted by the client.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">3.2</span>
                    <span>Unless otherwise indicated, amounts do not include VAT or other indirect taxes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">3.3</span>
                    <span>For recurring services, invoicing is <strong>monthly</strong>, in advance, via direct debit or bank transfer.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">3.4</span>
                    <span>The payment term is <strong>15 days</strong> from the invoice date unless otherwise agreed.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">3.5</span>
                    <span>Late payments may accrue interest at the legal rate plus 2%.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4: Client Obligations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                4. Client Obligations
              </h2>
              <div className="space-y-3 text-foreground">
                <p>The client agrees to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information necessary for the provision of services</li>
                  <li>Respond to requests for documentation within a reasonable timeframe</li>
                  <li>Inform of any changes that may affect the services contracted</li>
                  <li>Pay fees within the agreed terms</li>
                  <li>Maintain confidentiality of information shared during the engagement</li>
                </ul>
              </div>
            </div>

            {/* Section 5: Confidentiality */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                5. Confidentiality
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  Both parties agree to maintain the confidentiality of all information exchanged during the course of the engagement.
                </p>
                <p>
                  This obligation extends to employees, collaborators, and any third parties involved in the provision of services.
                </p>
                <p>
                  Confidentiality obligations survive the termination of the contractual relationship.
                </p>
              </div>
            </div>

            {/* Section 6: Professional Liability */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                6. Professional Liability
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  Navarro Business Group maintains professional liability insurance covering the services provided.
                </p>
                <p>
                  Liability is limited to cases of proven negligence in the provision of services and is capped at the amount of fees received for the specific engagement.
                </p>
                <p>
                  The group is not liable for damages resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Inaccurate or incomplete information provided by the client</li>
                  <li>Decisions made by the client against professional advice</li>
                  <li>Changes in applicable legislation after advice was provided</li>
                  <li>Force majeure events</li>
                </ul>
              </div>
            </div>

            {/* Section 7: Duration and Termination */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                7. Duration and Termination
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  <strong>Recurring services:</strong> The initial term is one year from the start date, automatically renewable unless either party provides written notice at least 30 days before expiration.
                </p>
                <p>
                  <strong>Project-based services:</strong> The engagement terminates upon completion of the agreed scope or by mutual agreement.
                </p>
                <p>
                  Either party may terminate for cause in case of material breach by the other party, subject to 15 days written notice.
                </p>
              </div>
            </div>

            {/* Section 8: Governing Law */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                8. Governing Law and Jurisdiction
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  These Terms of Service are governed by Spanish law.
                </p>
                <p>
                  For any dispute arising from or in connection with these terms, the parties submit to the exclusive jurisdiction of the <strong>Courts and Tribunals of Barcelona</strong>, waiving any other jurisdiction.
                </p>
              </div>
            </div>

            {/* Section 9: Dispute Resolution */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                9. Dispute Resolution
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  Before initiating legal proceedings, the parties agree to attempt to resolve any dispute through good faith negotiation.
                </p>
                <p>
                  If a dispute cannot be resolved amicably within 30 days, either party may submit the matter to mediation before the Arbitration Court of Barcelona Chamber of Commerce.
                </p>
              </div>
            </div>

            {/* Section 10: Contact */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-normal text-foreground">
                10. Contact Information
              </h2>
              <div className="space-y-3 text-foreground">
                <p>
                  For any questions regarding these Terms of Service, please contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong className="text-foreground">Email:</strong>{" "}
                    <a href="mailto:info@nrro.es" className="text-accent hover:underline">
                      info@nrro.es
                    </a>
                  </li>
                  <li>
                    <strong className="text-foreground">Phone:</strong> +34 934 593 600
                  </li>
                  <li>
                    <strong className="text-foreground">Address:</strong> Ausias March 36 Principal, 08010 Barcelona, Spain
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
