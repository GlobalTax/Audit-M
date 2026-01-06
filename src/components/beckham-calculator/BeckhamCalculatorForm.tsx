import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Euro, Info } from 'lucide-react';
import { BeckhamInputs, AUTONOMOUS_COMMUNITIES } from '@/lib/beckhamCalculatorLogic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BeckhamCalculatorFormProps {
  onCalculate: (inputs: BeckhamInputs) => void;
  isCalculating: boolean;
}

export function BeckhamCalculatorForm({ onCalculate, isCalculating }: BeckhamCalculatorFormProps) {
  const [formData, setFormData] = useState<BeckhamInputs>({
    grossAnnualSalary: 80000,
    additionalIncome: 0,
    autonomousCommunity: 'catalonia',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-normal">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          Enter Your Income Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gross Annual Salary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="grossSalary" className="font-medium">Gross Annual Salary</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your total annual salary before taxes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="grossSalary"
                type="number"
                min={20000}
                max={2000000}
                step={1000}
                value={formData.grossAnnualSalary}
                onChange={(e) => setFormData(prev => ({ ...prev, grossAnnualSalary: Number(e.target.value) }))}
                className="pl-10"
                placeholder="e.g., 80000"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(formData.grossAnnualSalary)} per year
            </p>
          </div>

          {/* Additional Income */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="additionalIncome" className="font-medium">Additional Income (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bonuses, stock options, dividends, etc.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="additionalIncome"
                type="number"
                min={0}
                max={5000000}
                step={1000}
                value={formData.additionalIncome}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalIncome: Number(e.target.value) }))}
                className="pl-10"
                placeholder="e.g., 20000"
              />
            </div>
          </div>

          {/* Autonomous Community */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="region" className="font-medium">Autonomous Community</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Regional taxes vary by autonomous community</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select 
              value={formData.autonomousCommunity} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, autonomousCommunity: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {AUTONOMOUS_COMMUNITIES.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calculate Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Tax Comparison'}
          </Button>

          {/* Summary */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              Total income to compare: <span className="font-medium text-foreground">{formatCurrency(formData.grossAnnualSalary + formData.additionalIncome)}</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
