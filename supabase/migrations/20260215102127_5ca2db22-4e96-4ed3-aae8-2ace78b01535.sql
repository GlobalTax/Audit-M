
-- Add client_type column
ALTER TABLE public.crm_clients ADD COLUMN client_type text NOT NULL DEFAULT 'empresa';

-- Set all existing records as empresa
UPDATE public.crm_clients SET client_type = 'empresa';
