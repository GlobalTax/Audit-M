-- Create enum for job status if not exists
DO $$ BEGIN
  CREATE TYPE job_status AS ENUM ('draft', 'published', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create job_positions table
CREATE TABLE IF NOT EXISTS public.job_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  working_hours TEXT NOT NULL,
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  status job_status NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  updated_by UUID
);

-- Enable RLS
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view published jobs"
  ON public.job_positions FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all jobs"
  ON public.job_positions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and HR can manage jobs"
  ON public.job_positions FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr_manager'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr_manager'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_job_positions_updated_at 
  BEFORE UPDATE ON public.job_positions 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_job_positions_slug ON public.job_positions(slug);
CREATE INDEX idx_job_positions_status ON public.job_positions(status);
CREATE INDEX idx_job_positions_department ON public.job_positions(department);

-- Add job_position_id to candidatos table
ALTER TABLE public.candidatos ADD COLUMN IF NOT EXISTS job_position_id UUID REFERENCES public.job_positions(id);
CREATE INDEX IF NOT EXISTS idx_candidatos_job_position ON public.candidatos(job_position_id);