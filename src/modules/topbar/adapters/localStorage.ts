import { TopBarStorageAdapter, TopBarData, TopBarConfig, TopBarCompany, TopBarLink } from '../types';
import { DEFAULT_DATA } from '../utils/defaults';

export function createLocalStorageAdapter(storageKey: string): TopBarStorageAdapter {
  const getStoredData = (): TopBarData => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : DEFAULT_DATA;
    } catch {
      return DEFAULT_DATA;
    }
  };

  const saveData = (data: TopBarData) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const generateId = () => crypto.randomUUID();

  return {
    async getData(): Promise<TopBarData> {
      return getStoredData();
    },

    async updateConfig(config: Partial<TopBarConfig>): Promise<void> {
      const data = getStoredData();
      data.config = { ...data.config, ...config };
      saveData(data);
    },

    async createCompany(companyData: Omit<TopBarCompany, 'id'>): Promise<TopBarCompany> {
      const data = getStoredData();
      const newCompany: TopBarCompany = {
        ...companyData,
        id: generateId(),
      };
      data.companies.push(newCompany);
      saveData(data);
      return newCompany;
    },

    async updateCompany(id: string, updates: Partial<TopBarCompany>): Promise<void> {
      const data = getStoredData();
      const index = data.companies.findIndex(c => c.id === id);
      if (index !== -1) {
        data.companies[index] = { ...data.companies[index], ...updates };
        saveData(data);
      }
    },

    async deleteCompany(id: string): Promise<void> {
      const data = getStoredData();
      data.companies = data.companies.filter(c => c.id !== id);
      saveData(data);
    },

    async reorderCompanies(orderedIds: string[]): Promise<void> {
      const data = getStoredData();
      const reordered = orderedIds
        .map((id, index) => {
          const company = data.companies.find(c => c.id === id);
          return company ? { ...company, position: index } : null;
        })
        .filter(Boolean) as TopBarCompany[];
      data.companies = reordered;
      saveData(data);
    },

    async createLink(linkData: Omit<TopBarLink, 'id'>): Promise<TopBarLink> {
      const data = getStoredData();
      const newLink: TopBarLink = {
        ...linkData,
        id: generateId(),
      };
      data.links.push(newLink);
      saveData(data);
      return newLink;
    },

    async updateLink(id: string, updates: Partial<TopBarLink>): Promise<void> {
      const data = getStoredData();
      const index = data.links.findIndex(l => l.id === id);
      if (index !== -1) {
        data.links[index] = { ...data.links[index], ...updates };
        saveData(data);
      }
    },

    async deleteLink(id: string): Promise<void> {
      const data = getStoredData();
      data.links = data.links.filter(l => l.id !== id);
      saveData(data);
    },

    async reorderLinks(orderedIds: string[]): Promise<void> {
      const data = getStoredData();
      const reordered = orderedIds
        .map((id, index) => {
          const link = data.links.find(l => l.id === id);
          return link ? { ...link, position: index } : null;
        })
        .filter(Boolean) as TopBarLink[];
      data.links = reordered;
      saveData(data);
    },
  };
}
