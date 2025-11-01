import { usePageContent } from "@/hooks/usePageContent";
import { CTAContent } from "@/types/pageContent";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  sectionKey?: string;
}

export const CTASection = ({ sectionKey = "cta_consulta" }: CTASectionProps) => {
  const { data: contentData } = usePageContent("services", sectionKey);
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as CTAContent;

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {content.titulo}
          </h2>
          
          <p className="text-lg text-muted-foreground">
            {content.descripcion}
          </p>
          
          <div className="pt-4">
            <Button asChild size="lg" className="group">
              <Link to={content.cta_url}>
                {content.cta_texto}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
