-- Create awards table for managing recognition and accolades
CREATE TABLE public.awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  short_name TEXT NOT NULL,
  year TEXT NOT NULL,
  organization TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  source_site TEXT DEFAULT 'int',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_awards_active ON public.awards(is_active);
CREATE INDEX idx_awards_order ON public.awards(display_order);
CREATE INDEX idx_awards_source_site ON public.awards(source_site);

-- Trigger for updated_at
CREATE TRIGGER update_awards_updated_at
  BEFORE UPDATE ON public.awards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;

-- Public can view active awards
CREATE POLICY "Public can view active awards"
  ON public.awards FOR SELECT
  USING (is_active = true);

-- Authenticated users can manage all awards
CREATE POLICY "Authenticated users can manage awards"
  ON public.awards FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial awards data (updated to 2025 for some)
INSERT INTO public.awards (name, category, short_name, year, organization, display_order, is_active) VALUES
('XIX Edición Premios Emprendedores', 'PREMIO', 'EMPRENDEDORES', '2023', 'Emprendedores', 1, true),
('III Edición Premios ProDespachos (Innovación)', 'PREMIO', 'INNOVACIÓN', '2023', 'ProDespachos', 2, true),
('I Premios Derecho — OBN& · LA RAZÓN', 'PREMIO', 'DERECHO', '2022', 'LA RAZÓN', 3, true),
('Best Tax Advisory Firm – Spain', 'BEST', 'TAX FIRM', '2025', 'Corporate INTL', 4, true),
('Top Legal Services Provider', 'TOP', 'LEGAL', '2025', 'Global Law Experts', 5, true),
('Excellence in Cross-Border Advisory', 'AWARD', 'CROSS-BORDER', '2025', 'Finance Monthly', 6, true),
('Best Corporate Formation Services', 'BEST', 'CORPORATE', '2024', 'Acquisition Intl', 7, true);