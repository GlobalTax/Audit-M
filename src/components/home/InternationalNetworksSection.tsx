import { ExternalLink } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { Skeleton } from '@/components/ui/skeleton';

interface NetworkInfo {
  name: string;
  shortName: string;
  description: string;
  website_url: string;
  logo_url: string;
}

const fallbackNetworks: NetworkInfo[] = [
  {
    name: "Integra International",
    shortName: "II",
    description: "A thriving international association of leading independent accounting, law and business advisory firms offering a unified global platform.",
    website_url: "https://integra-international.net/",
    logo_url: ""
  },
  {
    name: "XLNC",
    shortName: "XLNC",
    description: "A global alliance of innovative and entrepreneurial professional services organizations delivering exceptional multi-jurisdictional service.",
    website_url: "https://xlnc.org/",
    logo_url: ""
  },
  {
    name: "SBC Global Alliance",
    shortName: "SBC",
    description: "A global association of leading independent firms providing audit, tax, accounting, assurance and business advisory services worldwide.",
    website_url: "https://www.sbcglobalalliance.co.uk/",
    logo_url: ""
  }
];

export function InternationalNetworksSection() {
  const { data: contentData, isLoading } = usePageContent("home", "redes_internacionales", "en");
  
  const content = contentData?.[0]?.content;
  const networks: NetworkInfo[] = content?.logos?.length > 0 ? content.logos : fallbackNetworks;
  const overline = content?.overline || "Global Network Memberships";

  if (isLoading) {
    return (
      <section className="py-24 md:py-32 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-48 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-16 text-center">
          {overline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {networks.map((network) => (
            <a
              key={network.name}
              href={network.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-muted/50 border border-border rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-full bg-foreground/5 border border-border flex items-center justify-center overflow-hidden">
                  {network.logo_url ? (
                    <img 
                      src={network.logo_url} 
                      alt={network.name}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="font-mono text-sm font-medium text-foreground/70">
                      {network.shortName}
                    </span>
                  )}
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
