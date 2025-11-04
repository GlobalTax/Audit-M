import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, Send, Clock, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProcessTimeline = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: CheckCircle,
      title: t("process.step1.title"),
      description: t("process.step1.description"),
      duration: t("process.step1.duration"),
      details: [t("process.step1.detail1"), t("process.step1.detail2"), t("process.step1.detail3")]
    },
    {
      icon: FileText,
      title: t("process.step2.title"),
      description: t("process.step2.description"),
      duration: t("process.step2.duration"),
      details: [t("process.step2.detail1"), t("process.step2.detail2"), t("process.step2.detail3"), t("process.step2.detail4")]
    },
    {
      icon: Send,
      title: t("process.step3.title"),
      description: t("process.step3.description"),
      duration: t("process.step3.duration"),
      details: [t("process.step3.detail1"), t("process.step3.detail2"), t("process.step3.detail3")]
    },
    {
      icon: Clock,
      title: t("process.step4.title"),
      description: t("process.step4.description"),
      duration: t("process.step4.duration"),
      details: [t("process.step4.detail1"), t("process.step4.detail2"), t("process.step4.detail3")]
    },
    {
      icon: ThumbsUp,
      title: t("process.step5.title"),
      description: t("process.step5.description"),
      duration: t("process.step5.duration"),
      details: [t("process.step5.detail1"), t("process.step5.detail2"), t("process.step5.detail3")]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("process.eyebrow")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-4">
            {t("process.title")}
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line - simplificada */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <Card className="bg-card border border-border/50">
                        <CardContent className="p-6">
                          <div className={`flex items-start gap-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="lg:hidden w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {t("process.step")} {index + 1}
                                </span>
                                <span className="text-xs text-muted-foreground">⏱️ {step.duration}</span>
                              </div>
                              
                              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                              <p className="text-muted-foreground mb-4">{step.description}</p>
                              
                              <ul className={`space-y-1 text-sm ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                {step.details.map((detail, idx) => (
                                  <li key={idx} className="text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-primary inline mr-2" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon (desktop only) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border-4 border-background z-10">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-card border border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("process.cta.title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("process.cta.description")}
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft h-10 px-6"
                >
                  {t("process.cta.button")}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
