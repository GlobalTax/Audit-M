import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  serviceCount: number;
  color: string;
  onClick: () => void;
  isActive?: boolean;
}

const colorVariants: Record<string, { bg: string; border: string; icon: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400"
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: "text-emerald-600 dark:text-emerald-400"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400"
  },
  slate: {
    bg: "bg-slate-50 dark:bg-slate-950/30",
    border: "border-slate-200 dark:border-slate-800",
    icon: "text-slate-600 dark:text-slate-400"
  }
};

export const CategoryCard = ({
  icon: Icon,
  label,
  description,
  serviceCount,
  color,
  onClick,
  isActive = false
}: CategoryCardProps) => {
  const colorClasses = colorVariants[color] || colorVariants.blue;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-6 rounded-xl border-2 transition-all duration-200 text-left",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
        colorClasses.bg,
        isActive ? "border-primary shadow-md" : colorClasses.border
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg bg-white dark:bg-background shadow-sm",
          colorClasses.icon
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {label}
            </h3>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {serviceCount}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
};
