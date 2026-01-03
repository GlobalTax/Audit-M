-- Update Company Setup in Spain service with proper metodologia_en format
UPDATE public.services
SET metodologia_en = '{
  "overline": "HOW WE WORK",
  "titulos": ["Your Partner for", "Business Setup in Spain"],
  "introduccion": "We provide end-to-end company incorporation services for foreign investors, ensuring a smooth entry into the Spanish market. Our approach combines legal expertise, tax optimization, and local market knowledge to establish your business efficiently.",
  "pilares": [
    {
      "numero": 1,
      "titulo": "Initial Consultation & Entity Selection",
      "puntos": [
        "We assess your business objectives and recommend the optimal legal structure (SL, SA, Branch, or Representative Office).",
        "We provide a clear timeline, cost estimate, and explain the regulatory requirements specific to your industry."
      ]
    },
    {
      "numero": 2,
      "titulo": "Document Preparation & NIE Procurement",
      "puntos": [
        "We prepare all incorporation documents and draft bilingual articles of association.",
        "We obtain NIE numbers for all directors and shareholders, coordinating with Spanish authorities."
      ]
    },
    {
      "numero": 3,
      "titulo": "Notary Coordination & Registration",
      "puntos": [
        "We schedule notary appointments and manage the entire signing process.",
        "We file with the Commercial Registry and obtain your CIF tax identification number."
      ]
    },
    {
      "numero": 4,
      "titulo": "Post-Incorporation Setup",
      "puntos": [
        "We register your company for VAT (IVA) and Corporate Tax (IS).",
        "We assist with bank account opening and ensure Social Security employer registration."
      ]
    }
  ],
  "contacto": {
    "telefono": "934593600",
    "email": "info@nrro.es"
  }
}'::jsonb,
servicios_transversales_en = '[
  {
    "titulo": "Tax Residency & Beckham Law",
    "contenido": "Optimize your tax position with strategic residency planning and access to Spain''s favorable Beckham Law regime. This special expatriate tax regime offers a flat 24% rate on Spanish-source income for qualifying executives and entrepreneurs relocating to Spain."
  },
  {
    "titulo": "Work Permits & Immigration",
    "contenido": "Comprehensive support for executive visas, work permits, and family relocation. We handle the entire immigration process, from initial application through to approval, ensuring compliance with Spanish immigration law."
  },
  {
    "titulo": "Ongoing Accounting & Compliance",
    "contenido": "Monthly bookkeeping, quarterly VAT filings, annual corporate tax returns, and statutory audit coordination. We ensure your company remains fully compliant with Spanish regulatory requirements."
  },
  {
    "titulo": "Corporate Governance Advisory",
    "contenido": "Board meeting coordination, shareholders'' agreements, and corporate secretarial services. We help establish proper governance frameworks for your Spanish entity."
  },
  {
    "titulo": "Payroll & HR Services",
    "contenido": "Full payroll processing, employment contract drafting, and labor law compliance. We manage your workforce administration so you can focus on growing your business."
  }
]'::jsonb
WHERE slug_en = 'company-setup-spain';