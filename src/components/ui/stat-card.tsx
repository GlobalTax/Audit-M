import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  className?: string;
}

export const StatCard = ({ label, value, description, className }: StatCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col gap-4 p-8 rounded-xl",
        "bg-muted/50 border border-border",
        "shadow-sm hover:shadow-lg",
        "hover:-translate-y-0.5 transition-all duration-150",
        className
      )}
    >
      {/* Label - Plus Jakarta Sans, uppercase */}
      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      
      {/* Value - Plus Jakarta Sans, bold, responsive */}
      <div className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-foreground leading-tight">
        {value}
      </div>
      
      {/* Description - Roboto, 16px */}
      <p className="text-base text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
