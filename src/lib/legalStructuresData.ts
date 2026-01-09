// Legal Structures Comparison Data for Spain

export interface LegalStructure {
  id: string;
  name: string;
  shortName: string;
  description: string;
  minCapital: number;
  maxLiability: 'limited' | 'unlimited' | 'mixed';
  liabilityDescription: string;
  governance: string;
  timeline: string;
  timelineWeeks: number;
  idealFor: string[];
  pros: string[];
  cons: string[];
  annualCosts: {
    min: number;
    max: number;
  };
  setupCosts: {
    min: number;
    max: number;
  };
  taxRate: string;
  requiredDocuments: string[];
}

export const legalStructures: LegalStructure[] = [
  {
    id: 'sl',
    name: 'Sociedad Limitada',
    shortName: 'SL',
    description: 'The most common structure for SMEs. Offers limited liability with flexible governance and lower capital requirements.',
    minCapital: 3000,
    maxLiability: 'limited',
    liabilityDescription: 'Limited to capital contribution',
    governance: 'Board of Directors or Sole Administrator',
    timeline: '2-4 weeks',
    timelineWeeks: 3,
    idealFor: ['SMEs', 'Startups', 'Family businesses', 'Professional services'],
    pros: [
      'Low minimum capital (€3,000)',
      'Simple governance structure',
      'Limited liability protection',
      'Flexible profit distribution',
      'Lower formation costs'
    ],
    cons: [
      'Share transfer restrictions',
      'Less credibility than SA for large operations',
      'Cannot issue bonds'
    ],
    annualCosts: {
      min: 1500,
      max: 4000
    },
    setupCosts: {
      min: 800,
      max: 2000
    },
    taxRate: '25% Corporate Tax (15% for first 2 years)',
    requiredDocuments: [
      'Certificate of unique company name',
      'Bank certificate of capital deposit',
      'Articles of incorporation',
      'NIE/NIF of all shareholders'
    ]
  },
  {
    id: 'sa',
    name: 'Sociedad Anónima',
    shortName: 'SA',
    description: 'Designed for larger companies with higher capital needs. Allows public share trading and is required for certain regulated activities.',
    minCapital: 60000,
    maxLiability: 'limited',
    liabilityDescription: 'Limited to capital contribution',
    governance: 'Board of Directors (min 3 members) or General Meeting',
    timeline: '4-6 weeks',
    timelineWeeks: 5,
    idealFor: ['Large corporations', 'Companies seeking investment', 'IPO candidates', 'Regulated industries'],
    pros: [
      'Enhanced credibility',
      'Freely transferable shares',
      'Can issue bonds',
      'Required for stock exchange listing',
      'Attractive for investors'
    ],
    cons: [
      'High minimum capital (€60,000)',
      'Complex governance requirements',
      'Higher formation and maintenance costs',
      'Annual audit required in many cases'
    ],
    annualCosts: {
      min: 5000,
      max: 15000
    },
    setupCosts: {
      min: 2500,
      max: 6000
    },
    taxRate: '25% Corporate Tax',
    requiredDocuments: [
      'Certificate of unique company name',
      'Bank certificate of capital deposit (min 25%)',
      'Articles of incorporation',
      'NIE/NIF of all shareholders',
      'Board appointment documentation'
    ]
  },
  {
    id: 'branch',
    name: 'Branch Office',
    shortName: 'Sucursal',
    description: 'An extension of the parent company without separate legal personality. Parent company maintains full liability.',
    minCapital: 0,
    maxLiability: 'unlimited',
    liabilityDescription: 'Parent company fully liable',
    governance: 'Managed by appointed representative',
    timeline: '3-5 weeks',
    timelineWeeks: 4,
    idealFor: ['Testing the Spanish market', 'Temporary operations', 'Sales offices', 'Companies wanting centralized control'],
    pros: [
      'No minimum capital required',
      'Simpler structure',
      'Direct extension of parent company',
      'Easier to close if needed',
      'Unified accounting possible'
    ],
    cons: [
      'Parent company fully liable',
      'Less credibility than subsidiary',
      'Tax efficiency limitations',
      'Requires extensive parent company documentation'
    ],
    annualCosts: {
      min: 2000,
      max: 5000
    },
    setupCosts: {
      min: 1500,
      max: 3500
    },
    taxRate: '25% on Spanish-sourced profits',
    requiredDocuments: [
      'Parent company incorporation documents (apostilled)',
      'Board resolution authorizing branch',
      'Power of attorney for representative',
      'Parent company financial statements'
    ]
  },
  {
    id: 'subsidiary',
    name: 'Subsidiary (SL/SA)',
    shortName: 'Filial',
    description: 'A separate legal entity wholly or partially owned by a parent company. Provides liability protection between parent and Spanish operations.',
    minCapital: 3000,
    maxLiability: 'limited',
    liabilityDescription: 'Limited to subsidiary capital - parent protected',
    governance: 'Independent Board or Administrator',
    timeline: '3-5 weeks',
    timelineWeeks: 4,
    idealFor: ['Long-term market entry', 'Risk isolation', 'Local partnerships', 'Tax planning'],
    pros: [
      'Full liability protection for parent',
      'Separate legal entity',
      'Local credibility',
      'Flexible ownership structure',
      'Access to local incentives'
    ],
    cons: [
      'More complex setup',
      'Transfer pricing considerations',
      'Separate accounting required',
      'Higher compliance burden'
    ],
    annualCosts: {
      min: 2000,
      max: 6000
    },
    setupCosts: {
      min: 1200,
      max: 3000
    },
    taxRate: '25% Corporate Tax (dividend withholding may apply)',
    requiredDocuments: [
      'Parent company incorporation documents',
      'Board resolution authorizing subsidiary',
      'NIE/NIF for corporate shareholder',
      'Articles of incorporation for subsidiary'
    ]
  }
];

export interface ComparisonQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    points: Record<string, number>;
  }[];
}

export const comparisonQuestions: ComparisonQuestion[] = [
  {
    id: 'size',
    question: 'What is the expected annual revenue of your Spanish operations?',
    options: [
      { label: 'Under €500,000', value: 'small', points: { sl: 3, sa: 0, branch: 2, subsidiary: 2 } },
      { label: '€500,000 - €2,000,000', value: 'medium', points: { sl: 2, sa: 1, branch: 1, subsidiary: 2 } },
      { label: 'Over €2,000,000', value: 'large', points: { sl: 1, sa: 3, branch: 1, subsidiary: 2 } }
    ]
  },
  {
    id: 'liability',
    question: 'How important is limiting liability for the parent company?',
    options: [
      { label: 'Critical - must protect parent assets', value: 'critical', points: { sl: 2, sa: 2, branch: 0, subsidiary: 3 } },
      { label: 'Important but not essential', value: 'moderate', points: { sl: 2, sa: 2, branch: 1, subsidiary: 2 } },
      { label: 'Not a major concern', value: 'low', points: { sl: 1, sa: 1, branch: 3, subsidiary: 1 } }
    ]
  },
  {
    id: 'duration',
    question: 'What is your planned duration of operations in Spain?',
    options: [
      { label: 'Testing the market (1-2 years)', value: 'short', points: { sl: 1, sa: 0, branch: 3, subsidiary: 1 } },
      { label: 'Medium-term (3-5 years)', value: 'medium', points: { sl: 2, sa: 1, branch: 1, subsidiary: 2 } },
      { label: 'Long-term / permanent', value: 'long', points: { sl: 2, sa: 2, branch: 0, subsidiary: 3 } }
    ]
  },
  {
    id: 'capital',
    question: 'What is your available initial capital for the Spanish entity?',
    options: [
      { label: 'Under €10,000', value: 'low', points: { sl: 3, sa: 0, branch: 3, subsidiary: 2 } },
      { label: '€10,000 - €60,000', value: 'medium', points: { sl: 3, sa: 1, branch: 2, subsidiary: 3 } },
      { label: 'Over €60,000', value: 'high', points: { sl: 2, sa: 3, branch: 2, subsidiary: 2 } }
    ]
  },
  {
    id: 'investors',
    question: 'Do you plan to bring in external investors or go public?',
    options: [
      { label: 'Yes, seeking investment', value: 'yes', points: { sl: 0, sa: 3, branch: 0, subsidiary: 1 } },
      { label: 'Possibly in the future', value: 'maybe', points: { sl: 1, sa: 2, branch: 0, subsidiary: 2 } },
      { label: 'No, will remain privately held', value: 'no', points: { sl: 3, sa: 1, branch: 2, subsidiary: 2 } }
    ]
  }
];

export function calculateRecommendation(answers: Record<string, string>): { 
  scores: Record<string, number>; 
  recommendation: string;
  secondChoice: string;
} {
  const scores: Record<string, number> = { sl: 0, sa: 0, branch: 0, subsidiary: 0 };
  
  comparisonQuestions.forEach(q => {
    const answer = answers[q.id];
    if (answer) {
      const option = q.options.find(o => o.value === answer);
      if (option) {
        Object.entries(option.points).forEach(([structure, points]) => {
          scores[structure] += points;
        });
      }
    }
  });
  
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  return {
    scores,
    recommendation: sorted[0][0],
    secondChoice: sorted[1][0]
  };
}
