import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Loader2 } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { StarRatingInput } from "./StarRatingInput";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const reviewSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  companyName: z.string().min(2, "Company name is required").max(100),
  jobTitle: z.string().max(100).optional(),
  country: z.string().min(2, "Country is required").max(100),
  serviceUsed: z.string().min(1, "Please select a service"),
  rating: z.number().min(1, "Please select a rating").max(5),
  reviewText: z
    .string()
    .min(50, "Review must be at least 50 characters")
    .max(1000, "Review must be less than 1000 characters"),
  permissionToPublish: z.boolean().refine((val) => val === true, {
    message: "You must agree to allow publication",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy",
  }),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const serviceOptions = [
  "International Accounting",
  "International Tax",
  "Company Setup in Spain",
  "Corporate Legal",
  "Payroll Management",
  "Transfer Pricing",
  "Beckham Law Advisory",
  "Other",
];

export const ReviewForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { trackEvent } = useAnalytics();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      jobTitle: "",
      country: "",
      serviceUsed: "",
      rating: 0,
      reviewText: "",
      permissionToPublish: false,
      privacyConsent: false,
    },
  });

  const reviewText = form.watch("reviewText");
  const charCount = reviewText?.length || 0;

  const handleFirstInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("review_form_start_global_nrro", {});
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-review", {
        body: {
          fullName: data.fullName,
          companyName: data.companyName,
          jobTitle: data.jobTitle || null,
          country: data.country,
          serviceUsed: data.serviceUsed,
          rating: data.rating,
          reviewText: data.reviewText,
          permissionToPublish: data.permissionToPublish,
        },
      });

      if (error) throw error;

      trackEvent("review_form_success_global_nrro", {
        rating: data.rating,
        service_used: data.serviceUsed,
        country: data.country,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-normal mb-4">Thank You for Your Feedback</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your review has been submitted successfully. Our team will verify and publish it within 3-5 business days. We truly appreciate you taking the time to share your experience.
          </p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          All reviews are verified before publication. We never edit the substance of your feedback — only format for clarity when needed.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            onFocus={handleFirstInteraction}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CFO, Managing Director" {...field} />
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
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="Where is your company based?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serviceUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Used *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the service you used" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Rating *</FormLabel>
                  <FormControl>
                    <StarRatingInput
                      value={field.value}
                      onChange={(rating) => {
                        field.onChange(rating);
                        trackEvent("review_rating_select_global_nrro", {
                          rating_value: rating,
                        });
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your experience working with NRRO. What did we help you achieve?"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>50 characters minimum · 1000 maximum</span>
                    <span className={charCount < 50 ? "text-destructive" : ""}>
                      {charCount}/1000
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-4 border-t border-border">
              <FormField
                control={form.control}
                name="permissionToPublish"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        I agree that my review may be published on NRRO's website and marketing materials *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacyConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        I have read and agree to the{" "}
                        <Link
                          to="/privacy"
                          target="_blank"
                          className="underline hover:text-primary"
                        >
                          Privacy Policy
                        </Link>{" "}
                        *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Your contact information is used solely to verify your review and will never be shared with third parties. Published reviews display your first name, company name, and country only.
            </p>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Your Review
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
