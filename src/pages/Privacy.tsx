import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Privacy = () => {
  const lastUpdate = "January 2025";
  
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Legal Notice", url: "/legal-notice" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  return (
    <>
      <Meta
        title="Privacy Policy | Navarro International"
        description="Information about how Navarro International collects, uses, and protects your personal data in compliance with GDPR."
        keywords="privacy policy, data protection, GDPR, personal data, international advisory"
        canonicalUrl="/privacy"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How we protect your personal data
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
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
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

              {/* Data Controller */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  1. Data Controller
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    In compliance with the General Data Protection Regulation (GDPR) and applicable data protection laws, 
                    the data controllers responsible for processing your personal data are the following entities of the Navarro Business Group:
                  </p>

                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Navarro Business Group
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Joint data controllers:
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Navarro, Legal Y Tributario S.L.P.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B67261552</li>
                      <li><strong className="text-foreground">Activity:</strong> Legal, tax, and fiscal advisory</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-4 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Navarro Empresarial S.L.
                    </h3>
                    <ul className="list-none space-y-1 text-sm">
                      <li><strong className="text-foreground">Tax ID (CIF):</strong> B58068800</li>
                      <li><strong className="text-foreground">Activity:</strong> Tax, payroll, and accounting advisory</li>
                    </ul>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 mt-6">
                    <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
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

                  <div className="bg-primary/5 border-l-4 border-primary p-4 mt-4">
                    <p className="text-sm text-foreground">
                      <strong className="text-foreground">Note:</strong> Group entities may share personal data among themselves when necessary to provide integrated services. 
                      All processing is carried out in accordance with the legal bases established in the GDPR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data We Collect */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  2. Data We Collect
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>Through our website, we may collect the following types of data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Contact Data:</strong> Name, email, company, and message when you use our contact forms
                    </li>
                    <li>
                      <strong className="text-foreground">Navigation Data:</strong> IP address, browser type, and browsing behavior (automatically logged)
                    </li>
                    <li>
                      <strong className="text-foreground">Service Request Data:</strong> Information provided when requesting consultations or services
                    </li>
                  </ul>
                  <p className="text-sm italic">
                    Note: We do NOT collect financial or banking data through our website.
                  </p>
                </div>
              </div>

              {/* Purpose of Processing */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  3. Purpose of Processing
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>We process your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To respond to your inquiries and information requests</li>
                    <li>To manage professional service requests</li>
                    <li>To send requested information about our services</li>
                    <li>To improve our services and user experience</li>
                    <li>To comply with applicable legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Legal Basis */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  4. Legal Basis for Processing
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>The processing of your personal data is based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">User Consent</strong> (Art. 6.1.a GDPR) when you use our contact forms
                    </li>
                    <li>
                      <strong className="text-foreground">Legitimate Interest</strong> (Art. 6.1.f GDPR) for responding to business inquiries
                    </li>
                    <li>
                      <strong className="text-foreground">Contract Performance</strong> (Art. 6.1.b GDPR) for clients who engage our services
                    </li>
                    <li>
                      <strong className="text-foreground">Legal Obligation</strong> (Art. 6.1.c GDPR) when required by applicable regulations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Recipients */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  5. Data Recipients
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Your personal data <strong className="text-foreground">will NOT be disclosed to third parties</strong> except as required by law.
                    The only recipients are:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Hosting and Database Provider:</strong> Supabase (located in the European Union)
                    </li>
                    <li>
                      <strong className="text-foreground">Tax Authorities:</strong> When there is a legal obligation
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Retention */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  6. Data Retention Period
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>We retain your personal data for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Contact Data:</strong> Until you withdraw consent or request deletion
                    </li>
                    <li>
                      <strong className="text-foreground">Client Data:</strong> According to legal tax and commercial obligations (minimum 6 years)
                    </li>
                    <li>
                      <strong className="text-foreground">Navigation Data:</strong> Maximum 2 years from last interaction
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Rights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  7. Your Rights
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Access:</strong> Request information about what personal data we hold about you
                    </li>
                    <li>
                      <strong className="text-foreground">Rectification:</strong> Correct inaccurate or incomplete data
                    </li>
                    <li>
                      <strong className="text-foreground">Erasure:</strong> Request deletion of your data ("right to be forgotten")
                    </li>
                    <li>
                      <strong className="text-foreground">Restriction:</strong> Limit how we use your data
                    </li>
                    <li>
                      <strong className="text-foreground">Portability:</strong> Receive your data in a structured format
                    </li>
                    <li>
                      <strong className="text-foreground">Objection:</strong> Object to the processing of your data
                    </li>
                    <li>
                      <strong className="text-foreground">Withdraw Consent:</strong> At any time, without affecting the lawfulness of prior processing
                    </li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, send an email to{" "}
                    <a href="mailto:info@nrro.es" className="text-accent hover:underline">
                      info@nrro.es
                    </a>{" "}
                    with the subject "Exercise of GDPR Rights" and attach a copy of your identification document.
                  </p>
                </div>
              </div>

              {/* Security Measures */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  8. Security Measures
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>We implement technical and organizational measures to protect your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for all communications</li>
                    <li>Database with Row Level Security (RLS) enabled</li>
                    <li>Access and security event auditing</li>
                    <li>Rate limiting to prevent automated attacks</li>
                    <li>Input data validation with specialized libraries</li>
                    <li>Access restricted to authorized personnel</li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  9. Cookie Policy
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    For detailed information about our use of cookies, please visit our{" "}
                    <Link to="/cookie-policy" className="text-accent hover:underline">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* International Transfers */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  10. International Data Transfers
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Your data is primarily stored and processed within the European Economic Area (EEA). 
                    If any transfer outside the EEA is necessary, we ensure appropriate safeguards are in place, 
                    such as Standard Contractual Clauses approved by the European Commission.
                  </p>
                </div>
              </div>

              {/* Right to Complain */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  11. Right to Lodge a Complaint
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    If you believe your data protection rights have been violated, you have the right to lodge a complaint with:
                  </p>
                  <ul className="list-none space-y-2">
                    <li>
                      <strong className="text-foreground">Spanish Data Protection Agency (AEPD):</strong>{" "}
                      <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        www.aepd.es
                      </a>
                    </li>
                  </ul>
                  <p className="mt-4">
                    We encourage you to contact us first at{" "}
                    <a href="mailto:info@nrro.es" className="text-accent hover:underline">
                      info@nrro.es
                    </a>{" "}
                    so we can address your concerns directly.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  12. Contact Information
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    For any questions about this Privacy Policy, please contact us:
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

export default Privacy;
