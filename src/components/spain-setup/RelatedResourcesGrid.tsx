import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Calculator, 
  BookOpen, 
  ClipboardCheck, 
  HelpCircle,
  Scale,
  Receipt
} from "lucide-react";
import { motion } from "framer-motion";

interface Resource {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  type: 'calculator' | 'guide' | 'assessment';
}

const allResources: Resource[] = [
  {
    title: "Setup Cost Calculator",
    description: "Estimate incorporation costs and timeline for your Spanish company.",
    href: "/spain-setup-calculator",
    icon: Calculator,
    type: 'calculator'
  },
  {
    title: "Labor Cost Calculator",
    description: "Calculate employer costs and net salary for Spanish employees.",
    href: "/spain-labor-cost-calculator",
    icon: Receipt,
    type: 'calculator'
  },
  {
    title: "Beckham Law Calculator",
    description: "Compare flat 24% tax vs standard Spanish rates.",
    href: "/beckham-law-calculator",
    icon: Scale,
    type: 'calculator'
  },
  {
    title: "Company Setup Playbook",
    description: "Complete 12-step guide with checklists and compliance requirements.",
    href: "/spain-company-setup-playbook",
    icon: BookOpen,
    type: 'guide'
  },
  {
    title: "Document Checklist",
    description: "40+ documents you'll need with NIE and apostille guidance.",
    href: "/spain-document-checklist",
    icon: ClipboardCheck,
    type: 'guide'
  },
  {
    title: "Readiness Quiz",
    description: "10-question assessment to evaluate your expansion readiness.",
    href: "/spain-readiness-quiz",
    icon: HelpCircle,
    type: 'assessment'
  }
];

interface RelatedResourcesGridProps {
  currentPage: string;
  title?: string;
  subtitle?: string;
  maxItems?: number;
  excludeTypes?: ('calculator' | 'guide' | 'assessment')[];
}

export const RelatedResourcesGrid = ({
  currentPage,
  title = "Continue Your Spain Expansion Planning",
  subtitle,
  maxItems = 3,
  excludeTypes = []
}: RelatedResourcesGridProps) => {
  // Filter out current page and excluded types
  const filteredResources = allResources.filter(
    resource => 
      resource.href !== currentPage && 
      !excludeTypes.includes(resource.type)
  );

  // Get first N items
  const displayResources = filteredResources.slice(0, maxItems);

  if (displayResources.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-neutral-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            Related Resources
          </span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`grid gap-6 max-w-4xl mx-auto ${
          displayResources.length === 2 ? 'md:grid-cols-2' :
          displayResources.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-1'
        }`}>
          {displayResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={resource.href}>
                        Access Resource
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
