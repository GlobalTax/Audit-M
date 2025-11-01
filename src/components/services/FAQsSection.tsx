import { usePageContent } from "@/hooks/usePageContent";
import { FAQsContent } from "@/types/pageContent";
import { SectionHeader } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQsSection = () => {
  const { data: contentData } = usePageContent("services", "faqs");
  
  if (!contentData || contentData.length === 0) return null;
  
  const content = contentData[0].content as FAQsContent;

  return (
    <section className="bg-background py-20 md:py-28">
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
        
        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {content.preguntas.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-foreground pr-4">
                    {faq.pregunta}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70 leading-relaxed pt-2">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
