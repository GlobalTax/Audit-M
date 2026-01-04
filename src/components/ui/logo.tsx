import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logos/navarro-tax-legal.svg";
import logoFullWhite from "@/assets/logos/navarro-tax-legal-white.svg";
import logoCompact from "@/assets/logos/navarro.svg";
import logoCompactWhite from "@/assets/logos/navarro-white.svg";
import logoInternationalWhite from "@/assets/logos/navarro-international-white.png";
import logoInternationalDark from "@/assets/logos/navarro-international-dark.png";

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
  color,
  className
}: { 
  variant: "full" | "compact"; 
  color: "dark" | "light";
  className?: string;
}) => {
  const textColor = color === "light" ? "text-white" : "text-foreground";
  const logoSrc = color === "light" ? logoInternationalWhite : logoInternationalDark;

  if (variant === "compact") {
    return (
      <span className={cn("text-2xl font-bold tracking-tight", textColor)}>
        NI
      </span>
    );
  }

  return (
    <img
      src={logoSrc}
      alt="Navarro International"
      className={cn("h-12 md:h-14 w-auto object-contain", className)}
    />
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
    <InternationalLogo variant={variant} color={color} className={className} />
  ) : (
    <img
      src={getLogoSrc()}
      alt={altText}
      className="h-full w-auto"
    />
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
