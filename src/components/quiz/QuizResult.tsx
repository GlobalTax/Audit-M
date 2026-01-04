import { ResultTier } from "./quizData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  FileText,
  ArrowRight,
  Download,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultProps {
  result: ResultTier;
  scorePercentage: number;
  onBookCall: () => void;
}

export const QuizResult = ({ result, scorePercentage, onBookCall }: QuizResultProps) => {
  const getScoreColor = () => {
    if (result.id === "high") return "text-green-600";
    if (result.id === "medium") return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBgColor = () => {
    if (result.id === "high") return "bg-green-100 dark:bg-green-900/30";
    if (result.id === "medium") return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-orange-100 dark:bg-orange-900/30";
  };

  const getIcon = () => {
    if (result.id === "high") return <CheckCircle className="w-8 h-8" />;
    if (result.id === "medium") return <TrendingUp className="w-8 h-8" />;
    return <AlertTriangle className="w-8 h-8" />;
  };

  const getBadgeVariant = () => {
    if (result.id === "high") return "default";
    if (result.id === "medium") return "secondary";
    return "outline";
  };

  // Track result view
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "quiz_result_view_global_nrro",
      result_tier: result.id,
      score_percentage: scorePercentage,
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Score Header */}
      <div className="text-center space-y-4">
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mx-auto",
          getScoreBgColor(),
          getScoreColor()
        )}>
          {getIcon()}
        </div>
        
        <div>
          <Badge variant={getBadgeVariant()} className="mb-3 text-sm px-4 py-1">
            {result.id === "high" ? "High Readiness" : result.id === "medium" ? "Medium Readiness" : "Early Stage"}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {result.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className={cn("text-5xl font-bold", getScoreColor())}>
              {scorePercentage}%
            </span>
            <span className="text-muted-foreground text-lg">Readiness Score</span>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {result.description}
        </p>
      </div>

      {/* Key Findings */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Key Findings
          </h2>
          <ul className="space-y-3">
            {result.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <span className="text-muted-foreground">{finding}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recommended Next Steps
          </h2>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="border-2 border-primary">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {result.ctaText}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {result.ctaDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onBookCall} className="gap-2">
              <Calendar className="w-4 h-4" />
              Book a Setup Call
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/spain-company-setup-playbook" className="gap-2">
                <Download className="w-4 h-4" />
                Download Setup Playbook
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Document Checklist</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get our comprehensive checklist of all required documents for Spain company setup.
            </p>
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/spain-document-checklist" className="gap-1">
                Download Free Checklist
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Contact Our Team</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions? Our international advisory team is ready to help.
            </p>
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/contact" className="gap-1">
                <Phone className="w-3 h-3" />
                Get in Touch
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
