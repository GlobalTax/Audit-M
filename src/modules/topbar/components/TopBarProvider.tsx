import { createContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TopBarStorageAdapter, TopBarContextValue, TopBarConfig, TopBarCompany, TopBarLink } from '../types';
import { DEFAULT_DATA } from '../utils/defaults';

export const TopBarContext = createContext<TopBarContextValue | null>(null);

interface TopBarProviderProps {
  adapter: TopBarStorageAdapter;
  children: ReactNode;
}

export function TopBarProvider({ adapter, children }: TopBarProviderProps) {
  const queryClient = useQueryClient();
  const queryKey = ['topbar-module'];

  const { data = DEFAULT_DATA, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => adapter.getData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const updateConfigMutation = useMutation({
    mutationFn: (config: Partial<TopBarConfig>) => adapter.updateConfig(config),
    onSuccess: invalidate,
  });

  const createCompanyMutation = useMutation({
    mutationFn: (companyData: Omit<TopBarCompany, 'id'>) => adapter.createCompany(companyData),
    onSuccess: invalidate,
  });

  const updateCompanyMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TopBarCompany> }) => 
      adapter.updateCompany(id, data),
    onSuccess: invalidate,
  });

  const deleteCompanyMutation = useMutation({
    mutationFn: (id: string) => adapter.deleteCompany(id),
    onSuccess: invalidate,
  });

  const reorderCompaniesMutation = useMutation({
    mutationFn: (orderedIds: string[]) => adapter.reorderCompanies(orderedIds),
    onSuccess: invalidate,
  });

  const createLinkMutation = useMutation({
    mutationFn: (linkData: Omit<TopBarLink, 'id'>) => adapter.createLink(linkData),
    onSuccess: invalidate,
  });

  const updateLinkMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TopBarLink> }) => 
      adapter.updateLink(id, data),
    onSuccess: invalidate,
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (id: string) => adapter.deleteLink(id),
    onSuccess: invalidate,
  });

  const reorderLinksMutation = useMutation({
    mutationFn: (orderedIds: string[]) => adapter.reorderLinks(orderedIds),
    onSuccess: invalidate,
  });

  const value: TopBarContextValue = {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
    updateConfig: updateConfigMutation.mutateAsync,
    createCompany: createCompanyMutation.mutateAsync,
    updateCompany: (id, data) => updateCompanyMutation.mutateAsync({ id, data }),
    deleteCompany: deleteCompanyMutation.mutateAsync,
    reorderCompanies: reorderCompaniesMutation.mutateAsync,
    createLink: createLinkMutation.mutateAsync,
    updateLink: (id, data) => updateLinkMutation.mutateAsync({ id, data }),
    deleteLink: deleteLinkMutation.mutateAsync,
    reorderLinks: reorderLinksMutation.mutateAsync,
  };

  return (
    <TopBarContext.Provider value={value}>
      {children}
    </TopBarContext.Provider>
  );
}
