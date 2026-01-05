-- Move Spanish resources from international site to domestic site
UPDATE public.resources 
SET source_site = 'es', updated_at = NOW()
WHERE source_site = 'int' 
  AND (
    title LIKE '%España%' 
    OR title LIKE '%Empresa Familiar%'
    OR title LIKE '%Pacto de Socios%'
    OR title LIKE '%Guía%'
    OR title LIKE '%Webinar%'
    OR title LIKE '%Plantilla%'
  );