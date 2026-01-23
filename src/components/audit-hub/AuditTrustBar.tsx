import { useLanguage } from "@/contexts/LanguageContext";
import { FileCheck, Award, Globe, Users } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

const Stat = ({ icon: Icon, value, label }: StatProps) => (
  <div className="flex items-center gap-3 justify-center">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div className="text-left">
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

export const AuditTrustBar = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: FileCheck,
      value: "21",
      label: t('auditHub.trustBar.services')
    },
    {
      icon: Award,
      value: "ROAC",
      label: t('auditHub.trustBar.registered')
    },
    {
      icon: Globe,
      value: "3",
      label: t('auditHub.trustBar.networks')
    },
    {
      icon: Users,
      value: "25+",
      label: t('auditHub.trustBar.experience')
    }
  ];

  return (
    <section className="bg-muted/50 border-y border-border/50 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <Stat 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
