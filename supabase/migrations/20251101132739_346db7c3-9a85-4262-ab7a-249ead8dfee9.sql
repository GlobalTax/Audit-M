-- Create storage bucket for client/technology logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-logos', 'client-logos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for client-logos bucket
CREATE POLICY "Admins and editors can upload logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'client-logos' AND
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
);

CREATE POLICY "Admins and editors can update logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'client-logos' AND
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
);

CREATE POLICY "Admins and editors can delete logos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'client-logos' AND
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
);

CREATE POLICY "Public can view logos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'client-logos');