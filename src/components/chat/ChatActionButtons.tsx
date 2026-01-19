import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Scale, MessageSquare, ArrowRight } from "lucide-react";

interface ActionButton {
  label: string;
  href: string;
  icon: "calculator" | "document" | "compare" | "contact" | "arrow";
  variant?: "default" | "outline";
}

interface ChatActionButtonsProps {
  actions: ActionButton[];
}

const iconMap = {
  calculator: Calculator,
  document: FileText,
  compare: Scale,
  contact: MessageSquare,
  arrow: ArrowRight,
};

export function ChatActionButtons({ actions }: ChatActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map((action, index) => {
        const Icon = iconMap[action.icon];
        return (
          <Button
            key={index}
            variant={action.variant || "outline"}
            size="sm"
            className="h-7 text-xs"
            asChild
          >
            <Link to={action.href}>
              <Icon className="h-3 w-3 mr-1" />
              {action.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

// Helper to extract action buttons from content based on keywords
export function extractActionButtons(content: string): ActionButton[] {
  const actions: ActionButton[] = [];
  
  // Check for calculator mentions
  if (content.includes("/spain-setup-calculator") || content.toLowerCase().includes("setup calculator")) {
    actions.push({
      label: "Setup Calculator",
      href: "/spain-setup-calculator",
      icon: "calculator",
    });
  }
  
  // Check for Beckham calculator
  if (content.includes("/beckham-law-calculator") || content.toLowerCase().includes("beckham calculator")) {
    actions.push({
      label: "Beckham Calculator",
      href: "/beckham-law-calculator",
      icon: "calculator",
    });
  }
  
  // Check for legal structures comparator
  if (content.includes("/legal-structures-comparator") || content.toLowerCase().includes("comparator")) {
    actions.push({
      label: "Compare Structures",
      href: "/legal-structures-comparator",
      icon: "compare",
    });
  }
  
  // Check for document checklist
  if (content.includes("/spain-document-checklist") || content.toLowerCase().includes("checklist")) {
    actions.push({
      label: "Document Checklist",
      href: "/spain-document-checklist",
      icon: "document",
    });
  }
  
  // Check for contact
  if (content.includes("/contact") || content.toLowerCase().includes("contact our")) {
    actions.push({
      label: "Contact Us",
      href: "/contact",
      icon: "contact",
      variant: "default",
    });
  }
  
  return actions.slice(0, 3); // Max 3 buttons
}
