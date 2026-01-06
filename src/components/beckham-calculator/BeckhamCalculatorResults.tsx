import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BeckhamResults } from '@/lib/beckhamCalculatorLogic';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Euro, Percent } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface BeckhamCalculatorResultsProps {
  results: BeckhamResults;
}

export function BeckhamCalculatorResults({ results }: BeckhamCalculatorResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Savings Highlight */}
      {results.annualSavings > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Annual Tax Savings</p>
                  <p className="text-3xl font-bold text-green-800">{formatCurrency(results.annualSavings)}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                  {formatPercent(results.savingsPercentage)} Less Tax
                </Badge>
                <p className="text-sm text-green-700 mt-2">
                  6-Year Total: <span className="font-bold">{formatCurrency(results.sixYearSavings)}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Standard IRPF Card */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg font-normal">
              <span>Standard IRPF</span>
              <Badge variant="secondary">Progressive Tax</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax Due</span>
              <span className="text-xl font-bold text-red-600">{formatCurrency(results.standardIRPF)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Effective Rate</span>
              <span className="font-medium">{formatPercent(results.standardEffectiveRate)}</span>
            </div>
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Net Income</span>
                <span className="text-lg font-medium">{formatCurrency(results.standardNetSalary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beckham Law Card */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg font-normal">
              <span>Beckham Law</span>
              <Badge className="bg-primary text-primary-foreground">24% Flat Rate</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax Due</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(results.beckhamTax)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Effective Rate</span>
              <span className="font-medium">{formatPercent(results.beckhamEffectiveRate)}</span>
            </div>
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Net Income</span>
                <span className="text-lg font-medium text-primary">{formatCurrency(results.beckhamNetSalary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warnings */}
      {results.exceedsThreshold && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800">High Income Notice</p>
                <p className="text-sm text-amber-700">
                  Income exceeding €600,000 is taxed at 47% under Beckham Law, not 24%. 
                  This has been reflected in your calculation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* IRPF Breakdown */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="breakdown">
          <AccordionTrigger className="text-base font-medium">
            View Standard IRPF Breakdown by Bracket
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground pb-2 border-b">
                <span>Bracket</span>
                <span className="text-right">Income</span>
                <span className="text-right">Rate</span>
                <span className="text-right">Tax</span>
              </div>
              {results.irpfBreakdown.map((bracket, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-sm py-1">
                  <span className="text-muted-foreground">{bracket.bracket}</span>
                  <span className="text-right">{formatCurrency(bracket.income)}</span>
                  <span className="text-right">{formatPercent(bracket.rate * 100)}</span>
                  <span className="text-right font-medium">{formatCurrency(bracket.tax)}</span>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2 text-sm pt-2 border-t font-medium">
                <span>Total</span>
                <span className="text-right">{formatCurrency(results.totalIncome)}</span>
                <span className="text-right">{formatPercent(results.standardEffectiveRate)}</span>
                <span className="text-right">{formatCurrency(results.standardIRPF)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Eligibility Reminder */}
      <Card className="border-border/50 bg-muted/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Beckham Law Eligibility Requirements</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Not a Spanish tax resident in the last 5 years</li>
                <li>• Employed by a Spanish company or assigned to Spain</li>
                <li>• Work performed primarily in Spain</li>
                <li>• Valid for 6 tax years maximum</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-4">
        This calculation is for illustrative purposes only and does not constitute tax advice. 
        Actual tax obligations may vary based on individual circumstances, applicable deductions, 
        and current legislation. Consult a qualified tax professional for personalized advice.
      </p>
    </div>
  );
}
