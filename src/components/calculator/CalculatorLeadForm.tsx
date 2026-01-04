import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileDown, Loader2, CheckCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { CalculatorInputs, CalculatorResults } from "@/lib/calculatorLogic";

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid business email"),
  companyName: z.string().min(2, "Please enter your company name"),
  country: z.string().min(2, "Please enter your country"),
});

type FormData = z.infer<typeof formSchema>;

interface CalculatorLeadFormProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function CalculatorLeadForm({ inputs, results }: CalculatorLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { trackEvent } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Get UTM parameters from URL
  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
    };
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const utmParams = getUtmParams();

      const { error } = await supabase.functions.invoke("submit-playbook-lead", {
        body: {
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName,
          country: data.country,
          playbookName: "spain-setup-calculator",
          timeline: `${results.timeline.minWeeks}-${results.timeline.maxWeeks} weeks`,
          // Include calculator inputs in the lead
          jobTitle: `${inputs.companyType.toUpperCase()} | ${inputs.founderResidency.toUpperCase()} | ${inputs.plannedEmployees} employees`,
          ...utmParams,
        },
      });

      if (error) throw error;

      // Track GA4 event
      trackEvent("calculator_pdf_request_global_nrro", {
        company_type: inputs.companyType,
        founder_residency: inputs.founderResidency,
        planned_employees: inputs.plannedEmployees,
        need_local_director: inputs.needLocalDirector,
        estimated_weeks: `${results.timeline.minWeeks}-${results.timeline.maxWeeks}`,
        estimated_cost: `${results.costs.minTotal}-${results.costs.maxTotal}`,
      });

      setIsSuccess(true);
      toast.success("Report sent! Check your email for the download link.");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Report Sent Successfully!
              </h3>
              <p className="text-muted-foreground">
                Check your inbox for your personalized cost & timeline report. 
                Our team will also reach out to discuss your specific requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileDown className="w-5 h-5 text-primary" />
          </div>
          <CardTitle>Get Your Customized Report</CardTitle>
        </div>
        <CardDescription>
          Receive a detailed PDF with your personalized cost breakdown, timeline milestones, 
          and next steps — delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Smith"
                {...register("fullName")}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Corp"
                {...register("companyName")}
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                placeholder="United Kingdom"
                {...register("country")}
                className={errors.country ? "border-destructive" : ""}
              />
              {errors.country && (
                <p className="text-sm text-destructive">{errors.country.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 mr-2" />
                Get My Free Report
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to receive your report and occasional updates. 
            We respect your privacy and never share your data.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
