import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

const languages: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

export const LanguageSwitcher = ({ variant = 'auto', className }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const getTextColor = (isActive: boolean) => {
    if (variant === 'light') {
      return isActive ? 'text-foreground font-semibold' : 'text-foreground/60 hover:text-foreground';
    }
    if (variant === 'dark') {
      return isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white';
    }
    // Auto - inherits from parent
    return isActive ? 'font-semibold' : 'opacity-60 hover:opacity-100';
  };

  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "transition-all duration-200 px-1",
              getTextColor(language === lang.code)
            )}
            aria-label={`Cambiar idioma a ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="opacity-40 ml-1.5">·</span>
          )}
        </span>
      ))}
    </div>
  );
};
