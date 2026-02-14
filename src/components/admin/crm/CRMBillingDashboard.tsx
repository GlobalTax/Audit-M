import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCRMInvoices, useCRMInvoiceStats, type CRMInvoiceStatus } from '@/hooks/useCRMInvoices';
import { CRMInvoiceForm } from './CRMInvoiceForm';
import { CRMBillingForecast } from './CRMBillingForecast';
import { formatCurrency } from '@/lib/crm';
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from '@/lib/crm';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Plus, TrendingUp, TrendingDown, Euro, FileText, ArrowUpDown } from 'lucide-react';

export function CRMBillingDashboard() {
  const currentYear = new Date().getFullYear();
  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterStatus, setFilterStatus] = useState<CRMInvoiceStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const { data: invoices, isLoading } = useCRMInvoices({
    year: filterYear,
    status: filterStatus === 'all' ? undefined : filterStatus,
  });
  const { data: stats } = useCRMInvoiceStats();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Facturación</h1>
          <p className="text-sm text-slate-500">Histórico, análisis y previsión de facturación</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva factura
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label={`Facturado ${stats?.currentYear ?? currentYear}`}
          value={`${formatCurrency(stats?.currentTotal ?? 0)} €`}
          icon={Euro}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <KPICard
          label={`Facturado ${stats?.prevYear ?? currentYear - 1}`}
          value={`${formatCurrency(stats?.prevTotal ?? 0)} €`}
          icon={Euro}
          color="text-slate-600"
          bgColor="bg-slate-50"
        />
        <KPICard
          label="Variación interanual"
          value={`${(stats?.variation ?? 0) >= 0 ? '+' : ''}${(stats?.variation ?? 0).toFixed(1)}%`}
          icon={(stats?.variation ?? 0) >= 0 ? TrendingUp : TrendingDown}
          color={(stats?.variation ?? 0) >= 0 ? 'text-emerald-600' : 'text-red-600'}
          bgColor={(stats?.variation ?? 0) >= 0 ? 'bg-emerald-50' : 'bg-red-50'}
        />
        <KPICard
          label="Facturas este año"
          value={String(invoices?.length ?? 0)}
          icon={FileText}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
      </div>

      {/* Chart + Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Comparativa mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.monthlyData ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip
                    formatter={(value: number) => [`${formatCurrency(value)} €`]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="previous" name={`${stats?.prevYear ?? ''}`} fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="current" name={`${stats?.currentYear ?? ''}`} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <CRMBillingForecast />
      </div>

      {/* Invoice table */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">Listado de facturas</CardTitle>
            <div className="flex gap-2">
              <Select value={String(filterYear)} onValueChange={(v) => setFilterYear(Number(v))}>
                <SelectTrigger className="w-28 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {(Object.entries(INVOICE_STATUS_LABELS) as [string, string][]).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-sm text-slate-400">Cargando...</div>
          ) : !invoices?.length ? (
            <div className="text-center py-12">
              <FileText className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No hay facturas para este período</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowForm(true)}>
                Crear primera factura
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-2 text-xs font-medium text-slate-400">Nº</th>
                    <th className="pb-2 text-xs font-medium text-slate-400">Cliente</th>
                    <th className="pb-2 text-xs font-medium text-slate-400">Concepto</th>
                    <th className="pb-2 text-xs font-medium text-slate-400">Fecha</th>
                    <th className="pb-2 text-xs font-medium text-slate-400 text-right">Total</th>
                    <th className="pb-2 text-xs font-medium text-slate-400">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-mono text-xs text-slate-600">{inv.invoice_number}</td>
                      <td className="py-2.5 text-slate-700">{inv.crm_clients?.name ?? '—'}</td>
                      <td className="py-2.5 text-slate-500 max-w-[200px] truncate">{inv.service_description}</td>
                      <td className="py-2.5 text-slate-500">{new Date(inv.issue_date).toLocaleDateString('es-ES')}</td>
                      <td className="py-2.5 text-right font-medium text-slate-900">{formatCurrency(inv.total_amount)} €</td>
                      <td className="py-2.5">
                        <Badge variant="secondary" className={`text-[10px] ${INVOICE_STATUS_COLORS[inv.status] || ''}`}>
                          {INVOICE_STATUS_LABELS[inv.status] || inv.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <CRMInvoiceForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color, bgColor }: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-lg font-semibold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
