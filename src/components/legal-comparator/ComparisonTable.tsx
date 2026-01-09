import { legalStructures, LegalStructure } from '@/lib/legalStructuresData';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonTableProps {
  selectedStructures: string[];
}

export function ComparisonTable({ selectedStructures }: ComparisonTableProps) {
  const structures = legalStructures.filter(s => selectedStructures.includes(s.id));
  
  if (structures.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Select at least one structure to view comparison
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const rows = [
    {
      label: 'Minimum Capital',
      getValue: (s: LegalStructure) => s.minCapital === 0 ? 'None required' : formatCurrency(s.minCapital),
      highlight: (s: LegalStructure) => s.minCapital <= 3000
    },
    {
      label: 'Liability',
      getValue: (s: LegalStructure) => s.liabilityDescription,
      highlight: (s: LegalStructure) => s.maxLiability === 'limited'
    },
    {
      label: 'Setup Timeline',
      getValue: (s: LegalStructure) => s.timeline,
      highlight: (s: LegalStructure) => s.timelineWeeks <= 3
    },
    {
      label: 'Setup Costs',
      getValue: (s: LegalStructure) => `${formatCurrency(s.setupCosts.min)} - ${formatCurrency(s.setupCosts.max)}`,
      highlight: (s: LegalStructure) => s.setupCosts.max <= 2000
    },
    {
      label: 'Annual Costs',
      getValue: (s: LegalStructure) => `${formatCurrency(s.annualCosts.min)} - ${formatCurrency(s.annualCosts.max)}`,
      highlight: (s: LegalStructure) => s.annualCosts.max <= 4000
    },
    {
      label: 'Tax Rate',
      getValue: (s: LegalStructure) => s.taxRate,
      highlight: () => false
    },
    {
      label: 'Governance',
      getValue: (s: LegalStructure) => s.governance,
      highlight: () => false
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
            {structures.map(s => (
              <th key={s.id} className="text-left py-4 px-4 font-medium">
                <div>
                  <span className="text-foreground">{s.shortName}</span>
                  <span className="block text-sm text-muted-foreground font-normal">{s.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border/50">
              <td className="py-4 px-4 text-muted-foreground">{row.label}</td>
              {structures.map(s => (
                <td 
                  key={s.id} 
                  className={cn(
                    "py-4 px-4",
                    row.highlight(s) && "text-primary font-medium"
                  )}
                >
                  {row.getValue(s)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b border-border/50">
            <td className="py-4 px-4 text-muted-foreground">Ideal For</td>
            {structures.map(s => (
              <td key={s.id} className="py-4 px-4">
                <ul className="space-y-1">
                  {s.idealFor.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
