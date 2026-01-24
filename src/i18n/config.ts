import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations - Vite handles JSON imports
import translationES from '../../public/locales/es/common.json';
import translationEN from '../../public/locales/en/common.json';
import translationCA from '../../public/locales/ca/common.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN },
  ca: { translation: translationCA }
};

// Get initial language from localStorage or detect from browser
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['es', 'ca', 'en'].includes(saved)) {
      return saved;
    }
    // Detect browser language - prioritize Catalan if detected
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ca') return 'ca';
  }
  return 'es'; // Default to Spanish
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'es',
    supportedLngs: ['es', 'ca', 'en'],
    returnNull: false,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false
    },
    debug: false, // Disable debug to reduce console noise
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lng, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Missing i18n key: ${key} in ${lng}`);
      }
    }
  });

export default i18n;
