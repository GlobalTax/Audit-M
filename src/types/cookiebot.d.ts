// Cookiebot TypeScript declarations for global.nrro.es

interface CookiebotConsent {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface Cookiebot {
  consent: CookiebotConsent;
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
  regulations: {
    gdprApplies: boolean;
    ccpaApplies: boolean;
    lgpdApplies: boolean;
  };
  renew: () => void;
  withdraw: () => void;
  show: () => void;
  hide: () => void;
  submitCustomConsent: (optinPreferences: boolean, optinStatistics: boolean, optinMarketing: boolean) => void;
}

declare global {
  interface Window {
    Cookiebot?: Cookiebot;
    dataLayer: any[];
  }
}

export {};
