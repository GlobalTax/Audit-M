import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What international accounting standards do you support?",
    answer: "We provide full compliance with IFRS, local GAAP, and multi-jurisdiction reporting requirements. Our team ensures accurate consolidation, intercompany reconciliation, and real-time financial visibility across all your entities worldwide."
  },
  {
    question: "How can cross-border tax planning reduce my company's tax burden?",
    answer: "Through strategic analysis of double taxation agreements, holding structures, and jurisdiction-specific incentives, we identify opportunities to optimise your global effective tax rate while maintaining full compliance with local and international regulations."
  },
  {
    question: "Can you manage payroll across multiple countries?",
    answer: "Yes. We deliver compliant payroll processing in multiple jurisdictions, handling local tax withholdings, social security contributions, employment contracts, and statutory reporting—all from a single point of contact."
  },
  {
    question: "What corporate legal services do you offer for international operations?",
    answer: "Our legal team supports entity formation, corporate governance, cross-border contracts, M&A transactions, regulatory compliance, and ongoing legal administration for subsidiaries and branches in multiple jurisdictions."
  },
  {
    question: "How do you help with treasury and cash flow management?",
    answer: "We implement cash pooling structures, optimise intercompany financing, manage FX exposure, and provide real-time cash visibility across entities—ensuring efficient liquidity management for your global operations."
  },
  {
    question: "What is transfer pricing and why is it important?",
    answer: "Transfer pricing governs how transactions between related entities are priced. Proper documentation and arm's length pricing are essential to avoid tax penalties and disputes with authorities. We prepare compliant policies and documentation across all jurisdictions."
  },
  {
    question: "Can you provide local presence without establishing a subsidiary?",
    answer: "Yes. Through our governance and representation services, we can act as your local registered office, provide nominee directors where permitted, and handle regulatory filings—giving you operational presence without full entity setup."
  },
  {
    question: "How long does it take to set up a subsidiary in a new country?",
    answer: "Timelines vary by jurisdiction, typically ranging from 2-8 weeks. We manage the entire process including entity registration, tax registrations, bank account opening, and initial compliance setup to ensure a smooth market entry."
  },
  {
    question: "Do you support companies from specific industries?",
    answer: "We work across sectors including technology, manufacturing, professional services, retail, and life sciences. Our advisors understand industry-specific regulations and can tailor solutions to your sector's unique compliance requirements."
  },
  {
    question: "What makes NRRO different from other international advisory firms?",
    answer: "We combine deep local expertise in Spain with a global network of trusted partners. Our integrated approach—covering legal, tax, accounting, and labour—means you get coordinated advice from a single team, reducing complexity and ensuring consistency across borders."
  }
];

export const InternationalServicesFAQ = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
        <Accordion type="single" collapsible className="w-full space-y-3">
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
            Contact Our International Team
          </Button>
        </div>
      </div>
    </section>
  );
};
