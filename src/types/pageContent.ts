export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content: any;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface PageContentInsert {
  page_key: string;
  section_key: string;
  content: any;
  is_active?: boolean;
  display_order?: number;
}

export interface PageContentUpdate {
  page_key?: string;
  section_key?: string;
  content?: any;
  is_active?: boolean;
  display_order?: number;
}

// Content type definitions for different sections

export interface HeroContent {
  overline?: string;
  title: string;
  subtitle?: string;
  cta_primary?: {
    text: string;
    link: string;
  };
  cta_secondary?: {
    text: string;
    link: string;
  };
}

export interface StatsContent {
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export interface AboutContent {
  overline?: string;
  title: string;
  paragraphs: string[];
  cta?: {
    text: string;
    link: string;
  };
}

export interface LogosContent {
  overline?: string;
  title?: string;
  logos: Array<{
    name: string;
    logo_url: string;
    website_url?: string;
  }>;
}

export interface ValuesContent {
  overline?: string;
  title: string;
  subtitle?: string;
  values: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface ProcessContent {
  overline?: string;
  title: string;
  subtitle?: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface FeaturedServicesContent {
  overline?: string;
  title?: string;
  services: Array<{
    title: string;
    description: string;
    category: string;
    features: string[];
  }>;
}
