-- Enable realtime for contact_leads table
ALTER TABLE public.contact_leads REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_leads;