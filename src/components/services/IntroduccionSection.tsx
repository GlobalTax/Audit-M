import { usePageContent } from "@/hooks/usePageContent";
import { IntroduccionServiciosContent } from "@/types/pageContent";
import { SectionHeader } from "@/components/ui/typography";
import { CheckCircle2 } from "lucide-react";

export const IntroduccionSection = () => {
  const { data: contentData } = usePageContent("services", "introduccion");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as IntroduccionServiciosContent;

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left: Overline */}
          <div className="md:col-span-3">
            <div className="text-overline sticky top-24">
              {content.overline}
            </div>
          </div>
          
          {/* Middle: Title */}
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {content.titulo}
            </h2>
          </div>
          
          {/* Right: Description + Points */}
          <div className="md:col-span-5 space-y-6">
            <p className="text-lead text-muted-foreground">
              {content.descripcion}
            </p>
            
            <ul className="space-y-3">
              {content.puntos.map((punto, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
