import { useContext } from 'react';
import { TopBarContext } from '../components/TopBarProvider';
import { TopBarContextValue, TopBarData } from '../types';
import { DEFAULT_DATA } from '../utils/defaults';

/**
 * Hook to access TopBar context. Throws if used outside TopBarProvider.
 */
export function useTopBar(): TopBarContextValue {
  const context = useContext(TopBarContext);
  
  if (!context) {
    throw new Error('useTopBar must be used within a TopBarProvider');
  }
  
  return context;
}

/**
 * Optional hook that returns null if outside TopBarProvider.
 * Useful for components that can work with or without the provider.
 */
export function useTopBarOptional(): TopBarData | null {
  const context = useContext(TopBarContext);
  return context?.data ?? null;
}

/**
 * Hook that returns data with defaults if outside TopBarProvider.
 */
export function useTopBarWithDefaults(): TopBarData {
  const context = useContext(TopBarContext);
  return context?.data ?? DEFAULT_DATA;
}
