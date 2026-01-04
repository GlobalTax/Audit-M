import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Building2, Globe, Users, UserCheck } from "lucide-react";
import type { CalculatorInputs } from "@/lib/calculatorLogic";

interface SetupCalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  isCalculating?: boolean;
}

export function SetupCalculatorForm({ onCalculate, isCalculating }: SetupCalculatorFormProps) {
  const [companyType, setCompanyType] = useState<CalculatorInputs['companyType'] | ''>('');
  const [founderResidency, setFounderResidency] = useState<CalculatorInputs['founderResidency'] | ''>('');
  const [plannedEmployees, setPlannedEmployees] = useState<CalculatorInputs['plannedEmployees'] | ''>('');
  const [needLocalDirector, setNeedLocalDirector] = useState<CalculatorInputs['needLocalDirector'] | ''>('');

  const isValid = companyType && founderResidency && plannedEmployees && needLocalDirector;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onCalculate({
        companyType: companyType as CalculatorInputs['companyType'],
        founderResidency: founderResidency as CalculatorInputs['founderResidency'],
        plannedEmployees: plannedEmployees as CalculatorInputs['plannedEmployees'],
        needLocalDirector: needLocalDirector as CalculatorInputs['needLocalDirector'],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Type */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Label className="text-base font-medium">Company Type</Label>
              <p className="text-sm text-muted-foreground">
                Select the legal structure you're planning to establish.
              </p>
              <Select value={companyType} onValueChange={(v) => setCompanyType(v as CalculatorInputs['companyType'])}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select company type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sl">Sociedad Limitada (SL) — Limited Liability Company</SelectItem>
                  <SelectItem value="sa">Sociedad Anónima (SA) — Public Limited Company</SelectItem>
                  <SelectItem value="branch">Branch Office of Foreign Company</SelectItem>
                  <SelectItem value="subsidiary">Subsidiary of Foreign Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Founder Residency */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Label className="text-base font-medium">Founder Residency</Label>
              <p className="text-sm text-muted-foreground">
                Are the founders/shareholders EU/EEA nationals or residents?
              </p>
              <RadioGroup
                value={founderResidency}
                onValueChange={(v) => setFounderResidency(v as CalculatorInputs['founderResidency'])}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eu" id="eu" />
                  <Label htmlFor="eu" className="font-normal cursor-pointer">
                    EU / EEA Nationals
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-eu" id="non-eu" />
                  <Label htmlFor="non-eu" className="font-normal cursor-pointer">
                    Non-EU (NIE required)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planned Employees */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Label className="text-base font-medium">Number of Planned Employees</Label>
              <p className="text-sm text-muted-foreground">
                How many employees do you plan to hire in Spain initially?
              </p>
              <Select value={plannedEmployees} onValueChange={(v) => setPlannedEmployees(v as CalculatorInputs['plannedEmployees'])}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employee count..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No employees initially</SelectItem>
                  <SelectItem value="1-5">1–5 employees</SelectItem>
                  <SelectItem value="6-10">6–10 employees</SelectItem>
                  <SelectItem value="11-50">11–50 employees</SelectItem>
                  <SelectItem value="50+">More than 50 employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Local Director */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Label className="text-base font-medium">Need a Local Director?</Label>
              <p className="text-sm text-muted-foreground">
                Will you require a Spain-based nominee director?
              </p>
              <RadioGroup
                value={needLocalDirector}
                onValueChange={(v) => setNeedLocalDirector(v as CalculatorInputs['needLocalDirector'])}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="director-yes" />
                  <Label htmlFor="director-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="director-no" />
                  <Label htmlFor="director-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="director-not-sure" />
                  <Label htmlFor="director-not-sure" className="font-normal cursor-pointer">
                    Not sure yet
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid || isCalculating}
      >
        <Calculator className="w-5 h-5 mr-2" />
        {isCalculating ? "Calculating..." : "Calculate My Estimate"}
      </Button>
    </form>
  );
}
