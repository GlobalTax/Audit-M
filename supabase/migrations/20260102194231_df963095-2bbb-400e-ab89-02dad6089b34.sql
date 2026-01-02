-- Añadir columna source_site a demo_requests
ALTER TABLE demo_requests 
ADD COLUMN IF NOT EXISTS source_site site_source DEFAULT 'es';

-- Añadir columna source_site a site_pages
ALTER TABLE site_pages 
ADD COLUMN IF NOT EXISTS source_site site_source DEFAULT 'es';

-- Añadir columna source_site a page_content
ALTER TABLE page_content 
ADD COLUMN IF NOT EXISTS source_site site_source DEFAULT 'es';

-- Crear índices para optimizar queries filtradas
CREATE INDEX IF NOT EXISTS idx_demo_requests_source_site ON demo_requests(source_site);
CREATE INDEX IF NOT EXISTS idx_site_pages_source_site ON site_pages(source_site);
CREATE INDEX IF NOT EXISTS idx_page_content_source_site ON page_content(source_site);