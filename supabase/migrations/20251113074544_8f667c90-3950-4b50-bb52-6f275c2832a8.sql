-- Migration 2/4 (corregida): page_content multiidioma con columna language
-- Primero, eliminar la constraint única existente
ALTER TABLE page_content 
  DROP CONSTRAINT IF EXISTS page_content_page_key_section_key_key;

-- Añadir columna language para identificar el idioma del contenido
ALTER TABLE page_content 
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'es';

-- Eliminar índice único antiguo si existe
DROP INDEX IF EXISTS idx_page_content_keys;

-- Crear índice único compuesto que incluye el idioma
-- Esto permite tener el mismo page_key + section_key para diferentes idiomas
CREATE UNIQUE INDEX idx_page_content_keys_lang 
  ON page_content(page_key, section_key, language);

-- Duplicar todos los registros existentes para catalán (ca)
INSERT INTO page_content (page_key, section_key, content, is_active, display_order, language, updated_by)
SELECT page_key, section_key, content, is_active, display_order, 'ca', updated_by
FROM page_content
WHERE language = 'es'
ON CONFLICT (page_key, section_key, language) DO NOTHING;

-- Duplicar todos los registros existentes para inglés (en)
INSERT INTO page_content (page_key, section_key, content, is_active, display_order, language, updated_by)
SELECT page_key, section_key, content, is_active, display_order, 'en', updated_by
FROM page_content
WHERE language = 'es'
ON CONFLICT (page_key, section_key, language) DO NOTHING;

-- Crear índice para búsquedas rápidas por page_key y language
CREATE INDEX IF NOT EXISTS idx_page_content_page_lang ON page_content(page_key, language);