-- Add RLS policy for DELETE on contact_leads
CREATE POLICY "Admins can delete contact leads"
ON public.contact_leads
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add response tracking columns to contact_leads
ALTER TABLE public.contact_leads
ADD COLUMN IF NOT EXISTS response_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMPTZ;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_leads_email_sent ON public.contact_leads(email_sent);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON public.contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_service_type ON public.contact_leads(service_type);