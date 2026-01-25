import { useLanguage } from "@/contexts/LanguageContext";
import { SubsidyProgramCard } from "./SubsidyProgramCard";
import { Overline } from "@/components/ui/typography";
import { Lightbulb, Zap, Laptop, GraduationCap, Globe, MapPin } from "lucide-react";

interface SubsidyProgram {
  icon: typeof Lightbulb;
  titleKey: string;
  descriptionKey: string;
  programs: string[];
  deadline?: string;
  slug: string;
  color: "purple" | "green" | "blue" | "orange" | "indigo" | "slate";
}

const subsidyPrograms: SubsidyProgram[] = [
  {
    icon: Lightbulb,
    titleKey: "subsidyHub.programs.rdi.title",
    descriptionKey: "subsidyHub.programs.rdi.description",
    programs: ["CDTI Neotec", "PID", "Torres Quevedo", "ACCIÓ R+D"],
    deadline: "Q1-Q2 2026",
    slug: "/servicios/auditoria-subvenciones-idi",
    color: "purple",
  },
  {
    icon: Zap,
    titleKey: "subsidyHub.programs.energy.title",
    descriptionKey: "subsidyHub.programs.energy.description",
    programs: ["IDAE", "MOVES III", "PREE", "Rehabilitación MIVAU"],
    deadline: "Variable 2026",
    slug: "/servicios/auditoria-subvenciones-energia",
    color: "green",
  },
  {
    icon: Laptop,
    titleKey: "subsidyHub.programs.digital.title",
    descriptionKey: "subsidyHub.programs.digital.description",
    programs: ["Kit Digital", "CE Implementa", "Activa Industria 4.0"],
    deadline: "Cierre 2026",
    slug: "/servicios/auditoria-subvenciones-digitalizacion",
    color: "blue",
  },
  {
    icon: GraduationCap,
    titleKey: "subsidyHub.programs.training.title",
    descriptionKey: "subsidyHub.programs.training.description",
    programs: ["FUNDAE", "Contratos de formación", "Prácticas bonificadas"],
    slug: "/servicios/auditoria-fundae",
    color: "orange",
  },
  {
    icon: Globe,
    titleKey: "subsidyHub.programs.european.title",
    descriptionKey: "subsidyHub.programs.european.description",
    programs: ["FEDER 21-27", "FSE+", "PRTR NextGen", "Interreg"],
    deadline: "Crítico 2026",
    slug: "/servicios/auditoria-fondos-europeos",
    color: "indigo",
  },
  {
    icon: MapPin,
    titleKey: "subsidyHub.programs.regional.title",
    descriptionKey: "subsidyHub.programs.regional.description",
    programs: ["ACCIÓ", "IVACE", "SPRI", "ICEX", "CDTI Regionales"],
    slug: "/servicios/auditoria-subvenciones-autonomicas",
    color: "slate",
  },
];

export const SubsidyProgramGrid = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Overline className="mb-3">{t('subsidyHub.programs.overline')}</Overline>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            {t('subsidyHub.programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subsidyHub.programs.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subsidyPrograms.map((program, index) => (
            <SubsidyProgramCard
              key={index}
              icon={program.icon}
              title={t(program.titleKey)}
              description={t(program.descriptionKey)}
              programs={program.programs}
              deadline={program.deadline}
              slug={program.slug}
              color={program.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
