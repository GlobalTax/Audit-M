-- Create blog topics queue for automatic generation
CREATE TABLE public.blog_topics_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  category TEXT DEFAULT 'Corporativo',
  target_keywords TEXT[],
  target_language TEXT DEFAULT 'both', -- 'es', 'en', 'both'
  target_site TEXT DEFAULT 'international', -- 'domestic', 'international', 'both'
  priority INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  generated_post_id UUID REFERENCES public.blog_posts(id),
  error_message TEXT,
  scheduled_for TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_topics_queue ENABLE ROW LEVEL SECURITY;

-- Policy for admin access
CREATE POLICY "Service role full access to topics queue"
ON public.blog_topics_queue FOR ALL USING (true);

-- Indexes
CREATE INDEX idx_blog_topics_queue_status ON public.blog_topics_queue(status, priority DESC);
CREATE INDEX idx_blog_topics_queue_scheduled ON public.blog_topics_queue(scheduled_for);

-- Trigger for updated_at
CREATE TRIGGER update_blog_topics_queue_updated_at
BEFORE UPDATE ON public.blog_topics_queue
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial topics for international site
INSERT INTO public.blog_topics_queue (topic, category, target_keywords, target_site, priority) VALUES
('Spain Company Setup Timeline 2025: What to Expect Month by Month', 'Corporativo', ARRAY['spain company setup', 'incorporation timeline', 'business formation spain'], 'international', 1),
('Beckham Law vs Standard Tax: A Complete Comparison for Expats', 'Fiscal', ARRAY['beckham law', 'spain tax expat', 'impatriate regime'], 'international', 1),
('NIE Application from USA: Step-by-Step Guide for American Entrepreneurs', 'Corporativo', ARRAY['NIE USA', 'american business spain', 'foreigner ID spain'], 'international', 2),
('Opening a Business Bank Account in Spain for Non-Residents', 'Mercantil', ARRAY['business bank spain', 'non-resident account', 'company bank spain'], 'international', 2),
('Spanish Labor Costs Explained for International Employers', 'Laboral', ARRAY['spain labor costs', 'employer costs spain', 'social security spain'], 'international', 3),
('Branch vs Subsidiary in Spain: Which is Right for Your Business?', 'Mercantil', ARRAY['branch spain', 'subsidiary spain', 'company structure spain'], 'international', 3),
('Tax Residency Rules for Digital Nomads in Spain 2025', 'Fiscal', ARRAY['digital nomad spain', 'tax residency spain', 'remote worker tax'], 'international', 4),
('Spain Double Tax Treaty Network: Key Benefits for International Companies', 'Fiscal', ARRAY['double tax treaty spain', 'tax treaty benefits', 'international tax spain'], 'international', 4);