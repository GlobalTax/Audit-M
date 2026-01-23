import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Scale, Users, Globe, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Overline } from "@/components/ui/typography";

interface ReasonProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const Reason = ({ icon: Icon, title, description, index }: ReasonProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-4"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export const WhyChooseUsSection = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Award,
      title: t('auditHub.whyUs.roac.title'),
      description: t('auditHub.whyUs.roac.description')
    },
    {
      icon: Scale,
      title: t('auditHub.whyUs.methodology.title'),
      description: t('auditHub.whyUs.methodology.description')
    },
    {
      icon: Users,
      title: t('auditHub.whyUs.team.title'),
      description: t('auditHub.whyUs.team.description')
    },
    {
      icon: Globe,
      title: t('auditHub.whyUs.networks.title'),
      description: t('auditHub.whyUs.networks.description')
    },
    {
      icon: Shield,
      title: t('auditHub.whyUs.independence.title'),
      description: t('auditHub.whyUs.independence.description')
    },
    {
      icon: TrendingUp,
      title: t('auditHub.whyUs.value.title'),
      description: t('auditHub.whyUs.value.description')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Overline className="mb-3">{t('auditHub.whyUs.overline')}</Overline>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t('auditHub.whyUs.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('auditHub.whyUs.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {reasons.map((reason, index) => (
              <Reason
                key={index}
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
