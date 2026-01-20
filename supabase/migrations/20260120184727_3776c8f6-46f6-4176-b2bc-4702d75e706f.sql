-- Add phone and lead_source columns to contact_leads table
ALTER TABLE public.contact_leads 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'web';

-- Create index for filtering by lead_source
CREATE INDEX IF NOT EXISTS idx_contact_leads_lead_source ON public.contact_leads(lead_source);

-- Add comment for documentation
COMMENT ON COLUMN public.contact_leads.phone IS 'Contact phone number (especially for WhatsApp leads)';
COMMENT ON COLUMN public.contact_leads.lead_source IS 'Origin of the lead: web, whatsapp, phone, referral, other';