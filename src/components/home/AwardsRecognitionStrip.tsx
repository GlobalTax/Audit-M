import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AwardItem {
  name: string;
  shortName: string;
  year: string;
  organization: string;
}

const awards: AwardItem[] = [
  {
    name: "XIX Edición Premios Emprendedores",
    shortName: "PREMIOS EMPRENDEDORES",
    year: "2023",
    organization: "Emprendedores",
  },
  {
    name: "III Edición Premios ProDespachos & Emprendedores (Innovación)",
    shortName: "INNOVACIÓN PRODESPACHOS",
    year: "2023",
    organization: "ProDespachos",
  },
  {
    name: "I Premios Derecho — OBN& · LA RAZÓN",
    shortName: "PREMIOS DERECHO",
    year: "2022",
    organization: "LA RAZÓN",
  },
  {
    name: "Best Tax Advisory Firm – Spain",
    shortName: "BEST TAX FIRM",
    year: "2024",
    organization: "Corporate INTL",
  },
  {
    name: "Top Legal Services Provider",
    shortName: "TOP LEGAL PROVIDER",
    year: "2024",
    organization: "Global Law Experts",
  },
  {
    name: "Excellence in Cross-Border Advisory",
    shortName: "CROSS-BORDER EXCELLENCE",
    year: "2024",
    organization: "Finance Monthly",
  },
  {
    name: "Best Corporate Formation Services",
    shortName: "BEST CORP SERVICES",
    year: "2024",
    organization: "Acquisition Intl",
  },
];

const LaurelWreath = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left branch */}
    <g stroke="currentColor" strokeWidth="1" fill="none">
      {/* Left stem */}
      <path d="M50 95 Q35 75 30 50" strokeWidth="1.5" />
      
      {/* Left leaves */}
      <ellipse cx="28" cy="75" rx="6" ry="12" transform="rotate(-30 28 75)" />
      <ellipse cx="24" cy="62" rx="5" ry="10" transform="rotate(-40 24 62)" />
      <ellipse cx="22" cy="50" rx="5" ry="10" transform="rotate(-50 22 50)" />
      <ellipse cx="22" cy="38" rx="5" ry="10" transform="rotate(-60 22 38)" />
      <ellipse cx="25" cy="27" rx="4" ry="9" transform="rotate(-70 25 27)" />
      <ellipse cx="30" cy="18" rx="4" ry="8" transform="rotate(-80 30 18)" />
      <ellipse cx="38" cy="12" rx="3" ry="7" transform="rotate(-85 38 12)" />
    </g>
    
    {/* Right branch */}
    <g stroke="currentColor" strokeWidth="1" fill="none">
      {/* Right stem */}
      <path d="M50 95 Q65 75 70 50" strokeWidth="1.5" />
      
      {/* Right leaves */}
      <ellipse cx="72" cy="75" rx="6" ry="12" transform="rotate(30 72 75)" />
      <ellipse cx="76" cy="62" rx="5" ry="10" transform="rotate(40 76 62)" />
      <ellipse cx="78" cy="50" rx="5" ry="10" transform="rotate(50 78 50)" />
      <ellipse cx="78" cy="38" rx="5" ry="10" transform="rotate(60 78 38)" />
      <ellipse cx="75" cy="27" rx="4" ry="9" transform="rotate(70 75 27)" />
      <ellipse cx="70" cy="18" rx="4" ry="8" transform="rotate(80 70 18)" />
      <ellipse cx="62" cy="12" rx="3" ry="7" transform="rotate(85 62 12)" />
    </g>
  </svg>
);

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {awards.map((award, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="group flex flex-col items-center cursor-default">
                    {/* Laurel Wreath Badge */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <LaurelWreath className="absolute inset-0 w-full h-full text-foreground/80 group-hover:text-foreground transition-colors duration-200" />
                      
                      {/* Text inside wreath */}
                      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 pt-1">
                        <span className="text-[8px] md:text-[9px] font-medium leading-tight text-foreground/90 uppercase tracking-wide">
                          {award.shortName}
                        </span>
                        <span className="text-xs md:text-sm font-normal text-foreground mt-1">
                          {award.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Organization below */}
                    <span className="text-[10px] md:text-xs text-muted-foreground mt-2 text-center">
                      {award.organization}
                    </span>
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
