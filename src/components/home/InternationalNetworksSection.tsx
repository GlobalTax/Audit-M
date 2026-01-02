import { ExternalLink, Globe, Users, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NetworkInfo {
  name: string;
  description: string;
  url: string;
  benefits: string[];
  logoPlaceholder: string;
  icon: React.ReactNode;
}

const internationalNetworks: NetworkInfo[] = [
  {
    name: "Integra International",
    description: "A thriving international association of leading independent accounting, law and business advisory firms offering a unified global platform for cross-border collaboration.",
    url: "https://integra-international.net/",
    benefits: ["Business Referrals", "Professional Collaboration", "Specialized Education"],
    logoPlaceholder: "INTEGRA",
    icon: <Globe className="h-6 w-6" />
  },
  {
    name: "XLNC",
    description: "A global alliance of innovative and entrepreneurial professional services organizations delivering exceptional multi-jurisdictional service across 208 offices in 50 countries.",
    url: "https://xlnc.org/",
    benefits: ["208 Offices", "50 Countries", "3,100+ Professionals"],
    logoPlaceholder: "XLNC",
    icon: <Users className="h-6 w-6" />
  },
  {
    name: "SBC Global Alliance",
    description: "A global association of leading independent firms providing audit, tax, accounting, assurance and business advisory services in key financial centres worldwide.",
    url: "https://www.sbcglobalalliance.co.uk/",
    benefits: ["Global Financial Centres", "Expert Knowledge", "Personal Approach"],
    logoPlaceholder: "SBC",
    icon: <Building2 className="h-6 w-6" />
  }
];

const globalBenefits = [
  {
    title: "Global Reach",
    description: "Access to trusted partners in 50+ countries"
  },
  {
    title: "Local Expertise",
    description: "Seamless cross-border collaboration with vetted professionals"
  },
  {
    title: "Quality Assurance",
    description: "Member firms sharing values, standards, and best practices"
  }
];

export function InternationalNetworksSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            Global Network Memberships
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connected to Leading International Professional Networks
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our membership in prestigious global alliances enables us to deliver seamless cross-border advisory services, 
            connecting you with trusted professionals in every major jurisdiction.
          </p>
        </div>

        {/* Network Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {internationalNetworks.map((network) => (
            <Card 
              key={network.name}
              className="group bg-background border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                {/* Logo Placeholder */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {network.icon}
                    </div>
                    <span className="text-sm font-bold tracking-wide text-muted-foreground group-hover:text-primary transition-colors">
                      {network.logoPlaceholder}
                    </span>
                  </div>
                  <a 
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${network.name} website`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>

                {/* Network Name */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {network.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {network.description}
                </p>

                {/* Benefits/Stats */}
                <div className="flex flex-wrap gap-2">
                  {network.benefits.map((benefit) => (
                    <Badge 
                      key={benefit}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8 border-t border-border/50">
          {globalBenefits.map((benefit, index) => (
            <div key={index} className="text-center md:text-left">
              <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
