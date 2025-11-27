-- Actualizar URLs en landing_pages de navarrotaxlegal.com a nrro.es
UPDATE landing_pages 
SET url = REPLACE(url, 'navarrotaxlegal.com', 'nrro.es')
WHERE url LIKE '%navarrotaxlegal.com%';

-- Actualizar utm_url también si existe
UPDATE landing_pages 
SET utm_url = REPLACE(utm_url, 'navarrotaxlegal.com', 'nrro.es')
WHERE utm_url LIKE '%navarrotaxlegal.com%';