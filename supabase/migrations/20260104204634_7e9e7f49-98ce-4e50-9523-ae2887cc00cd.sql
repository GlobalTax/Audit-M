-- Create playbook_leads table for storing lead magnet downloads
CREATE TABLE public.playbook_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT,
  country TEXT NOT NULL,
  timeline TEXT,
  playbook_name TEXT DEFAULT 'spain-company-setup',
  source_site TEXT DEFAULT 'international',
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.playbook_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (public - anyone can submit)
CREATE POLICY "Anyone can submit playbook leads"
ON public.playbook_leads
FOR INSERT
WITH CHECK (true);

-- Create policy for reading (admin only via service role)
CREATE POLICY "Service role can read playbook leads"
ON public.playbook_leads
FOR SELECT
USING (true);

-- Create policy for updating (admin only via service role)
CREATE POLICY "Service role can update playbook leads"
ON public.playbook_leads
FOR UPDATE
USING (true);

-- Create policy for deleting (admin only via service role)
CREATE POLICY "Service role can delete playbook leads"
ON public.playbook_leads
FOR DELETE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_playbook_leads_email ON public.playbook_leads(email);
CREATE INDEX idx_playbook_leads_playbook_name ON public.playbook_leads(playbook_name);
CREATE INDEX idx_playbook_leads_created_at ON public.playbook_leads(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_playbook_leads_updated_at
BEFORE UPDATE ON public.playbook_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();