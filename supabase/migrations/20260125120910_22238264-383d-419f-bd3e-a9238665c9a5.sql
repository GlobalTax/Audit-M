-- Tabla de configuración del TopBar (singleton)
CREATE TABLE public.topbar_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT DEFAULT '+34 932 123 456',
  phone_link TEXT DEFAULT 'tel:+34932123456',
  show_search BOOLEAN DEFAULT false,
  show_language_selector BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de enlaces secundarios del TopBar
CREATE TABLE public.topbar_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  is_external BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de empresas del grupo
CREATE TABLE public.topbar_group_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  logo_url TEXT,
  is_current BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS con políticas de lectura pública
ALTER TABLE public.topbar_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topbar_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topbar_group_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read topbar_config" ON public.topbar_config FOR SELECT USING (true);
CREATE POLICY "Public read topbar_links" ON public.topbar_links FOR SELECT USING (true);
CREATE POLICY "Public read topbar_group_companies" ON public.topbar_group_companies FOR SELECT USING (true);

-- Insertar configuración por defecto
INSERT INTO public.topbar_config (phone_number, phone_link, show_search, show_language_selector)
VALUES ('+34 932 123 456', 'tel:+34932123456', false, true);

-- Insertar enlaces de ejemplo
INSERT INTO public.topbar_links (label, href, is_external, position) VALUES
  ('Trabaja con nosotros', '/carreras', false, 1),
  ('Blog', '/blog', false, 2),
  ('Recursos', '/recursos', false, 3);

-- Insertar empresas del grupo (Audit | m como actual)
INSERT INTO public.topbar_group_companies (name, url, is_current, position) VALUES
  ('Audit | m', 'https://auditm.es', true, 1),
  ('Navarro Abogados', 'https://nrro.es', false, 2),
  ('Navarro International', 'https://global.nrro.es', false, 3);

-- Trigger para updated_at
CREATE TRIGGER update_topbar_config_updated_at
  BEFORE UPDATE ON public.topbar_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_topbar_links_updated_at
  BEFORE UPDATE ON public.topbar_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_topbar_group_companies_updated_at
  BEFORE UPDATE ON public.topbar_group_companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();