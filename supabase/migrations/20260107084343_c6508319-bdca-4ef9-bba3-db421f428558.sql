UPDATE services 
SET 
  name_en = 'M&A Transaction Advisory',
  slug_en = 'ma-transaction-advisory',
  description_en = 'Expert guidance through mergers, acquisitions, and corporate transactions in Spain. We advise both buyers and sellers on valuation, due diligence, deal structuring, and integration strategies—with particular expertise supporting international acquirers entering the Spanish market.',
  features = ARRAY[
    'Buy-side and sell-side M&A advisory',
    'Comprehensive legal, tax, and labour due diligence',
    'Valuation and fairness opinion support',
    'Transaction structuring and negotiation',
    'SPA drafting and closing coordination',
    'Post-merger integration planning',
    'Cross-border transaction expertise'
  ],
  benefits = 'M&A transactions in Spain require deep understanding of local regulations, market dynamics, and cultural considerations. Our multidisciplinary team—combining legal, tax, and corporate advisory expertise—ensures smooth execution from initial assessment through post-closing integration. We have successfully advised on €500M+ in transaction volume across 12 industry sectors.',
  typical_clients = ARRAY[
    'Private equity firms investing in Spain',
    'Strategic corporates acquiring Spanish businesses',
    'Family offices seeking operating company acquisitions',
    'International groups consolidating Iberian operations',
    'Spanish companies seeking exit or sale advisory'
  ],
  meta_title = 'M&A Transaction Advisory in Spain | NRRO',
  meta_description = 'Full-service M&A advisory for buyers and sellers in Spain. Due diligence, valuation, negotiation, and transaction structuring for cross-border deals.',
  updated_at = now()
WHERE slug_en = 'buying-and-selling-companies' OR name_en = 'Buying and Selling Companies';