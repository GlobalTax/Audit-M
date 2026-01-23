-- =====================================================
-- CATÁLOGO COMPLETO DE 21 SERVICIOS DE AUDITORÍA
-- Ejecutar en Cloud View > Run SQL
-- =====================================================

-- 1. Auditoría de Cuentas Anuales
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Cuentas Anuales', 'Annual Accounts Audit', 'Auditoria de Comptes Anuals',
  'auditoria-cuentas-anuales', 'annual-accounts-audit', 'auditoria-comptes-anuals',
  'Verificación independiente de estados financieros conforme al Plan General de Contabilidad y normativa ICAC. Emitimos opinión profesional sobre la imagen fiel de su empresa.',
  'Independent verification of financial statements in accordance with Spanish GAAP and ICAC regulations. We issue a professional opinion on your company''s true and fair view.',
  'Verificació independent dels estats financers conforme al Pla General de Comptabilitat i normativa ICAC.',
  'Auditoría Financiera', 'Financial Audit', 'Auditoria Financera', 'FileCheck',
  '["Revisión completa de estados financieros", "Verificación de políticas contables", "Análisis de riesgos", "Informe NIA-ES", "Carta de recomendaciones"]',
  '["Complete financial statements review", "Accounting policies verification", "Risk analysis", "ISA-ES report", "Management letter"]',
  '["Revisió completa d''estats financers", "Verificació de polítiques comptables", "Anàlisi de riscos", "Informe NIA-ES", "Carta de recomanacions"]',
  '["Sociedades obligadas Art. 263 TRLSC", "Grupos empresariales", "Empresas en venta", "Sector público"]',
  '["Companies required by Art. 263 TRLSC", "Corporate groups", "Companies in sale", "Public sector"]',
  '["Societats obligades Art. 263 TRLSC", "Grups empresarials", "Empreses en venda", "Sector públic"]',
  'Auditoría de Cuentas Anuales | Auditores ROAC', 'Annual Accounts Audit | ROAC Auditors', 'Auditoria de Comptes Anuals | Auditors ROAC',
  'Auditoría de cuentas anuales por auditores ROAC. Verificación conforme a NIA-ES.',
  'Annual accounts audit by ROAC auditors. Verification according to ISA-ES.',
  'Auditoria de comptes anuals per auditors ROAC. Verificació conforme a NIA-ES.',
  1, true
);

-- 2. Auditoría de Cuentas Consolidadas
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Cuentas Consolidadas', 'Consolidated Accounts Audit', 'Auditoria de Comptes Consolidats',
  'auditoria-cuentas-consolidadas', 'consolidated-accounts-audit', 'auditoria-comptes-consolidats',
  'Auditoría de estados financieros consolidados de grupos empresariales. Verificamos consolidación, eliminaciones intragrupo y presentación NIIF.',
  'Audit of consolidated financial statements for corporate groups. We verify consolidation, intragroup eliminations and IFRS presentation.',
  'Auditoria d''estats financers consolidats de grups empresarials.',
  'Auditoría Financiera', 'Financial Audit', 'Auditoria Financera', 'Files',
  '["Perímetro de consolidación", "Ajustes de consolidación", "Eliminaciones intragrupo", "Diferencias de cambio", "Informe consolidado"]',
  '["Consolidation perimeter", "Consolidation adjustments", "Intragroup eliminations", "FX differences", "Consolidated report"]',
  '["Perímetre de consolidació", "Ajustos de consolidació", "Eliminacions intragrup", "Diferències de canvi", "Informe consolidat"]',
  '["Holdings", "Multinacionales", "Grupos familiares", "Fondos de inversión"]',
  '["Holdings", "Multinationals", "Family groups", "Investment funds"]',
  '["Holdings", "Multinacionals", "Grups familiars", "Fons d''inversió"]',
  'Auditoría Cuentas Consolidadas | Grupos Empresariales', 'Consolidated Accounts Audit | Corporate Groups', 'Auditoria Comptes Consolidats | Grups',
  'Auditoría de cuentas consolidadas para holdings y grupos. Verificación NIIF.',
  'Consolidated accounts audit for holdings and groups. IFRS verification.',
  'Auditoria de comptes consolidats per a holdings i grups.',
  2, true
);

-- 3. Auditoría de Subvenciones Públicas
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Subvenciones Públicas', 'Public Subsidies Audit', 'Auditoria de Subvencions Públiques',
  'auditoria-subvenciones-publicas', 'public-subsidies-audit', 'auditoria-subvencions-publiques',
  'Verificación y justificación de subvenciones públicas conforme a la Ley General de Subvenciones.',
  'Verification and justification of public subsidies in accordance with the General Subsidies Law.',
  'Verificació i justificació de subvencions públiques conforme a la Llei General de Subvencions.',
  'Auditoría de Cumplimiento', 'Compliance Audit', 'Auditoria de Compliment', 'Landmark',
  '["Gastos elegibles", "Documentación justificativa", "Bases reguladoras", "Informe auditor", "Regularizaciones"]',
  '["Eligible expenses", "Supporting documentation", "Regulatory bases", "Auditor report", "Regularizations"]',
  '["Despeses elegibles", "Documentació justificativa", "Bases reguladores", "Informe auditor", "Regularitzacions"]',
  '["Subvenciones CDTI", "Fondos europeos", "Ayudas autonómicas", "Proyectos I+D+i"]',
  '["CDTI subsidies", "European funds", "Regional grants", "R&D projects"]',
  '["Subvencions CDTI", "Fons europeus", "Ajuts autonòmics", "Projectes R+D+i"]',
  'Auditoría Subvenciones | CDTI y Fondos UE', 'Public Subsidies Audit | CDTI & EU Funds', 'Auditoria Subvencions | CDTI i Fons UE',
  'Auditoría de subvenciones CDTI, fondos europeos y ayudas autonómicas.',
  'CDTI subsidies, European funds and regional grants audit.',
  'Auditoria de subvencions CDTI, fons europeus i ajuts autonòmics.',
  3, true
);

-- 4. Auditoría para Contratos Públicos
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría para Contratos Públicos', 'Public Contracts Audit', 'Auditoria per a Contractes Públics',
  'auditoria-contratos-publicos', 'public-contracts-audit', 'auditoria-contractes-publics',
  'Auditoría requerida para licitaciones públicas. Verificamos solvencia económica y técnica conforme a LCSP.',
  'Audit required for public tenders. We verify economic and technical solvency according to LCSP.',
  'Auditoria requerida per a licitacions públiques. Verifiquem solvència econòmica i tècnica.',
  'Auditoría de Cumplimiento', 'Compliance Audit', 'Auditoria de Compliment', 'FileSignature',
  '["Solvencia económica", "Ratios financieros", "Medios técnicos", "Clasificación empresarial", "Apoyo licitaciones"]',
  '["Economic solvency", "Financial ratios", "Technical means", "Business classification", "Tender support"]',
  '["Solvència econòmica", "Ràtios financers", "Mitjans tècnics", "Classificació empresarial", "Suport licitacions"]',
  '["Constructoras", "Servicios públicos", "Proveedores sector público", "UTEs"]',
  '["Construction", "Public services", "Public sector suppliers", "Joint ventures"]',
  '["Constructores", "Serveis públics", "Proveïdors sector públic", "UTEs"]',
  'Auditoría Contratos Públicos | Licitaciones', 'Public Contracts Audit | Tenders', 'Auditoria Contractes Públics | Licitacions',
  'Auditoría de solvencia para licitaciones públicas conforme a LCSP.',
  'Solvency audit for public tenders according to LCSP.',
  'Auditoria de solvència per a licitacions públiques conforme a LCSP.',
  4, true
);

-- 5. Auditoría de Fundaciones y ENL
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Fundaciones y ENL', 'Foundations & Non-Profit Audit', 'Auditoria de Fundacions i ENL',
  'auditoria-fundaciones-enl', 'foundations-non-profit-audit', 'auditoria-fundacions-enl',
  'Auditoría especializada para fundaciones y entidades no lucrativas conforme a Ley de Fundaciones.',
  'Specialized audit for foundations and non-profit entities according to Foundations Law.',
  'Auditoria especialitzada per a fundacions i entitats no lucratives.',
  'Auditoría de Cumplimiento', 'Compliance Audit', 'Auditoria de Compliment', 'Heart',
  '["Cumplimiento de fines", "Destino de fondos", "Informe Protectorado", "Memorias actividades", "Ley Fundaciones"]',
  '["Purpose compliance", "Funds destination", "Protectorate report", "Activity reports", "Foundations Law"]',
  '["Compliment de fins", "Destinació de fons", "Informe Protectorat", "Memòries activitats", "Llei Fundacions"]',
  '["Fundaciones empresariales", "ONGs", "Asociaciones utilidad pública", "Entidades religiosas"]',
  '["Corporate foundations", "NGOs", "Public utility associations", "Religious entities"]',
  '["Fundacions empresarials", "ONGs", "Associacions utilitat pública", "Entitats religioses"]',
  'Auditoría Fundaciones y ENL | Tercer Sector', 'Foundations & Non-Profit Audit', 'Auditoria Fundacions i ENL | Tercer Sector',
  'Auditoría para fundaciones y ENL. Cumplimiento Ley de Fundaciones.',
  'Audit for foundations and non-profits. Foundations Law compliance.',
  'Auditoria per a fundacions i ENL. Compliment Llei de Fundacions.',
  5, true
);

-- 6. Auditoría de Cooperativas
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Cooperativas', 'Cooperative Societies Audit', 'Auditoria de Cooperatives',
  'auditoria-cooperativas', 'cooperative-societies-audit', 'auditoria-cooperatives',
  'Auditoría especializada para cooperativas conforme a legislación cooperativa estatal y autonómica.',
  'Specialized audit for cooperatives according to state and regional cooperative legislation.',
  'Auditoria especialitzada per a cooperatives conforme a legislació cooperativa.',
  'Auditoría de Cumplimiento', 'Compliance Audit', 'Auditoria de Compliment', 'Users',
  '["Operaciones con socios", "Fondos obligatorios", "Principios cooperativos", "Registro Cooperativas", "Retornos"]',
  '["Member operations", "Mandatory funds", "Cooperative principles", "Cooperatives Registry", "Returns"]',
  '["Operacions amb socis", "Fons obligatoris", "Principis cooperatius", "Registre Cooperatives", "Retorns"]',
  '["Cooperativas agrarias", "Trabajo asociado", "Viviendas", "Crédito"]',
  '["Agricultural cooperatives", "Worker cooperatives", "Housing", "Credit"]',
  '["Cooperatives agràries", "Treball associat", "Habitatges", "Crèdit"]',
  'Auditoría Cooperativas | Economía Social', 'Cooperative Audit | Social Economy', 'Auditoria Cooperatives | Economia Social',
  'Auditoría para cooperativas. Cumplimiento legislación cooperativa.',
  'Cooperative audit. Cooperative legislation compliance.',
  'Auditoria per a cooperatives. Compliment legislació cooperativa.',
  6, true
);

-- 7. Verificación CSRD/ESRS
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Verificación CSRD/ESRS', 'CSRD/ESRS Verification', 'Verificació CSRD/ESRS',
  'verificacion-csrd-esrs', 'csrd-esrs-verification', 'verificacio-csrd-esrs',
  'Verificación de informes de sostenibilidad conforme a la Directiva CSRD y estándares ESRS europeos.',
  'Sustainability report verification according to CSRD Directive and European ESRS standards.',
  'Verificació d''informes de sostenibilitat conforme a la Directiva CSRD i estàndards ESRS.',
  'Auditoría ESG', 'ESG Audit', 'Auditoria ESG', 'Leaf',
  '["Análisis de materialidad", "Verificación ESRS", "Doble materialidad", "Cadena de valor", "Informe de aseguramiento"]',
  '["Materiality analysis", "ESRS verification", "Double materiality", "Value chain", "Assurance report"]',
  '["Anàlisi de materialitat", "Verificació ESRS", "Doble materialitat", "Cadena de valor", "Informe d''assegurament"]',
  '["Grandes empresas", "Cotizadas", "Entidades interés público", "Multinacionales"]',
  '["Large companies", "Listed companies", "Public interest entities", "Multinationals"]',
  '["Grans empreses", "Cotitzades", "Entitats interès públic", "Multinacionals"]',
  'Verificación CSRD/ESRS | Sostenibilidad', 'CSRD/ESRS Verification | Sustainability', 'Verificació CSRD/ESRS | Sostenibilitat',
  'Verificación de informes CSRD/ESRS. Aseguramiento de sostenibilidad.',
  'CSRD/ESRS report verification. Sustainability assurance.',
  'Verificació d''informes CSRD/ESRS. Assegurament de sostenibilitat.',
  7, true
);

-- 8. Auditoría de Huella de Carbono
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Huella de Carbono', 'Carbon Footprint Audit', 'Auditoria de Petjada de Carboni',
  'auditoria-huella-carbono', 'carbon-footprint-audit', 'auditoria-petjada-carboni',
  'Verificación de inventarios de emisiones GEI y huella de carbono conforme a ISO 14064 y GHG Protocol.',
  'Verification of GHG emission inventories and carbon footprint according to ISO 14064 and GHG Protocol.',
  'Verificació d''inventaris d''emissions GEH i petjada de carboni conforme a ISO 14064.',
  'Auditoría ESG', 'ESG Audit', 'Auditoria ESG', 'Cloud',
  '["Inventario emisiones", "Alcances 1, 2 y 3", "ISO 14064", "GHG Protocol", "Planes reducción"]',
  '["Emissions inventory", "Scopes 1, 2 and 3", "ISO 14064", "GHG Protocol", "Reduction plans"]',
  '["Inventari emissions", "Abasts 1, 2 i 3", "ISO 14064", "GHG Protocol", "Plans reducció"]',
  '["Industria", "Energía", "Transporte", "Construcción"]',
  '["Industry", "Energy", "Transport", "Construction"]',
  '["Indústria", "Energia", "Transport", "Construcció"]',
  'Auditoría Huella de Carbono | ISO 14064', 'Carbon Footprint Audit | ISO 14064', 'Auditoria Petjada de Carboni | ISO 14064',
  'Verificación de huella de carbono e inventario de emisiones GEI.',
  'Carbon footprint verification and GHG emissions inventory.',
  'Verificació de petjada de carboni i inventari d''emissions GEH.',
  8, true
);

-- 9. Verificación Taxonomía UE
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Verificación Taxonomía UE', 'EU Taxonomy Verification', 'Verificació Taxonomia UE',
  'verificacion-taxonomia-ue', 'eu-taxonomy-verification', 'verificacio-taxonomia-ue',
  'Verificación del alineamiento de actividades económicas con la Taxonomía europea de finanzas sostenibles.',
  'Verification of economic activities alignment with the European sustainable finance Taxonomy.',
  'Verificació de l''alineament d''activitats econòmiques amb la Taxonomia europea.',
  'Auditoría ESG', 'ESG Audit', 'Auditoria ESG', 'TreeDeciduous',
  '["Elegibilidad actividades", "Alineamiento taxonomía", "Criterios técnicos", "DNSH", "KPIs verdes"]',
  '["Activities eligibility", "Taxonomy alignment", "Technical criteria", "DNSH", "Green KPIs"]',
  '["Elegibilitat activitats", "Alineament taxonomia", "Criteris tècnics", "DNSH", "KPIs verds"]',
  '["Banca y seguros", "Gestoras de activos", "Grandes empresas", "Inmobiliarias"]',
  '["Banking and insurance", "Asset managers", "Large companies", "Real estate"]',
  '["Banca i assegurances", "Gestores d''actius", "Grans empreses", "Immobiliàries"]',
  'Verificación Taxonomía UE | Finanzas Sostenibles', 'EU Taxonomy Verification | Sustainable Finance', 'Verificació Taxonomia UE | Finances Sostenibles',
  'Verificación de alineamiento con Taxonomía UE de finanzas sostenibles.',
  'EU Taxonomy alignment verification for sustainable finance.',
  'Verificació d''alineament amb Taxonomia UE de finances sostenibles.',
  9, true
);

-- 10. Auditoría de Información No Financiera
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Información No Financiera', 'Non-Financial Information Audit', 'Auditoria d''Informació No Financera',
  'auditoria-informacion-no-financiera', 'non-financial-information-audit', 'auditoria-informacio-no-financera',
  'Verificación del Estado de Información No Financiera (EINF) conforme a Ley 11/2018.',
  'Verification of the Non-Financial Information Statement according to Law 11/2018.',
  'Verificació de l''Estat d''Informació No Financera (EINF) conforme a Llei 11/2018.',
  'Auditoría ESG', 'ESG Audit', 'Auditoria ESG', 'BarChart3',
  '["EINF Ley 11/2018", "GRI Standards", "ODS", "Stakeholders", "Informe verificación"]',
  '["NFIS Law 11/2018", "GRI Standards", "SDGs", "Stakeholders", "Verification report"]',
  '["EINF Llei 11/2018", "GRI Standards", "ODS", "Stakeholders", "Informe verificació"]',
  '["Grandes empresas +500 empleados", "Cotizadas", "Entidades interés público", "Grupos consolidados"]',
  '["Large companies +500 employees", "Listed companies", "Public interest entities", "Consolidated groups"]',
  '["Grans empreses +500 empleats", "Cotitzades", "Entitats interès públic", "Grups consolidats"]',
  'Auditoría EINF | Información No Financiera', 'Non-Financial Information Audit | NFIS', 'Auditoria EINF | Informació No Financera',
  'Verificación EINF conforme a Ley 11/2018. Auditoría información no financiera.',
  'NFIS verification according to Law 11/2018. Non-financial information audit.',
  'Verificació EINF conforme a Llei 11/2018. Auditoria informació no financera.',
  10, true
);

-- 11. Due Diligence Financiera
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Due Diligence Financiera', 'Financial Due Diligence', 'Due Diligence Financera',
  'due-diligence-financiera', 'financial-due-diligence', 'due-diligence-financera',
  'Análisis exhaustivo de la situación financiera de una empresa objetivo en operaciones de M&A.',
  'Comprehensive analysis of target company financial position in M&A transactions.',
  'Anàlisi exhaustiu de la situació financera d''una empresa objectiu en operacions de M&A.',
  'Auditoría Transaccional', 'Transactional Audit', 'Auditoria Transaccional', 'Search',
  '["Quality of Earnings", "Deuda neta", "Working capital", "Contingencias", "Ajustes al precio"]',
  '["Quality of Earnings", "Net debt", "Working capital", "Contingencies", "Price adjustments"]',
  '["Quality of Earnings", "Deute net", "Working capital", "Contingències", "Ajustos al preu"]',
  '["Private equity", "Corporates compradores", "Family offices", "Fondos de inversión"]',
  '["Private equity", "Corporate buyers", "Family offices", "Investment funds"]',
  '["Private equity", "Corporates compradors", "Family offices", "Fons d''inversió"]',
  'Due Diligence Financiera | M&A', 'Financial Due Diligence | M&A', 'Due Diligence Financera | M&A',
  'Due diligence financiera para operaciones M&A. Quality of Earnings.',
  'Financial due diligence for M&A transactions. Quality of Earnings.',
  'Due diligence financera per a operacions M&A. Quality of Earnings.',
  11, true
);

-- 12. Due Diligence Fiscal
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Due Diligence Fiscal', 'Tax Due Diligence', 'Due Diligence Fiscal',
  'due-diligence-fiscal', 'tax-due-diligence', 'due-diligence-fiscal',
  'Análisis de contingencias fiscales y cumplimiento tributario en operaciones de M&A.',
  'Analysis of tax contingencies and tax compliance in M&A transactions.',
  'Anàlisi de contingències fiscals i compliment tributari en operacions de M&A.',
  'Auditoría Transaccional', 'Transactional Audit', 'Auditoria Transaccional', 'Calculator',
  '["Contingencias fiscales", "Cumplimiento tributario", "Estructuras fiscales", "Transfer pricing", "Créditos fiscales"]',
  '["Tax contingencies", "Tax compliance", "Tax structures", "Transfer pricing", "Tax credits"]',
  '["Contingències fiscals", "Compliment tributari", "Estructures fiscals", "Transfer pricing", "Crèdits fiscals"]',
  '["Inversores internacionales", "Private equity", "Corporates", "Fondos"]',
  '["International investors", "Private equity", "Corporates", "Funds"]',
  '["Inversors internacionals", "Private equity", "Corporates", "Fons"]',
  'Due Diligence Fiscal | M&A', 'Tax Due Diligence | M&A', 'Due Diligence Fiscal | M&A',
  'Due diligence fiscal para M&A. Análisis de contingencias tributarias.',
  'Tax due diligence for M&A. Tax contingencies analysis.',
  'Due diligence fiscal per a M&A. Anàlisi de contingències tributàries.',
  12, true
);

-- 13. Vendor Due Diligence
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Vendor Due Diligence', 'Vendor Due Diligence', 'Vendor Due Diligence',
  'vendor-due-diligence', 'vendor-due-diligence', 'vendor-due-diligence',
  'Due diligence preparada por el vendedor para facilitar el proceso de venta y maximizar valor.',
  'Seller-prepared due diligence to facilitate sale process and maximize value.',
  'Due diligence preparada pel venedor per facilitar el procés de venda i maximitzar valor.',
  'Auditoría Transaccional', 'Transactional Audit', 'Auditoria Transaccional', 'UserCheck',
  '["Informe vendedor", "Data room", "Fact book", "Q&A support", "Maximización valor"]',
  '["Seller report", "Data room", "Fact book", "Q&A support", "Value maximization"]',
  '["Informe venedor", "Data room", "Fact book", "Q&A support", "Maximització valor"]',
  '["Empresas en venta", "Private equity (exit)", "Empresarios", "Family offices"]',
  '["Companies for sale", "Private equity (exit)", "Entrepreneurs", "Family offices"]',
  '["Empreses en venda", "Private equity (exit)", "Empresaris", "Family offices"]',
  'Vendor Due Diligence | Venta Empresas', 'Vendor Due Diligence | Company Sale', 'Vendor Due Diligence | Venda Empreses',
  'Vendor due diligence para venta de empresas. Maximización de valor.',
  'Vendor due diligence for company sale. Value maximization.',
  'Vendor due diligence per a venda d''empreses. Maximització de valor.',
  13, true
);

-- 14. Due Diligence Operativa
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Due Diligence Operativa', 'Operational Due Diligence', 'Due Diligence Operativa',
  'due-diligence-operativa', 'operational-due-diligence', 'due-diligence-operativa',
  'Análisis de procesos operativos, eficiencias y sinergias potenciales en operaciones de M&A.',
  'Analysis of operational processes, efficiencies and potential synergies in M&A transactions.',
  'Anàlisi de processos operatius, eficiències i sinergies potencials en operacions de M&A.',
  'Auditoría Transaccional', 'Transactional Audit', 'Auditoria Transaccional', 'Settings',
  '["Procesos clave", "Eficiencias operativas", "Sinergias", "Integración post-deal", "Riesgos operacionales"]',
  '["Key processes", "Operational efficiencies", "Synergies", "Post-deal integration", "Operational risks"]',
  '["Processos clau", "Eficiències operatives", "Sinergies", "Integració post-deal", "Riscos operacionals"]',
  '["Private equity", "Industriales", "Grupos empresariales", "Fondos infraestructuras"]',
  '["Private equity", "Industrials", "Corporate groups", "Infrastructure funds"]',
  '["Private equity", "Industrials", "Grups empresarials", "Fons infraestructures"]',
  'Due Diligence Operativa | Sinergias', 'Operational Due Diligence | Synergies', 'Due Diligence Operativa | Sinergies',
  'Due diligence operativa para M&A. Análisis de sinergias y eficiencias.',
  'Operational due diligence for M&A. Synergies and efficiencies analysis.',
  'Due diligence operativa per a M&A. Anàlisi de sinergies i eficiències.',
  14, true
);

-- 15. Outsourcing de Auditoría Interna
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Outsourcing de Auditoría Interna', 'Internal Audit Outsourcing', 'Outsourcing d''Auditoria Interna',
  'outsourcing-auditoria-interna', 'internal-audit-outsourcing', 'outsourcing-auditoria-interna',
  'Externalización total o parcial de la función de auditoría interna con profesionales especializados.',
  'Full or partial outsourcing of internal audit function with specialized professionals.',
  'Externalització total o parcial de la funció d''auditoria interna amb professionals especialitzats.',
  'Auditoría Interna', 'Internal Audit', 'Auditoria Interna', 'ShieldCheck',
  '["Plan anual auditoría", "Auditorías de procesos", "Informes a Comité", "Seguimiento recomendaciones", "Normas IIA"]',
  '["Annual audit plan", "Process audits", "Committee reports", "Recommendations follow-up", "IIA Standards"]',
  '["Pla anual auditoria", "Auditories de processos", "Informes a Comitè", "Seguiment recomanacions", "Normes IIA"]',
  '["Empresas sin auditoría interna", "Refuerzo equipos", "Pymes en crecimiento", "Filiales de grupos"]',
  '["Companies without internal audit", "Team reinforcement", "Growing SMEs", "Group subsidiaries"]',
  '["Empreses sense auditoria interna", "Reforç equips", "Pimes en creixement", "Filials de grups"]',
  'Outsourcing Auditoría Interna | IIA', 'Internal Audit Outsourcing | IIA', 'Outsourcing Auditoria Interna | IIA',
  'Outsourcing de auditoría interna. Profesionales certificados IIA.',
  'Internal audit outsourcing. IIA certified professionals.',
  'Outsourcing d''auditoria interna. Professionals certificats IIA.',
  15, true
);

-- 16. Evaluación de Control Interno (COSO)
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Evaluación de Control Interno (COSO)', 'Internal Control Evaluation (COSO)', 'Avaluació de Control Intern (COSO)',
  'evaluacion-control-interno-coso', 'internal-control-evaluation-coso', 'avaluacio-control-intern-coso',
  'Evaluación del sistema de control interno conforme al marco COSO 2013 y mejores prácticas.',
  'Internal control system evaluation according to COSO 2013 framework and best practices.',
  'Avaluació del sistema de control intern conforme al marc COSO 2013 i millors pràctiques.',
  'Auditoría Interna', 'Internal Audit', 'Auditoria Interna', 'Shield',
  '["Marco COSO 2013", "17 principios", "Matriz de riesgos", "Controles clave", "Plan de mejora"]',
  '["COSO 2013 framework", "17 principles", "Risk matrix", "Key controls", "Improvement plan"]',
  '["Marc COSO 2013", "17 principis", "Matriu de riscos", "Controls clau", "Pla de millora"]',
  '["Cotizadas", "Empresas reguladas", "Grupos empresariales", "Entidades financieras"]',
  '["Listed companies", "Regulated entities", "Corporate groups", "Financial institutions"]',
  '["Cotitzades", "Empreses regulades", "Grups empresarials", "Entitats financeres"]',
  'Evaluación Control Interno COSO', 'Internal Control Evaluation COSO', 'Avaluació Control Intern COSO',
  'Evaluación de control interno conforme a COSO 2013. Mejora de controles.',
  'Internal control evaluation according to COSO 2013. Control improvement.',
  'Avaluació de control intern conforme a COSO 2013. Millora de controls.',
  16, true
);

-- 17. Auditoría de Cumplimiento
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Cumplimiento Normativo', 'Compliance Audit', 'Auditoria de Compliment Normatiu',
  'auditoria-cumplimiento-normativo', 'compliance-audit', 'auditoria-compliment-normatiu',
  'Verificación del cumplimiento de normativas sectoriales, regulaciones y políticas internas.',
  'Verification of sector regulations, regulatory and internal policy compliance.',
  'Verificació del compliment de normatives sectorials, regulacions i polítiques internes.',
  'Auditoría Interna', 'Internal Audit', 'Auditoria Interna', 'ClipboardCheck',
  '["Cumplimiento regulatorio", "Políticas internas", "Contratos", "RGPD", "Prevención blanqueo"]',
  '["Regulatory compliance", "Internal policies", "Contracts", "GDPR", "AML prevention"]',
  '["Compliment regulatori", "Polítiques internes", "Contractes", "RGPD", "Prevenció blanqueig"]',
  '["Sector financiero", "Farmacéuticas", "Energía", "Telecomunicaciones"]',
  '["Financial sector", "Pharmaceuticals", "Energy", "Telecommunications"]',
  '["Sector financer", "Farmacèutiques", "Energia", "Telecomunicacions"]',
  'Auditoría Cumplimiento | Compliance', 'Compliance Audit', 'Auditoria Compliment | Compliance',
  'Auditoría de cumplimiento normativo y regulatorio. Compliance.',
  'Regulatory and normative compliance audit. Compliance.',
  'Auditoria de compliment normatiu i regulatori. Compliance.',
  17, true
);

-- 18. Auditoría de Sistemas IT (COBIT)
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Auditoría de Sistemas IT (COBIT)', 'IT Systems Audit (COBIT)', 'Auditoria de Sistemes IT (COBIT)',
  'auditoria-sistemas-it-cobit', 'it-systems-audit-cobit', 'auditoria-sistemes-it-cobit',
  'Auditoría de sistemas de información y controles IT conforme a COBIT e ISO 27001.',
  'Information systems and IT controls audit according to COBIT and ISO 27001.',
  'Auditoria de sistemes d''informació i controls IT conforme a COBIT i ISO 27001.',
  'Auditoría Interna', 'Internal Audit', 'Auditoria Interna', 'Server',
  '["COBIT 2019", "Controles IT generales", "Ciberseguridad", "Continuidad negocio", "ISO 27001"]',
  '["COBIT 2019", "IT general controls", "Cybersecurity", "Business continuity", "ISO 27001"]',
  '["COBIT 2019", "Controls IT generals", "Ciberseguretat", "Continuïtat negoci", "ISO 27001"]',
  '["Banca", "Seguros", "Retail", "Industria 4.0"]',
  '["Banking", "Insurance", "Retail", "Industry 4.0"]',
  '["Banca", "Assegurances", "Retail", "Indústria 4.0"]',
  'Auditoría IT COBIT | Ciberseguridad', 'IT Audit COBIT | Cybersecurity', 'Auditoria IT COBIT | Ciberseguretat',
  'Auditoría de sistemas IT conforme a COBIT. Controles y ciberseguridad.',
  'IT systems audit according to COBIT. Controls and cybersecurity.',
  'Auditoria de sistemes IT conforme a COBIT. Controls i ciberseguretat.',
  18, true
);

-- 19. Informes Especiales de Auditor
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Informes Especiales de Auditor', 'Special Auditor Reports', 'Informes Especials d''Auditor',
  'informes-especiales-auditor', 'special-auditor-reports', 'informes-especials-auditor',
  'Emisión de informes especiales de auditor requeridos por la legislación mercantil española.',
  'Issuance of special auditor reports required by Spanish commercial legislation.',
  'Emissió d''informes especials d''auditor requerits per la legislació mercantil espanyola.',
  'Informes Especiales', 'Special Reports', 'Informes Especials', 'FileText',
  '["Ampliaciones capital", "Fusiones y escisiones", "Aportaciones no dinerarias", "Exclusión socios", "Transformaciones"]',
  '["Capital increases", "Mergers and spin-offs", "Non-cash contributions", "Partner exclusions", "Transformations"]',
  '["Ampliacions capital", "Fusions i escissions", "Aportacions no dineràries", "Exclusió socis", "Transformacions"]',
  '["Sociedades en reestructuración", "Startups en rondas", "Empresas familiares", "Grupos empresariales"]',
  '["Restructuring companies", "Startups in rounds", "Family businesses", "Corporate groups"]',
  '["Societats en reestructuració", "Startups en rondes", "Empreses familiars", "Grups empresarials"]',
  'Informes Especiales Auditor | LSC', 'Special Auditor Reports | LSC', 'Informes Especials Auditor | LSC',
  'Informes especiales de auditor: ampliaciones, fusiones, aportaciones.',
  'Special auditor reports: increases, mergers, contributions.',
  'Informes especials d''auditor: ampliacions, fusions, aportacions.',
  19, true
);

-- 20. Procedimientos Acordados (AUP)
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Procedimientos Acordados (AUP)', 'Agreed-Upon Procedures (AUP)', 'Procediments Acordats (AUP)',
  'procedimientos-acordados-aup', 'agreed-upon-procedures-aup', 'procediments-acordats-aup',
  'Ejecución de procedimientos específicos acordados con el cliente para verificaciones concretas.',
  'Execution of specific procedures agreed with the client for concrete verifications.',
  'Execució de procediments específics acordats amb el client per a verificacions concretes.',
  'Informes Especiales', 'Special Reports', 'Informes Especials', 'FileSearch',
  '["Procedimientos a medida", "Verificaciones específicas", "Informe de hallazgos", "Contratos", "Royalties"]',
  '["Tailored procedures", "Specific verifications", "Findings report", "Contracts", "Royalties"]',
  '["Procediments a mida", "Verificacions específiques", "Informe de troballes", "Contractes", "Royalties"]',
  '["Franquicias", "Licencias", "Contratos de gestión", "Joint ventures"]',
  '["Franchises", "Licenses", "Management contracts", "Joint ventures"]',
  '["Franquícies", "Llicències", "Contractes de gestió", "Joint ventures"]',
  'Procedimientos Acordados AUP | ISRS 4400', 'Agreed-Upon Procedures AUP | ISRS 4400', 'Procediments Acordats AUP | ISRS 4400',
  'Procedimientos acordados AUP conforme a ISRS 4400. Verificaciones específicas.',
  'Agreed-upon procedures AUP according to ISRS 4400. Specific verifications.',
  'Procediments acordats AUP conforme a ISRS 4400. Verificacions específiques.',
  20, true
);

-- 21. Revisión Limitada de Estados Financieros
INSERT INTO services (name_es, name_en, name_ca, slug_es, slug_en, slug_ca, description_es, description_en, description_ca, area_es, area_en, area_ca, icon_name, features_es, features_en, features_ca, typical_clients_es, typical_clients_en, typical_clients_ca, meta_title_es, meta_title_en, meta_title_ca, meta_description_es, meta_description_en, meta_description_ca, display_order, is_active)
VALUES (
  'Revisión Limitada de Estados Financieros', 'Limited Review of Financial Statements', 'Revisió Limitada d''Estats Financers',
  'revision-limitada-estados-financieros', 'limited-review-financial-statements', 'revisio-limitada-estats-financers',
  'Revisión con alcance menor que una auditoría completa, proporcionando seguridad limitada.',
  'Review with lesser scope than a full audit, providing limited assurance.',
  'Revisió amb abast menor que una auditoria completa, proporcionant seguretat limitada.',
  'Informes Especiales', 'Special Reports', 'Informes Especials', 'Eye',
  '["Seguridad limitada", "Procedimientos analíticos", "Indagaciones", "ISRE 2400", "Coste reducido"]',
  '["Limited assurance", "Analytical procedures", "Inquiries", "ISRE 2400", "Reduced cost"]',
  '["Seguretat limitada", "Procediments analítics", "Indagacions", "ISRE 2400", "Cost reduït"]',
  '["Pymes no obligadas", "Estados intermedios", "Filiales menores", "Startups"]',
  '["Non-required SMEs", "Interim statements", "Minor subsidiaries", "Startups"]',
  '["Pimes no obligades", "Estats intermedis", "Filials menors", "Startups"]',
  'Revisión Limitada ISRE 2400', 'Limited Review ISRE 2400', 'Revisió Limitada ISRE 2400',
  'Revisión limitada de estados financieros conforme a ISRE 2400.',
  'Limited review of financial statements according to ISRE 2400.',
  'Revisió limitada d''estats financers conforme a ISRE 2400.',
  21, true
);
