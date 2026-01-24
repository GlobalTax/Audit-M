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

  if (variant === "compact") {
    return (
      <span className={cn("text-2xl font-normal tracking-tight", textColor)}>
        A
      </span>
    );
  }

  return (
    <span className={cn("font-display text-2xl md:text-3xl font-normal tracking-tight", textColor, className)}>
      Audit
    </span>
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
  const altText = brand === "international" ? "Audit Global" : "Audit";
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
