import { SupabaseClient } from '@supabase/supabase-js';
import { TopBarStorageAdapter, TopBarData, TopBarConfig, TopBarCompany, TopBarLink } from '../types';
import { mapDbToConfig, mapDbToCompany, mapDbToLink, mapConfigToDb, mapCompanyToDb, mapLinkToDb } from '../utils/mappers';
import { DEFAULT_DATA } from '../utils/defaults';

interface SupabaseAdapterOptions {
  sourceSiteFilter?: string;
}

export function createSupabaseAdapter(
  supabase: SupabaseClient,
  options: SupabaseAdapterOptions = {}
): TopBarStorageAdapter {
  const { sourceSiteFilter } = options;

  return {
    async getData(): Promise<TopBarData> {
      try {
        // Fetch config
        const { data: configData } = await supabase
          .from('topbar_config')
          .select('*')
          .limit(1)
          .maybeSingle();

        // Fetch companies
        let companiesQuery = supabase
          .from('topbar_group_companies')
          .select('*')
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        const { data: companiesData } = await companiesQuery;

        // Fetch links
        let linksQuery = supabase
          .from('topbar_links')
          .select('*')
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        const { data: linksData } = await linksQuery;

        return {
          config: mapDbToConfig(configData),
          companies: (companiesData || []).map(mapDbToCompany),
          links: (linksData || []).map(mapDbToLink),
        };
      } catch (error) {
        console.error('Error fetching TopBar data:', error);
        return DEFAULT_DATA;
      }
    },

    async updateConfig(config: Partial<TopBarConfig>): Promise<void> {
      const dbConfig = mapConfigToDb(config);
      
      // Try to update existing config
      const { data: existing } = await supabase
        .from('topbar_config')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('topbar_config')
          .update(dbConfig)
          .eq('id', existing.id);
      } else {
        await supabase
          .from('topbar_config')
          .insert(dbConfig);
      }
    },

    async createCompany(data: Omit<TopBarCompany, 'id'>): Promise<TopBarCompany> {
      const dbData = {
        ...mapCompanyToDb(data),
        ...(sourceSiteFilter ? { source_site: sourceSiteFilter } : {}),
      };

      const { data: created, error } = await supabase
        .from('topbar_group_companies')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;
      return mapDbToCompany(created);
    },

    async updateCompany(id: string, data: Partial<TopBarCompany>): Promise<void> {
      const dbData = mapCompanyToDb(data);
      
      const { error } = await supabase
        .from('topbar_group_companies')
        .update(dbData)
        .eq('id', id);

      if (error) throw error;
    },

    async deleteCompany(id: string): Promise<void> {
      const { error } = await supabase
        .from('topbar_group_companies')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    async reorderCompanies(orderedIds: string[]): Promise<void> {
      const updates = orderedIds.map((id, index) => 
        supabase
          .from('topbar_group_companies')
          .update({ position: index })
          .eq('id', id)
      );
      
      await Promise.all(updates);
    },

    async createLink(data: Omit<TopBarLink, 'id'>): Promise<TopBarLink> {
      const dbData = {
        ...mapLinkToDb(data),
        ...(sourceSiteFilter ? { source_site: sourceSiteFilter } : {}),
      };

      const { data: created, error } = await supabase
        .from('topbar_links')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;
      return mapDbToLink(created);
    },

    async updateLink(id: string, data: Partial<TopBarLink>): Promise<void> {
      const dbData = mapLinkToDb(data);
      
      const { error } = await supabase
        .from('topbar_links')
        .update(dbData)
        .eq('id', id);

      if (error) throw error;
    },

    async deleteLink(id: string): Promise<void> {
      const { error } = await supabase
        .from('topbar_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    async reorderLinks(orderedIds: string[]): Promise<void> {
      const updates = orderedIds.map((id, index) => 
        supabase
          .from('topbar_links')
          .update({ position: index })
          .eq('id', id)
      );
      
      await Promise.all(updates);
    },
  };
}
