import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCRMStats } from '@/hooks/useCRMStats';
import { useCRMClients } from '@/hooks/useCRMClients';
import { Users, FileText, DollarSign, AlertTriangle, Phone, Mail, Calendar, StickyNote, ListTodo, TrendingUp, type LucideIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PIPELINE_LABELS, PIPELINE_STAGES, PIPELINE_STAGE_COLORS, CLIENT_STATUS_LABELS, formatCurrency, getDaysInStage } from '@/lib/crm';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Cell } from 'recharts';
import { useMemo } from 'react';

const INTERACTION_ICONS: Record<string, LucideIcon> = {
  llamada: Phone,
  email: Mail,
  reunion: Calendar,
  nota: StickyNote,
  tarea: ListTodo,
};

export const CRMDashboard = () => {
  const { data: stats, isLoading } = useCRMStats();
  const { data: clients = [] } = useCRMClients();

  const pipelineChartData = useMemo(() => {
    if (!stats) return [];
    return PIPELINE_STAGES.map((stage) => ({
      name: PIPELINE_LABELS[stage],
      value: stats.byPipeline[stage] || 0,
      color: PIPELINE_STAGE_COLORS[stage].accent,
    }));
  }, [stats]);

  const avgDaysPerStage = useMemo(() => {
    if (!clients.length) return 0;
    const activeClients = clients.filter((c) => c.pipeline_stage !== 'cerrado_ganado' && c.pipeline_stage !== 'cerrado_perdido');
    if (!activeClients.length) return 0;
    const totalDays = activeClients.reduce((sum, c) => sum + getDaysInStage(c.updated_at), 0);
    return Math.round(totalDays / activeClients.length);
  }, [clients]);

  const conversionRate = useMemo(() => {
    if (!stats || stats.totalClients === 0) return 0;
    const closed = stats.byPipeline['cerrado_ganado'] || 0;
    return Math.round((closed / stats.totalClients) * 100);
  }, [stats]);

  const totalPipelineValue = useMemo(() => {
    return clients
      .filter((c) => c.pipeline_stage !== 'cerrado_perdido')
      .reduce((sum, c) => sum + (c.estimated_value || 0), 0);
  }, [clients]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-400">Cargando métricas...</div>;
  }

  if (!stats) {
    return <div className="flex items-center justify-center py-12 text-gray-400">No hay datos disponibles</div>;
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <Users className="h-4 w-4 text-indigo-600" />
              </div>
              <span className="text-xs text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalClients}</p>
            <p className="text-xs text-gray-500 mt-0.5">Clientes</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <FileText className="h-4 w-4 text-indigo-600" />
              </div>
              <span className="text-xs text-gray-400">Activos</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{stats.activeContracts}</p>
            <p className="text-xs text-gray-500 mt-0.5">Contratos</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-50">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-xs text-emerald-600 font-medium">{formatCurrency(totalPipelineValue)} € pipeline</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalContractValue)} €</p>
            <p className="text-xs text-gray-500 mt-0.5">Facturación activa</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700">{conversionRate}%</Badge>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{avgDaysPerStage}d</p>
            <p className="text-xs text-gray-500 mt-0.5">Promedio en etapa</p>
          </CardContent>
        </Card>
        <Card className={`shadow-sm border bg-white ${stats.expiringContracts > 0 ? 'border-amber-200' : 'border-gray-100'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stats.expiringContracts > 0 ? 'bg-amber-50' : 'bg-gray-50'}`}>
                <AlertTriangle className={`h-4 w-4 ${stats.expiringContracts > 0 ? 'text-amber-500' : 'text-gray-400'}`} />
              </div>
              <span className="text-xs text-gray-400">30 días</span>
            </div>
            <p className={`text-2xl font-semibold ${stats.expiringContracts > 0 ? 'text-amber-600' : 'text-gray-900'}`}>
              {stats.expiringContracts}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Renovaciones</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline funnel chart */}
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">Funnel comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineChartData} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white shadow-lg border border-gray-200 rounded-lg px-3 py-2 text-xs">
                          <p className="font-medium text-gray-900">{payload[0].payload.name}</p>
                          <p className="text-gray-500">{String(payload[0].value)} clientes</p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {pipelineChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status distribution */}
        <Card className="shadow-sm border border-gray-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">Distribución por estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(CLIENT_STATUS_LABELS).map(([key, label]) => {
                const count = stats.byStatus[key] || 0;
                const percentage = stats.totalClients > 0 ? Math.round((count / stats.totalClients) * 100) : 0;
                return (
                  <div key={key} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <Badge variant="secondary" className="text-xs">{count}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{percentage}% del total</p>
                  </div>
                );
              })}
            </div>

            {clients.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Por sector</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(
                    clients.reduce<Record<string, number>>((acc, c) => {
                      const sector = c.sector || 'Sin sector';
                      acc[sector] = (acc[sector] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([sector, count]) => (
                      <Badge key={sector} variant="outline" className="text-[11px] font-normal">
                        {sector} ({count})
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm border border-gray-100 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentInteractions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No hay interacciones registradas</p>
          ) : (
            <div className="space-y-1">
              {stats.recentInteractions.map((interaction) => {
                const Icon = INTERACTION_ICONS[interaction.type] || StickyNote;
                return (
                  <div key={interaction.id} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-1.5 rounded-lg bg-indigo-50">
                      <Icon className="h-3.5 w-3.5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{interaction.subject}</p>
                      <p className="text-xs text-gray-400">
                        {format(new Date(interaction.date), "d MMM yyyy, HH:mm", { locale: es })}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] capitalize">{interaction.type}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
