import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Euro, Info } from "lucide-react";
import { CalculatorSetting } from "@/hooks/useCalculatorSettings";

interface CalculatorPreviewPanelProps {
  settings: CalculatorSetting[];
}

const ENTITY_LABELS: Record<string, string> = {
  sl: 'SL (Sociedad Limitada)',
  sa: 'SA (Sociedad Anónima)',
  branch: 'Branch Office',
  subsidiary: 'Subsidiary',
};

export function CalculatorPreviewPanel({ settings }: CalculatorPreviewPanelProps) {
  const [entityType, setEntityType] = useState<string>('sl');
  const [founderResidency, setFounderResidency] = useState<string>('eu');
  const [needLocalDirector, setNeedLocalDirector] = useState<string>('no');
  
  const results = useMemo(() => {
    const entitySettings = settings.filter(
      s => s.entity_type === entityType || s.entity_type === null || s.entity_type === 'global'
    );
    
    // Timeline
    const timelineTotal = entitySettings.find(
      s => s.category === 'timeline' && s.item_key === 'total' && (s.entity_type === entityType)
    );
    
    const nieTimeline = entitySettings.find(
      s => s.category === 'timeline' && s.item_key === 'nie' && (s.entity_type === null || s.entity_type === 'global')
    );
    
    const timelineSteps = entitySettings.filter(
      s => s.category === 'timeline' && s.item_key !== 'total' && s.item_key !== 'nie' && s.entity_type === entityType
    ).sort((a, b) => a.display_order - b.display_order);
    
    // Costs
    const entityCosts = entitySettings.filter(
      s => s.category === 'cost' && s.entity_type === entityType
    ).sort((a, b) => a.display_order - b.display_order);
    
    const globalCosts = entitySettings.filter(
      s => s.category === 'cost' && (s.entity_type === null || s.entity_type === 'global')
    ).sort((a, b) => a.display_order - b.display_order);
    
    // Calculate totals
    let minCost = 0;
    let maxCost = 0;
    
    entityCosts.forEach(c => {
      minCost += Number(c.min_value);
      maxCost += Number(c.max_value);
    });
    
    // Add global costs based on conditions
    globalCosts.forEach(c => {
      if (c.item_key === 'nie' && founderResidency === 'non-eu') {
        minCost += Number(c.min_value);
        maxCost += Number(c.max_value);
      } else if (c.item_key === 'local_director' && needLocalDirector === 'yes') {
        minCost += Number(c.min_value);
        maxCost += Number(c.max_value);
      } else if (c.item_key === 'name_reservation' || c.item_key === 'bank_account') {
        minCost += Number(c.min_value);
        maxCost += Number(c.max_value);
      }
    });
    
    return {
      timeline: {
        min: timelineTotal ? Number(timelineTotal.min_value) : 3,
        max: timelineTotal ? Number(timelineTotal.max_value) : 5,
        nieRequired: founderResidency === 'non-eu',
        nieMin: nieTimeline ? Number(nieTimeline.min_value) : 2,
        nieMax: nieTimeline ? Number(nieTimeline.max_value) : 4,
        steps: timelineSteps,
      },
      costs: {
        min: minCost,
        max: maxCost,
        entityCosts,
        globalCosts,
      },
    };
  }, [settings, entityType, founderResidency, needLocalDirector]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="w-5 h-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Selector */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Entity Type</Label>
            <Select value={entityType} onValueChange={setEntityType}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sl">SL</SelectItem>
                <SelectItem value="sa">SA</SelectItem>
                <SelectItem value="branch">Branch</SelectItem>
                <SelectItem value="subsidiary">Subsidiary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs">Residency</Label>
            <Select value={founderResidency} onValueChange={setFounderResidency}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eu">EU/EEA</SelectItem>
                <SelectItem value="non-eu">Non-EU</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs">Local Director</Label>
            <Select value={needLocalDirector} onValueChange={setNeedLocalDirector}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        {/* Timeline Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Timeline</span>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-primary">
              {results.timeline.min}–{results.timeline.max}
            </span>
            <span className="text-sm text-muted-foreground ml-1">weeks</span>
          </div>
          
          {results.timeline.nieRequired && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded p-2">
              <Info className="w-3 h-3 shrink-0 mt-0.5" />
              <span>
                NIE processing: +{results.timeline.nieMin}–{results.timeline.nieMax} weeks (can be done in advance)
              </span>
            </div>
          )}
          
          <div className="space-y-1">
            {results.timeline.steps.map((step) => (
              <div key={step.id} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{step.item_label}</span>
                <span>{step.min_value}–{step.max_value} wks</span>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Costs Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Estimated Costs</span>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-primary">
              €{results.costs.min.toLocaleString()}–€{results.costs.max.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-1">
            {results.costs.entityCosts.map((cost) => (
              <div key={cost.id} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{cost.item_label}</span>
                <span>€{Number(cost.min_value).toLocaleString()}–€{Number(cost.max_value).toLocaleString()}</span>
              </div>
            ))}
            
            {results.timeline.nieRequired && results.costs.globalCosts.find(c => c.item_key === 'nie') && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {results.costs.globalCosts.find(c => c.item_key === 'nie')?.item_label}
                </span>
                <span>
                  €{Number(results.costs.globalCosts.find(c => c.item_key === 'nie')?.min_value).toLocaleString()}–
                  €{Number(results.costs.globalCosts.find(c => c.item_key === 'nie')?.max_value).toLocaleString()}
                </span>
              </div>
            )}
            
            {needLocalDirector === 'yes' && results.costs.globalCosts.find(c => c.item_key === 'local_director') && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {results.costs.globalCosts.find(c => c.item_key === 'local_director')?.item_label}
                </span>
                <span>
                  €{Number(results.costs.globalCosts.find(c => c.item_key === 'local_director')?.min_value).toLocaleString()}–
                  €{Number(results.costs.globalCosts.find(c => c.item_key === 'local_director')?.max_value).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <Badge variant="secondary" className="text-xs">
            {ENTITY_LABELS[entityType]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
