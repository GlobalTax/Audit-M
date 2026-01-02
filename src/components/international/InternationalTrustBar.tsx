import { Globe, Clock, Building2, Award } from "lucide-react";

interface Stat {
  value: string;
  label: string;
  icon: React.ElementType;
}

interface InternationalTrustBarProps {
  overline?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "50+", label: "Jurisdictions", icon: Globe },
  { value: "25+", label: "Years Experience", icon: Clock },
  { value: "500+", label: "International Clients", icon: Building2 },
  { value: "98%", label: "Client Retention", icon: Award },
];

export const InternationalTrustBar = ({
  overline = "Trusted by Leading Multinationals",
  stats = defaultStats,
}: InternationalTrustBarProps) => {
  return (
    <section className="py-12 md:py-16 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overline */}
        <p className="font-mono text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-10 text-center">
          {overline}
        </p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-semibold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
