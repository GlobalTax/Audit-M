-- Insert initial technology content for international site
INSERT INTO page_content (page_key, section_key, source_site, content)
VALUES (
  'home', 
  'tecnologia', 
  'int',
  '{"overline": "Technology we use", "title": "Our Software Stack", "technologies": []}'::jsonb
)
ON CONFLICT DO NOTHING;