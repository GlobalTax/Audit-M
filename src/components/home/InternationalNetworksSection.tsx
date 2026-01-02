import { ExternalLink } from 'lucide-react';

interface NetworkInfo {
  name: string;
  shortName: string;
  description: string;
  url: string;
}

const internationalNetworks: NetworkInfo[] = [
  {
    name: "Integra International",
    shortName: "II",
    description: "A thriving international association of leading independent accounting, law and business advisory firms offering a unified global platform.",
    url: "https://integra-international.net/"
  },
  {
    name: "XLNC",
    shortName: "XLNC",
    description: "A global alliance of innovative and entrepreneurial professional services organizations delivering exceptional multi-jurisdictional service.",
    url: "https://xlnc.org/"
  },
  {
    name: "SBC Global Alliance",
    shortName: "SBC",
    description: "A global association of leading independent firms providing audit, tax, accounting, assurance and business advisory services worldwide.",
    url: "https://www.sbcglobalalliance.co.uk/"
  }
];

export function InternationalNetworksSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-16 text-center">
          Global Network Memberships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {internationalNetworks.map((network) => (
            <a
              key={network.name}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-muted/50 border border-border rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-full bg-foreground/5 border border-border flex items-center justify-center">
                  <span className="font-mono text-sm font-medium text-foreground/70">
                    {network.shortName}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 transition-colors" />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-3">
                {network.name}
              </h3>

              <p className="text-sm text-foreground/60 leading-relaxed">
                {network.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InternationalNetworksSection;
