import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapXML = () => {
  useEffect(() => {
    const fetchAndServeSitemap = async () => {
      try {
        // Obtener el sitemap desde Supabase Storage
        const { data: urlData } = supabase.storage
          .from('public-files')
          .getPublicUrl('sitemap.xml');

        // Descargar el contenido del sitemap
        const response = await fetch(urlData.publicUrl);
        const xmlContent = await response.text();

        // Crear un nuevo documento con el contenido XML
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);

        // Reemplazar el contenido de la página con el XML
        window.location.replace(urlData.publicUrl);
      } catch (error) {
        console.error('Error serving sitemap:', error);
        // Si hay error, redirigir a la URL de Storage directamente
        const { data: urlData } = supabase.storage
          .from('public-files')
          .getPublicUrl('sitemap.xml');
        window.location.replace(urlData.publicUrl);
      }
    };

    fetchAndServeSitemap();
  }, []);

  return null;
};

export default SitemapXML;
