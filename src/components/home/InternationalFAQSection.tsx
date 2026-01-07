import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAnalytics } from "@/hooks/useAnalytics";

const faqs = [
  {
    id: "spanish-director",
    question: "Do we need a Spanish director?",
    answer: "Not necessarily. Spanish companies (SL/SA) can have non-resident directors, though you'll need an NIE (tax ID). However, having a local director can simplify certain banking and administrative procedures. We can discuss what makes sense for your structure.",
  },
  {
    id: "incorporation-timeline",
    question: "How long does company registration take?",
    answer: "For a standard SL incorporation with all documents ready, expect 2-4 weeks. This includes obtaining NIEs if needed, notarization, and Commercial Registry filing. Express services can reduce this timeline.",
  },
  {
    id: "monthly-management",
    question: "Can you manage payroll and taxes monthly?",
    answer: "Yes. We offer ongoing compliance packages that cover monthly tax filings (VAT, withholdings), payroll processing, accounting, and annual corporate tax returns—all managed from a single point of contact.",
  },
  {
    id: "english-service",
    question: "Do you work in English?",
    answer: "Absolutely. Our international team operates in English as the primary working language. All communications, reports, and documentation explanations are provided in English, with Spanish originals where legally required.",
  },
  {
    id: "fee-structure",
    question: "What are your fees?",
    answer: "We work on fixed-fee engagements whenever possible. You'll receive a clear proposal with scope and pricing before any work begins. Ongoing compliance services are billed monthly with transparent pricing—no hidden costs.",
  },
  {
    id: "hq-coordination",
    question: "Can you coordinate with our HQ counsel?",
    answer: "Yes, we regularly work alongside in-house legal, finance, and HR teams. We provide documentation and explanations that your HQ can easily review, and we're available for calls across time zones.",
  },
  {
    id: "remote-operations",
    question: "Do you support remote operations?",
    answer: "We support international companies operating remotely in Spain, including those without a physical office. We can provide registered office addresses and help structure compliant remote work arrangements.",
  },
  {
    id: "documents-needed",
    question: "What documents do we need to start?",
    answer: "Typically: parent company documents (certificate of incorporation, board resolution), passports of shareholders/directors, and proof of address. For non-EU shareholders, apostilled documents may be required. We'll provide a tailored checklist.",
  },
];

export function InternationalFAQSection() {
  const { trackFAQInteraction } = useAnalytics();

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-6 text-center">
            Common Questions
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-12">
            For International Clients
          </h3>

          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            onValueChange={(value) => {
              if (value) {
                const faqIndex = faqs.findIndex(f => f.id === value);
                const faq = faqs[faqIndex];
                if (faq) {
                  trackFAQInteraction({
                    eventName: `faq_expand_${value}_global_nrro`,
                    faqQuestion: faq.question,
                    faqIndex,
                    faqCategory: "home_international_faq",
                  });
                }
              }
            }}
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white border border-border rounded-xl px-6 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
