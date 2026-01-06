import { Trophy, Scale, Award, Building2, Star, Globe } from "lucide-react";

interface AwardItem {
  name: string;
  year: string;
  organization: string;
  icon: React.ElementType;
}

const awards: AwardItem[] = [
  {
    name: "Best Tax Advisory Firm – Spain",
    year: "2025",
    organization: "Corporate INTL Global Awards",
    icon: Trophy,
  },
  {
    name: "Top Legal Services Provider",
    year: "2024",
    organization: "Global Law Experts",
    icon: Scale,
  },
  {
    name: "Excellence in Cross-Border Advisory",
    year: "2024",
    organization: "Finance Monthly",
    icon: Award,
  },
  {
    name: "Best Corporate Formation Services",
    year: "2024",
    organization: "Acquisition International",
    icon: Building2,
  },
  {
    name: "Recommended Firm – Corporate Tax",
    year: "2023-2025",
    organization: "Legal 500",
    icon: Star,
  },
  {
    name: "Top Tier – International Tax Planning",
    year: "2024",
    organization: "World Tax",
    icon: Globe,
  },
];

export const AwardsRecognitionStrip = () => {
  return (
    <section 
      className="bg-white py-16 md:py-20 border-y border-border"
      aria-label="Awards and Recognition"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-3">
            Awards & Accolades
          </h2>
          <p className="text-lg text-muted-foreground">
            Recognized for Excellence in Corporate Advisory
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <div
                key={index}
                className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-medium text-foreground leading-tight mb-2">
                  {award.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {award.year}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {award.organization}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
