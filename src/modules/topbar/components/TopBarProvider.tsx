import { createContext, ReactNode, useMemo } from 'react';
import { TopBarStorageAdapter, TopBarContextValue } from '../types';
import { useTopBarState } from '../hooks/useTopBarState';
import { DEFAULT_DATA } from '../utils/defaults';

export const TopBarContext = createContext<TopBarContextValue | null>(null);

interface TopBarProviderProps {
  adapter: TopBarStorageAdapter;
  children: ReactNode;
}

/**
 * TopBar Provider - manages state with internal hook (no React Query dependency)
 */
export function TopBarProvider({ adapter, children }: TopBarProviderProps) {
  const state = useTopBarState(adapter);

  const value = useMemo<TopBarContextValue>(() => ({
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch: state.refetch,
    updateConfig: state.updateConfig,
    createCompany: state.createCompany,
    updateCompany: state.updateCompany,
    deleteCompany: state.deleteCompany,
    reorderCompanies: async (orderedIds: string[]) => {
      // Reorder by updating positions
      for (let i = 0; i < orderedIds.length; i++) {
        await state.updateCompany(orderedIds[i], { position: i });
      }
    },
    createLink: state.createLink,
    updateLink: state.updateLink,
    deleteLink: state.deleteLink,
    reorderLinks: async (orderedIds: string[]) => {
      // Reorder by updating positions
      for (let i = 0; i < orderedIds.length; i++) {
        await state.updateLink(orderedIds[i], { position: i });
      }
    },
  }), [state]);

  return (
    <TopBarContext.Provider value={value}>
      {children}
    </TopBarContext.Provider>
  );
}

// Re-export for convenience
export { DEFAULT_DATA };
