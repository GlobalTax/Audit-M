import { Scenario } from "@/lib/laborCostCalculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ScenarioComparatorProps {
  scenarios: Scenario[];
  onRemoveScenario: (id: string) => void;
  onAddScenario: () => void;
  maxScenarios?: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ScenarioComparator({ 
  scenarios, 
  onRemoveScenario, 
  onAddScenario,
  maxScenarios = 3 
}: ScenarioComparatorProps) {
  if (scenarios.length === 0) return null;

  // Calculate key differences
  const getKeyDifferences = () => {
    if (scenarios.length < 2) return [];
    
    const differences: string[] = [];
    const sortedByAnnualCost = [...scenarios].sort(
      (a, b) => a.results.totalAnnualEmployerCost - b.results.totalAnnualEmployerCost
    );
    
    const cheapest = sortedByAnnualCost[0];
    const mostExpensive = sortedByAnnualCost[sortedByAnnualCost.length - 1];
    
    if (cheapest.id !== mostExpensive.id) {
      const diff = mostExpensive.results.totalAnnualEmployerCost - cheapest.results.totalAnnualEmployerCost;
      differences.push(
        `${mostExpensive.label} costs ${formatCurrency(diff)}/year more than ${cheapest.label}`
      );
    }

    const sortedByNetSalary = [...scenarios].sort(
      (a, b) => b.results.netSalary - a.results.netSalary
    );
    
    const highestNet = sortedByNetSalary[0];
    const lowestNet = sortedByNetSalary[sortedByNetSalary.length - 1];
    
    if (highestNet.id !== lowestNet.id) {
      const diff = highestNet.results.netSalary - lowestNet.results.netSalary;
      differences.push(
        `${highestNet.label} provides ${formatCurrency(diff)}/month more net salary than ${lowestNet.label}`
      );
    }

    return differences;
  };

  const keyDifferences = getKeyDifferences();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-2 block">
            Compare
          </span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground">
            Scenario Comparison
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemoveScenario(scenario.id)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-primary">
                {scenario.label}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(scenario.inputs.grossSalary)}/{scenario.inputs.salaryInputMode === 'annual' ? 'year' : 'month'} • {scenario.inputs.numberOfPayments} payments
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Gross</span>
                  <span className="font-medium">{formatCurrency(scenario.results.monthlyGross)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Employer Cost</span>
                  <span className="font-medium text-primary">{formatCurrency(scenario.results.totalMonthlyEmployerCost)}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Net Salary</span>
                  <span className="font-medium text-green-700">{formatCurrency(scenario.results.netSalary)}/mo</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual Cost</span>
                    <span className="font-medium">{formatCurrency(scenario.results.totalAnnualEmployerCost)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2 border-t space-y-1">
                <p>Contract: {scenario.inputs.contractType === 'permanent' ? 'Permanent' : 'Fixed-term'}</p>
                <p>Risk: {scenario.inputs.industryRisk.charAt(0).toUpperCase() + scenario.inputs.industryRisk.slice(1)}</p>
                <p>Employees: {scenario.inputs.numberOfEmployees}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Scenario Card */}
        {scenarios.length < maxScenarios && (
          <Card 
            className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-center min-h-[280px]"
            onClick={onAddScenario}
          >
            <CardContent className="text-center py-8">
              <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Add Scenario {String.fromCharCode(65 + scenarios.length)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Modify inputs and calculate again
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Differences */}
      {keyDifferences.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Key Differences
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {keyDifferences.map((diff, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Minus className="w-4 h-4 mt-0.5 shrink-0" />
                  {diff}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
