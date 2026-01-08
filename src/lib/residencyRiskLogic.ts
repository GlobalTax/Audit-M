// Spain Tax Residency Risk Assessment Logic

export interface ResidencyInputs {
  daysInSpain: number;
  primaryIncomeLocation: 'spain' | 'abroad' | 'mixed';
  permanentHomeSpain: 'yes' | 'no' | 'rented';
  spouseLocation: 'spain' | 'abroad' | 'na';
  childrenLocation: 'spain' | 'abroad' | 'na';
  employerLocation: 'spain' | 'abroad';
  primaryBankAccounts: 'yes' | 'no';
  registeredPadron: 'yes' | 'no';
  spanishSocialSecurity: 'yes' | 'no';
  // New questions
  investmentPropertySpain: 'yes' | 'no';
  spanishWorkContract: 'yes' | 'no';
  previousTaxDeclarations: 'yes' | 'no';
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export interface ResidencyRiskResults {
  score: number;
  riskLevel: RiskLevel;
  keyFindings: string[];
  recommendations: string[];
  daysRemaining: number;
  automaticResident: boolean;
  criteriaTriggered: {
    days183: boolean;
    economicCenter: boolean;
    vitalInterests: boolean;
  };
  // Enhanced results
  riskBreakdown: {
    daysScore: number;
    economicScore: number;
    vitalScore: number;
  };
}

interface ScoringFactor {
  condition: boolean;
  points: number;
  finding: string;
  category: 'days' | 'economic' | 'vital';
}

export function assessResidencyRisk(inputs: ResidencyInputs): ResidencyRiskResults {
  const factors: ScoringFactor[] = [];
  
  // Days in Spain (most critical factor)
  if (inputs.daysInSpain > 183) {
    factors.push({
      condition: true,
      points: 50, // Automatic residency trigger
      finding: `You have spent ${inputs.daysInSpain} days in Spain (exceeds 183-day threshold)`,
      category: 'days',
    });
  } else if (inputs.daysInSpain > 150) {
    factors.push({
      condition: true,
      points: 25,
      finding: `You are approaching the 183-day limit (${inputs.daysInSpain} days spent)`,
      category: 'days',
    });
  } else if (inputs.daysInSpain > 120) {
    factors.push({
      condition: true,
      points: 15,
      finding: `Moderate presence in Spain (${inputs.daysInSpain} days)`,
      category: 'days',
    });
  }
  
  // Primary income source
  if (inputs.primaryIncomeLocation === 'spain') {
    factors.push({
      condition: true,
      points: 30,
      finding: 'Your primary income source is located in Spain',
      category: 'economic',
    });
  } else if (inputs.primaryIncomeLocation === 'mixed') {
    factors.push({
      condition: true,
      points: 15,
      finding: 'You have mixed income sources between Spain and abroad',
      category: 'economic',
    });
  }
  
  // Permanent home in Spain
  if (inputs.permanentHomeSpain === 'yes') {
    factors.push({
      condition: true,
      points: 20,
      finding: 'You own a permanent home in Spain',
      category: 'vital',
    });
  } else if (inputs.permanentHomeSpain === 'rented') {
    factors.push({
      condition: true,
      points: 10,
      finding: 'You have a long-term rental in Spain',
      category: 'vital',
    });
  }
  
  // Spouse/partner location
  if (inputs.spouseLocation === 'spain') {
    factors.push({
      condition: true,
      points: 25,
      finding: 'Your spouse or partner resides in Spain (vital interests indicator)',
      category: 'vital',
    });
  }
  
  // Children location
  if (inputs.childrenLocation === 'spain') {
    factors.push({
      condition: true,
      points: 25,
      finding: 'Your dependent children reside in Spain (vital interests indicator)',
      category: 'vital',
    });
  }
  
  // Employer location
  if (inputs.employerLocation === 'spain') {
    factors.push({
      condition: true,
      points: 15,
      finding: 'Your employer is registered in Spain',
      category: 'economic',
    });
  }
  
  // Primary bank accounts
  if (inputs.primaryBankAccounts === 'yes') {
    factors.push({
      condition: true,
      points: 10,
      finding: 'Your primary bank accounts are in Spain',
      category: 'economic',
    });
  }
  
  // Padrón registration
  if (inputs.registeredPadron === 'yes') {
    factors.push({
      condition: true,
      points: 15,
      finding: 'You are registered in the municipal census (Padrón)',
      category: 'vital',
    });
  }
  
  // Social security contributions
  if (inputs.spanishSocialSecurity === 'yes') {
    factors.push({
      condition: true,
      points: 10,
      finding: 'You contribute to Spanish Social Security',
      category: 'economic',
    });
  }
  
  // NEW: Investment property in Spain
  if (inputs.investmentPropertySpain === 'yes') {
    factors.push({
      condition: true,
      points: 15,
      finding: 'You own investment property (rental) in Spain',
      category: 'economic',
    });
  }
  
  // NEW: Spanish work contract
  if (inputs.spanishWorkContract === 'yes') {
    factors.push({
      condition: true,
      points: 20,
      finding: 'You have a signed work contract in Spain',
      category: 'economic',
    });
  }
  
  // NEW: Previous tax declarations
  if (inputs.previousTaxDeclarations === 'yes') {
    factors.push({
      condition: true,
      points: 25,
      finding: 'You have filed tax declarations in Spain previously',
      category: 'economic',
    });
  }
  
  // Calculate scores by category
  const daysScore = factors.filter(f => f.category === 'days').reduce((sum, f) => sum + f.points, 0);
  const economicScore = factors.filter(f => f.category === 'economic').reduce((sum, f) => sum + f.points, 0);
  const vitalScore = factors.filter(f => f.category === 'vital').reduce((sum, f) => sum + f.points, 0);
  
  // Calculate total score
  const score = Math.min(100, factors.reduce((sum, f) => sum + f.points, 0));
  
  // Determine risk level
  let riskLevel: RiskLevel;
  if (score >= 76 || inputs.daysInSpain > 183) {
    riskLevel = 'VERY_HIGH';
  } else if (score >= 51) {
    riskLevel = 'HIGH';
  } else if (score >= 26) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'LOW';
  }
  
  // Check criteria triggers
  const criteriaTriggered = {
    days183: inputs.daysInSpain > 183,
    economicCenter: economicScore >= 30,
    vitalInterests: vitalScore >= 40,
  };
  
  // Generate recommendations
  const recommendations = generateRecommendations(riskLevel, criteriaTriggered, inputs);
  
  // Calculate days remaining before 183 threshold
  const daysRemaining = Math.max(0, 183 - inputs.daysInSpain);
  
  return {
    score,
    riskLevel,
    keyFindings: factors.map(f => f.finding),
    recommendations,
    daysRemaining,
    automaticResident: inputs.daysInSpain > 183,
    criteriaTriggered,
    riskBreakdown: {
      daysScore,
      economicScore,
      vitalScore,
    },
  };
}

function generateRecommendations(
  riskLevel: RiskLevel, 
  criteria: ResidencyRiskResults['criteriaTriggered'],
  inputs: ResidencyInputs
): string[] {
  const recommendations: string[] = [];
  
  switch (riskLevel) {
    case 'LOW':
      recommendations.push('Document your non-resident status with supporting evidence');
      recommendations.push('Keep records of time spent outside Spain');
      recommendations.push('Consider obtaining a tax residency certificate from your home country');
      break;
      
    case 'MEDIUM':
      recommendations.push('Review your situation with a tax professional before year-end');
      recommendations.push('Track your days in Spain carefully to avoid exceeding 183 days');
      if (criteria.economicCenter) {
        recommendations.push('Consider restructuring your income sources');
      }
      recommendations.push('Prepare documentation to support your non-resident position');
      break;
      
    case 'HIGH':
      recommendations.push('Seek immediate professional tax advice');
      recommendations.push('Prepare for potential Spanish tax obligations');
      if (inputs.daysInSpain > 150) {
        recommendations.push(`Limit remaining time in Spain (${183 - inputs.daysInSpain} days left before threshold)`);
      }
      recommendations.push('Evaluate eligibility for the Beckham Law if you qualify');
      break;
      
    case 'VERY_HIGH':
      recommendations.push('You should plan for Spanish tax residency obligations');
      recommendations.push('Assess eligibility for the Beckham Law (special expat tax regime)');
      recommendations.push('Contact a tax advisor to review your worldwide income obligations');
      recommendations.push('Register with Spanish tax authorities if not already done');
      break;
  }
  
  return recommendations;
}

export const RISK_LEVEL_CONFIG: Record<RiskLevel, { color: string; bgColor: string; label: string; description: string }> = {
  LOW: {
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    label: 'Low Risk',
    description: 'Based on your answers, you likely do NOT qualify as a Spanish tax resident.',
  },
  MEDIUM: {
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    label: 'Medium Risk',
    description: 'Your situation presents some indicators that may trigger residency concerns.',
  },
  HIGH: {
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    label: 'High Risk',
    description: 'Multiple factors indicate you may be considered a Spanish tax resident.',
  },
  VERY_HIGH: {
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    label: 'Very High Risk',
    description: 'Strong evidence suggests you will be treated as a Spanish tax resident.',
  },
};
