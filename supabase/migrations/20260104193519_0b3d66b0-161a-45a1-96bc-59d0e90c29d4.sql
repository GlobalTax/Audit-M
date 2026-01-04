-- Create resource types enum
CREATE TYPE resource_type AS ENUM ('white_paper', 'country_guide', 'template', 'webinar');

-- Create resource category enum
CREATE TYPE resource_category AS ENUM ('accounting', 'tax', 'payroll', 'corporate_legal', 'treasury', 'transfer_pricing', 'governance');

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type resource_type NOT NULL,
  category resource_category NOT NULL,
  countries TEXT[] DEFAULT '{}',
  personas TEXT[] DEFAULT '{}',
  file_url TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  source_site site_source DEFAULT 'int',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  company TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  source_page TEXT,
  source_site site_source DEFAULT 'int',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT newsletter_subscriptions_email_unique UNIQUE (email)
);

-- Enable RLS on resources
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- RLS policies for resources
CREATE POLICY "Public can view active published resources"
ON public.resources
FOR SELECT
USING (is_active = true AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authenticated users can view all resources"
ON public.resources
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage resources"
ON public.resources
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enable RLS on newsletter_subscriptions
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for newsletter_subscriptions
CREATE POLICY "Public can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage subscriptions"
ON public.newsletter_subscriptions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_resources_type ON public.resources(type);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_resources_source_site ON public.resources(source_site);
CREATE INDEX idx_resources_is_active ON public.resources(is_active);
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);

-- Create updated_at trigger for resources
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();