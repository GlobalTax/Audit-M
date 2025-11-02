-- Actualizar categorías (positions) de miembros existentes
UPDATE public.team_members
SET position = CASE
  WHEN position IN ('Socio', 'Socia') THEN 'SENIOR'
  WHEN position = 'SENIOR' THEN 'SENIOR'
  WHEN position = 'Colaboradora Laboral' THEN 'ASOCIADO'
  ELSE 'ASOCIADO'
END;

-- Actualizar especializaciones
UPDATE public.team_members
SET specialization = CASE
  WHEN specialization ILIKE '%M&A%' THEN 'M&A'
  WHEN specialization = 'FISCAL' THEN 'FISCALIDAD'
  WHEN specialization = 'CONTABILIDAD' THEN 'CONTABILIDAD'
  WHEN specialization = 'LABORAL' THEN 'LABORAL'
  WHEN specialization ILIKE '%Legal Laboral%' THEN 'LABORAL'
  WHEN specialization ILIKE '%FISCALIDAD Y SERVICIOS GLOBALES%' THEN 'SERVICIOS GLOBALES'
  WHEN specialization ILIKE '%FISCALIDAD%' THEN 'FISCALIDAD'
  ELSE specialization
END;

-- Insertar ejemplos de cada categoría
INSERT INTO public.team_members (name, position, specialization, bio, is_active, order_index)
VALUES
  ('Ana García Ejemplo', 'JUNIOR', 'CONTABILIDAD', 'Ejemplo de categoría JUNIOR en Contabilidad', true, 100),
  ('Carlos Ruiz Ejemplo', 'MASTER SCHOLAR', 'M&A', 'Ejemplo de categoría MASTER SCHOLAR en M&A', true, 101),
  ('Laura Martín Ejemplo', 'ASOCIADO', 'LEGAL', 'Ejemplo de categoría ASOCIADO en Legal', true, 102),
  ('David Sánchez Ejemplo', 'SENIOR', 'MERCANTIL', 'Ejemplo de categoría SENIOR en Mercantil', true, 103);