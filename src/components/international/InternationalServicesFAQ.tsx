import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const faqs = [
  {
    question: "What international accounting standards do you support?",
    answer: "We provide full compliance with IFRS, local GAAP, and multi-jurisdiction reporting requirements. Our team ensures accurate consolidation, intercompany reconciliation, and real-time financial visibility across all your entities worldwide.",
    eventName: "faq_expand_accounting_standards_global_nrro",
    category: "accounting"
  },
  {
    question: "How can cross-border tax planning reduce my company's tax burden?",
    answer: "Through strategic analysis of double taxation agreements, holding structures, and jurisdiction-specific incentives, we identify opportunities to optimise your global effective tax rate while maintaining full compliance with local and international regulations.",
    eventName: "faq_expand_tax_planning_global_nrro",
    category: "tax"
  },
  {
    question: "Can you manage payroll across multiple countries?",
    answer: "Yes. We deliver compliant payroll processing in multiple jurisdictions, handling local tax withholdings, social security contributions, employment contracts, and statutory reporting—all from a single point of contact.",
    eventName: "faq_expand_payroll_global_nrro",
    category: "payroll"
  },
  {
    question: "What corporate legal services do you offer for international operations?",
    answer: "Our legal team supports entity formation, corporate governance, cross-border contracts, M&A transactions, regulatory compliance, and ongoing legal administration for subsidiaries and branches in multiple jurisdictions.",
    eventName: "faq_expand_legal_services_global_nrro",
    category: "legal"
  },
  {
    question: "How do you help with treasury and cash flow management?",
    answer: "We implement cash pooling structures, optimise intercompany financing, manage FX exposure, and provide real-time cash visibility across entities—ensuring efficient liquidity management for your global operations.",
    eventName: "faq_expand_treasury_global_nrro",
    category: "treasury"
  },
  {
    question: "What is transfer pricing and why is it important?",
    answer: "Transfer pricing governs how transactions between related entities are priced. Proper documentation and arm's length pricing are essential to avoid tax penalties and disputes with authorities. We prepare compliant policies and documentation across all jurisdictions.",
    eventName: "faq_expand_transfer_pricing_global_nrro",
    category: "transfer_pricing"
  },
  {
    question: "Can you provide local presence without establishing a subsidiary?",
    answer: "Yes. Through our governance and representation services, we can act as your local registered office, provide nominee directors where permitted, and handle regulatory filings—giving you operational presence without full entity setup.",
    eventName: "faq_expand_local_presence_global_nrro",
    category: "governance"
  },
  {
    question: "How long does it take to set up a subsidiary in a new country?",
    answer: "Timelines vary by jurisdiction, typically ranging from 2-8 weeks. We manage the entire process including entity registration, tax registrations, bank account opening, and initial compliance setup to ensure a smooth market entry.",
    eventName: "faq_expand_subsidiary_setup_global_nrro",
    category: "entity_setup"
  },
  {
    question: "Do you support companies from specific industries?",
    answer: "We work across sectors including technology, manufacturing, professional services, retail, and life sciences. Our advisors understand industry-specific regulations and can tailor solutions to your sector's unique compliance requirements.",
    eventName: "faq_expand_industries_global_nrro",
    category: "industries"
  },
  {
    question: "What makes NRRO different from other international advisory firms?",
    answer: "We combine deep local expertise in Spain with a global network of trusted partners. Our integrated approach—covering legal, tax, accounting, and labour—means you get coordinated advice from a single team, reducing complexity and ensuring consistency across borders.",
    eventName: "faq_expand_why_nrro_global_nrro",
    category: "about"
  }
];

export const InternationalServicesFAQ = () => {
  const { trackFAQInteraction } = useAnalytics();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccordionChange = (value: string) => {
    // Only track when an item is expanded (not collapsed)
    if (value) {
      const index = parseInt(value.replace('item-', ''), 10);
      const faq = faqs[index];
      
      if (faq) {
        trackFAQInteraction({
          eventName: faq.eventName,
          faqQuestion: faq.question,
          faqIndex: index,
          faqCategory: faq.category,
        });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Frequently Asked Questions About International Advisory
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about our cross-border legal, tax, accounting and labour services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-3"
          onValueChange={handleAccordionChange}
        >
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-border/30">
          <p className="text-muted-foreground mb-4">
            Have more questions about our international services?
          </p>
          <Button onClick={scrollToContact} size="lg">
            Still Have Questions? Let's Talk
          </Button>
        </div>
      </div>
    </section>
  );
};
