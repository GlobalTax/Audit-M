import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapXML = () => {
  useEffect(() => {
    const fetchAndServeSitemap = async () => {
      try {
        // Get sitemap for international site from Supabase Storage
        const { data: urlData } = supabase.storage
          .from('public-files')
          .getPublicUrl('sitemap-int.xml');

        // Redirect to the sitemap URL
        window.location.replace(urlData.publicUrl);
      } catch (error) {
        console.error('Error serving sitemap:', error);
        // Fallback: redirect to Storage URL directly
        const { data: urlData } = supabase.storage
          .from('public-files')
          .getPublicUrl('sitemap-int.xml');
        window.location.replace(urlData.publicUrl);
      }
    };

    fetchAndServeSitemap();
  }, []);

  return null;
};

export default SitemapXML;
