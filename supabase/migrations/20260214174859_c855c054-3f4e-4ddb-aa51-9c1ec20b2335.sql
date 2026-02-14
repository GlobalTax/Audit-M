
-- Add service_type column to crm_invoices
ALTER TABLE public.crm_invoices
  ADD COLUMN service_type text;
