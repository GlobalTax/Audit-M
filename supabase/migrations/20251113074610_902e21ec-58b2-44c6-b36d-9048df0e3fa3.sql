-- Migration 3/4 (corregida): services multiidioma (completar columnas faltantes)
-- Solo añadir columnas que NO existen todavía
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS name_es TEXT,
  ADD COLUMN IF NOT EXISTS name_ca TEXT,
  ADD COLUMN IF NOT EXISTS name_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS slug_es TEXT,
  ADD COLUMN IF NOT EXISTS slug_ca TEXT,
  ADD COLUMN IF NOT EXISTS slug_en TEXT,
  ADD COLUMN IF NOT EXISTS area_es TEXT,
  ADD COLUMN IF NOT EXISTS area_ca TEXT,
  ADD COLUMN IF NOT EXISTS area_en TEXT;

-- Migrar datos existentes a columnas _es solo si están vacíos
UPDATE services 
SET 
  name_es = COALESCE(name_es, name),
  description_es = COALESCE(description_es, description),
  slug_es = COALESCE(slug_es, slug),
  area_es = COALESCE(area_es, area)
WHERE name IS NOT NULL;

-- Hacer columnas _es NOT NULL (después de migración)
ALTER TABLE services 
  ALTER COLUMN name_es SET NOT NULL,
  ALTER COLUMN description_es SET NOT NULL,
  ALTER COLUMN slug_es SET NOT NULL,
  ALTER COLUMN area_es SET NOT NULL;

-- Crear índices únicos para slugs por idioma (con IF NOT EXISTS)
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug_es ON services(slug_es);
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug_ca ON services(slug_ca) WHERE slug_ca IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug_en ON services(slug_en) WHERE slug_en IS NOT NULL;

-- Eliminar columnas antiguas (solo si existen)
ALTER TABLE services 
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS slug,
  DROP COLUMN IF EXISTS area;