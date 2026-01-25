import { useLanguage } from "@/contexts/LanguageContext";
import { Overline } from "@/components/ui/typography";
import { Scale, Leaf, Shield, FileSpreadsheet, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Requirement {
  icon: typeof Scale;
  titleKey: string;
  descriptionKey: string;
  linkUrl?: string;
  linkText?: string;
  color: string;
}

const requirements: Requirement[] = [
  {
    icon: Scale,
    titleKey: "subsidyHub.requirements.morosidad.title",
    descriptionKey: "subsidyHub.requirements.morosidad.description",
    color: "blue",
  },
  {
    icon: Leaf,
    titleKey: "subsidyHub.requirements.dnsh.title",
    descriptionKey: "subsidyHub.requirements.dnsh.description",
    color: "green",
  },
  {
    icon: Shield,
    titleKey: "subsidyHub.requirements.daci.title",
    descriptionKey: "subsidyHub.requirements.daci.description",
    color: "purple",
  },
  {
    icon: FileSpreadsheet,
    titleKey: "subsidyHub.requirements.accounting.title",
    descriptionKey: "subsidyHub.requirements.accounting.description",
    color: "orange",
  },
];

const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
  },
};

export const SubsidyRequirements2026 = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Overline className="mb-3">{t('subsidyHub.requirements.overline')}</Overline>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            {t('subsidyHub.requirements.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subsidyHub.requirements.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {requirements.map((req, index) => {
            const Icon = req.icon;
            const colors = colorClasses[req.color];

            return (
              <div
                key={index}
                className={cn(
                  "rounded-xl border-2 p-6 transition-all hover:shadow-md",
                  colors.bg,
                  colors.border
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-lg", colors.bg)}>
                    <Icon className={cn("h-6 w-6", colors.icon)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t(req.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(req.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alert Banner */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl p-6 text-center">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              {t('subsidyHub.requirements.warning')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
