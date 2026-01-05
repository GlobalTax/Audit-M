import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Euro, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { CalculatorResults as Results, CalculatorInputs } from "@/lib/calculatorLogic";
import { getCompanyTypeLabel, formatCurrency } from "@/lib/calculatorLogic";

interface CalculatorResultsProps {
  results: Results;
  inputs: CalculatorInputs;
}

export function CalculatorResults({ results, inputs }: CalculatorResultsProps) {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
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
            {results.timeline.nieRequired && (
              <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-md p-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>NIE processing for non-EU founders: additional 2–4 weeks (can be done in advance)</span>
              </div>
            )}
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

      {/* Timeline Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Timeline Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Step</TableHead>
                <TableHead className="text-right">Min</TableHead>
                <TableHead className="text-right">Max</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.timeline.breakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {item.step}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.minWeeks} wk</TableCell>
                  <TableCell className="text-right">{item.maxWeeks} wk</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell>Total Estimated Duration</TableCell>
                <TableCell className="text-right">{results.timeline.minWeeks} wk</TableCell>
                <TableCell className="text-right">{results.timeline.maxWeeks} wk</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5 text-primary" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Item</TableHead>
                <TableHead className="text-right">Min</TableHead>
                <TableHead className="text-right">Max</TableHead>
                <TableHead className="hidden md:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.costs.breakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.minCost)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.maxCost)}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {item.notes || "—"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell>Total Estimated Costs</TableCell>
                <TableCell className="text-right">{formatCurrency(results.costs.minTotal)}</TableCell>
                <TableCell className="text-right">{formatCurrency(results.costs.maxTotal)}</TableCell>
                <TableCell className="hidden md:table-cell">—</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
              Important Disclaimer
            </p>
            <p className="text-amber-700 dark:text-amber-300">
              These figures are indicative estimates based on typical scenarios. Actual costs and 
              timelines may vary depending on specific circumstances, document complexity, 
              administrative processing times, and additional requirements. This tool does not 
              constitute legal or financial advice. For a binding quote tailored to your situation, 
              please request a personalized consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
