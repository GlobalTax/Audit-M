-- Insert new service: Company Setup in Spain
INSERT INTO public.services (
  name_en,
  name_es,
  slug_en,
  slug_es,
  description_en,
  description_es,
  area_en,
  area_es,
  icon_name,
  is_active,
  display_order,
  features_en,
  benefits_en,
  meta_title_en,
  meta_description_en
) VALUES (
  'Company Setup in Spain',
  'Constitución de Empresas en España',
  'company-setup-spain',
  'constitucion-empresas-espana',
  'Full-service company incorporation for foreign investors. We handle every step from legal structure selection to registration, ensuring a seamless entry into the Spanish market.',
  'Servicio integral de constitución de empresas para inversores extranjeros. Gestionamos cada paso desde la selección de la estructura legal hasta el registro, asegurando una entrada fluida al mercado español.',
  'Corporate',
  'Corporate',
  'Building2',
  true,
  5,
  ARRAY['Legal entity selection (SL, SA, Branch)', 'NIE/NIF procurement for directors', 'Notary and Commercial Registry procedures', 'Bank account opening support', 'Tax registration (VAT, Corporate Tax)', 'Post-incorporation compliance setup'],
  ARRAY['Fast-track incorporation in 2-4 weeks', 'Single point of contact for all procedures', 'Bilingual legal documentation', 'Full regulatory compliance from day one'],
  'Company Setup in Spain | Navarro International',
  'Expert company incorporation services for foreign investors in Spain. Fast-track SL/SA formation, NIE procurement, and full regulatory compliance.'
);