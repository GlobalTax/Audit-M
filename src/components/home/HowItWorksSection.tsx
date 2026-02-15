import { ClipboardList, Search, FileCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const stepKeys = [
  { icon: ClipboardList, key: "planning" },
  { icon: Search, key: "fieldwork" },
  { icon: FileCheck, key: "reporting" },
  { icon: TrendingUp, key: "followUp" },
];

export function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("home.methodology.overline")}
          </h2>
          <h3 className="text-2xl md:text-3xl font-normal">
            {t("home.methodology.title")}
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {stepKeys.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step number - accent color */}
                  <span className="font-mono text-3xl font-bold text-accent/30 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  
                  {/* Icon - accent background */}
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-xl font-medium text-foreground mb-3">
                    {t(`methodology.phases.${step.key}.title`)}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {t(`methodology.phases.${step.key}.description`)}
                  </p>
                </div>

                {/* Connector line with accent color */}
                {index < stepKeys.length - 1 && (
                  <div className="hidden md:block absolute top-[88px] left-[calc(50%+48px)] right-[-48px] h-[2px] bg-gradient-to-r from-accent/30 to-accent/10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
