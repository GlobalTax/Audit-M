-- Update technology section to be available for the international site
UPDATE page_content 
SET source_site = 'int'
WHERE section_key = 'tecnologia' AND language = 'en' AND page_key = 'home';

-- Update international networks section to be available for the international site
UPDATE page_content 
SET source_site = 'int'
WHERE section_key = 'redes_internacionales' AND language = 'en' AND page_key = 'home';