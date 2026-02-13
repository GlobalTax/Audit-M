
-- Enums for CRM
CREATE TYPE public.crm_client_status AS ENUM ('prospecto', 'activo', 'inactivo', 'perdido');
CREATE TYPE public.crm_pipeline_stage AS ENUM ('nuevo', 'contactado', 'propuesta', 'negociacion', 'cerrado_ganado', 'cerrado_perdido');
CREATE TYPE public.crm_interaction_type AS ENUM ('llamada', 'email', 'reunion', 'nota', 'tarea');
CREATE TYPE public.crm_contract_status AS ENUM ('activo', 'pausado', 'finalizado', 'renovacion_pendiente');

-- Table: crm_clients
CREATE TABLE public.crm_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  nif_cif text,
  fiscal_address text,
  city text,
  postal_code text,
  country text DEFAULT 'España',
  website text,
  sector text,
  status crm_client_status NOT NULL DEFAULT 'prospecto',
  pipeline_stage crm_pipeline_stage NOT NULL DEFAULT 'nuevo',
  assigned_to text,
  notes text,
  source text,
  estimated_value numeric DEFAULT 0,
  source_site public.site_source DEFAULT 'audit',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage crm_clients" ON public.crm_clients
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_crm_clients_updated_at
  BEFORE UPDATE ON public.crm_clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table: crm_interactions
CREATE TABLE public.crm_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.crm_clients(id) ON DELETE CASCADE,
  type crm_interaction_type NOT NULL DEFAULT 'nota',
  subject text NOT NULL,
  description text,
  date timestamptz NOT NULL DEFAULT now(),
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage crm_interactions" ON public.crm_interactions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Table: crm_contracts
CREATE TABLE public.crm_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.crm_clients(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  status crm_contract_status NOT NULL DEFAULT 'activo',
  start_date date,
  end_date date,
  amount numeric DEFAULT 0,
  billing_frequency text DEFAULT 'mensual',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage crm_contracts" ON public.crm_contracts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_crm_contracts_updated_at
  BEFORE UPDATE ON public.crm_contracts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
