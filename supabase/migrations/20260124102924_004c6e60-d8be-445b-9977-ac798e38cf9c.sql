-- Add 'audit' to the site_source enum
ALTER TYPE site_source ADD VALUE IF NOT EXISTS 'audit';

-- Update services table (text column, not enum)
UPDATE services 
SET source_site = 'audit' 
WHERE source_site = 'navarro_asesores';