import { Trophy, Award, Scale, Star, Building2, Globe, Landmark } from "lucide-react";

interface AwardItem {
  name: string;
  year: string;
  organization: string;
  icon: React.ElementType;
  logoUrl?: string;
}

const awards: AwardItem[] = [
  {
    name: "XIX Edición Premios Emprendedores",
    year: "2023",
    organization: "Emprendedores",
    icon: Trophy,
    logoUrl: "https://www.emprendedores.es/wp-content/uploads/2020/01/logo-emprendedores.png",
  },
  {
    name: "III Edición Premios ProDespachos & Emprendedores",
    year: "2023",
    organization: "Innovación",
    icon: Award,
    logoUrl: "https://prodespachos.com/wp-content/uploads/2021/03/logo-prodespachos.png",
  },
  {
    name: "I Premios Derecho",
    year: "2022",
    organization: "OBN& · LA RAZÓN",
    icon: Scale,
    logoUrl: "https://www.larazon.es/documents/10165/0/992x558/0c0/0d0/none/10810/DCTO/image_content_38889367_20220322132854.jpg",
  },
  {
    name: "Best Tax Advisory Firm – Spain",
    year: "2024",
    organization: "Corporate INTL",
    icon: Star,
  },
  {
    name: "Top Legal Services Provider",
    year: "2024",
    organization: "Global Law Experts",
    icon: Landmark,
  },
  {
    name: "Excellence in Cross-Border Advisory",
    year: "2024",
    organization: "Finance Monthly",
    icon: Globe,
  },
  {
    name: "Best Corporate Formation Services",
    year: "2024",
    organization: "Acquisition International",
    icon: Building2,
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <div
                key={index}
                className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                {/* Logo or Icon */}
                <div className="h-16 flex items-center justify-center mb-4">
                  {award.logoUrl ? (
                    <img 
                      src={award.logoUrl} 
                      alt={award.organization}
                      className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-200"
                      onError={(e) => {
                        // Fallback to icon if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 ${award.logoUrl ? 'hidden' : ''}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
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
