import { FileText, BadgeCheck, Landmark, Scale, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Link } from 'react-router-dom';

interface TimelineStep {
  icon: React.ElementType;
  title: string;
  duration: string;
  description: string;
}

interface CostItem {
  category: string;
  includes: string;
}

const timelineSteps: TimelineStep[] = [
  {
    icon: FileText,
    title: "Name Reservation",
    duration: "1-3 days",
    description: "Request company name from Central Commercial Registry"
  },
  {
    icon: BadgeCheck,
    title: "NIE/NIF Acquisition",
    duration: "2-4 weeks",
    description: "Tax identification numbers for shareholders & directors"
  },
  {
    icon: Landmark,
    title: "Bank Account",
    duration: "1-2 weeks",
    description: "Capital deposit and corporate account opening"
  },
  {
    icon: Scale,
    title: "Notary Deed",
    duration: "1-2 days",
    description: "Public deed execution and document signing"
  },
  {
    icon: BookOpen,
    title: "Registry Filing",
    duration: "2-4 weeks",
    description: "Commercial Registry inscription and NIF activation"
  }
];

const costBreakdown: CostItem[] = [
  {
    category: "Notary Fees",
    includes: "Public deed execution, certified copies, document authentication"
  },
  {
    category: "Registry Fees",
    includes: "Commercial Registry inscription, publication fees, certifications"
  },
  {
    category: "Bank Charges",
    includes: "Account opening fees, initial deposits, corporate card setup"
  },
  {
    category: "Share Capital (SL)",
    includes: "€3,000 minimum required by law for Sociedad Limitada"
  },
  {
    category: "Share Capital (SA)",
    includes: "€60,000 minimum required by law for Sociedad Anónima (25% at incorporation)"
  },
  {
    category: "Professional Services",
    includes: "Legal advisory, document drafting, notary coordination, filings"
  },
  {
    category: "NIE & Documentation",
    includes: "Tax ID applications, translations, apostille costs"
  }
];

export const TimelineCostsSection = () => {
  const { trackEvent } = useAnalytics();

  const handleCTAClick = () => {
    trackEvent('timeline_costs_cta_click_global_nrro', {
      location: 'timeline_costs_section',
      destination: '/spain-setup-calculator'
    });
  };

  return (
    <section className="py-20 md:py-28 bg-background" id="timeline-costs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            Timeline & Costs
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-6">
            Estimated Timeline & Costs for Company Setup in Spain
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding the typical timeframes and investment required helps you plan your market entry effectively. 
            Below you'll find the key milestones in the company registration process and a breakdown of expected costs 
            for establishing your Spanish entity.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="mb-20">
          <h3 className="text-xl font-medium text-foreground mb-8 text-center">
            Key Milestones in Company Registration
          </h3>
          
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connection Line */}
            <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-border" />
            
            <div className="grid grid-cols-5 gap-4 relative">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10 border-4 border-background">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1 text-sm">
                    {step.title}
                  </h4>
                  <span className="font-mono text-xs text-primary font-medium mb-2">
                    {step.duration}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="lg:hidden space-y-6">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground text-sm">
                      {step.title}
                    </h4>
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown Table */}
        <div className="mb-12">
          <h3 className="text-xl font-medium text-foreground mb-8 text-center">
            Cost Categories for Spain Company Formation
          </h3>
          
          <div className="max-w-4xl mx-auto bg-card rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-medium">Cost Category</TableHead>
                  <TableHead className="font-medium">What's Included</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costBreakdown.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-muted-foreground">{item.includes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* CTA Summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-muted/30 rounded-lg p-6 border text-center">
            <p className="font-medium text-foreground mb-2">Need a Personalized Quote?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Every business is unique. Contact us for a detailed, transparent quote tailored to your 
              specific entity type, complexity, and timeline requirements.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="gap-2"
            onClick={handleCTAClick}
          >
            <Link to="/spain-setup-calculator">
              <Download className="w-4 h-4" />
              Get Your Personalized Cost Estimate
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Use our calculator for a detailed breakdown based on your specific requirements
          </p>
        </div>
      </div>
    </section>
  );
};
