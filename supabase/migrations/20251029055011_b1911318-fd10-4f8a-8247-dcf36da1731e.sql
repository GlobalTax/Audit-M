-- Create page_content table for CMS
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID,
  
  UNIQUE(page_key, section_key)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can view active content
CREATE POLICY "Anyone can view active content"
  ON public.page_content
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all content (for preview)
CREATE POLICY "Authenticated users can view all content"
  ON public.page_content
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Admins and editors can insert content
CREATE POLICY "Admins and editors can insert content"
  ON public.page_content
  FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role)
  );

-- Admins and editors can update content
CREATE POLICY "Admins and editors can update content"
  ON public.page_content
  FOR UPDATE
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role)
  );

-- Admins can delete content
CREATE POLICY "Admins can delete content"
  ON public.page_content
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create audit log trigger
CREATE TRIGGER log_page_content_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.log_entity_change();

-- Create indexes for better performance
CREATE INDEX idx_page_content_page_key ON public.page_content(page_key);
CREATE INDEX idx_page_content_section_key ON public.page_content(section_key);
CREATE INDEX idx_page_content_active ON public.page_content(is_active);
CREATE INDEX idx_page_content_display_order ON public.page_content(display_order);