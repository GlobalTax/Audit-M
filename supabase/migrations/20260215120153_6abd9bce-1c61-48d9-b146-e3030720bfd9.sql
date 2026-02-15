
-- Add mandatory audit threshold fields to crm_clients
ALTER TABLE public.crm_clients
ADD COLUMN total_facturacion numeric DEFAULT NULL,
ADD COLUMN num_empleados integer DEFAULT NULL,
ADD COLUMN total_activo numeric DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.crm_clients.total_facturacion IS 'Cifra neta de negocios (umbral: >5.7M€)';
COMMENT ON COLUMN public.crm_clients.num_empleados IS 'Número medio de trabajadores (umbral: >50)';
COMMENT ON COLUMN public.crm_clients.total_activo IS 'Total partidas del activo (umbral: >2.85M€)';
