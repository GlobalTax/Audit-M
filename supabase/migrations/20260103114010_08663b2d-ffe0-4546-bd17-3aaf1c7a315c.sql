-- Update Company Setup in Spain service with full content
UPDATE public.services
SET 
  metodologia_en = '[
    {"title": "Initial Consultation", "description": "We assess your business objectives, recommend the optimal legal structure (SL, SA, or Branch), and provide a clear timeline and cost estimate."},
    {"title": "Document Preparation", "description": "We prepare all incorporation documents, obtain NIE numbers for directors and shareholders, and draft bilingual articles of association."},
    {"title": "Notary & Registration", "description": "We coordinate notary appointments, file with the Commercial Registry, and obtain your CIF tax identification number."},
    {"title": "Post-Incorporation Setup", "description": "We handle VAT and Corporate Tax registration, assist with bank account opening, and ensure full regulatory compliance from day one."}
  ]'::jsonb,
  servicios_transversales_en = '[
    {"title": "Tax Residency Planning", "description": "Optimize your tax position with strategic residency planning and access to Spain''s favorable tax regimes."},
    {"title": "Beckham Law Advisory", "description": "Qualify for the special expatriate tax regime with a flat 24% rate on Spanish-source income."},
    {"title": "Work Permit & Immigration", "description": "Comprehensive support for executive visas, work permits, and family relocation."},
    {"title": "Ongoing Compliance", "description": "Monthly accounting, annual filings, and regulatory reporting to keep your company fully compliant."}
  ]'::jsonb,
  stats_en = '[
    {"value": "500+", "label": "Companies Incorporated"},
    {"value": "2-4", "label": "Weeks Average Timeline"},
    {"value": "40+", "label": "Countries of Origin"},
    {"value": "98%", "label": "Client Satisfaction"}
  ]'::jsonb,
  typical_clients_en = ARRAY[
    'Foreign investors establishing Spanish operations',
    'Tech startups expanding into the European market',
    'Multinational corporations opening Spanish subsidiaries',
    'Entrepreneurs relocating to Spain',
    'Family offices seeking European investment vehicles',
    'E-commerce businesses requiring EU presence'
  ],
  features_en = ARRAY[
    'Legal entity selection advisory (SL, SA, Branch, Representative Office)',
    'NIE/NIF procurement for directors and shareholders',
    'Articles of Association drafting in English and Spanish',
    'Notary coordination and Commercial Registry filing',
    'Corporate bank account opening assistance',
    'VAT (IVA) and Corporate Tax (IS) registration',
    'Social Security employer registration',
    'Registered office and local director services',
    'Digital signature and electronic certificate setup'
  ],
  benefits_en = ARRAY[
    'Fast-track incorporation in 2-4 weeks',
    'Single point of contact throughout the process',
    'Bilingual documentation (English/Spanish)',
    'Fixed transparent fees with no hidden costs',
    'Full regulatory compliance from day one',
    'Dedicated post-incorporation support'
  ]
WHERE slug_en = 'company-setup-spain';