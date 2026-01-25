import { TopBarConfig, TopBarCompany, TopBarLink } from '../types';
import { DEFAULT_CONFIG } from './defaults';

// Database row types (snake_case)
interface DbConfig {
  id?: string;
  phone_number?: string | null;
  phone_link?: string | null;
  show_search?: boolean | null;
  show_language_selector?: boolean | null;
  background_color?: string | null;
  text_color?: string | null;
  hover_color?: string | null;
  font_family?: string | null;
  font_size?: string | null;
}

interface DbCompany {
  id: string;
  name: string;
  url: string;
  logo_url?: string | null;
  is_current?: boolean | null;
  is_active?: boolean | null;
  position?: number | null;
}

interface DbLink {
  id: string;
  label: string;
  href: string;
  is_external?: boolean | null;
  is_active?: boolean | null;
  position?: number | null;
}

// DB -> App mappers
export function mapDbToConfig(db: DbConfig | null): TopBarConfig {
  if (!db) return DEFAULT_CONFIG;
  
  return {
    phoneNumber: db.phone_number ?? DEFAULT_CONFIG.phoneNumber,
    phoneLink: db.phone_link ?? DEFAULT_CONFIG.phoneLink,
    showSearch: db.show_search ?? DEFAULT_CONFIG.showSearch,
    showLanguageSelector: db.show_language_selector ?? DEFAULT_CONFIG.showLanguageSelector,
    backgroundColor: db.background_color ?? DEFAULT_CONFIG.backgroundColor,
    textColor: db.text_color ?? DEFAULT_CONFIG.textColor,
    hoverColor: db.hover_color ?? DEFAULT_CONFIG.hoverColor,
    fontFamily: db.font_family ?? DEFAULT_CONFIG.fontFamily,
    fontSize: db.font_size ?? DEFAULT_CONFIG.fontSize,
  };
}

export function mapDbToCompany(db: DbCompany): TopBarCompany {
  return {
    id: db.id,
    name: db.name,
    url: db.url,
    logoUrl: db.logo_url ?? null,
    isCurrent: db.is_current ?? false,
    isActive: db.is_active ?? true,
    position: db.position ?? 0,
  };
}

export function mapDbToLink(db: DbLink): TopBarLink {
  return {
    id: db.id,
    label: db.label,
    href: db.href,
    isExternal: db.is_external ?? false,
    isActive: db.is_active ?? true,
    position: db.position ?? 0,
  };
}

// App -> DB mappers
export function mapConfigToDb(config: Partial<TopBarConfig>): Partial<DbConfig> {
  const result: Partial<DbConfig> = {};
  
  if (config.phoneNumber !== undefined) result.phone_number = config.phoneNumber;
  if (config.phoneLink !== undefined) result.phone_link = config.phoneLink;
  if (config.showSearch !== undefined) result.show_search = config.showSearch;
  if (config.showLanguageSelector !== undefined) result.show_language_selector = config.showLanguageSelector;
  if (config.backgroundColor !== undefined) result.background_color = config.backgroundColor;
  if (config.textColor !== undefined) result.text_color = config.textColor;
  if (config.hoverColor !== undefined) result.hover_color = config.hoverColor;
  if (config.fontFamily !== undefined) result.font_family = config.fontFamily;
  if (config.fontSize !== undefined) result.font_size = config.fontSize;
  
  return result;
}

export function mapCompanyToDb(company: Partial<TopBarCompany>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  if (company.name !== undefined) result.name = company.name;
  if (company.url !== undefined) result.url = company.url;
  if (company.logoUrl !== undefined) result.logo_url = company.logoUrl;
  if (company.isCurrent !== undefined) result.is_current = company.isCurrent;
  if (company.isActive !== undefined) result.is_active = company.isActive;
  if (company.position !== undefined) result.position = company.position;
  
  return result;
}

export function mapLinkToDb(link: Partial<TopBarLink>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  if (link.label !== undefined) result.label = link.label;
  if (link.href !== undefined) result.href = link.href;
  if (link.isExternal !== undefined) result.is_external = link.isExternal;
  if (link.isActive !== undefined) result.is_active = link.isActive;
  if (link.position !== undefined) result.position = link.position;
  
  return result;
}
