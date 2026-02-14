
-- Create invoice status enum
CREATE TYPE public.crm_invoice_status AS ENUM ('borrador', 'emitida', 'pagada', 'vencida', 'anulada');

-- Create invoices table
CREATE TABLE public.crm_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.crm_clients(id) ON DELETE CASCADE,
  contract_id uuid REFERENCES public.crm_contracts(id) ON DELETE SET NULL,
  invoice_number text NOT NULL UNIQUE,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date,
  amount numeric NOT NULL DEFAULT 0,
  tax_amount numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  status crm_invoice_status NOT NULL DEFAULT 'borrador',
  service_description text NOT NULL DEFAULT '',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.crm_invoices ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin only
CREATE POLICY "Admins can view invoices" ON public.crm_invoices
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert invoices" ON public.crm_invoices
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update invoices" ON public.crm_invoices
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete invoices" ON public.crm_invoices
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_crm_invoices_updated_at
  BEFORE UPDATE ON public.crm_invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for common queries
CREATE INDEX idx_crm_invoices_client ON public.crm_invoices(client_id);
CREATE INDEX idx_crm_invoices_issue_date ON public.crm_invoices(issue_date);
CREATE INDEX idx_crm_invoices_status ON public.crm_invoices(status);
