import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const RequirementsChecklist = () => {
  const { t } = useLanguage();
  
  const requirements = [
    {
      title: t("leyBeckham.requirements.req1.title"),
      description: t("leyBeckham.requirements.req1.description"),
      isKey: true
    },
    {
      title: t("leyBeckham.requirements.req2.title"),
      description: t("leyBeckham.requirements.req2.description"),
      isKey: false
    },
    {
      title: t("leyBeckham.requirements.req3.title"),
      description: t("leyBeckham.requirements.req3.description"),
      isKey: true
    },
    {
      title: t("leyBeckham.requirements.req4.title"),
      description: t("leyBeckham.requirements.req4.description"),
      isKey: true
    },
    {
      title: t("leyBeckham.requirements.req5.title"),
      description: t("leyBeckham.requirements.req5.description"),
      isKey: false
    }
  ];

  return (
    <section id="requisitos" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("leyBeckham.requirements.eyebrow")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-4">
            {t("leyBeckham.requirements.title")}
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            {t("leyBeckham.requirements.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {requirements.map((req, index) => (
            <Card key={index} className="border-l-4 border-l-primary bg-card border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {req.isKey ? (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-primary" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-accent" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-normal text-lg">
                        {index + 1}. {req.title}
                      </h3>
                      {req.isKey && (
                        <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                          {t("requirements.keyLabel")}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {req.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-neutral-50 border border-border/50">
            <CardContent className="p-6">
              <p className="text-lead mb-4">
                {t("leyBeckham.requirements.cta.text")}
              </p>
              <p className="text-muted-foreground mb-6">
                {t("leyBeckham.requirements.cta.description")}
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft h-10 px-6"
              >
                {t("leyBeckham.requirements.cta.button")}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};