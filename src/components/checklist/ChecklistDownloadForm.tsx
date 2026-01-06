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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Loader2, CheckCircle } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Please select your country"),
  entityType: z.string().optional(),
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

const entityTypes = [
  { value: "sl", label: "SL (Sociedad Limitada)" },
  { value: "sa", label: "SA (Sociedad Anónima)" },
  { value: "branch", label: "Branch Office" },
  { value: "subsidiary", label: "Subsidiary" },
  { value: "not-sure", label: "Not sure yet" },
];

export const ChecklistDownloadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      entityType: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
      };

      const { error } = await supabase.functions.invoke("submit-playbook-lead", {
        body: {
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName,
          jobTitle: null,
          country: data.country,
          timeline: data.entityType || null, // Reusing timeline field for entity type
          playbookName: "spain-document-checklist",
          ...utmParams,
        },
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Check your email for the checklist download link.",
      });

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

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          Your Checklist Is on the Way!
        </h3>
        <p className="text-muted-foreground mb-4">
          We've sent the document checklist to your email address.
        </p>
        <p className="text-sm text-muted-foreground">
          Didn't receive it? Check your spam folder or{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    );
  }

  return (
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
        <Label htmlFor="entityType">Preferred Company Structure</Label>
        <Select onValueChange={(value) => setValue("entityType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="SL, SA, Branch, or Subsidiary" />
          </SelectTrigger>
          <SelectContent>
            {entityTypes.map((entity) => (
              <SelectItem key={entity.value} value={entity.value}>
                {entity.label}
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
            <Download className="w-4 h-4 mr-2" />
            Get My Checklist
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By downloading, you agree to receive helpful updates about Spain company formation. 
        Unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
      </p>
    </form>
  );
};
