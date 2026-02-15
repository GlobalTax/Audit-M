import { Shield, Users, Target, TrendingUp, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const reasonKeys = [
  { icon: Shield, key: "independence" },
  { icon: Users, key: "expertise" },
  { icon: Target, key: "methodology" },
  { icon: TrendingUp, key: "valueAdd" },
  { icon: Check, key: "quality" },
];

export function WhyAuditSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-muted/30 py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Title */}
          <div>
            <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-6">
              {t("home.whyAudit.overline")}
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight text-foreground">
              {t("home.whyAudit.title")}
            </h3>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {t("home.whyAudit.intro")}
            </p>
          </div>

          {/* Right column - Bullets */}
          <div className="space-y-5">
            {reasonKeys.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {t(`home.whyAudit.${reason.key}.title`)}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {t(`home.whyAudit.${reason.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
