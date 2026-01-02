import { createContext, useContext, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import '@/i18n/config';

type Language = 'en';

type LanguageContextType = {
  language: Language;
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

  // Show loading state while i18next initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Memoize translation function
  const t = useCallback((key: string, options?: any): string => {
    return i18nT(key, options) as string;
  }, [i18nT]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    language: 'en' as Language,
    t
  }), [t]);

  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
