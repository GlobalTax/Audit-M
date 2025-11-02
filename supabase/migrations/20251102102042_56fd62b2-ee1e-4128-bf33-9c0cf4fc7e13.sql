-- Permitir a usuarios públicos/anónimos insertar candidaturas
CREATE POLICY "Public can submit applications"
ON public.candidatos
FOR INSERT
TO public
WITH CHECK (true);