// Components
export { TopBar } from './components/TopBar';
export { TopBarProvider } from './components/TopBarProvider';
export { GroupDropdown } from './components/GroupDropdown';

// Admin
export { TopBarAdmin } from './admin';

// Hooks
export { useTopBar, useTopBarOptional, useTopBarWithDefaults } from './hooks/useTopBar';
export { useTopBarState } from './hooks/useTopBarState';

// Adapters
export { createLocalStorageAdapter } from './adapters/localStorage';
export { createSupabaseAdapter } from './adapters/supabase';
export { createStaticAdapter } from './adapters/static';

// Types
export type {
  TopBarCompany,
  TopBarLink,
  TopBarConfig,
  TopBarData,
  TopBarStorageAdapter,
  TopBarContextValue,
} from './types';

// Utilities
export {
  DEFAULT_CONFIG,
  DEFAULT_DATA,
  COLOR_PRESETS,
  FONT_OPTIONS,
  FONT_SIZE_OPTIONS,
} from './utils/defaults';
export type { ColorPresetKey } from './utils/defaults';
export { cn } from './utils/cn';

// Internal UI (optional re-export for customization)
export * from './ui';
