import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  country: z
    .string()
    .trim()
    .min(2, "Please enter your country or region")
    .max(100, "Country must be less than 100 characters"),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
  privacy: z
    .boolean()
    .refine((val) => val === true, "You must accept the privacy policy"),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  { value: "international-accounting", label: "International Accounting Management" },
  { value: "international-tax", label: "International Tax Management" },
  { value: "international-payroll", label: "International Payroll Management" },
  { value: "corporate-legal", label: "Corporate Legal Services" },
  { value: "treasury-management", label: "Treasury Management" },
  { value: "transfer-pricing", label: "Transfer Pricing" },
  { value: "local-presence", label: "Local Presence & Governance Support" },
  { value: "other", label: "Other / General Enquiry" },
];

export function InternationalServicesContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmit } = useAnalytics();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      country: "",
      serviceInterest: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: data.fullName,
          email: data.email,
          company: data.company,
          subject: `International Services Enquiry: ${
            serviceOptions.find((s) => s.value === data.serviceInterest)?.label
          }`,
          message: `Country/Region: ${data.country}\n\nService of Interest: ${
            serviceOptions.find((s) => s.value === data.serviceInterest)?.label
          }\n\n${data.message || "No additional message provided."}`,
          source_site: "int",
        },
      });

      if (error) throw error;

      trackFormSubmit("international_services_contact", {
        service_interest: data.serviceInterest,
        country: data.country,
      });

      toast({
        title: "Enquiry submitted successfully",
        description:
          "Thank you for your interest. Our international team will be in touch within 24 hours.",
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission failed",
        description:
          "There was an error submitting your enquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Get in Touch with Our International Team
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Whether you're entering Spain, expanding globally, or need cross-border
          advisory support, our team is ready to help you navigate your next step.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Full Name & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John Smith"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Acme Corporation"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Email & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. john.smith@company.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country / Region of Business *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. United Kingdom, EMEA"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Service of Interest */}
          <FormField
            control={form.control}
            name="serviceInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service of Interest *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background z-50">
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your business needs, timeline, or any specific questions..."
                    className="min-h-[120px] resize-none"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Privacy Checkbox */}
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                    By submitting this form, you agree to our{" "}
                    <Link
                      to="/privacy"
                      className="text-primary underline hover:no-underline"
                    >
                      Privacy Policy
                    </Link>
                    . Your information will be used solely to respond to your
                    enquiry and will not be shared with third parties.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Request Consultation
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
