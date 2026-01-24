-- Añadir columna source_site a site_settings para separar datos por sitio
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS source_site text DEFAULT 'es';

-- Crear índice para optimizar consultas por sitio
CREATE INDEX IF NOT EXISTS idx_site_settings_source_site ON site_settings(source_site);

-- Duplicar configuración actual para el sitio 'int' (internacional)
INSERT INTO site_settings (key, value, description, category, source_site)
SELECT key, value, description, category, 'int'
FROM site_settings
WHERE source_site = 'es'
ON CONFLICT DO NOTHING;