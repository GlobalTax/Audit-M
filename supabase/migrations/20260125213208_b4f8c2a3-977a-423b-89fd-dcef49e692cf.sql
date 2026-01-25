-- Add new styling columns to topbar_config if they don't exist
ALTER TABLE public.topbar_config 
ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#0f172a',
ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT 'rgba(255,255,255,0.7)',
ADD COLUMN IF NOT EXISTS hover_color TEXT DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS font_family TEXT DEFAULT 'General Sans, sans-serif',
ADD COLUMN IF NOT EXISTS font_size TEXT DEFAULT '14px';

-- Update existing row with default values if columns are null
UPDATE public.topbar_config 
SET 
  background_color = COALESCE(background_color, '#0f172a'),
  text_color = COALESCE(text_color, 'rgba(255,255,255,0.7)'),
  hover_color = COALESCE(hover_color, '#ffffff'),
  font_family = COALESCE(font_family, 'General Sans, sans-serif'),
  font_size = COALESCE(font_size, '14px')
WHERE background_color IS NULL OR text_color IS NULL;