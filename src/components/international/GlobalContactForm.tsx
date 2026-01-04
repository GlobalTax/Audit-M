import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Loader2, Send } from "lucide-react";
import { Link } from "react-router-dom";

const serviceOptions = [
  { value: "international-accounting", label: "International Accounting Management" },
  { value: "international-tax", label: "International Tax Management" },
  { value: "international-payroll", label: "International Payroll Management" },
  { value: "corporate-legal", label: "Corporate Legal Services" },
  { value: "treasury-management", label: "Treasury Management" },
  { value: "transfer-pricing", label: "Transfer Pricing" },
  { value: "local-presence-governance", label: "Local Presence & Governance Support" },
  { value: "company-setup-spain", label: "Company Setup in Spain" },
  { value: "other", label: "Other / General Enquiry" },
];

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  countryRegion: z
    .string()
    .trim()
    .min(2, "Country/Region must be at least 2 characters")
    .max(100, "Country/Region must be less than 100 characters"),
  serviceInterest: z
    .string()
    .min(1, "Please select a service of interest"),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy"),
});

type FormData = z.infer<typeof formSchema>;

interface GlobalContactFormProps {
  className?: string;
}

export function GlobalContactForm({ className }: GlobalContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackGlobalContactFormSubmission } = useAnalytics();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      countryRegion: "",
      serviceInterest: "",
      message: "",
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Get the service label for the subject
      const selectedService = serviceOptions.find(
        (opt) => opt.value === data.serviceInterest
      );
      const serviceLabel = selectedService?.label || data.serviceInterest;

      // Submit to the contact edge function
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: data.fullName,
          email: data.email,
          company: data.company,
          phone: null,
          subject: `International Enquiry: ${serviceLabel}`,
          message: data.message || `Country/Region: ${data.countryRegion}\nService Interest: ${serviceLabel}`,
        },
      });

      if (error) {
        throw error;
      }

      // Track the successful submission with GTM
      trackGlobalContactFormSubmission({
        serviceInterest: data.serviceInterest,
        countryRegion: data.countryRegion,
      });

      // Show success toast
      toast.success("Enquiry submitted successfully", {
        description:
          "Thank you for reaching out. Our international team will contact you within 24 business hours.",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting global contact form:", error);
      toast.error("Submission failed", {
        description:
          "There was an error submitting your enquiry. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Start Your Global Business Conversation
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with our international advisory team. Whether you're expanding into Spain, 
          managing cross-border operations, or seeking strategic guidance, we're ready to help you succeed.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Full Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
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
                        placeholder="Your company name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Email & Country/Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@company.com"
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
                name="countryRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country/Region of Business *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., United Kingdom, Germany"
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
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your business needs, timeline, or any specific questions..."
                      className="min-h-[120px] resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Consent */}
            <FormField
              control={form.control}
              name="privacyConsent"
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
                    <FormLabel className="text-sm font-normal text-muted-foreground">
                      By submitting this form, you agree to our{" "}
                      <Link
                        to="/privacy"
                        className="underline hover:text-foreground transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      . Your information will be used solely to respond to your enquiry.
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
                  <Send className="mr-2 h-4 w-4" />
                  Request Your Consultation
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* GTM Configuration Instructions (HTML Comment for developers) */}
      {/* 
        GTM CONFIGURATION INSTRUCTIONS:
        
        This form pushes the following event to dataLayer on successful submission:
        
        window.dataLayer.push({
          event: 'contact_form_submission_global_nrro',
          form_name: 'global_contact_form',
          service_interest: <selected_service_value>,
          country_region: <user_country_region>,
          page_path: <current_page_path>,
          page_title: <current_page_title>,
          timestamp: <ISO_timestamp>
        });
        
        To configure in Google Tag Manager:
        
        1. CREATE TRIGGER:
           - Name: "Contact Form Submission - Global NRRO"
           - Type: Custom Event
           - Event Name: contact_form_submission_global_nrro
        
        2. CREATE DATA LAYER VARIABLES:
           - DLV - form_name → Variable Type: Data Layer Variable, Name: form_name
           - DLV - service_interest → Variable Type: Data Layer Variable, Name: service_interest
           - DLV - country_region → Variable Type: Data Layer Variable, Name: country_region
        
        3. CREATE GA4 EVENT TAG:
           - Name: "GA4 - Contact Form Submission Global NRRO"
           - Type: Google Analytics: GA4 Event
           - Configuration Tag: Your GA4 Configuration
           - Event Name: contact_form_submission_global_nrro
           - Event Parameters:
             - form_name: {{DLV - form_name}}
             - service_interest: {{DLV - service_interest}}
             - country_region: {{DLV - country_region}}
           - Trigger: Contact Form Submission - Global NRRO
      */}
    </div>
  );
}
