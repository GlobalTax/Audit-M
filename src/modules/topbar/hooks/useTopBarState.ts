import { useState, useEffect, useCallback } from 'react';
import { TopBarStorageAdapter, TopBarData, TopBarConfig, TopBarCompany, TopBarLink } from '../types';
import { DEFAULT_DATA } from '../utils/defaults';

interface UseTopBarStateReturn {
  data: TopBarData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateConfig: (config: Partial<TopBarConfig>) => Promise<void>;
  createCompany: (data: Omit<TopBarCompany, 'id'>) => Promise<TopBarCompany>;
  updateCompany: (id: string, data: Partial<TopBarCompany>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  createLink: (data: Omit<TopBarLink, 'id'>) => Promise<TopBarLink>;
  updateLink: (id: string, data: Partial<TopBarLink>) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
}

/**
 * Internal state management hook - no React Query dependency
 * Manages TopBar data with the provided storage adapter
 */
export function useTopBarState(adapter: TopBarStorageAdapter): UseTopBarStateReturn {
  const [data, setData] = useState<TopBarData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await adapter.getData();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch TopBar data'));
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  // Initial fetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateConfig = useCallback(async (config: Partial<TopBarConfig>) => {
    try {
      await adapter.updateConfig(config);
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update config'));
      throw e;
    }
  }, [adapter, refetch]);

  const createCompany = useCallback(async (companyData: Omit<TopBarCompany, 'id'>) => {
    try {
      const result = await adapter.createCompany(companyData);
      await refetch();
      return result;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to create company'));
      throw e;
    }
  }, [adapter, refetch]);

  const updateCompany = useCallback(async (id: string, companyData: Partial<TopBarCompany>) => {
    try {
      await adapter.updateCompany(id, companyData);
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update company'));
      throw e;
    }
  }, [adapter, refetch]);

  const deleteCompany = useCallback(async (id: string) => {
    try {
      await adapter.deleteCompany(id);
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to delete company'));
      throw e;
    }
  }, [adapter, refetch]);

  const createLink = useCallback(async (linkData: Omit<TopBarLink, 'id'>) => {
    try {
      const result = await adapter.createLink(linkData);
      await refetch();
      return result;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to create link'));
      throw e;
    }
  }, [adapter, refetch]);

  const updateLink = useCallback(async (id: string, linkData: Partial<TopBarLink>) => {
    try {
      await adapter.updateLink(id, linkData);
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update link'));
      throw e;
    }
  }, [adapter, refetch]);

  const deleteLink = useCallback(async (id: string) => {
    try {
      await adapter.deleteLink(id);
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to delete link'));
      throw e;
    }
  }, [adapter, refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
    updateConfig,
    createCompany,
    updateCompany,
    deleteCompany,
    createLink,
    updateLink,
    deleteLink,
  };
}
