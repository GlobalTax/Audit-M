import { useEffect } from "react";
import { Meta } from "@/components/seo/Meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Cookie, Settings } from "lucide-react";

const CookiePolicyEN = () => {
  useEffect(() => {
    // Load Cookiebot declaration script
    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = "https://consent.cookiebot.com/YOUR_COOKIEBOT_ID/cd.js";
    script.type = "text/javascript";
    script.async = true;
    
    const container = document.getElementById("cookiebot-declaration");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  const handleManageCookies = () => {
    if (typeof window !== "undefined" && window.Cookiebot) {
      window.Cookiebot.renew();
    }
  };

  return (
    <>
      <Meta
        title="Cookie Policy | Navarro International"
        description="Learn about how Navarro International uses cookies and similar technologies to enhance your experience and analyze site traffic."
        canonicalUrl="/cookie-policy"
      />

      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-white/20 text-white/90 bg-white/5">
              <Cookie className="w-3.5 h-3.5 mr-1.5" />
              Cookie Policy
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-display font-normal text-white mb-6">
              Cookie Policy
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed">
              This policy explains how Navarro International uses cookies and similar technologies 
              to recognize you when you visit our website at global.nrro.es.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Manage Preferences CTA */}
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Manage Your Cookie Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    You can change your cookie settings at any time.
                  </p>
                </div>
              </div>
              <Button onClick={handleManageCookies} variant="outline">
                Manage Cookies
              </Button>
            </div>

            {/* What Are Cookies */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                What Are Cookies?
              </h2>
              <p className="text-muted-foreground mb-8">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently, provide 
                information to site owners, and improve user experience.
              </p>

              {/* Cookie Categories */}
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded bg-green-500/10">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Essential Cookies</h3>
                    <Badge variant="secondary" className="ml-auto">Always Active</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    These cookies are necessary for the website to function and cannot be disabled. 
                    They are usually set in response to actions you take, such as setting your privacy 
                    preferences, logging in, or filling in forms.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded bg-blue-500/10">
                      <Cookie className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Analytics Cookies</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. We use Google Analytics 4 to analyze site 
                    traffic and user behavior to improve our services.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded bg-purple-500/10">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Preference Cookies</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    These cookies allow the website to remember choices you make (such as your language 
                    preference or the region you are in) and provide enhanced, more personalized features.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded bg-amber-500/10">
                      <Cookie className="h-4 w-4 text-amber-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Marketing Cookies</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    These cookies may be set through our site by our advertising partners. They may be 
                    used to build a profile of your interests and show you relevant adverts on other sites.
                  </p>
                </div>
              </div>

              {/* Cookiebot Declaration - Auto-generated cookie list */}
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                Cookie Declaration
              </h2>
              <p className="text-muted-foreground mb-6">
                Below is a detailed list of all cookies used on this website, automatically updated by 
                our consent management platform:
              </p>
              <div 
                id="cookiebot-declaration" 
                className="border border-border rounded-lg p-6 bg-muted/30 min-h-[200px]"
              >
                <p className="text-muted-foreground text-sm italic">
                  Loading cookie declaration...
                </p>
              </div>

              {/* How to Control Cookies */}
              <h2 className="text-2xl font-display font-normal text-foreground mt-12 mb-4">
                How to Control Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your 
                cookie preferences by clicking on the "Manage Cookies" button above.
              </p>
              <p className="text-muted-foreground mb-4">
                You can also set or amend your web browser controls to accept or refuse cookies. If you 
                choose to reject cookies, you may still use our website though your access to some 
                functionality may be restricted.
              </p>
              <p className="text-muted-foreground mb-8">
                For more information on how to manage cookies in your browser, visit:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>

              {/* Google Analytics Opt-Out */}
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                Google Analytics Opt-Out
              </h2>
              <p className="text-muted-foreground mb-8">
                You can opt out of Google Analytics by installing the{" "}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>

              {/* GDPR Rights */}
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                Your Rights Under GDPR
              </h2>
              <p className="text-muted-foreground mb-4">
                Under the General Data Protection Regulation (GDPR), you have the following rights 
                regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent at any time</li>
              </ul>

              {/* Contact */}
              <h2 className="text-2xl font-display font-normal text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please 
                contact us:
              </p>
              <div className="bg-muted/50 border border-border rounded-lg p-6">
                <p className="text-foreground font-medium mb-2">Navarro International</p>
                <p className="text-muted-foreground text-sm">
                  Passeig de Gràcia, 11<br />
                  08007 Barcelona, Spain<br />
                  Email: privacy@nrro.es<br />
                  Phone: +34 934 593 600
                </p>
              </div>

              {/* Last Updated */}
              <p className="text-sm text-muted-foreground mt-12">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicyEN;
