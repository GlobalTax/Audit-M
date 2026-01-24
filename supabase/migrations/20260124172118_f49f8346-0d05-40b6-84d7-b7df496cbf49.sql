-- Fase 4 y 5: Job Positions y Awards para source_site='audit'

-- Job Positions
INSERT INTO job_positions (title, slug, department, location, contract_type, working_hours, description, requirements, responsibilities, status, is_featured, display_order, source_site)
VALUES
('Auditor/a Senior', 'auditor-senior-barcelona', 'Auditoría Financiera', 'Barcelona', 'Indefinido', 'Jornada completa', 'Buscamos un/a Auditor/a Senior para liderar equipos de auditoría en clientes de diversos sectores. Trabajarás en un entorno dinámico con proyectos variados y oportunidades de desarrollo profesional.',
ARRAY['Licenciatura en ADE, Economía o similar', 'ROAC o en proceso de obtención', '4-6 años de experiencia en auditoría', 'Nivel alto de inglés', 'Dominio de herramientas de auditoría'],
ARRAY['Liderar equipos de auditoría de 2-4 personas', 'Planificar y ejecutar trabajos de auditoría', 'Revisar papeles de trabajo del equipo', 'Comunicación directa con clientes', 'Identificar áreas de mejora en control interno'],
'published', true, 1, 'audit'),

('Consultor/a ESG y Sostenibilidad', 'consultor-esg-sostenibilidad', 'Sostenibilidad', 'Barcelona', 'Indefinido', 'Jornada completa', 'Únete a nuestro equipo de ESG para ayudar a empresas a prepararse para la CSRD y verificar sus informes de sostenibilidad bajo los estándares ESRS.',
ARRAY['Grado en Ciencias Ambientales, Ingeniería o similar', '2-4 años de experiencia en ESG/sostenibilidad', 'Conocimiento de GRI, ESRS, GHG Protocol', 'Capacidad analítica y de síntesis', 'Inglés fluido'],
ARRAY['Asesorar en análisis de doble materialidad', 'Verificar informes de sostenibilidad', 'Calcular y verificar huella de carbono', 'Desarrollar metodologías ESG', 'Formar a clientes en normativa CSRD'],
'published', true, 2, 'audit'),

('Auditor/a Junior', 'auditor-junior-practicas', 'Auditoría Financiera', 'Barcelona', 'Prácticas / Junior', 'Jornada completa', 'Iniciamos tu carrera en auditoría. Formación continua, exposición a diversos sectores y mentoría de profesionales experimentados.',
ARRAY['Grado en ADE, Economía o Contabilidad', 'Expediente académico notable', 'Interés por la auditoría y contabilidad', 'Conocimientos de Excel', 'Inglés nivel medio-alto'],
ARRAY['Apoyar en trabajos de auditoría', 'Realizar pruebas sustantivas', 'Preparar papeles de trabajo', 'Circularizaciones y confirmaciones', 'Aprendizaje continuo con el equipo'],
'published', false, 3, 'audit');

-- Awards
INSERT INTO awards (name, short_name, category, organization, year, display_order, is_active, source_site)
VALUES
('Mejor Firma de Auditoría de Cataluña 2024', 'Top Auditor CAT', 'Auditoría Financiera', 'Ranking Auditores España', '2024', 1, true, 'audit'),
('Excellence in ESG Assurance 2024', 'ESG Excellence', 'Sostenibilidad', 'ESG Awards Europe', '2024', 2, true, 'audit'),
('Top 10 Firmas de Auditoría España 2023', 'Top 10 España', 'Auditoría General', 'Expansión / KPMG Survey', '2023', 3, true, 'audit');