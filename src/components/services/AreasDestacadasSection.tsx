import { usePageContent } from "@/hooks/usePageContent";
import { AreasDestacadasContent } from "@/types/pageContent";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AreasDestacadasSection = () => {
  const { data: contentData } = usePageContent("services", "areas_destacadas");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as AreasDestacadasContent;

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || null;
  };

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - 3 columns layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          <div className="relative">
            <h3 className="font-mono font-light text-sm md:text-base tracking-tight text-foreground/70 pb-3">
              {content.overline}
            </h3>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
              {content.titulo}
            </h2>
          </div>
        </div>
        
        {/* Areas Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.areas.map((area, index) => {
            const IconComponent = getIconComponent(area.icono);
            
            return (
              <div key={index} className="bg-white rounded-lg p-8 lg:p-10">
                {/* Category with line */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-border">
                  {IconComponent && (
                    <IconComponent className="w-5 h-5 text-foreground/70" />
                  )}
                  <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                    {area.nombre}
                  </span>
                </div>
                
                <p className="text-base text-foreground/70 leading-relaxed mb-6">
                  {area.descripcion}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {area.servicios_ejemplo.map((servicio, idx) => (
                    <Badge key={idx} variant="secondary" className="font-normal">
                      {servicio}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
