-- Create enum for source_site
CREATE TYPE public.site_source AS ENUM ('es', 'int');

-- Add source_site column to tables that need separation
ALTER TABLE public.contact_leads 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.company_setup_leads 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.ley_beckham_leads 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.candidatos 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.blog_posts 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.case_studies 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.news_articles 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.landing_pages 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

ALTER TABLE public.job_positions 
  ADD COLUMN source_site public.site_source DEFAULT 'es';

-- Create indexes for efficient queries
CREATE INDEX idx_contact_leads_source ON public.contact_leads(source_site);
CREATE INDEX idx_company_setup_leads_source ON public.company_setup_leads(source_site);
CREATE INDEX idx_ley_beckham_leads_source ON public.ley_beckham_leads(source_site);
CREATE INDEX idx_candidatos_source ON public.candidatos(source_site);
CREATE INDEX idx_blog_posts_source ON public.blog_posts(source_site);
CREATE INDEX idx_case_studies_source ON public.case_studies(source_site);
CREATE INDEX idx_news_articles_source ON public.news_articles(source_site);
CREATE INDEX idx_landing_pages_source ON public.landing_pages(source_site);
CREATE INDEX idx_job_positions_source ON public.job_positions(source_site);