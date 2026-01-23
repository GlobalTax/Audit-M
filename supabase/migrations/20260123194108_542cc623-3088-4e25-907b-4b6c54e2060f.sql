-- Desactivar servicios antiguos (no relacionados con auditoría)
UPDATE services 
SET is_active = false, updated_at = now()
WHERE display_order < 100;