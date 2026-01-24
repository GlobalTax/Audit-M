import { createContext, useContext, ReactNode, useEffect, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import '@/i18n/config';

export type Language = 'es' | 'ca' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n, t: i18nT, ready } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (i18n.language as Language) || 'es'
  );

  // Show loading state while i18next initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Function to change language
  const setLanguage = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
  }, [i18n]);

  // Memoize translation function
  const t = useCallback((key: string, options?: any): string => {
    return i18nT(key, options) as string;
  }, [i18nT]);

  // Sync language state with i18n
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng as Language);
      document.documentElement.lang = lng;
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Set initial html lang attribute
    document.documentElement.lang = i18n.language;
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    language: currentLanguage,
    setLanguage,
    t
  }), [currentLanguage, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
