import { usePageContent } from "@/hooks/usePageContent";
import { CTAFinalContent } from "@/types/pageContent";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTAFinalSection = () => {
  const { data: contentData } = usePageContent("services", "cta_final");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as CTAFinalContent;

  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            {content.titulo}
          </h2>
          
          <p className="text-xl text-background/80">
            {content.descripcion}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 group"
            >
              <Link to={content.cta_primario_url}>
                {content.cta_primario_texto}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            {content.cta_secundario_texto && content.cta_secundario_url && (
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-background/30 text-background hover:bg-background/10"
              >
                <Link to={content.cta_secundario_url}>
                  {content.cta_secundario_texto}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
