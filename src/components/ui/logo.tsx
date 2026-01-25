import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "compact";
  color?: "dark" | "light";
  brand?: "default" | "international";
  className?: string;
  asLink?: boolean;
  to?: string;
}

const AuditLogo = ({ 
  variant, 
  color,
  className
}: { 
  variant: "full" | "compact"; 
  color: "dark" | "light";
  className?: string;
}) => {
  const textColor = color === "light" ? "text-white" : "text-foreground";
  const separatorOpacity = color === "light" ? "opacity-40" : "opacity-30";

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center", className)}>
        <span className={cn("font-display text-lg font-medium tracking-tight", textColor)}>
          Audit
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Audit text */}
      <span className={cn("font-display text-2xl md:text-3xl font-medium tracking-tight", textColor)}>
        Audit
      </span>
      
      {/* Vertical separator */}
      <div className={cn("w-px h-5 md:h-6 bg-current", separatorOpacity, textColor)} />
      
      {/* Submarca "m" */}
      <span className={cn("text-lg md:text-xl font-light", textColor)}>
        m
      </span>
    </div>
  );
};

export const Logo = ({ 
  variant = "full", 
  color = "dark", 
  brand = "default",
  className,
  asLink = true,
  to = "/"
}: LogoProps) => {
  const ariaLabel = brand === "international" ? "Audit Global - Home" : "Audit - Inicio";

  const logoContent = (
    <AuditLogo variant={variant} color={color} className={className} />
  );

  if (!asLink) {
    return (
      <div className={cn("inline-flex items-center", className)}>
        {logoContent}
      </div>
    );
  }

  return (
    <Link 
      to={to}
      className={cn("inline-block group transition-opacity hover:opacity-80", className)}
      aria-label={ariaLabel}
    >
      {logoContent}
    </Link>
  );
};
