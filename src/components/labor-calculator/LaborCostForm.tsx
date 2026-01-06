import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Euro, Users, FileText, Building, Calendar } from "lucide-react";
import { 
  LaborCostInputs, 
  SPAIN_MINIMUM_WAGE_2025,
  SPAIN_MINIMUM_WAGE_ANNUAL_14,
  SPAIN_MINIMUM_WAGE_ANNUAL_12 
} from "@/lib/laborCostCalculatorLogic";

interface LaborCostFormProps {
  onCalculate: (inputs: LaborCostInputs) => void;
  isCalculating: boolean;
}

export function LaborCostForm({ onCalculate, isCalculating }: LaborCostFormProps) {
  const [salaryInputMode, setSalaryInputMode] = useState<'monthly' | 'annual'>('monthly');
  const [grossSalary, setGrossSalary] = useState<string>("3500");
  const [numberOfPayments, setNumberOfPayments] = useState<12 | 14>(14);
  const [contractType, setContractType] = useState<'permanent' | 'fixed-term'>('permanent');
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>("1");
  const [industryRisk, setIndustryRisk] = useState<'low' | 'medium' | 'high'>('low');

  const getMinSalary = () => {
    if (salaryInputMode === 'annual') {
      return numberOfPayments === 14 ? SPAIN_MINIMUM_WAGE_ANNUAL_14 : SPAIN_MINIMUM_WAGE_ANNUAL_12;
    }
    return SPAIN_MINIMUM_WAGE_2025;
  };

  const getMinSalaryText = () => {
    if (salaryInputMode === 'annual') {
      const min = numberOfPayments === 14 ? SPAIN_MINIMUM_WAGE_ANNUAL_14 : SPAIN_MINIMUM_WAGE_ANNUAL_12;
      return `Spain minimum wage 2025: €${min.toLocaleString()}/year (${numberOfPayments} payments)`;
    }
    return `Spain minimum wage 2025: €${SPAIN_MINIMUM_WAGE_2025.toLocaleString()}/month (14 payments)`;
  };

  const handleSalaryModeChange = (mode: 'monthly' | 'annual') => {
    const currentSalary = parseFloat(grossSalary) || 0;
    setSalaryInputMode(mode);
    
    // Convert salary when switching modes
    if (mode === 'annual' && currentSalary > 0) {
      setGrossSalary((currentSalary * numberOfPayments).toString());
    } else if (mode === 'monthly' && currentSalary > 0) {
      setGrossSalary(Math.round(currentSalary / numberOfPayments).toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const salary = parseFloat(grossSalary) || getMinSalary();
    const employees = parseInt(numberOfEmployees) || 1;
    
    onCalculate({
      grossSalary: Math.max(salary, getMinSalary()),
      salaryInputMode,
      numberOfPayments,
      contractType,
      numberOfEmployees: employees,
      industryRisk,
    });
  };

  const employeeOptions = [
    { value: "1", label: "1 employee" },
    { value: "3", label: "2-5 employees (avg: 3)" },
    { value: "8", label: "6-10 employees (avg: 8)" },
    { value: "18", label: "11-25 employees (avg: 18)" },
    { value: "38", label: "26-50 employees (avg: 38)" },
    { value: "75", label: "50+ employees (avg: 75)" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Salary Input Mode */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Euro className="w-4 h-4 text-primary" />
          Salary Input
        </Label>
        <RadioGroup
          value={salaryInputMode}
          onValueChange={(value) => handleSalaryModeChange(value as 'monthly' | 'annual')}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${salaryInputMode === 'monthly' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="monthly" id="monthly-mode" />
            <Label htmlFor="monthly-mode" className="cursor-pointer flex-1">
              <span className="font-medium">Monthly Gross</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${salaryInputMode === 'annual' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="annual" id="annual-mode" />
            <Label htmlFor="annual-mode" className="cursor-pointer flex-1">
              <span className="font-medium">Annual Gross</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Gross Salary */}
      <div className="space-y-2">
        <Label htmlFor="grossSalary" className="text-base font-medium">
          {salaryInputMode === 'monthly' ? 'Gross Monthly Salary (EUR)' : 'Gross Annual Salary (EUR)'}
        </Label>
        <Input
          id="grossSalary"
          type="number"
          min={getMinSalary()}
          step={salaryInputMode === 'annual' ? 1000 : 100}
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          placeholder={salaryInputMode === 'monthly' ? "e.g., 3500" : "e.g., 49000"}
          className="text-lg"
        />
        <p className="text-xs text-muted-foreground">
          {getMinSalaryText()}
        </p>
      </div>

      {/* Number of Payments */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          Number of Payments
        </Label>
        <RadioGroup
          value={numberOfPayments.toString()}
          onValueChange={(value) => setNumberOfPayments(parseInt(value) as 12 | 14)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${numberOfPayments === 12 ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="12" id="12-payments" />
            <Label htmlFor="12-payments" className="cursor-pointer flex-1">
              <span className="font-medium">12 payments</span>
              <span className="text-xs text-muted-foreground block">Monthly only</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${numberOfPayments === 14 ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="14" id="14-payments" />
            <Label htmlFor="14-payments" className="cursor-pointer flex-1">
              <span className="font-medium">14 payments</span>
              <span className="text-xs text-muted-foreground block">Incl. extra pays</span>
            </Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-muted-foreground">
          Most Spanish contracts include 2 extra payments (summer + Christmas)
        </p>
      </div>

      {/* Contract Type */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base font-medium">
          <FileText className="w-4 h-4 text-primary" />
          Contract Type
        </Label>
        <RadioGroup
          value={contractType}
          onValueChange={(value) => setContractType(value as 'permanent' | 'fixed-term')}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${contractType === 'permanent' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="permanent" id="permanent" />
            <Label htmlFor="permanent" className="cursor-pointer flex-1">
              <span className="font-medium">Permanent</span>
              <span className="text-xs text-muted-foreground block">Indefinido</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1 ${contractType === 'fixed-term' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="fixed-term" id="fixed-term" />
            <Label htmlFor="fixed-term" className="cursor-pointer flex-1">
              <span className="font-medium">Fixed-Term</span>
              <span className="text-xs text-muted-foreground block">Temporal</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Number of Employees */}
      <div className="space-y-2">
        <Label htmlFor="employees" className="flex items-center gap-2 text-base font-medium">
          <Users className="w-4 h-4 text-primary" />
          Number of Employees
        </Label>
        <Select value={numberOfEmployees} onValueChange={setNumberOfEmployees}>
          <SelectTrigger>
            <SelectValue placeholder="Select number of employees" />
          </SelectTrigger>
          <SelectContent>
            {employeeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Industry Risk Level */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Building className="w-4 h-4 text-primary" />
          Industry Risk Level
        </Label>
        <p className="text-xs text-muted-foreground -mt-1">
          Determines work accident insurance rate
        </p>
        <RadioGroup
          value={industryRisk}
          onValueChange={(value) => setIndustryRisk(value as 'low' | 'medium' | 'high')}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${industryRisk === 'low' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="cursor-pointer flex-1">
              <span className="font-medium">Low</span>
              <span className="text-xs text-muted-foreground block">Office work</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${industryRisk === 'medium' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer flex-1">
              <span className="font-medium">Medium</span>
              <span className="text-xs text-muted-foreground block">Retail, services</span>
            </Label>
          </div>
          <div className={`flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${industryRisk === 'high' ? 'border-primary bg-primary/5' : ''}`}>
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high" className="cursor-pointer flex-1">
              <span className="font-medium">High</span>
              <span className="text-xs text-muted-foreground block">Construction</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={isCalculating}
      >
        <Calculator className="w-5 h-5 mr-2" />
        {isCalculating ? "Calculating..." : "Calculate Labor Costs"}
      </Button>
    </form>
  );
}
