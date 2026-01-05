// Spain Setup Calculator Logic

export interface CalculatorInputs {
  companyType: 'sl' | 'sa' | 'branch' | 'subsidiary';
  founderResidency: 'eu' | 'non-eu';
  plannedEmployees: '0' | '1-5' | '6-10' | '11-50' | '50+';
  needLocalDirector: 'yes' | 'no' | 'not-sure';
}

export interface TimelineBreakdown {
  step: string;
  minWeeks: number;
  maxWeeks: number;
}

export interface CostBreakdown {
  item: string;
  minCost: number;
  maxCost: number;
  notes?: string;
}

export interface CalculatorResults {
  timeline: {
    minWeeks: number;
    maxWeeks: number;
    breakdown: TimelineBreakdown[];
    nieRequired?: boolean;
  };
  costs: {
    minTotal: number;
    maxTotal: number;
    breakdown: CostBreakdown[];
  };
}

export function calculateTimeline(inputs: CalculatorInputs): CalculatorResults['timeline'] {
  const breakdown: TimelineBreakdown[] = [];
  let nieRequired = inputs.founderResidency === 'non-eu';

  // Realistic timelines based on NRRO's actual service
  // Steps run in parallel, not sequentially
  switch (inputs.companyType) {
    case 'sl':
      breakdown.push({ step: 'Preparation (name reservation + bank account)', minWeeks: 1, maxWeeks: 1 });
      breakdown.push({ step: 'Formalization (notary + capital deposit)', minWeeks: 1, maxWeeks: 2 });
      breakdown.push({ step: 'Commercial Registry registration', minWeeks: 1, maxWeeks: 2 });
      break;
    case 'sa':
      breakdown.push({ step: 'Preparation (name reservation + bank account)', minWeeks: 1, maxWeeks: 1 });
      breakdown.push({ step: 'Formalization (notary + capital verification)', minWeeks: 1, maxWeeks: 2 });
      breakdown.push({ step: 'Commercial Registry registration', minWeeks: 2, maxWeeks: 3 });
      break;
    case 'branch':
      breakdown.push({ step: 'Documentation preparation & legalization', minWeeks: 1, maxWeeks: 2 });
      breakdown.push({ step: 'Formalization (notary)', minWeeks: 1, maxWeeks: 1 });
      breakdown.push({ step: 'Commercial Registry registration', minWeeks: 2, maxWeeks: 3 });
      break;
    case 'subsidiary':
      breakdown.push({ step: 'Preparation (resolutions + name + bank)', minWeeks: 1, maxWeeks: 1 });
      breakdown.push({ step: 'Formalization (notary + capital deposit)', minWeeks: 1, maxWeeks: 2 });
      breakdown.push({ step: 'Commercial Registry registration', minWeeks: 1, maxWeeks: 2 });
      break;
  }

  // Final step: tax registrations (runs in parallel with registry)
  breakdown.push({ step: 'Tax registrations (NIF, VAT, IAE)', minWeeks: 0, maxWeeks: 1 });

  // Calculate totals (steps are parallel, so we don't simply sum)
  // Base is 3-5 weeks for SL/Subsidiary, 4-6 for SA/Branch
  let minWeeks: number;
  let maxWeeks: number;

  switch (inputs.companyType) {
    case 'sl':
    case 'subsidiary':
      minWeeks = 3;
      maxWeeks = 5;
      break;
    case 'sa':
    case 'branch':
      minWeeks = 4;
      maxWeeks = 6;
      break;
  }

  return { minWeeks, maxWeeks, breakdown, nieRequired };
}

export function calculateCosts(inputs: CalculatorInputs): CalculatorResults['costs'] {
  const breakdown: CostBreakdown[] = [];

  // NIE costs for non-EU
  if (inputs.founderResidency === 'non-eu') {
    breakdown.push({
      item: 'NIE application & processing',
      minCost: 150,
      maxCost: 400,
      notes: 'Per founder/director'
    });
  }

  // Notary fees vary by company type
  switch (inputs.companyType) {
    case 'sl':
      breakdown.push({
        item: 'Notary fees',
        minCost: 400,
        maxCost: 800,
        notes: 'Standard SL incorporation'
      });
      breakdown.push({
        item: 'Commercial Registry fees',
        minCost: 150,
        maxCost: 300,
      });
      break;
    case 'sa':
      breakdown.push({
        item: 'Notary fees',
        minCost: 800,
        maxCost: 1500,
        notes: 'Higher due to complexity'
      });
      breakdown.push({
        item: 'Commercial Registry fees',
        minCost: 200,
        maxCost: 400,
      });
      break;
    case 'branch':
      breakdown.push({
        item: 'Notary fees',
        minCost: 500,
        maxCost: 1000,
      });
      breakdown.push({
        item: 'Document apostille & translation',
        minCost: 500,
        maxCost: 1500,
        notes: 'Depends on document volume'
      });
      breakdown.push({
        item: 'Commercial Registry fees',
        minCost: 150,
        maxCost: 300,
      });
      break;
    case 'subsidiary':
      breakdown.push({
        item: 'Notary fees',
        minCost: 500,
        maxCost: 1000,
      });
      breakdown.push({
        item: 'Commercial Registry fees',
        minCost: 150,
        maxCost: 300,
      });
      break;
  }

  // Name reservation
  breakdown.push({
    item: 'Name reservation certificate',
    minCost: 15,
    maxCost: 30,
  });

  // Tax registrations
  breakdown.push({
    item: 'Tax Agency registrations',
    minCost: 0,
    maxCost: 0,
    notes: 'No government fee'
  });

  // Legal & advisory fees
  switch (inputs.companyType) {
    case 'sl':
      breakdown.push({
        item: 'Legal & advisory fees',
        minCost: 1500,
        maxCost: 3000,
        notes: 'Professional incorporation service'
      });
      break;
    case 'sa':
      breakdown.push({
        item: 'Legal & advisory fees',
        minCost: 3000,
        maxCost: 6000,
        notes: 'Complex structure requires more work'
      });
      break;
    case 'branch':
      breakdown.push({
        item: 'Legal & advisory fees',
        minCost: 2500,
        maxCost: 5000,
        notes: 'Including parent company coordination'
      });
      break;
    case 'subsidiary':
      breakdown.push({
        item: 'Legal & advisory fees',
        minCost: 2000,
        maxCost: 4000,
      });
      break;
  }

  // Local director service
  if (inputs.needLocalDirector === 'yes') {
    breakdown.push({
      item: 'Local director service (annual)',
      minCost: 3000,
      maxCost: 6000,
      notes: 'Nominee director arrangement'
    });
  }

  // Social Security registration
  if (inputs.plannedEmployees !== '0') {
    breakdown.push({
      item: 'Social Security employer registration',
      minCost: 0,
      maxCost: 0,
      notes: 'No government fee'
    });
  }

  // Calculate totals
  const minTotal = breakdown.reduce((sum, item) => sum + item.minCost, 0);
  const maxTotal = breakdown.reduce((sum, item) => sum + item.maxCost, 0);

  return { minTotal, maxTotal, breakdown };
}

export function calculateAll(inputs: CalculatorInputs): CalculatorResults {
  return {
    timeline: calculateTimeline(inputs),
    costs: calculateCosts(inputs),
  };
}

// Helper to format company type labels
export function getCompanyTypeLabel(type: CalculatorInputs['companyType']): string {
  const labels: Record<CalculatorInputs['companyType'], string> = {
    'sl': 'Sociedad Limitada (SL)',
    'sa': 'Sociedad Anónima (SA)',
    'branch': 'Branch Office',
    'subsidiary': 'Subsidiary Company',
  };
  return labels[type];
}

// Helper to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
