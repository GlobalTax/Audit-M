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

const GoldenLaurelWreath = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Star at top */}
    <polygon 
      fill="currentColor" 
      points="50,0 52.5,7 60,7 54,12 56,20 50,16 44,20 46,12 40,7 47.5,7"
    />
    
    {/* Left branch with filled leaves */}
    <g fill="currentColor">
      {/* Left stem */}
      <path d="M48 108 Q32 85 28 55" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Left leaves - bottom to top */}
      <path d="M35 95 Q28 88 30 78 Q38 82 35 95" />
      <path d="M30 82 Q22 74 24 64 Q33 68 30 82" />
      <path d="M26 68 Q18 60 20 50 Q29 54 26 68" />
      <path d="M24 54 Q16 46 18 36 Q27 40 24 54" />
      <path d="M24 40 Q18 32 22 22 Q29 28 24 40" />
      <path d="M28 28 Q24 18 30 10 Q35 18 28 28" />
      <path d="M36 18 Q34 8 42 4 Q44 14 36 18" />
    </g>
    
    {/* Right branch with filled leaves */}
    <g fill="currentColor">
      {/* Right stem */}
      <path d="M52 108 Q68 85 72 55" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Right leaves - bottom to top */}
      <path d="M65 95 Q72 88 70 78 Q62 82 65 95" />
      <path d="M70 82 Q78 74 76 64 Q67 68 70 82" />
      <path d="M74 68 Q82 60 80 50 Q71 54 74 68" />
      <path d="M76 54 Q84 46 82 36 Q73 40 76 54" />
      <path d="M76 40 Q82 32 78 22 Q71 28 76 40" />
      <path d="M72 28 Q76 18 70 10 Q65 18 72 28" />
      <path d="M64 18 Q66 8 58 4 Q56 14 64 18" />
    </g>
    
    {/* Decorative dot at bottom */}
    <circle cx="50" cy="115" r="3" fill="currentColor" />
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
                    <div className="relative w-28 h-32 md:w-32 md:h-36 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <GoldenLaurelWreath className="absolute inset-0 w-full h-full text-[#C9A227] group-hover:text-[#D4AF37] transition-colors duration-200" />
                      
                      {/* Text inside wreath */}
                      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-3">
                        <span className="text-[9px] md:text-[10px] font-medium leading-tight text-[#8B7355] uppercase tracking-wider">
                          {award.category}
                        </span>
                        <span className="text-[10px] md:text-xs font-medium leading-tight text-foreground uppercase tracking-wide mt-0.5">
                          {award.shortName}
                        </span>
                        <span className="text-sm md:text-base font-normal text-foreground mt-1">
                          {award.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Organization below */}
                    <span className="text-[10px] md:text-xs text-muted-foreground mt-1 text-center">
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
