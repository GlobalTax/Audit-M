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
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeader
          overline={content.overline}
          title={content.titulo}
          className="text-center"
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {content.preguntas.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold pr-4">
                    {faq.pregunta}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
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
