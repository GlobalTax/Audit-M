import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-white/70" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
        className="text-white/90 hover:text-white hover:bg-white/10 font-medium"
      >
        {language === "es" ? "EN" : "ES"}
      </Button>
    </div>
  );
};
