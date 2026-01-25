import { useLanguage } from "@/contexts/LanguageContext";
import { Overline } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqKeys = [
  "obligatorio",
  "simplificada",
  "prtrIncumplimiento",
  "dnsh",
  "coste",
  "documentacion",
  "tiempo",
  "irregularidades",
];

export const SubsidyFAQSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Overline className="mb-3">{t('subsidyHub.faq.overline')}</Overline>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            {t('subsidyHub.faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subsidyHub.faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key, index) => (
              <AccordionItem
                key={key}
                value={key}
                className="bg-background border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium text-foreground pr-4">
                    {t(`subsidyHub.faq.items.${key}.question`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {t(`subsidyHub.faq.items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
