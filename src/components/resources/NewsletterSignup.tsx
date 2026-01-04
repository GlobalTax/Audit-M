import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  first_name: z.string().optional(),
  company: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface NewsletterSignupProps {
  sourcePage?: string;
}

export const NewsletterSignup = ({ sourcePage = "/resources" }: NewsletterSignupProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useNewsletterSignup();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      company: "",
      consent: false,
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(
      {
        email: data.email,
        first_name: data.first_name,
        company: data.company,
        consent: data.consent,
        source_page: sourcePage,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-medium mb-4">
            You're subscribed!
          </h3>
          <p className="text-primary-foreground/80">
            Thank you for subscribing to our newsletter. You'll receive the latest insights and resources directly in your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="text-2xl md:text-3xl font-medium mb-3">
            Stay Informed
          </h3>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest insights on international tax, accounting, payroll, and compliance delivered to your inbox.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email address *"
                        type="email"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary-foreground/80" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-primary-foreground/80 font-normal leading-snug cursor-pointer">
                    I agree to receive communications from NRRO International. You can unsubscribe at any time. View our{" "}
                    <a href="/privacy" className="underline hover:text-primary-foreground">
                      Privacy Policy
                    </a>
                    .
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormMessage className="text-primary-foreground/80" />

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 min-w-[200px]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
