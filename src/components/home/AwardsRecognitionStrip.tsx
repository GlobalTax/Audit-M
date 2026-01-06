import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AwardItem {
  name: string;
  category: string;
  shortName: string;
  year: string;
  organization: string;
}

const awards: AwardItem[] = [
  {
    name: "XIX Edición Premios Emprendedores",
    category: "PREMIO",
    shortName: "EMPRENDEDORES",
    year: "2023",
    organization: "Emprendedores",
  },
  {
    name: "III Edición Premios ProDespachos & Emprendedores (Innovación)",
    category: "PREMIO",
    shortName: "INNOVACIÓN",
    year: "2023",
    organization: "ProDespachos",
  },
  {
    name: "I Premios Derecho — OBN& · LA RAZÓN",
    category: "PREMIO",
    shortName: "DERECHO",
    year: "2022",
    organization: "LA RAZÓN",
  },
  {
    name: "Best Tax Advisory Firm – Spain",
    category: "BEST",
    shortName: "TAX FIRM",
    year: "2024",
    organization: "Corporate INTL",
  },
  {
    name: "Top Legal Services Provider",
    category: "TOP",
    shortName: "LEGAL",
    year: "2024",
    organization: "Global Law Experts",
  },
  {
    name: "Excellence in Cross-Border Advisory",
    category: "AWARD",
    shortName: "CROSS-BORDER",
    year: "2024",
    organization: "Finance Monthly",
  },
  {
    name: "Best Corporate Formation Services",
    category: "BEST",
    shortName: "CORPORATE",
    year: "2024",
    organization: "Acquisition Intl",
  },
];

export const AwardsRecognitionStrip = () => {
  return (
    <section 
      className="py-16 md:py-20 bg-background border-t border-border/50"
      aria-label="Awards and Recognition"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            Awards & Accolades
          </span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground mt-3">
            Recognized for Excellence
          </h2>
        </div>

        {/* Awards Grid */}
        <TooltipProvider>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
            {awards.map((award, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="
                      bg-neutral-50 
                      border border-border/50
                      border-t-4 border-t-[#C9A227]
                      rounded-sm
                      p-4
                      text-center
                      transition-all duration-200
                      hover:shadow-md hover:shadow-[#C9A227]/10
                      hover:-translate-y-0.5
                      cursor-default
                      group
                    "
                  >
                    {/* Category */}
                    <span className="text-[10px] text-[#C9A227] font-medium tracking-widest uppercase">
                      {award.category}
                    </span>
                    
                    {/* Award Name */}
                    <h3 className="text-xs font-medium text-foreground mt-1 uppercase tracking-wide leading-tight min-h-[2rem] flex items-center justify-center">
                      {award.shortName}
                    </h3>
                    
                    {/* Year */}
                    <span className="text-lg font-normal text-foreground block mt-1">
                      {award.year}
                    </span>
                    
                    {/* Divider + Organization */}
                    <div className="border-t border-border/50 mt-3 pt-2">
                      <span className="text-[10px] text-muted-foreground">
                        {award.organization}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{award.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default AwardsRecognitionStrip;
