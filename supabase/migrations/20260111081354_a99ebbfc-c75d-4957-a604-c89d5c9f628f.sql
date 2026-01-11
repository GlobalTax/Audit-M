-- Brand Kit (design tokens + assets)
CREATE TABLE public.brand_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'NRRO International',
  tokens_json JSONB NOT NULL DEFAULT '{
    "fonts": {"heading": "General Sans", "body": "General Sans"},
    "colors": {"bg": "#FFFFFF", "surface": "#F7F7F8", "text": "#0C1E21", "mutedText": "#5B5B5B", "primary": "#0C1E21", "accent": "#C9A962", "border": "#E6E6E6"},
    "typography": {"h1": {"size": 44, "weight": 400, "lineHeight": 1.1}, "h2": {"size": 30, "weight": 400, "lineHeight": 1.15}, "body": {"size": 16, "weight": 400, "lineHeight": 1.45}},
    "spacing": {"slidePadding": 56, "gap": 18},
    "radius": {"card": 12, "button": 8},
    "shadow": {"card": "0 10px 30px rgba(0,0,0,0.08)"}
  }'::jsonb,
  font_urls JSONB,
  logo_url TEXT,
  cover_bg_url TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content Library (blocks imported from global.nrro.es)
CREATE TABLE public.content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT,
  section TEXT NOT NULL CHECK (section IN ('home', 'about', 'services', 'team', 'resources', 'contact', 'other')),
  language TEXT DEFAULT 'en',
  title TEXT,
  markdown TEXT NOT NULL,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Decks (presentations)
CREATE TABLE public.decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand_kit_id UUID REFERENCES public.brand_kits(id) ON DELETE SET NULL,
  goal TEXT DEFAULT 'corporate' CHECK (goal IN ('corporate', 'sales', 'investor', 'sector', 'custom')),
  audience TEXT,
  language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'exported')),
  outline_json JSONB,
  pdf_url TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deck Slides
CREATE TABLE public.deck_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES public.decks(id) ON DELETE CASCADE NOT NULL,
  slide_order INTEGER NOT NULL,
  slide_type TEXT NOT NULL CHECK (slide_type IN ('cover', 'about', 'services', 'stats', 'spain_setup', 'cross_border', 'proof_points', 'process', 'resources', 'team', 'differentiators', 'engagement', 'contact', 'custom')),
  title TEXT,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  speaker_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deck_slides ENABLE ROW LEVEL SECURITY;

-- Policies for admin access (authenticated users can manage)
CREATE POLICY "Authenticated users can manage brand_kits" ON public.brand_kits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage content_blocks" ON public.content_blocks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage decks" ON public.decks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage deck_slides" ON public.deck_slides FOR ALL USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX idx_content_blocks_section ON public.content_blocks(section);
CREATE INDEX idx_deck_slides_deck_id ON public.deck_slides(deck_id);
CREATE INDEX idx_decks_status ON public.decks(status);

-- Triggers for updated_at
CREATE TRIGGER update_brand_kits_updated_at BEFORE UPDATE ON public.brand_kits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_decks_updated_at BEFORE UPDATE ON public.decks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default brand kit
INSERT INTO public.brand_kits (name, is_default) VALUES ('NRRO International', true);