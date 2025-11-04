import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Hero
    "hero.badge": "Régimen Especial",
    "hero.title": "Optimiza tu Fiscalidad con la Ley Beckham",
    "hero.subtitle": "Tributa solo al 24% durante 6 años. Asesoramiento experto para profesionales internacionales que se trasladan a España.",
    "hero.cta.consult": "Solicitar Consulta Gratuita",
    "hero.cta.requirements": "Ver Requisitos",
    "hero.stat.success": "Tasa de Éxito",
    "hero.stat.experience": "Experiencia",
    "hero.stat.tax": "Tipo Impositivo",
    "hero.stat.years": "años",
  },
  en: {
    // Hero
    "hero.badge": "Special Regime",
    "hero.title": "Optimize Your Taxes with Beckham Law",
    "hero.subtitle": "Pay only 24% tax for 6 years. Expert advice for international professionals moving to Spain.",
    "hero.cta.consult": "Request Free Consultation",
    "hero.cta.requirements": "View Requirements",
    "hero.stat.success": "Success Rate",
    "hero.stat.experience": "Experience",
    "hero.stat.tax": "Tax Rate",
    "hero.stat.years": "years",
  }
};
