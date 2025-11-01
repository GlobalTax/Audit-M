-- Create CVs storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for CVs bucket
CREATE POLICY "Admins can view CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'cvs' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Anyone can upload CVs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'cvs' AND
  (storage.foldername(name))[1] = 'applications'
);

CREATE POLICY "Admins can delete CVs"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'cvs' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);