-- Desactivar servicios domésticos (no deben aparecer en global.nrro.es)
UPDATE services SET is_active = false WHERE slug_en IN (
  'family-business',
  'inheritance-succession',
  'accounting-and-labor-consulting',
  'tax-procedure',
  'partner-conflict',
  'civil-procedure'
);

-- Reordenar display_order para servicios internacionales
UPDATE services SET display_order = 1 WHERE slug_en = 'company-setup-spain';
UPDATE services SET display_order = 2 WHERE slug_en = 'international-tax-management';
UPDATE services SET display_order = 3 WHERE slug_en = 'international-payroll-management';
UPDATE services SET display_order = 4 WHERE slug_en = 'international-accounting-management';
UPDATE services SET display_order = 5 WHERE slug_en = 'tax-advice';
UPDATE services SET display_order = 6 WHERE slug_en = 'ma-transaction-advisory';
UPDATE services SET display_order = 7 WHERE slug_en = 'commercial-and-corporate-law';
UPDATE services SET display_order = 8 WHERE slug_en = 'private-equity-venture-capital';
UPDATE services SET display_order = 9 WHERE slug_en = 'corporate-legal-services';
UPDATE services SET display_order = 10 WHERE slug_en = 'local-presence-governance-support';
UPDATE services SET display_order = 11 WHERE slug_en = 'transfer-pricing';
UPDATE services SET display_order = 12 WHERE slug_en = 'treasury-management';
UPDATE services SET display_order = 13 WHERE slug_en = 'business-valuation';