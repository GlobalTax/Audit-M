import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../public/locales/en/common.json';

const resources = {
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en'],
    returnNull: false,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false
    },
    debug: import.meta.env.DEV,
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lng, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Missing i18n key: ${key} in ${lng}`);
      }
    }
  });

export default i18n;
