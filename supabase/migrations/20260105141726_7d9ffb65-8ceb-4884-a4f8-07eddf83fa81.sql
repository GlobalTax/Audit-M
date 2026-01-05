-- Actualizar fechas de publicación a fechas anteriores al 5 de enero de 2026

UPDATE blog_posts 
SET published_at = '2026-01-02 09:00:00+00'
WHERE slug_en = 'spanish-labour-law-updates-2026';

UPDATE blog_posts 
SET published_at = '2025-12-30 09:00:00+00'
WHERE slug_en = 'spanish-commercial-registry-requirements-2026';

UPDATE blog_posts 
SET published_at = '2025-12-27 09:00:00+00'
WHERE slug_en = '2026-spanish-tax-calendar-international-businesses';