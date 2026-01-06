import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

interface LaborCostLeadFormProps {
  calculatorInputs?: {
    grossSalary: number;
    contractType: string;
    numberOfEmployees: number;
    industryRisk: string;
  };
  results?: {
    totalMonthlyEmployerCost: number;
    netSalary: number;
    totalAnnualEmployerCost: number;
  };
}

const countries = [
  "United States", "United Kingdom", "Germany", "France", "Netherlands",
  "Belgium", "Switzerland", "Italy", "Portugal", "Ireland", "Sweden",
  "Denmark", "Norway", "Austria", "Poland", "United Arab Emirates",
  "Saudi Arabia", "Qatar", "Singapore", "Hong Kong", "Japan",
  "Australia", "Canada", "Mexico", "Brazil", "Argentina", "Chile",
  "Colombia", "Other"
];

export function LaborCostLeadForm({ calculatorInputs, results }: LaborCostLeadFormProps) {
  const { trackEvent } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.companyName || !formData.country) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-playbook-lead", {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          country: formData.country,
          playbookName: "spain-labor-cost-calculator",
          timeline: calculatorInputs ? JSON.stringify(calculatorInputs) : undefined,
          utm_source: new URLSearchParams(window.location.search).get("utm_source"),
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
        },
      });

      if (error) throw error;

      trackEvent("labor_calculator_pdf_global_nrro", {
        country: formData.country,
        gross_salary: calculatorInputs?.grossSalary,
        employees: calculatorInputs?.numberOfEmployees,
      });

      setIsSuccess(true);
      toast.success("Report sent! Check your email for the download link.");

    } catch (error) {
      console.error("Lead submission error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          Report Sent Successfully!
        </h3>
        <p className="text-muted-foreground">
          Check your email for your detailed labor cost breakdown report.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Smith"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Business Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Your Company Ltd."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download Detailed Report
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By downloading, you agree to receive occasional updates from NRRO. Unsubscribe anytime.
      </p>
    </form>
  );
}
