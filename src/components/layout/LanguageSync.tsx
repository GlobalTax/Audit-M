import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguageContext, Language } from '@/contexts/LanguageContext';

/**
 * Componente que sincroniza el idioma del contexto con el prefijo de la URL
 * Debe usarse dentro de componentes que tengan acceso a useLocation (dentro de BrowserRouter)
 */
export const LanguageSync = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguageContext();

  useEffect(() => {
    // Extraer el idioma del primer segmento de la URL
    const pathParts = location.pathname.split('/').filter(Boolean);
    const pathLang = pathParts[0] as Language;

    // Si la URL tiene un idioma válido diferente al actual, sincronizarlo
    if (['es', 'ca', 'en'].includes(pathLang) && pathLang !== language) {
      setLanguage(pathLang);
    }
  }, [location.pathname, language, setLanguage]);

  // Este componente no renderiza nada
  return null;
};
