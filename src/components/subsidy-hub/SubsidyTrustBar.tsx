import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Award, FileCheck, Scale, Landmark, BadgeCheck } from "lucide-react";

const credentials = [
  { icon: Shield, labelKey: "subsidyHub.trustBar.roac" },
  { icon: Award, labelKey: "subsidyHub.trustBar.icac" },
  { icon: FileCheck, labelKey: "subsidyHub.trustBar.igae" },
  { icon: Scale, labelKey: "subsidyHub.trustBar.cdti" },
  { icon: Landmark, labelKey: "subsidyHub.trustBar.feder" },
  { icon: BadgeCheck, labelKey: "subsidyHub.trustBar.prtr" },
];

export const SubsidyTrustBar = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-muted border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {credentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {t(cred.labelKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
