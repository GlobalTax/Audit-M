import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock, BarChart3 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  companyName: z.string().min(1, "Company name is required").max(200),
  country: z.string().min(1, "Please select your country"),
  serviceInterest: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Switzerland",
  "Italy",
  "Belgium",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Austria",
  "Ireland",
  "Portugal",
  "Canada",
  "Australia",
  "Japan",
  "Singapore",
  "United Arab Emirates",
  "Other",
];

const services = [
  { value: "company-setup", label: "Company Formation & Setup" },
  { value: "tax-advisory", label: "Tax Planning & Advisory" },
  { value: "accounting-payroll", label: "Accounting & Payroll" },
  { value: "legal-compliance", label: "Legal & Compliance" },
  { value: "full-service", label: "Full-Service Support" },
];

interface QuizLeadFormProps {
  quizAnswers: Record<string, string>;
  scorePercentage: number;
  onComplete: () => void;
}

export const QuizLeadForm = ({ quizAnswers, scorePercentage, onComplete }: QuizLeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      country: "",
      serviceInterest: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
      };

      // Store quiz results in timeline field as JSON
      const quizData = JSON.stringify({
        answers: quizAnswers,
        score: scorePercentage,
        completedAt: new Date().toISOString(),
      });

      const { error } = await supabase.functions.invoke("submit-playbook-lead", {
        body: {
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName,
          jobTitle: data.serviceInterest || null,
          country: data.country,
          timeline: quizData,
          playbookName: "spain-readiness-quiz",
          ...utmParams,
        },
      });

      if (error) {
        throw error;
      }

      // Track GA4 event
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "quiz_lead_submit_global_nrro",
          quiz_score: scorePercentage,
          country: data.country,
          service_interest: data.serviceInterest || "not_specified",
        });
      }

      onComplete();

    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-2 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Your Results Are Ready!</CardTitle>
          <CardDescription className="text-base">
            Enter your details below to see your personalized Spain Business Setup Readiness Score 
            and tailored recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="e.g., John Smith"
                {...register("fullName")}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@yourcompany.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your company's legal name"
                {...register("companyName")}
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country / Region</Label>
              <Select onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger className={errors.country ? "border-destructive" : ""}>
                  <SelectValue placeholder="Where is your business based?" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-destructive">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceInterest">How Can We Help? (Optional)</Label>
              <Select onValueChange={(value) => setValue("serviceInterest", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the service you need" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reveal My Score
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <Lock className="w-3 h-3" />
              <span>Your information is secure. We only use it to deliver your personalized results.{" "}
                <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
