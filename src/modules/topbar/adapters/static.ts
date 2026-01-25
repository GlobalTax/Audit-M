import { TopBarStorageAdapter, TopBarData } from '../types';

export function createStaticAdapter(staticData: TopBarData): TopBarStorageAdapter {
  const readOnlyError = () => {
    throw new Error('Static adapter is read-only. Use a different adapter for write operations.');
  };

  return {
    async getData(): Promise<TopBarData> {
      return staticData;
    },

    async updateConfig() {
      readOnlyError();
    },

    async createCompany() {
      readOnlyError();
      throw new Error('Unreachable');
    },

    async updateCompany() {
      readOnlyError();
    },

    async deleteCompany() {
      readOnlyError();
    },

    async reorderCompanies() {
      readOnlyError();
    },

    async createLink() {
      readOnlyError();
      throw new Error('Unreachable');
    },

    async updateLink() {
      readOnlyError();
    },

    async deleteLink() {
      readOnlyError();
    },

    async reorderLinks() {
      readOnlyError();
    },
  };
}
