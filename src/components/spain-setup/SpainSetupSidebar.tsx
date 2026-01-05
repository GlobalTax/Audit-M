import { Link, useNavigate } from "react-router-dom";
import { 
  Download, 
  ClipboardList, 
  Calculator, 
  HelpCircle, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  Calendar,
  Globe,
  TrendingUp,
  Users,
  Building2,
  Scale,
  Wallet,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAnalytics } from "@/hooks/useAnalytics";

interface TableOfContentsItem {
  id: string;
  label: string;
}

interface SpainSetupSidebarProps {
  tableOfContents?: TableOfContentsItem[];
  activeSection?: string;
  showTableOfContents?: boolean;
}

export const SpainSetupSidebar = ({ 
  tableOfContents = [], 
  activeSection = "",
  showTableOfContents = true 
}: SpainSetupSidebarProps) => {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  // Event handlers with tracking
  const handlePlaybookClick = () => {
    trackEvent("sidebar_playbook_download_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar",
      resource_type: "playbook"
    });
    navigate("/spain-company-setup-playbook");
  };

  const handleChecklistClick = () => {
    trackEvent("sidebar_checklist_download_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar",
      resource_type: "checklist"
    });
    navigate("/spain-document-checklist");
  };

  const handleCalculatorClick = () => {
    trackEvent("sidebar_calculator_start_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar",
      resource_type: "calculator"
    });
    navigate("/spain-setup-calculator");
  };

  const handleQuizClick = () => {
    trackEvent("sidebar_quiz_start_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar",
      resource_type: "quiz"
    });
    navigate("/spain-readiness-quiz");
  };

  const handleContactClick = () => {
    trackEvent("sidebar_contact_click_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar"
    });
    navigate("/contact");
  };

  const handleScheduleCall = () => {
    trackEvent("sidebar_schedule_call_global_nrro", {
      page: window.location.pathname,
      cta_position: "sidebar"
    });
    navigate("/contact");
  };

  const resources = [
    {
      icon: Download,
      title: "Spain Setup Playbook",
      description: "40-page comprehensive guide",
      onClick: handlePlaybookClick,
    },
    {
      icon: ClipboardList,
      title: "Document Checklist",
      description: "Required documentation list",
      onClick: handleChecklistClick,
    },
    {
      icon: Calculator,
      title: "Cost Calculator",
      description: "Instant cost & timeline estimate",
      onClick: handleCalculatorClick,
    },
    {
      icon: HelpCircle,
      title: "Readiness Quiz",
      description: "2-minute self-assessment",
      onClick: handleQuizClick,
    },
  ];

  const quickTools = [
    { icon: Calculator, label: "Estimate Costs", onClick: handleCalculatorClick },
    { icon: HelpCircle, label: "Check Readiness", onClick: handleQuizClick },
    { icon: Calendar, label: "Schedule Call", onClick: handleScheduleCall },
    { icon: MessageSquare, label: "Ask a Question", onClick: handleContactClick },
  ];

  const whySpainPoints = [
    "Gateway to 450M EU consumers",
    "Skilled workforce at competitive costs",
    "R&D credits & ETVE holding regime",
    "Strategic hub for EMEA & LATAM",
    "Modern logistics & digital networks",
  ];

  const whatYouGetPoints = [
    "Single point of contact for legal, tax, payroll",
    "End-to-end service from setup to compliance",
    "Fixed-fee options with transparent pricing",
    "30+ years experience, 500+ clients",
    "Global network across 50+ jurisdictions",
  ];

  return (
    <aside className="space-y-6">
      {/* Table of Contents */}
      {showTableOfContents && tableOfContents.length > 0 && (
        <nav className="sticky top-24 bg-background border border-border rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">Contents</h3>
          <ul className="space-y-2">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Helpful Resources */}
      <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">Helpful Resources</h3>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <button
              key={index}
              onClick={resource.onClick}
              className="w-full group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <resource.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {resource.title}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Free</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{resource.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tools */}
      <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">Quick Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickTools.map((tool, index) => (
            <button
              key={index}
              onClick={tool.onClick}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Why Spain */}
      <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">Why Spain?</h3>
        <ul className="space-y-2.5">
          {whySpainPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What You Get With NRRO */}
      <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">What You Get With NRRO</h3>
        <ul className="space-y-2.5">
          {whatYouGetPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Micro CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 shadow-sm">
        <h3 className="font-medium text-foreground mb-2">Ready to Start?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Speak with our Spain setup specialists.
        </p>
        <Button 
          onClick={handleContactClick}
          className="w-full"
          size="sm"
        >
          Contact Spain Team
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Free consultation · No obligation
        </p>
      </div>
    </aside>
  );
};
