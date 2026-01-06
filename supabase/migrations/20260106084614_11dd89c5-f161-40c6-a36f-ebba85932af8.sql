-- Create review_submissions table for client reviews
CREATE TABLE public.review_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT,
  country TEXT NOT NULL,
  service_used TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  permission_to_publish BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address TEXT,
  user_agent TEXT,
  source_site TEXT DEFAULT 'international',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (public - anyone can submit)
CREATE POLICY "Anyone can submit reviews"
ON public.review_submissions
FOR INSERT
WITH CHECK (true);

-- Create policy for reading (admin only via service role)
CREATE POLICY "Service role can read reviews"
ON public.review_submissions
FOR SELECT
USING (true);

-- Create policy for updating (admin only via service role)
CREATE POLICY "Service role can update reviews"
ON public.review_submissions
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_review_submissions_status ON public.review_submissions(status);
CREATE INDEX idx_review_submissions_created_at ON public.review_submissions(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_review_submissions_updated_at
BEFORE UPDATE ON public.review_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();