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

const Cookies = () => {
  const lastUpdate = "January 2025";
  
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Legal Notice", url: "/legal-notice" },
    { name: "Cookie Policy", url: "/cookie-policy" },
  ];

  return (
    <>
      <Meta
        title="Cookie Policy | Navarro International"
        description="Learn about how Navarro International uses cookies and similar technologies on our website."
        keywords="cookie policy, cookies, privacy, GDPR, data protection"
        canonicalUrl="/cookie-policy"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Information about the cookies we use
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
                <BreadcrumbPage>Cookie Policy</BreadcrumbPage>
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
              
              {/* Cookie Controller */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  1. Cookie Controller
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    The cookies used on this website are managed by the following entities of the Navarro Business Group:
                  </p>

                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Navarro Business Group
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Joint cookie management responsibility
                    </p>
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
                </div>
              </div>
              
              {/* What are cookies? */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  2. What Are Cookies?
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    Cookies are small text files that websites store on your device when you visit them. They allow the site to remember information about your visit, which can improve your experience.
                  </p>
                  <p>
                    Cookies can be of different types:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Session Cookies:</strong> Deleted when you close your browser.
                    </li>
                    <li>
                      <strong className="text-foreground">Persistent Cookies:</strong> Remain on your device for a specified period.
                    </li>
                    <li>
                      <strong className="text-foreground">First-Party Cookies:</strong> Managed by the website you are visiting.
                    </li>
                    <li>
                      <strong className="text-foreground">Third-Party Cookies:</strong> Managed by a third party, such as a service provider.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Types of cookies we use */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  3. Types of Cookies We Use
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    On this website, we use the following types of cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Essential Cookies:</strong> These are necessary for the website to function and allow you to navigate and use its features.
                    </li>
                    <li>
                      <strong className="text-foreground">Analytics Cookies:</strong> These help us understand how you use the website so we can improve it.
                    </li>
                    <li>
                      <strong className="text-foreground">Preference Cookies:</strong> These remember your preferences (such as language) to provide a more personalized experience.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  4. Purpose of Cookies
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    The cookies we use serve the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Essential:</strong> Ensure the proper functioning of the website.
                    </li>
                    <li>
                      <strong className="text-foreground">Analytics:</strong> Analyze how you use the website to improve it.
                    </li>
                    <li>
                      <strong className="text-foreground">Preferences:</strong> Remember your preferences to provide a more personalized experience.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Legal Basis */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  5. Legal Basis
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    The legal basis for the use of essential cookies is our legitimate interest in ensuring the proper functioning of the website.
                  </p>
                  <p>
                    The legal basis for the use of analytics and preference cookies is your consent, which you can withdraw at any time.
                  </p>
                </div>
              </div>

              {/* How to Manage Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  6. How to Manage Cookies
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    You can manage cookies through your browser settings. You can allow, block, or delete cookies installed on your device.
                  </p>
                  <p>
                    For more information on how to manage cookies, consult your browser's documentation:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Microsoft Edge
                      </a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Apple Safari
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  7. Third-Party Cookies
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    This website may use third-party cookies to enhance user experience and provide personalized content.
                  </p>
                  <p>
                    These cookies are managed by third parties and are subject to their own privacy policies.
                  </p>
                  <p>
                    You can review the privacy policies of the third parties we use on their respective websites.
                  </p>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  8. Policy Updates
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    We may update this Cookie Policy from time to time. We recommend that you review it periodically to stay informed of any changes.
                  </p>
                  <p>
                    The date of the last update is indicated at the top of this page.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  9. Contact Information
                </h2>
                <div className="space-y-3 text-foreground">
                  <p>
                    If you have any questions about this Cookie Policy, please contact us:
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

export default Cookies;
