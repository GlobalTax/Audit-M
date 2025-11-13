-- Migration 4/4: team_members - migrar datos existentes a columnas multiidioma
-- La estructura ya tiene columnas _es/_ca/_en, solo necesitamos migrar datos

-- Migrar datos de columnas antiguas a columnas _es (si existen columnas sin sufijo)
UPDATE team_members 
SET 
  position_es = COALESCE(position_es, position),
  specialization_es = COALESCE(specialization_es, specialization),
  bio_es = COALESCE(bio_es, bio)
WHERE (position IS NOT NULL OR specialization IS NOT NULL OR bio IS NOT NULL)
  AND (position_es IS NULL OR specialization_es IS NULL OR bio_es IS NULL);

-- Eliminar columnas antiguas sin sufijo de idioma (si existen)
ALTER TABLE team_members 
  DROP COLUMN IF EXISTS position,
  DROP COLUMN IF EXISTS specialization,
  DROP COLUMN IF EXISTS bio;

-- Asegurar que las columnas _es sean NOT NULL donde corresponda
ALTER TABLE team_members 
  ALTER COLUMN position_es SET NOT NULL;