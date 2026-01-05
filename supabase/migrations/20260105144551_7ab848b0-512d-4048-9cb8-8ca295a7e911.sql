-- Create calculator_settings table for editable calculator configuration
CREATE TABLE public.calculator_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('timeline', 'cost', 'general')),
  entity_type TEXT CHECK (entity_type IN ('sl', 'sa', 'branch', 'subsidiary', 'global', NULL)),
  item_key TEXT NOT NULL,
  item_label TEXT NOT NULL,
  item_notes TEXT,
  min_value NUMERIC NOT NULL DEFAULT 0,
  max_value NUMERIC NOT NULL DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  conditions JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, entity_type, item_key)
);

-- Enable RLS
ALTER TABLE public.calculator_settings ENABLE ROW LEVEL SECURITY;

-- Public read access (for calculator)
CREATE POLICY "Anyone can read calculator settings"
ON public.calculator_settings FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admins can manage calculator settings"
ON public.calculator_settings FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX idx_calculator_settings_category ON public.calculator_settings(category);
CREATE INDEX idx_calculator_settings_entity_type ON public.calculator_settings(entity_type);

-- Add updated_at trigger
CREATE TRIGGER update_calculator_settings_updated_at
BEFORE UPDATE ON public.calculator_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data: Timeline settings
INSERT INTO public.calculator_settings (category, entity_type, item_key, item_label, item_notes, min_value, max_value, display_order) VALUES
-- SL Timeline
('timeline', 'sl', 'prep', 'Preparation (name + bank)', 'Name reservation and bank account opening', 1, 1, 1),
('timeline', 'sl', 'formalization', 'Formalization (notary + capital)', 'Notarial deed and capital deposit', 1, 2, 2),
('timeline', 'sl', 'registry', 'Commercial Registry registration', 'Final registration step', 1, 2, 3),
('timeline', 'sl', 'total', 'Total estimated duration', 'End-to-end timeline', 3, 5, 10),

-- SA Timeline
('timeline', 'sa', 'prep', 'Preparation (name + bank)', 'Name reservation and bank account opening', 1, 1, 1),
('timeline', 'sa', 'formalization', 'Formalization (notary + capital)', 'Notarial deed and capital verification', 1, 2, 2),
('timeline', 'sa', 'registry', 'Commercial Registry registration', 'Extended timeline for SA', 2, 3, 3),
('timeline', 'sa', 'total', 'Total estimated duration', 'End-to-end timeline', 4, 6, 10),

-- Branch Timeline
('timeline', 'branch', 'documentation', 'Documentation preparation', 'Parent company docs and legalization', 1, 2, 1),
('timeline', 'branch', 'formalization', 'Formalization (notary)', 'Notarial deed', 1, 1, 2),
('timeline', 'branch', 'registry', 'Commercial Registry registration', 'Extended for branch offices', 2, 3, 3),
('timeline', 'branch', 'total', 'Total estimated duration', 'End-to-end timeline', 4, 6, 10),

-- Subsidiary Timeline
('timeline', 'subsidiary', 'prep', 'Preparation (resolutions + name + bank)', 'Corporate resolutions and account setup', 1, 1, 1),
('timeline', 'subsidiary', 'formalization', 'Formalization (notary + capital)', 'Notarial deed and capital deposit', 1, 2, 2),
('timeline', 'subsidiary', 'registry', 'Commercial Registry registration', 'Final registration step', 1, 2, 3),
('timeline', 'subsidiary', 'total', 'Total estimated duration', 'End-to-end timeline', 3, 5, 10),

-- NIE Timeline (global)
('timeline', 'global', 'nie', 'NIE processing', 'Required for non-EU founders (can be done in advance)', 2, 4, 0);

-- Insert initial data: Cost settings
INSERT INTO public.calculator_settings (category, entity_type, item_key, item_label, item_notes, min_value, max_value, display_order) VALUES
-- SL Costs
('cost', 'sl', 'notary', 'Notary fees', 'Incorporation deed notarization', 400, 800, 1),
('cost', 'sl', 'registry_fee', 'Commercial Registry fees', 'Registration and publication', 150, 300, 2),
('cost', 'sl', 'legal_fees', 'Legal & advisory fees', 'Professional services for incorporation', 1500, 3000, 3),
('cost', 'sl', 'share_capital', 'Minimum share capital', 'Required capital deposit (refundable)', 3000, 3000, 4),

-- SA Costs
('cost', 'sa', 'notary', 'Notary fees', 'Incorporation deed notarization', 800, 1500, 1),
('cost', 'sa', 'registry_fee', 'Commercial Registry fees', 'Registration and publication', 200, 400, 2),
('cost', 'sa', 'legal_fees', 'Legal & advisory fees', 'Professional services for incorporation', 3000, 6000, 3),
('cost', 'sa', 'share_capital', 'Minimum share capital (25%)', 'Initial deposit requirement', 15000, 15000, 4),

-- Branch Costs
('cost', 'branch', 'notary', 'Notary fees', 'Branch registration deed', 500, 1000, 1),
('cost', 'branch', 'registry_fee', 'Commercial Registry fees', 'Registration and publication', 150, 300, 2),
('cost', 'branch', 'apostille', 'Apostille & translation', 'Parent company document legalization', 500, 1500, 3),
('cost', 'branch', 'legal_fees', 'Legal & advisory fees', 'Professional services for registration', 2500, 5000, 4),

-- Subsidiary Costs
('cost', 'subsidiary', 'notary', 'Notary fees', 'Incorporation deed notarization', 500, 1000, 1),
('cost', 'subsidiary', 'registry_fee', 'Commercial Registry fees', 'Registration and publication', 150, 300, 2),
('cost', 'subsidiary', 'legal_fees', 'Legal & advisory fees', 'Professional services for incorporation', 2000, 4000, 3),
('cost', 'subsidiary', 'share_capital', 'Minimum share capital', 'Required capital deposit (refundable)', 3000, 3000, 4),

-- Global Costs (apply to all)
('cost', 'global', 'nie', 'NIE application & processing', 'Foreigner ID number (per founder)', 150, 400, 1),
('cost', 'global', 'name_reservation', 'Name reservation certificate', 'Central Commercial Registry', 15, 30, 2),
('cost', 'global', 'local_director', 'Local director service', 'Annual fee for resident director', 3000, 6000, 3),
('cost', 'global', 'bank_account', 'Bank account setup', 'Corporate account opening assistance', 200, 500, 4);