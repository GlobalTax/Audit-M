import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'ca' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Prioridad: Detectar idioma de la URL inicial
    const initialPathLang = window.location.pathname.split('/')[1] as Language;
    if (['es', 'ca', 'en'].includes(initialPathLang)) {
      return initialPathLang;
    }
    
    // 2. Intentar leer de localStorage
    const stored = localStorage.getItem(STORAGE_KEY) as Language;
    if (stored && ['es', 'ca', 'en'].includes(stored)) {
      return stored;
    }
    
    // 3. Detectar idioma del navegador
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ca')) return 'ca';
    if (browserLang.startsWith('en')) return 'en';
    return 'es'; // Default español
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  useEffect(() => {
    // Actualizar el atributo lang del documento
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
