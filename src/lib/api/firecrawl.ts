import { supabase } from '@/integrations/supabase/client';

export interface EnrichmentData {
  description?: string;
  sector?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export async function enrichCompanyFromWeb(url: string): Promise<{ success: boolean; data?: EnrichmentData; error?: string }> {
  const { data, error } = await supabase.functions.invoke('firecrawl-enrich-company', {
    body: { url },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return data;
}
