import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Lock, Users, ArrowRight } from "lucide-react";
import type { CalculatorResults as Results, CalculatorInputs } from "@/lib/calculatorLogic";
import { getCompanyTypeLabel, formatCurrency } from "@/lib/calculatorLogic";

interface CalculatorResultsTeaserProps {
  results: Results;
  inputs: CalculatorInputs;
  onUnlock: () => void;
  estimatesCount: number;
}

export function CalculatorResultsTeaser({ 
  results, 
  inputs, 
  onUnlock,
  estimatesCount 
}: CalculatorResultsTeaserProps) {
  return (
    <div className="space-y-8">
      {/* Summary Cards - Visible */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Timeline Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Estimated Time to Incorporation</CardTitle>
                <p className="text-sm text-muted-foreground">Based on your selections</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">
              {results.timeline.minWeeks}–{results.timeline.maxWeeks} weeks
            </div>
            <Badge variant="secondary" className="text-xs">
              {getCompanyTypeLabel(inputs.companyType)}
            </Badge>
          </CardContent>
        </Card>

        {/* Costs Card */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Euro className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Estimated Mandatory Costs</CardTitle>
                <p className="text-sm text-muted-foreground">Government & professional fees</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">
              {formatCurrency(results.costs.minTotal)}–{formatCurrency(results.costs.maxTotal)}
            </div>
            <Badge variant="secondary" className="text-xs">
              Excludes share capital
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Locked Detailed Breakdown */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        
        <CardHeader className="relative z-0">
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Lock className="w-5 h-5" />
            Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-0">
          {/* Blurred preview */}
          <div className="blur-sm select-none pointer-events-none">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span>NIE Processing</span>
                <span>2-4 weeks</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Company Registration</span>
                <span>3-5 weeks</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Notary Fees</span>
                <span>€400-800</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Professional Fees</span>
                <span>€2,000-4,000</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Unlock CTA - positioned over the blur */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center bg-background/95 rounded-xl p-6 shadow-lg border max-w-sm mx-4">
            <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">
              Unlock Full Breakdown
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your email to see the complete timeline and cost details for your specific situation.
            </p>
            <Button onClick={onUnlock} className="w-full">
              Get Full Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{estimatesCount.toLocaleString()} estimates generated this month</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
