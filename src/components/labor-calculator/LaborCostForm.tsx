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
import { Calculator, Euro, Users, FileText, Building } from "lucide-react";
import { LaborCostInputs, SPAIN_MINIMUM_WAGE_2025 } from "@/lib/laborCostCalculatorLogic";

interface LaborCostFormProps {
  onCalculate: (inputs: LaborCostInputs) => void;
  isCalculating: boolean;
}

export function LaborCostForm({ onCalculate, isCalculating }: LaborCostFormProps) {
  const [grossSalary, setGrossSalary] = useState<string>("3500");
  const [contractType, setContractType] = useState<'permanent' | 'fixed-term'>('permanent');
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>("1");
  const [industryRisk, setIndustryRisk] = useState<'low' | 'medium' | 'high'>('low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const salary = parseFloat(grossSalary) || SPAIN_MINIMUM_WAGE_2025;
    const employees = parseInt(numberOfEmployees) || 1;
    
    onCalculate({
      grossSalary: Math.max(salary, SPAIN_MINIMUM_WAGE_2025),
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
      {/* Gross Salary */}
      <div className="space-y-2">
        <Label htmlFor="grossSalary" className="flex items-center gap-2 text-base font-medium">
          <Euro className="w-4 h-4 text-primary" />
          Gross Monthly Salary (EUR)
        </Label>
        <Input
          id="grossSalary"
          type="number"
          min={SPAIN_MINIMUM_WAGE_2025}
          step="100"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          placeholder="e.g., 3500"
          className="text-lg"
        />
        <p className="text-xs text-muted-foreground">
          Spain minimum wage 2025: €{SPAIN_MINIMUM_WAGE_2025.toLocaleString()}/month (14 payments)
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
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
            <RadioGroupItem value="permanent" id="permanent" />
            <Label htmlFor="permanent" className="cursor-pointer flex-1">
              <span className="font-medium">Permanent</span>
              <span className="text-xs text-muted-foreground block">Indefinido</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
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
          <div className="flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="cursor-pointer flex-1">
              <span className="font-medium">Low</span>
              <span className="text-xs text-muted-foreground block">Office work</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer flex-1">
              <span className="font-medium">Medium</span>
              <span className="text-xs text-muted-foreground block">Retail, services</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors">
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
