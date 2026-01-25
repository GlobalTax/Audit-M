import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeHeroProps {
  children: ReactNode;
  variant?: "dark" | "light" | "warning";
  className?: string;
}

export const BadgeHero = ({ 
  children, 
  variant = "dark", 
  className 
}: BadgeHeroProps) => {
  const variantClasses = {
    dark: "badge-hero",
    light: "badge-hero-light",
    warning: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/90 text-white text-sm font-medium border border-amber-400/50 shadow-lg",
  };

  return (
    <span 
      className={cn(
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
