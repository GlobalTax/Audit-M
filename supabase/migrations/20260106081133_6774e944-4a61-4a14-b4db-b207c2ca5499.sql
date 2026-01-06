-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_type TEXT NOT NULL DEFAULT 'multinational',
  company_type_label TEXT NOT NULL DEFAULT 'Multinational',
  location TEXT NOT NULL,
  flag_emoji TEXT NOT NULL DEFAULT '🌍',
  avatar_url TEXT,
  company_logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  source_site TEXT DEFAULT 'int',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read active testimonials
CREATE POLICY "Anyone can read active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Authenticated users can manage testimonials
CREATE POLICY "Authenticated users can insert testimonials"
ON public.testimonials
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING (true);

-- Authenticated users can read all testimonials (including inactive)
CREATE POLICY "Authenticated users can read all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING (true);

-- Create index for ordering
CREATE INDEX idx_testimonials_display_order ON public.testimonials(display_order);
CREATE INDEX idx_testimonials_source_site ON public.testimonials(source_site);

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial testimonials from homepage
INSERT INTO public.testimonials (quote, author_name, author_role, company_name, company_type, company_type_label, location, flag_emoji, display_order, source_site) VALUES
('Setting up our European headquarters in Barcelona was seamless. Navarro''s team handled every step — from legal structuring to tax registration — in under four weeks.', 'James Mitchell', 'CEO', 'TechBridge Ventures', 'multinational', 'Multinational', 'United Kingdom', '🇬🇧', 1, 'int'),
('Their transfer pricing expertise saved us significant tax exposure across three jurisdictions. Proactive advice that goes beyond compliance.', 'Dr. Elena Fischer', 'Group Tax Director', 'Hartmann Industries AG', 'multinational', 'Multinational', 'Germany', '🇩🇪', 2, 'int'),
('As a US investor entering Spain, I needed advisors who understood both legal systems. Their bilingual team and responsive communication exceeded all expectations.', 'Rachel Morrison', 'Investment Director', 'Atlantic Capital Partners', 'investor', 'Investor', 'United States', '🇺🇸', 3, 'int'),
('Managing payroll across Spain, Portugal, and France was a constant headache. Since partnering with Navarro, our multi-country operations run like clockwork.', 'Pierre Dubois', 'VP of Global HR', 'LogiTrans Europe SA', 'multinational', 'Multinational', 'France', '🇫🇷', 4, 'int'),
('Our family business needed succession planning that preserved our legacy while optimizing tax efficiency. They delivered a solution that satisfied all stakeholders.', 'Carlos Mendoza III', 'Managing Director', 'Grupo Mendoza', 'family_business', 'Family Business', 'Mexico', '🇲🇽', 5, 'int'),
('From subsidiary incorporation to ongoing compliance, they''ve been our trusted partner for five years. Their integrated approach eliminates the silos we had with previous advisors.', 'Isabelle van der Berg', 'CFO', 'Nordica Consumer Goods', 'multinational', 'Multinational', 'Netherlands', '🇳🇱', 6, 'int');