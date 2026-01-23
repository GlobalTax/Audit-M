import { Shield, Users, Target, TrendingUp, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const reasons = [
  {
    icon: Shield,
    text: "Complete independence and objectivity in every audit engagement.",
  },
  {
    icon: Users,
    text: "Certified auditors with deep industry expertise and international experience.",
  },
  {
    icon: Target,
    text: "Risk-based methodology aligned with ISA and local GAAP standards.",
  },
  {
    icon: TrendingUp,
    text: "Actionable insights and recommendations that go beyond compliance.",
  },
  {
    icon: Check,
    text: "Rigorous quality control and peer review processes.",
  },
];

export function WhyAuditSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 md:py-28 border-t border-border">
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
              Audit is an independent audit firm with over 25 years of experience. 
              We provide rigorous, value-added audit services that help stakeholders 
              make informed decisions based on reliable financial information.
            </p>
          </div>

          {/* Right column - Bullets */}
          <div className="space-y-5">
            {reasons.map((reason, index) => {
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <p className="text-foreground pt-2 leading-relaxed">
                    {reason.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
