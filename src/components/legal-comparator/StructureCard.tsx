import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Building2, Shield, Clock, Euro } from 'lucide-react';
import { LegalStructure } from '@/lib/legalStructuresData';
import { cn } from '@/lib/utils';

interface StructureCardProps {
  structure: LegalStructure;
  isSelected: boolean;
  isRecommended?: boolean;
  onToggle: () => void;
}

export function StructureCard({ structure, isSelected, isRecommended, onToggle }: StructureCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary border-primary",
        isRecommended && "ring-2 ring-accent border-accent"
      )}
      onClick={onToggle}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-normal flex items-center gap-2">
              {structure.shortName}
              {isRecommended && (
                <Badge className="bg-accent text-accent-foreground">Recommended</Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{structure.name}</p>
          </div>
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
          )}>
            {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{structure.description}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">Capital: </span>
              <span className="font-medium">
                {structure.minCapital === 0 ? 'None' : formatCurrency(structure.minCapital)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">Timeline: </span>
              <span className="font-medium">{structure.timeline}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">Liability: </span>
              <span className="font-medium capitalize">{structure.maxLiability}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">Setup: </span>
              <span className="font-medium">{formatCurrency(structure.setupCosts.min)}+</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Key advantages:</p>
          <ul className="space-y-1">
            {structure.pros.slice(0, 3).map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
