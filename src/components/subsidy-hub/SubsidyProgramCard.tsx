import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubsidyProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  programs: string[];
  deadline?: string;
  slug: string;
  color: "purple" | "green" | "blue" | "orange" | "indigo" | "slate";
}

const colorVariants = {
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-800",
    icon: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  },
  slate: {
    bg: "bg-slate-50 dark:bg-slate-950/30",
    border: "border-slate-200 dark:border-slate-800",
    icon: "text-slate-600 dark:text-slate-400",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  },
};

export const SubsidyProgramCard = ({
  icon: Icon,
  title,
  description,
  programs,
  deadline,
  slug,
  color,
}: SubsidyProgramCardProps) => {
  const { t } = useLanguage();
  const colors = colorVariants[color];

  return (
    <Link
      to={slug}
      className={cn(
        "group block rounded-xl border-2 p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        colors.bg,
        colors.border
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-lg", colors.bg)}>
          <Icon className={cn("h-7 w-7", colors.icon)} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          {/* Programs List */}
          <div className="flex flex-wrap gap-2 mb-4">
            {programs.slice(0, 3).map((program, index) => (
              <span
                key={index}
                className={cn("text-xs px-2 py-1 rounded-full", colors.badge)}
              >
                {program}
              </span>
            ))}
            {programs.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{programs.length - 3} más
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {deadline && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{deadline}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-accent group-hover:gap-2 transition-all">
              <span>{t('subsidyHub.programs.viewDetails')}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
