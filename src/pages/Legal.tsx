import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Legal = () => {
  const lastUpdate = "January 2025";
  
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Legal Notice", url: "/legal-notice" },
  ];

  return (
    <>
      <Meta
        title="Legal Notice | Navarro International"
        description="Terms and conditions of use for Navarro International website. Legal, tax, and accounting advisory services for multinational companies."
        keywords="legal notice, terms of use, website terms, international advisory"
        canonicalUrl="/legal-notice"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-6">
              Legal Notice
            </h1>
            <p className="text-xl text-muted-foreground">
              Terms and conditions of use
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
              <BreadcrumbItem>
                <BreadcrumbPage>Legal Notice</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              
              {/* Last Updated */}
              <div className="text-sm text-muted-foreground">
                <p>Last updated: {lastUpdate}</p>
              </div>
              
              {/* Company Identification */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  1. Company Identification
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    In compliance with applicable regulations, we provide the following information about the corporate group:
                  </p>

                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Navarro Business Group
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This website is jointly operated by the following group entities:
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Navarro, Legal Y Tributario S.L.P.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B67261552</li>
                      <li><strong className="text-foreground">Legal Form:</strong> Professional Limited Liability Company</li>
                      <li><strong className="text-foreground">Main Activity:</strong> Legal, tax, and fiscal advisory</li>
                      <li><strong className="text-foreground">Trade Name:</strong> NRRO / Navarro</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Capittal Transacciones S.L.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B02721918</li>
                      <li><strong className="text-foreground">Legal Form:</strong> Limited Liability Company</li>
                      <li><strong className="text-foreground">Main Activity:</strong> M&A origination and intermediation</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Navarro Empresarial S.L.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B58068800</li>
                      <li><strong className="text-foreground">Legal Form:</strong> Limited Liability Company</li>
                      <li><strong className="text-foreground">Main Activity:</strong> Tax, payroll, and accounting advisory services</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      SPV Corporate Advisors S.L.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B09652017</li>
                      <li><strong className="text-foreground">Legal Form:</strong> Limited Liability Company</li>
                      <li><strong className="text-foreground">Main Activity:</strong> Holding company for business participations</li>
                    </ul>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 mt-6">
                    <h4 className="font-semibold text-foreground mb-3">Group Contact Information</h4>
                    <ul className="list-none space-y-2">
                      <li>
                        <strong className="text-foreground">Registered Office:</strong> Ausias March 36 Principal, 08010 Barcelona, Spain
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

              {/* Purpose of the Website */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  2. Purpose of the Website
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    The purpose of this website is to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide corporate information about Navarro International and its services</li>
                    <li>Serve as a communication channel for current and prospective clients</li>
                    <li>Showcase case studies and client testimonials (with client consent)</li>
                    <li>Publish informational content on legal, tax, and accounting matters</li>
                    <li>Facilitate service inquiries and consultation requests</li>
                  </ul>
                  <p className="text-sm italic mt-4">
                    Note: This website is NOT an e-commerce platform. Professional services are contracted through specific agreements outside this portal.
                  </p>
                </div>
              </div>

              {/* Terms of Use */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  3. Terms of Use
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Access to and use of this website implies acceptance of these terms. Users agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the website lawfully and in accordance with applicable regulations</li>
                    <li>Not introduce viruses, malicious code, or conduct cyberattacks</li>
                    <li>Not perform automated scraping without express authorization</li>
                    <li>Not impersonate other individuals in forms or communications</li>
                    <li>Not use content for commercial purposes without authorization</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                  <p className="mt-4">
                    Access to this website is free. However, some services may require registration or subscription.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  4. Intellectual Property
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    All content on this website (texts, images, logos, graphic design, source code, structure) is the property of Navarro International or its licensors and is protected by applicable intellectual property laws.
                  </p>
                  <p className="mt-4">
                    The following are <strong className="text-foreground">expressly prohibited</strong>:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reproducing, distributing, modifying, or publicly communicating content without authorization</li>
                    <li>Using Navarro logos and trademarks outside their intended context</li>
                    <li>Reverse engineering the source code</li>
                    <li>Extracting databases or content through automated techniques</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    Logos and company names mentioned in case studies are the property of their respective owners and are displayed with express authorization.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  5. Limitation of Liability
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Navarro International is not responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Informational Content:</strong> Articles and publications are for informational purposes only and <strong className="text-foreground">DO NOT constitute binding legal advice</strong>. Each case requires individualized analysis.
                    </li>
                    <li>
                      <strong className="text-foreground">Decisions Without Consultation:</strong> We are not liable for decisions made based solely on website information without prior professional consultation.
                    </li>
                    <li>
                      <strong className="text-foreground">Website Availability:</strong> While we strive to maintain 24/7 operation, we do not guarantee uninterrupted availability due to technical maintenance.
                    </li>
                    <li>
                      <strong className="text-foreground">External Links:</strong> We are not responsible for the content of third-party websites linked from this site.
                    </li>
                    <li>
                      <strong className="text-foreground">Viruses or Malware:</strong> Although we implement security measures, we do not guarantee the site is free from errors or viruses.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Accuracy of Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  6. Accuracy of Information
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    We strive to keep information current and accurate. However:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Tax and legal regulations change frequently</li>
                    <li>Blog articles may become outdated over time</li>
                    <li>Each business case is unique and requires specific analysis</li>
                  </ul>
                  <p className="mt-4">
                    <strong className="text-foreground">We strongly recommend</strong> consulting directly with our professionals before making important tax or legal decisions.
                  </p>
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  7. External Links
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    This website may contain links to third-party sites (providers, partners, social media).
                  </p>
                  <p>
                    Navarro International:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Is not responsible for the content of external sites</li>
                    <li>Does not guarantee the availability of those sites</li>
                    <li>Does not necessarily approve or recommend their content</li>
                  </ul>
                  <p className="mt-4">
                    Links are provided solely for user convenience. We recommend reading the privacy policies of each external site.
                  </p>
                </div>
              </div>

              {/* Modifications */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  8. Modifications
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Navarro International reserves the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify website content without prior notice</li>
                    <li>Temporarily suspend the site for technical maintenance</li>
                    <li>Update these terms and conditions at any time</li>
                    <li>Modify the structure, design, or functionality of the site</li>
                  </ul>
                  <p className="mt-4">
                    Changes to legal terms will be published on this page with the corresponding "Last updated" date.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  9. Governing Law and Jurisdiction
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    This Legal Notice is governed by Spanish law.
                  </p>
                  <p>
                    For any controversy or dispute arising from the use of this website, the parties expressly submit to the jurisdiction of the <strong className="text-foreground">Courts and Tribunals of Barcelona</strong>, waiving any other jurisdiction that may correspond to them.
                  </p>
                  <p>
                    In the event of translations, the Spanish version shall prevail for legal interpretation purposes.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  10. Contact Information
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    For any inquiries regarding this Legal Notice, you may contact us at:
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
        </div>
      </section>
    </>
  );
};

export default Legal;
