import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAwards } from "@/hooks/useAwards";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export const AwardsRecognitionStrip = () => {
  const { data: awards, isLoading } = useAwards();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-32 mx-auto mb-3" />
            <Skeleton className="h-8 w-64 mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-48 rounded-sm" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!awards || awards.length === 0) {
    return null;
  }

  const count = awards.length;
  const gridClass = count <= 2
    ? "flex flex-wrap justify-center gap-4 md:gap-5"
    : count <= 4
      ? "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto"
      : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5";

  return (
    <section 
      className="py-16 md:py-20 bg-background border-t border-border/50"
      aria-label={t("home.awards.title")}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            {t("home.awards.overline")}
          </span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground mt-3">
            {t("home.awards.title")}
          </h2>
        </div>

        {/* Awards Grid */}
        <TooltipProvider>
          <div className={gridClass}>
            {awards.map((award) => (
              <Tooltip key={award.id}>
                <TooltipTrigger asChild>
                  <div 
                    className={`
                      bg-muted/30
                      border border-border/50
                      border-t-4 border-t-accent
                      rounded-sm
                      p-4
                      text-center
                      transition-all duration-200
                      hover:shadow-md hover:shadow-accent/10
                      hover:-translate-y-0.5
                      cursor-default
                      group
                      ${count <= 2 ? 'w-48 md:w-56' : ''}
                    `}
                  >
                    {/* Category */}
                    <span className="text-[10px] text-accent font-medium tracking-widest uppercase">
                      {award.category}
                    </span>
                    
                    {/* Award Name */}
                    <h3 className="text-xs font-medium text-foreground mt-1 uppercase tracking-wide leading-tight min-h-[2rem] flex items-center justify-center">
                      {award.short_name}
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
