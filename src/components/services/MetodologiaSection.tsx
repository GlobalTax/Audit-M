import { usePageContent } from "@/hooks/usePageContent";
import { MetodologiaServiciosContent } from "@/types/pageContent";
import { ArrowRight } from "lucide-react";

export const MetodologiaSection = () => {
  const { data: contentData } = usePageContent("services", "metodologia");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as MetodologiaServiciosContent;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - 3 columns layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          <div className="relative">
            <h3 className="font-mono font-light text-sm md:text-base tracking-tight text-foreground/70 pb-3">
              {content.overline}
            </h3>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
              {content.titulo}
            </h2>
          </div>
          
          <div>
            <p className="text-base text-foreground/70 leading-relaxed">
              {content.descripcion}
            </p>
          </div>
        </div>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-10">
          {content.pasos.map((paso, index) => (
            <div key={index} className="relative group">
              {/* Connection arrow - hidden on last item and mobile */}
              {index < content.pasos.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-10 -ml-5 z-0">
                  <ArrowRight className="w-6 h-6 text-border group-hover:text-foreground/50 transition-colors" />
                </div>
              )}
              
              <div className="relative z-10">
                {/* Number */}
                <div className="text-5xl md:text-6xl font-light text-foreground/10 mb-6">
                  {paso.numero}
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-normal mb-3 leading-tight">
                  {paso.titulo}
                </h3>
                
                {/* Description */}
                <p className="text-base text-foreground/70 leading-relaxed">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
