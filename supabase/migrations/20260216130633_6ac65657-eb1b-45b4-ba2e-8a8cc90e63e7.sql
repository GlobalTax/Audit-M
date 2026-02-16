
-- Add columns to crm_clients for detailed financial data from Excel import
ALTER TABLE public.crm_clients
  ADD COLUMN IF NOT EXISTS contact_person TEXT,
  ADD COLUMN IF NOT EXISTS contact_position TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS contact_linkedin TEXT,
  ADD COLUMN IF NOT EXISTS caja NUMERIC,
  ADD COLUMN IF NOT EXISTS deuda NUMERIC,
  ADD COLUMN IF NOT EXISTS ranking_position INTEGER,
  ADD COLUMN IF NOT EXISTS financial_data JSONB,
  ADD COLUMN IF NOT EXISTS comentarios TEXT;
