import { usePageContent } from "@/hooks/usePageContent";
import { AreasDestacadasContent } from "@/types/pageContent";
import { SectionHeader } from "@/components/ui/typography";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AreasDestacadasSection = () => {
  const { data: contentData } = usePageContent("services", "areas_destacadas");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as AreasDestacadasContent;

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <SectionHeader
          overline={content.overline}
          title={content.titulo}
          className="text-center"
        />
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {content.areas.map((area, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {getIconComponent(area.icono)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                      {area.nombre}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {area.descripcion}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {area.servicios_ejemplo.map((servicio, idx) => (
                    <Badge key={idx} variant="secondary">
                      {servicio}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
