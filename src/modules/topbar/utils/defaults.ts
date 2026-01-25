import { TopBarConfig, TopBarData } from '../types';

export const COLOR_PRESETS = {
  dark: { 
    backgroundColor: '#0f172a', 
    textColor: 'rgba(255,255,255,0.7)', 
    hoverColor: '#ffffff' 
  },
  'black-gold': { 
    backgroundColor: '#000000', 
    textColor: '#d4af37', 
    hoverColor: '#ffffff' 
  },
  navy: { 
    backgroundColor: '#1e3a5f', 
    textColor: 'rgba(255,255,255,0.8)', 
    hoverColor: '#ffffff' 
  },
  slate: { 
    backgroundColor: '#334155', 
    textColor: 'rgba(255,255,255,0.7)', 
    hoverColor: '#ffffff' 
  },
  charcoal: {
    backgroundColor: '#1a1a1a',
    textColor: 'rgba(255,255,255,0.75)',
    hoverColor: '#ffffff'
  },
} as const;

export type ColorPresetKey = keyof typeof COLOR_PRESETS;

export const FONT_OPTIONS = [
  { label: 'General Sans', value: 'General Sans, sans-serif' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'System UI', value: 'system-ui, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
] as const;

export const FONT_SIZE_OPTIONS = [
  { label: 'Small (12px)', value: '12px' },
  { label: 'Default (14px)', value: '14px' },
  { label: 'Medium (15px)', value: '15px' },
  { label: 'Large (16px)', value: '16px' },
] as const;

export const DEFAULT_CONFIG: TopBarConfig = {
  phoneNumber: '+34 93 000 00 00',
  phoneLink: 'tel:+34930000000',
  showSearch: false,
  showLanguageSelector: true,
  backgroundColor: '#0f172a',
  textColor: 'rgba(255,255,255,0.7)',
  hoverColor: '#ffffff',
  fontFamily: 'General Sans, sans-serif',
  fontSize: '14px',
};

export const DEFAULT_DATA: TopBarData = {
  config: DEFAULT_CONFIG,
  companies: [],
  links: [],
};
