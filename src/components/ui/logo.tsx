import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logos/navarro-tax-legal.svg";
import logoFullWhite from "@/assets/logos/navarro-tax-legal-white.svg";
import logoCompact from "@/assets/logos/navarro.svg";
import logoCompactWhite from "@/assets/logos/navarro-white.svg";

interface LogoProps {
  variant?: "full" | "compact";
  color?: "dark" | "light";
  brand?: "default" | "international";
  className?: string;
  asLink?: boolean;
  to?: string;
}

const InternationalLogo = ({ 
  variant, 
  color 
}: { 
  variant: "full" | "compact"; 
  color: "dark" | "light";
}) => {
  const textColor = color === "light" ? "text-white" : "text-foreground";
  const taglineColor = color === "light" ? "text-white/70" : "text-muted-foreground";

  if (variant === "compact") {
    return (
      <span className={cn("text-2xl font-bold tracking-tight", textColor)}>
        NI
      </span>
    );
  }

  return (
    <div className="flex flex-col">
      <span className={cn(
        "text-lg md:text-xl font-semibold tracking-widest uppercase leading-tight",
        textColor
      )}>
        NAVARRO INTERNATIONAL
      </span>
      <span className={cn(
        "text-[10px] md:text-xs tracking-wide hidden sm:block",
        taglineColor
      )}>
        Global Legal & Tax Advisory
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
  const getLogoSrc = () => {
    if (variant === "full") {
      return color === "light" ? logoFullWhite : logoFull;
    }
    return color === "light" ? logoCompactWhite : logoCompact;
  };

  const isInternational = brand === "international";
  const altText = isInternational ? "Navarro International" : "Navarro Tax Legal";
  const ariaLabel = isInternational ? "Navarro International - Home" : "Navarro Tax Legal - Inicio";

  const logoContent = isInternational ? (
    <InternationalLogo variant={variant} color={color} />
  ) : (
    <img
      src={getLogoSrc()}
      alt={altText}
      className="h-full w-auto"
    />
  );

  if (!asLink) {
    return (
      <div className={cn("inline-block", className)}>
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
