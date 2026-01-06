import { Trophy, Award, Scale } from "lucide-react";

interface AwardItem {
  name: string;
  year: string;
  organization: string;
  icon: React.ElementType;
}

const awards: AwardItem[] = [
  {
    name: "XIX Edición Premios Emprendedores",
    year: "2023",
    organization: "Emprendedores",
    icon: Trophy,
  },
  {
    name: "III Edición Premios ProDespachos & Emprendedores",
    year: "2023",
    organization: "Innovación",
    icon: Award,
  },
  {
    name: "I Premios Derecho",
    year: "2022",
    organization: "OBN& · LA RAZÓN",
    icon: Scale,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
