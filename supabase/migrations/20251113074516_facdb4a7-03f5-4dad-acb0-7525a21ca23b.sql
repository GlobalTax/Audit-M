-- Migration 1/4: news_articles multiidioma
-- Añadir columnas multiidioma para título, slug, contenido y extracto
ALTER TABLE news_articles 
  ADD COLUMN title_es TEXT,
  ADD COLUMN title_ca TEXT,
  ADD COLUMN title_en TEXT,
  ADD COLUMN slug_es TEXT,
  ADD COLUMN slug_ca TEXT,
  ADD COLUMN slug_en TEXT,
  ADD COLUMN content_es TEXT,
  ADD COLUMN content_ca TEXT,
  ADD COLUMN content_en TEXT,
  ADD COLUMN excerpt_es TEXT,
  ADD COLUMN excerpt_ca TEXT,
  ADD COLUMN excerpt_en TEXT;

-- Migrar datos existentes a columnas _es (español como idioma por defecto)
UPDATE news_articles 
SET 
  title_es = title,
  slug_es = slug,
  content_es = content,
  excerpt_es = excerpt
WHERE title IS NOT NULL;

-- Hacer columnas _es NOT NULL (después de migración de datos)
ALTER TABLE news_articles 
  ALTER COLUMN title_es SET NOT NULL,
  ALTER COLUMN slug_es SET NOT NULL,
  ALTER COLUMN content_es SET NOT NULL;

-- Crear índices únicos para slugs por idioma (mejorar performance y evitar duplicados)
CREATE UNIQUE INDEX idx_news_articles_slug_es ON news_articles(slug_es);
CREATE UNIQUE INDEX idx_news_articles_slug_ca ON news_articles(slug_ca) WHERE slug_ca IS NOT NULL;
CREATE UNIQUE INDEX idx_news_articles_slug_en ON news_articles(slug_en) WHERE slug_en IS NOT NULL;

-- Eliminar columnas antiguas (solo después de validar que la migración fue exitosa)
ALTER TABLE news_articles 
  DROP COLUMN title,
  DROP COLUMN slug,
  DROP COLUMN content,
  DROP COLUMN excerpt;