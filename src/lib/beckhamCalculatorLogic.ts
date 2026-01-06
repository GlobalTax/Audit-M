// Beckham Law Calculator Logic - 2025 Rates

export interface BeckhamInputs {
  grossAnnualSalary: number;
  additionalIncome: number;
  autonomousCommunity: string;
}

export interface BeckhamResults {
  // Standard IRPF
  standardIRPF: number;
  standardEffectiveRate: number;
  standardNetSalary: number;
  
  // Beckham Law
  beckhamTax: number;
  beckhamEffectiveRate: number;
  beckhamNetSalary: number;
  
  // Savings
  annualSavings: number;
  savingsPercentage: number;
  sixYearSavings: number;
  
  // Breakdown
  irpfBreakdown: TaxBracketResult[];
  totalIncome: number;
  
  // Eligibility warnings
  exceedsThreshold: boolean;
  highIncomeWarning: boolean;
}

export interface TaxBracketResult {
  bracket: string;
  income: number;
  rate: number;
  tax: number;
}

// IRPF brackets 2025 (State + average regional rate ~11%)
const IRPF_BRACKETS = [
  { min: 0, max: 12450, stateRate: 0.095, regionalRate: 0.095 },
  { min: 12450, max: 20200, stateRate: 0.12, regionalRate: 0.12 },
  { min: 20200, max: 35200, stateRate: 0.15, regionalRate: 0.15 },
  { min: 35200, max: 60000, stateRate: 0.185, regionalRate: 0.185 },
  { min: 60000, max: 300000, stateRate: 0.225, regionalRate: 0.225 },
  { min: 300000, max: Infinity, stateRate: 0.245, regionalRate: 0.225 },
];

// Regional adjustments (simplified - actual varies by income bracket)
const REGIONAL_ADJUSTMENTS: Record<string, number> = {
  'madrid': -0.005, // Lower rates
  'catalonia': 0.01, // Slightly higher
  'andalucia': -0.005,
  'valencia': 0.005,
  'basque-country': -0.01, // Lower rates
  'navarra': -0.01,
  'default': 0,
};

// Beckham Law rates
const BECKHAM_RATE = 0.24; // 24% flat rate
const BECKHAM_HIGH_RATE = 0.47; // 47% for income above €600K
const BECKHAM_THRESHOLD = 600000;

function calculateProgressiveIRPF(income: number, region: string): { total: number; breakdown: TaxBracketResult[] } {
  const adjustment = REGIONAL_ADJUSTMENTS[region] || REGIONAL_ADJUSTMENTS['default'];
  let remainingIncome = income;
  let totalTax = 0;
  const breakdown: TaxBracketResult[] = [];
  
  for (const bracket of IRPF_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    const effectiveRate = bracket.stateRate + bracket.regionalRate + adjustment;
    const tax = taxableInBracket * effectiveRate;
    
    if (taxableInBracket > 0) {
      breakdown.push({
        bracket: `€${bracket.min.toLocaleString()} - €${bracket.max === Infinity ? '300K+' : bracket.max.toLocaleString()}`,
        income: taxableInBracket,
        rate: effectiveRate,
        tax: tax,
      });
    }
    
    totalTax += tax;
    remainingIncome -= taxableInBracket;
  }
  
  return { total: totalTax, breakdown };
}

function calculateBeckhamTax(income: number): number {
  if (income <= BECKHAM_THRESHOLD) {
    return income * BECKHAM_RATE;
  }
  
  const baseTax = BECKHAM_THRESHOLD * BECKHAM_RATE;
  const excessTax = (income - BECKHAM_THRESHOLD) * BECKHAM_HIGH_RATE;
  return baseTax + excessTax;
}

export function calculateBeckhamComparison(inputs: BeckhamInputs): BeckhamResults {
  const totalIncome = inputs.grossAnnualSalary + inputs.additionalIncome;
  
  // Calculate standard IRPF
  const irpfResult = calculateProgressiveIRPF(totalIncome, inputs.autonomousCommunity);
  const standardIRPF = irpfResult.total;
  const standardEffectiveRate = totalIncome > 0 ? (standardIRPF / totalIncome) * 100 : 0;
  const standardNetSalary = totalIncome - standardIRPF;
  
  // Calculate Beckham Law tax
  const beckhamTax = calculateBeckhamTax(totalIncome);
  const beckhamEffectiveRate = totalIncome > 0 ? (beckhamTax / totalIncome) * 100 : 0;
  const beckhamNetSalary = totalIncome - beckhamTax;
  
  // Calculate savings
  const annualSavings = standardIRPF - beckhamTax;
  const savingsPercentage = standardIRPF > 0 ? (annualSavings / standardIRPF) * 100 : 0;
  const sixYearSavings = annualSavings * 6; // Maximum duration of Beckham Law
  
  return {
    standardIRPF,
    standardEffectiveRate,
    standardNetSalary,
    beckhamTax,
    beckhamEffectiveRate,
    beckhamNetSalary,
    annualSavings,
    savingsPercentage,
    sixYearSavings,
    irpfBreakdown: irpfResult.breakdown,
    totalIncome,
    exceedsThreshold: totalIncome > BECKHAM_THRESHOLD,
    highIncomeWarning: totalIncome > 300000,
  };
}

export const AUTONOMOUS_COMMUNITIES = [
  { value: 'madrid', label: 'Madrid' },
  { value: 'catalonia', label: 'Catalonia' },
  { value: 'andalucia', label: 'Andalusia' },
  { value: 'valencia', label: 'Valencia' },
  { value: 'basque-country', label: 'Basque Country' },
  { value: 'navarra', label: 'Navarra' },
  { value: 'galicia', label: 'Galicia' },
  { value: 'castilla-leon', label: 'Castilla y León' },
  { value: 'canarias', label: 'Canary Islands' },
  { value: 'other', label: 'Other Region' },
];
