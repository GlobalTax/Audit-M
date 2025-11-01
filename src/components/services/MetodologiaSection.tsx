import { usePageContent } from "@/hooks/usePageContent";
import { MetodologiaServiciosContent } from "@/types/pageContent";
import { SectionHeader } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";

export const MetodologiaSection = () => {
  const { data: contentData } = usePageContent("services", "metodologia");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as MetodologiaServiciosContent;

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeader
          overline={content.overline}
          title={content.titulo}
          description={content.descripcion}
          className="text-center"
        />
        
        <div className="mt-12 grid md:grid-cols-4 gap-6 lg:gap-8">
          {content.pasos.map((paso, index) => (
            <div key={index} className="relative group">
              {/* Connection arrow - hidden on last item and mobile */}
              {index < content.pasos.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-8 -ml-4 z-0">
                  <ArrowRight className="w-8 h-8 text-primary/30 group-hover:text-primary transition-colors" />
                </div>
              )}
              
              <div className="relative z-10">
                {/* Number */}
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {paso.numero}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">
                  {paso.titulo}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground">
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
