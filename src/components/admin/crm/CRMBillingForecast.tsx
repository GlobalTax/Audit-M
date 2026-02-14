import { useCRMContracts } from '@/hooks/useCRMContracts';
import { useCRMClients } from '@/hooks/useCRMClients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, Kanban, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/lib/crm';

const FREQUENCY_MULTIPLIER: Record<string, number> = {
  mensual: 12,
  bimestral: 6,
  trimestral: 4,
  semestral: 2,
  anual: 1,
};

const PIPELINE_WEIGHTS: Record<string, number> = {
  propuesta: 0.3,
  negociacion: 0.6,
};

export function CRMBillingForecast() {
  const { data: contracts } = useCRMContracts();
  const { data: clients } = useCRMClients();
  const nextYear = new Date().getFullYear() + 1;

  // Active contracts → annualized revenue
  const activeContracts = contracts?.filter((c) => c.status === 'activo') ?? [];
  const renewalContracts = contracts?.filter((c) => c.status === 'renovacion_pendiente') ?? [];

  const activeRevenue = activeContracts.reduce((sum, c) => {
    const mult = FREQUENCY_MULTIPLIER[c.billing_frequency || 'anual'] || 1;
    return sum + (c.amount || 0) * mult;
  }, 0);

  const renewalRevenue = renewalContracts.reduce((sum, c) => {
    const mult = FREQUENCY_MULTIPLIER[c.billing_frequency || 'anual'] || 1;
    return sum + (c.amount || 0) * mult * 0.7;
  }, 0);

  // Pipeline weighted
  const pipelineClients = clients?.filter(
    (c) => c.pipeline_stage === 'propuesta' || c.pipeline_stage === 'negociacion'
  ) ?? [];

  const pipelineRevenue = pipelineClients.reduce((sum, c) => {
    const weight = PIPELINE_WEIGHTS[c.pipeline_stage] || 0;
    return sum + (c.estimated_value || 0) * weight;
  }, 0);

  const totalForecast = activeRevenue + renewalRevenue + pipelineRevenue;

  const sections = [
    {
      label: 'Contratos activos',
      value: activeRevenue,
      count: activeContracts.length,
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      probability: '100%',
    },
    {
      label: 'Renovaciones pendientes',
      value: renewalRevenue,
      count: renewalContracts.length,
      icon: RefreshCw,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      probability: '70%',
    },
    {
      label: 'Pipeline (propuesta + negociación)',
      value: pipelineRevenue,
      count: pipelineClients.length,
      icon: Kanban,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      probability: '30-60%',
    },
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Previsión {nextYear}
          </CardTitle>
          <span className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalForecast)} €
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((s) => (
          <div key={s.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bgColor}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{s.label}</p>
                <p className="text-xs text-slate-400">{s.count} registros · prob. {s.probability}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-900">{formatCurrency(s.value)} €</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
