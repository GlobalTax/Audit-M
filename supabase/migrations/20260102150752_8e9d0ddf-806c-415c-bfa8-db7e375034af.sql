-- Insert 7 International Services for the int.nrro.es site
-- Using name_es as the base field (required), with English content in _en fields

INSERT INTO services (
  name_es, name_en, slug_es, slug_en, area_es, area_en,
  description_es, description_en, 
  features, features_es, features_en,
  typical_clients, typical_clients_es, typical_clients_en,
  meta_title_en, meta_description_en,
  icon_name, is_active, display_order
)
VALUES 
-- 1. International Accounting Management
(
  'International Accounting Management',
  'International Accounting Management',
  'international-accounting-management',
  'international-accounting-management',
  'Accounting',
  'Accounting',
  'Consolidation, reporting, and compliance with international accounting standards for multinational operations.',
  'Consolidation, reporting, and compliance with international accounting standards for multinational operations.',
  ARRAY['Multi-jurisdictional consolidation', 'IFRS compliance', 'Real-time reporting', 'Audit support'],
  ARRAY['Multi-jurisdictional financial consolidation', 'IFRS and local GAAP compliance', 'Real-time reporting dashboards', 'Audit preparation and support'],
  ARRAY['Multi-jurisdictional financial consolidation', 'IFRS and local GAAP compliance', 'Real-time reporting dashboards', 'Audit preparation and support'],
  ARRAY['Multinational companies', 'Foreign investors', 'Corporate groups'],
  ARRAY['Multinational companies', 'Foreign investors', 'Corporate groups'],
  ARRAY['Multinational companies', 'Foreign investors', 'Corporate groups'],
  'International Accounting Management | NRRO',
  'Expert international accounting services including consolidation, IFRS compliance, and multi-jurisdictional reporting for multinational companies.',
  'Calculator',
  true,
  101
),

-- 2. International Tax Management
(
  'International Tax Management',
  'International Tax Management',
  'international-tax-management',
  'international-tax-management',
  'Tax',
  'Tax',
  'Strategic tax planning and compliance to optimize your global tax position while minimizing risk.',
  'Strategic tax planning and compliance to optimize your global tax position while minimizing risk.',
  ARRAY['DTA optimization', 'Tax structuring', 'Transfer pricing', 'Tax due diligence'],
  ARRAY['Double taxation agreement optimization', 'International tax structuring', 'Transfer pricing documentation', 'Tax due diligence for cross-border transactions'],
  ARRAY['Double taxation agreement optimization', 'International tax structuring', 'Transfer pricing documentation', 'Tax due diligence for cross-border transactions'],
  ARRAY['Multinational companies', 'Foreign investors', 'International executives'],
  ARRAY['Multinational companies', 'Foreign investors', 'International executives'],
  ARRAY['Multinational companies', 'Foreign investors', 'International executives'],
  'International Tax Management | NRRO',
  'Strategic international tax planning and compliance services for multinational companies. Optimize your global tax position with expert advisory.',
  'FileText',
  true,
  102
),

-- 3. International Payroll Management
(
  'International Payroll Management',
  'International Payroll Management',
  'international-payroll-management',
  'international-payroll-management',
  'Labour',
  'Labour',
  'Efficient payroll processing aligned with local labour legislation across multiple jurisdictions.',
  'Efficient payroll processing aligned with local labour legislation across multiple jurisdictions.',
  ARRAY['Multi-country payroll', 'Social security compliance', 'Expat payroll', 'Cost optimization'],
  ARRAY['Multi-country payroll administration', 'Social security and benefits compliance', 'Expatriate payroll management', 'Labour cost optimization'],
  ARRAY['Multi-country payroll administration', 'Social security and benefits compliance', 'Expatriate payroll management', 'Labour cost optimization'],
  ARRAY['Multinational companies', 'Global mobility teams', 'HR departments'],
  ARRAY['Multinational companies', 'Global mobility teams', 'HR departments'],
  ARRAY['Multinational companies', 'Global mobility teams', 'HR departments'],
  'International Payroll Management | NRRO',
  'Professional international payroll services for multinational companies. Multi-country payroll administration with full labour law compliance.',
  'Users',
  true,
  103
),

-- 4. Corporate Legal Services
(
  'Corporate Legal Services',
  'Corporate Legal Services',
  'corporate-legal-services',
  'corporate-legal-services',
  'Legal',
  'Legal',
  'Entity formation, legal advisory, and ongoing compliance support for international companies.',
  'Entity formation, legal advisory, and ongoing compliance support for international companies.',
  ARRAY['Company incorporation', 'Governance advisory', 'Contract drafting', 'Compliance monitoring'],
  ARRAY['Company incorporation and structuring', 'Corporate governance advisory', 'Commercial contract drafting and review', 'Regulatory compliance monitoring'],
  ARRAY['Company incorporation and structuring', 'Corporate governance advisory', 'Commercial contract drafting and review', 'Regulatory compliance monitoring'],
  ARRAY['Foreign companies', 'Startups', 'Corporate groups'],
  ARRAY['Foreign companies entering Spain', 'International startups', 'Corporate groups'],
  ARRAY['Foreign companies entering Spain', 'International startups', 'Corporate groups'],
  'Corporate Legal Services | NRRO',
  'Comprehensive corporate legal services for international companies. Entity formation, governance advisory, and compliance support in Spain.',
  'Scale',
  true,
  104
),

-- 5. Treasury Management
(
  'Treasury Management',
  'Treasury Management',
  'treasury-management',
  'treasury-management',
  'Finance',
  'Finance',
  'Monitoring and managing international cash flows to optimize liquidity and minimize financial risk.',
  'Monitoring and managing international cash flows to optimize liquidity and minimize financial risk.',
  ARRAY['Cash flow optimization', 'FX management', 'Intercompany funding', 'Working capital'],
  ARRAY['Cross-border cash flow optimization', 'FX risk management', 'Intercompany funding structures', 'Working capital advisory'],
  ARRAY['Cross-border cash flow optimization', 'FX risk management', 'Intercompany funding structures', 'Working capital advisory'],
  ARRAY['CFOs', 'Treasury teams', 'Corporate groups'],
  ARRAY['CFOs of multinational companies', 'Treasury teams', 'Corporate groups'],
  ARRAY['CFOs of multinational companies', 'Treasury teams', 'Corporate groups'],
  'Treasury Management | NRRO',
  'Expert treasury management services for multinational operations. Optimize cash flows, manage FX risk, and structure intercompany funding.',
  'Wallet',
  true,
  105
),

-- 6. Transfer Pricing
(
  'Transfer Pricing',
  'Transfer Pricing',
  'transfer-pricing',
  'transfer-pricing',
  'Tax',
  'Tax',
  'Ensuring compliance with intercompany transaction regulations across all jurisdictions.',
  'Ensuring compliance with intercompany transaction regulations across all jurisdictions.',
  ARRAY['Policy development', 'Benchmarking studies', 'APAs', 'Dispute resolution'],
  ARRAY['Transfer pricing policy development', 'Documentation and benchmarking studies', 'Advance pricing agreements (APAs)', 'Tax authority dispute resolution'],
  ARRAY['Transfer pricing policy development', 'Documentation and benchmarking studies', 'Advance pricing agreements (APAs)', 'Tax authority dispute resolution'],
  ARRAY['Corporate groups', 'Multinational companies', 'Tax directors'],
  ARRAY['Corporate groups with intercompany transactions', 'Multinational companies', 'Tax directors'],
  ARRAY['Corporate groups with intercompany transactions', 'Multinational companies', 'Tax directors'],
  'Transfer Pricing Services | NRRO',
  'Professional transfer pricing services for multinational groups. Policy development, documentation, APAs, and dispute resolution.',
  'ArrowRightLeft',
  true,
  106
),

-- 7. Local Presence & Governance Support
(
  'Local Presence & Governance Support',
  'Local Presence & Governance Support',
  'local-presence-governance-support',
  'local-presence-governance-support',
  'Corporate',
  'Corporate',
  'International domiciliation and provision of local directors for compliant market presence.',
  'International domiciliation and provision of local directors for compliant market presence.',
  ARRAY['Registered office', 'Local directors', 'Corporate secretary', 'Board support'],
  ARRAY['Registered office services', 'Nominee and local director services', 'Corporate secretary services', 'Board meeting and AGM support'],
  ARRAY['Registered office services', 'Nominee and local director services', 'Corporate secretary services', 'Board meeting and AGM support'],
  ARRAY['Foreign companies', 'Holding structures', 'Investment funds'],
  ARRAY['Foreign companies establishing presence', 'Holding structures', 'Investment funds'],
  ARRAY['Foreign companies establishing presence', 'Holding structures', 'Investment funds'],
  'Local Presence & Governance Support | NRRO',
  'Establish compliant local presence in Spain with registered office, nominee directors, and corporate governance support services.',
  'Building2',
  true,
  107
);