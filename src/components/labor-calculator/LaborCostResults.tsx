import { LaborCostResults as LaborCostResultsType } from "@/lib/laborCostCalculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  User, 
  TrendingUp, 
  Info,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LaborCostResultsProps {
  results: LaborCostResultsType;
  grossSalary: number;
  numberOfEmployees: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function LaborCostResults({ results, grossSalary, numberOfEmployees }: LaborCostResultsProps) {
  const perEmployee = numberOfEmployees > 1;
  const label = perEmployee ? ` (${numberOfEmployees} employees)` : "";

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Building className="w-4 h-4" />
              Total Employer Cost{label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-normal text-primary">
              {formatCurrency(results.totalMonthlyEmployerCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              per month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              Estimated Net Salary{label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-normal text-green-700">
              {formatCurrency(results.netSalary)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              employee receives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Annual Projection */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Annual Employer Cost</span>
              <span className="text-xs text-muted-foreground">(14 payments)</span>
            </div>
            <span className="text-xl font-normal text-foreground">
              {formatCurrency(results.totalAnnualEmployerCost)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b">
          <h3 className="font-medium">Detailed Breakdown</h3>
        </div>
        
        <div className="divide-y">
          {/* Gross Salary */}
          <div className="px-4 py-3 flex justify-between items-center bg-background">
            <span className="font-medium">Gross Salary{label}</span>
            <span className="font-medium">{formatCurrency(grossSalary * numberOfEmployees)}</span>
          </div>

          {/* Employer Contributions */}
          <div className="px-4 py-3 bg-blue-50/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-900">
                Employer Contributions ({results.employerContributionRate.toFixed(1)}%)
              </span>
              <span className="font-medium text-blue-900">
                {formatCurrency(results.totalEmployerContributions)}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Social Security (23.6%)</span>
                <span>{formatCurrency(results.employerSocialSecurity)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Unemployment (5.5%)</span>
                <span>{formatCurrency(results.employerUnemployment)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Training Fund (0.6%)</span>
                <span>{formatCurrency(results.employerTrainingFund)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>FOGASA - Wage Guarantee (0.2%)</span>
                <span>{formatCurrency(results.employerFOGASA)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Work Accident Insurance</span>
                <span>{formatCurrency(results.workAccidentInsurance)}</span>
              </div>
            </div>
          </div>

          {/* Employee Deductions */}
          <div className="px-4 py-3 bg-orange-50/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-orange-900">
                Employee Deductions ({results.employeeDeductionRate.toFixed(1)}%)
              </span>
              <span className="font-medium text-orange-900">
                {formatCurrency(results.totalEmployeeDeductions)}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Social Security (4.7%)</span>
                <span>{formatCurrency(results.employeeSocialSecurity)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Unemployment (1.55%)</span>
                <span>{formatCurrency(results.employeeUnemployment)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Training Fund (0.1%)</span>
                <span>{formatCurrency(results.employeeTrainingFund)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>IRPF Withholding (~{results.effectiveIrpfRate.toFixed(1)}%)</span>
                <span>{formatCurrency(results.irpfWithholding)}</span>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="px-4 py-3 flex justify-between items-center bg-green-50">
            <span className="font-medium text-green-900">Estimated Net Salary</span>
            <span className="font-medium text-green-900">{formatCurrency(results.netSalary)}</span>
          </div>

          {/* Total Employer Cost */}
          <div className="px-4 py-3 flex justify-between items-center bg-primary/10">
            <span className="font-medium text-primary">Total Monthly Employer Cost</span>
            <span className="text-lg font-medium text-primary">
              {formatCurrency(results.totalMonthlyEmployerCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Component Explanations */}
      <Accordion type="single" collapsible className="border rounded-lg">
        <AccordionItem value="explanations" className="border-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4" />
              What Each Component Means
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Social Security:</span> Covers healthcare, pensions, and disability benefits. The employer pays 23.6% and the employee pays 4.7%.
              </div>
              <div>
                <span className="font-medium text-foreground">Unemployment:</span> Funds worker protection in case of job loss. Contribution rates depend on contract type.
              </div>
              <div>
                <span className="font-medium text-foreground">Training Fund (FP):</span> Finances professional development and training programs for workers.
              </div>
              <div>
                <span className="font-medium text-foreground">FOGASA:</span> Guarantees wages and severance payments in case of employer insolvency.
              </div>
              <div>
                <span className="font-medium text-foreground">Work Accident Insurance:</span> Covers workplace injuries and occupational diseases. Rate varies by industry risk level.
              </div>
              <div>
                <span className="font-medium text-foreground">IRPF:</span> Progressive income tax withheld at source. Final rate depends on annual income and personal circumstances.
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Disclaimer */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
        <strong>Disclaimer:</strong> These figures are indicative estimates based on Spain's 2025 social security rates and standard IRPF brackets. Actual costs may vary based on specific circumstances, tax deductions, regional variations, and individual employment conditions. This calculator does not constitute professional advice. For precise calculations, please consult with our payroll experts.
      </div>
    </div>
  );
}
