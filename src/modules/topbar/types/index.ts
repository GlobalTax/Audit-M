// TopBar Module Types

export interface TopBarCompany {
  id: string;
  name: string;
  url: string;
  logoUrl: string | null;
  isCurrent: boolean;
  isActive: boolean;
  position: number;
}

export interface TopBarLink {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  isActive: boolean;
  position: number;
}

export interface TopBarConfig {
  phoneNumber: string;
  phoneLink: string;
  showSearch: boolean;
  showLanguageSelector: boolean;
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
  fontFamily: string;
  fontSize: string;
}

export interface TopBarData {
  companies: TopBarCompany[];
  links: TopBarLink[];
  config: TopBarConfig;
}

export interface TopBarStorageAdapter {
  getData(): Promise<TopBarData>;
  updateConfig(config: Partial<TopBarConfig>): Promise<void>;
  createCompany(data: Omit<TopBarCompany, 'id'>): Promise<TopBarCompany>;
  updateCompany(id: string, data: Partial<TopBarCompany>): Promise<void>;
  deleteCompany(id: string): Promise<void>;
  reorderCompanies(orderedIds: string[]): Promise<void>;
  createLink(data: Omit<TopBarLink, 'id'>): Promise<TopBarLink>;
  updateLink(id: string, data: Partial<TopBarLink>): Promise<void>;
  deleteLink(id: string): Promise<void>;
  reorderLinks(orderedIds: string[]): Promise<void>;
}

export interface TopBarContextValue {
  data: TopBarData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  updateConfig: (config: Partial<TopBarConfig>) => Promise<void>;
  createCompany: (data: Omit<TopBarCompany, 'id'>) => Promise<TopBarCompany>;
  updateCompany: (id: string, data: Partial<TopBarCompany>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  reorderCompanies: (orderedIds: string[]) => Promise<void>;
  createLink: (data: Omit<TopBarLink, 'id'>) => Promise<TopBarLink>;
  updateLink: (id: string, data: Partial<TopBarLink>) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  reorderLinks: (orderedIds: string[]) => Promise<void>;
}
