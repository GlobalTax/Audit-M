-- Fase 1: Crear 6 testimonios para source_site='audit'
INSERT INTO testimonials (quote, author_name, author_role, company_name, company_type, company_type_label, location, flag_emoji, display_order, is_active, source_site)
VALUES
(
  'El rigor técnico y la comunicación fluida del equipo de auditoría superaron nuestras expectativas. Entregaron la opinión de auditoría en tiempo récord, lo que nos permitió cumplir con los plazos del Registro Mercantil sin contratiempos.',
  'Carlos Mendoza',
  'Director Financiero',
  'TechGlobal Solutions',
  'empresa',
  'Empresa Tecnológica',
  'Barcelona, España',
  '🇪🇸',
  1,
  true,
  'audit'
),
(
  'Su equipo de ESG nos preparó para el cumplimiento de la CSRD antes que la competencia. Gracias a su verificación de sostenibilidad, hemos ganado la confianza de inversores institucionales comprometidos con criterios ESG.',
  'Elena Vázquez',
  'Directora de Sostenibilidad',
  'GreenEnergy Corp',
  'empresa',
  'Energías Renovables',
  'Madrid, España',
  '🇪🇸',
  2,
  true,
  'audit'
),
(
  'La due diligence financiera que realizaron fue clave para nuestra adquisición. Detectaron contingencias por valor de 2,3 millones de euros que nos permitieron renegociar el precio de compra significativamente.',
  'Miguel Ángel Torres',
  'Managing Partner',
  'Inversiones Mediterráneo',
  'empresa',
  'Private Equity',
  'Valencia, España',
  '🇪🇸',
  3,
  true,
  'audit'
),
(
  'Como fundación, necesitábamos un equipo que entendiera nuestras particularidades. Justificaron todas nuestras subvenciones públicas sin ninguna incidencia, y su asesoramiento en gobierno corporativo ha sido invaluable.',
  'Ana Belén Ruiz',
  'Directora Ejecutiva',
  'Fundación Solidaria BCN',
  'fundacion',
  'Entidad Sin Ánimo de Lucro',
  'Barcelona, España',
  '🇪🇸',
  4,
  true,
  'audit'
),
(
  'Entienden perfectamente el sector cooperativo y sus complejidades normativas. Su auditoría nos permitió acceder a líneas de financiación preferentes y reforzó la confianza de nuestros socios cooperativistas.',
  'Josep Maria Llort',
  'Gerente',
  'Cooperativa Agrícola Costa Daurada',
  'cooperativa',
  'Cooperativa Agrícola',
  'Tarragona, España',
  '🇪🇸',
  5,
  true,
  'audit'
),
(
  'La coordinación entre las auditorías de nuestras filiales en 5 países fue impecable. Un solo interlocutor, informes consolidados claros y cumplimiento de todos los plazos. Profesionalidad absoluta.',
  'Patricia González',
  'CFO',
  'Grupo Industrial Ibérica',
  'empresa',
  'Multinacional Industrial',
  'Bilbao, España',
  '🇪🇸',
  6,
  true,
  'audit'
);