import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Send, Shield } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const LeyBeckhamContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmit } = useAnalytics();
  const { t } = useLanguage();

  const formSchema = z.object({
    name: z.string().trim().min(2, t("leyBeckham.form.validation.name")).max(100),
    email: z.string().trim().email(t("leyBeckham.form.validation.email")).max(255),
    phone: z.string().trim().min(9, t("leyBeckham.form.validation.phone")).max(20),
    country: z.string().trim().min(2, t("leyBeckham.form.validation.country")).max(100),
    jobSituation: z.string().min(1, t("leyBeckham.form.validation.jobSituation")),
    transferDate: z.string().min(1, t("leyBeckham.form.validation.transferDate")),
    message: z.string().trim().max(2000).optional(),
    privacy: z.boolean().refine((val) => val === true, {
      message: t("leyBeckham.form.validation.privacy"),
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      jobSituation: "",
      transferDate: "",
      message: "",
      privacy: false,
    },
  });

  const mapTransferDateToEstimatedDate = (transferDate: string): string => {
    const today = new Date();
    let estimatedDate = new Date(today);

    switch (transferDate) {
      case "ya-estoy":
        // Ya está en España, usar fecha de hoy
        break;
      case "1-3-meses":
        estimatedDate.setMonth(today.getMonth() + 2); // Promedio de 2 meses
        break;
      case "3-6-meses":
        estimatedDate.setMonth(today.getMonth() + 4); // Promedio de 4 meses
        break;
      case "6-12-meses":
        estimatedDate.setMonth(today.getMonth() + 9); // Promedio de 9 meses
        break;
      case "mas-12-meses":
        estimatedDate.setMonth(today.getMonth() + 18); // Promedio de 18 meses
        break;
      default:
        estimatedDate.setMonth(today.getMonth() + 6); // Default: 6 meses
    }

    return estimatedDate.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const estimatedMoveDate = mapTransferDateToEstimatedDate(data.transferDate);

      const { error } = await supabase.functions.invoke("process-ley-beckham-lead", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          country: data.country,
          jobSituation: data.jobSituation,
          estimatedMoveDate: estimatedMoveDate,
          message: data.message || "",
        },
      });

      if (error) throw error;

      trackFormSubmit("ley_beckham_contact", {
        form_location: "ley-beckham-landing",
        landing_source: "google-ads-ley-beckham",
        conversion_label: "ley_beckham_lead",
      });

      toast({
        title: t("leyBeckham.form.success.title"),
        description: t("leyBeckham.form.success.description"),
      });

      form.reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      toast({
        variant: "destructive",
        title: t("leyBeckham.form.error.title"),
        description: t("leyBeckham.form.error.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("leyBeckham.form.eyebrow")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-4">
            {t("leyBeckham.form.title")}
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            {t("leyBeckham.form.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border border-border/50">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("leyBeckham.form.name")} *</FormLabel>
                          <FormControl>
                            <Input placeholder={t("leyBeckham.form.name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("leyBeckham.form.email")} *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t("leyBeckham.form.email")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("leyBeckham.form.phone")} *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder={t("leyBeckham.form.phone")} {...field} />
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
                          <FormLabel>{t("leyBeckham.form.country")} *</FormLabel>
                          <FormControl>
                            <Input placeholder={t("leyBeckham.form.countryPlaceholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobSituation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("leyBeckham.form.jobSituation")} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("leyBeckham.form.selectPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="contrato-espana">{t("leyBeckham.form.jobOptions.employee")}</SelectItem>
                              <SelectItem value="directivo">{t("leyBeckham.form.jobOptions.executive")}</SelectItem>
                              <SelectItem value="autonomo">{t("leyBeckham.form.jobOptions.freelancer")}</SelectItem>
                              <SelectItem value="emprendedor">{t("leyBeckham.form.jobOptions.entrepreneur")}</SelectItem>
                              <SelectItem value="traslado-interno">{t("leyBeckham.form.jobOptions.transfer")}</SelectItem>
                              <SelectItem value="otro">{t("leyBeckham.form.jobOptions.other")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transferDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("leyBeckham.form.transferDate")} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("leyBeckham.form.selectPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ya-estoy">{t("leyBeckham.form.transferOptions.immediate")}</SelectItem>
                              <SelectItem value="1-3-meses">{t("leyBeckham.form.transferOptions.1-3")}</SelectItem>
                              <SelectItem value="3-6-meses">{t("leyBeckham.form.transferOptions.3-6")}</SelectItem>
                              <SelectItem value="6-12-meses">{t("leyBeckham.form.transferOptions.6-12")}</SelectItem>
                              <SelectItem value="mas-12-meses">{t("leyBeckham.form.transferOptions.12+")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("leyBeckham.form.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("leyBeckham.form.messagePlaceholder")}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {t("leyBeckham.form.privacy")}{" "}
                            <a href="/privacy" className="text-primary underline" target="_blank">
                              {t("leyBeckham.form.privacyLink")}
                            </a>{" "}
                            {t("leyBeckham.form.privacyText")} *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4">
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-base">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("leyBeckham.form.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t("leyBeckham.form.submit")}
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>{t("leyBeckham.form.confidential")}</span>
                      </div>
                      <span>•</span>
                      <span>{t("leyBeckham.form.response")}</span>
                      <span>•</span>
                      <span>{t("leyBeckham.form.noCommitment")}</span>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("leyBeckham.form.footer")}{" "}
            <a href="/contact" className="text-primary underline">
              {t("leyBeckham.form.footerLink")}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
