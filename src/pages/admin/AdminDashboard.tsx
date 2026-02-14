import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Newspaper,
  Users,
  TrendingUp,
  Clock,
  ClipboardList,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  FileOutput,
  AlertTriangle,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, differenceInDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';
import { useCRMStats } from '@/hooks/useCRMStats';
import { useCRMContracts } from '@/hooks/useCRMContracts';
import { PIPELINE_LABELS, formatCurrency } from '@/lib/crm';

interface DashboardStats {
  blogPosts: number;
  contactLeads: number;
  services: number;
  caseStudies: number;
  totalViews: number;
  topArticles: Array<{ id: string; title_en: string; slug_en: string; view_count: number; category: string }>;
  recentLeads: Array<{ id: string; name: string; email: string; service: string; created_at: string; read: boolean }>;
  leadsThisMonth: number;
  leadsLastMonth: number;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

  const [blogPosts, contactLeads, servicesResult, caseStudiesResult, topArticles, recentLeads, leadsThisMonth, leadsLastMonth] =
    await Promise.all([
      supabase.from('blog_posts').select('id, view_count', { count: 'exact' }).eq('status', 'published').eq('source_site', 'int'),
      supabase.from('contact_leads').select('id', { count: 'exact' }).eq('source_site', 'int'),
      (supabase as any).from('services').select('id', { count: 'exact' }).eq('status', 'published'),
      supabase.from('case_studies').select('id', { count: 'exact' }).eq('status', 'published'),
      supabase.from('blog_posts').select('id, title_en, slug_en, view_count, category').eq('status', 'published').eq('source_site', 'int').not('title_en', 'is', null).order('view_count', { ascending: false, nullsFirst: false }).limit(5),
      supabase.from('contact_leads').select('id, name, email, service, created_at, read').eq('source_site', 'int').order('created_at', { ascending: false }).limit(8),
      supabase.from('contact_leads').select('id', { count: 'exact' }).eq('source_site', 'int').gte('created_at', startOfMonth),
      supabase.from('contact_leads').select('id', { count: 'exact' }).eq('source_site', 'int').gte('created_at', startOfLastMonth).lt('created_at', startOfMonth),
    ]);

  const totalViews = blogPosts.data?.reduce((sum, post) => sum + ((post as any).view_count || 0), 0) || 0;

  return {
    blogPosts: blogPosts.count || 0,
    contactLeads: contactLeads.count || 0,
    services: servicesResult.count || 0,
    caseStudies: caseStudiesResult.count || 0,
    totalViews,
    topArticles: (topArticles.data || []) as any,
    recentLeads: (recentLeads.data || []) as any,
    leadsThisMonth: leadsThisMonth.count || 0,
    leadsLastMonth: leadsLastMonth.count || 0,
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

const PIPELINE_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'];

export const AdminDashboard = () => {
  const { adminUser } = useAuth();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats-audit'],
    queryFn: fetchDashboardStats,
  });
  const { data: crmStats } = useCRMStats();
  const { data: contracts = [] } = useCRMContracts();

  const firstName = adminUser?.full_name?.split(' ')[0] || '';
  const greeting = getGreeting();

  const leadsTrend = stats
    ? stats.leadsLastMonth > 0
      ? Math.round(((stats.leadsThisMonth - stats.leadsLastMonth) / stats.leadsLastMonth) * 100)
      : stats.leadsThisMonth > 0
      ? 100
      : 0
    : 0;

  const expiringContracts = contracts.filter((c) => {
    if (c.status !== 'activo' || !c.end_date) return false;
    const days = differenceInDays(new Date(c.end_date), new Date());
    return days >= 0 && days <= 30;
  });

  const pipelineData = crmStats
    ? Object.entries(crmStats.byPipeline)
        .filter(([, count]) => count > 0)
        .map(([stage, count]) => ({
          name: PIPELINE_LABELS[stage as keyof typeof PIPELINE_LABELS] || stage,
          value: count,
        }))
    : [];

  // Fake sparkline data for KPI cards (derived from actual counts for visual interest)
  const sparkline = (base: number) =>
    Array.from({ length: 7 }, (_, i) => ({
      v: Math.max(0, base + Math.round((Math.sin(i * 0.8) * base) / 4)),
    }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Leads este mes',
      value: stats?.leadsThisMonth || 0,
      trend: leadsTrend,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      link: '/admin/contact-leads',
      data: sparkline(stats?.leadsThisMonth || 0),
      sparkColor: '#3b82f6',
    },
    {
      title: 'Servicios activos',
      value: stats?.services || 0,
      icon: ClipboardList,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      link: '/admin/services',
      data: sparkline(stats?.services || 0),
      sparkColor: '#10b981',
    },
    {
      title: 'Artículos publicados',
      value: stats?.blogPosts || 0,
      icon: Newspaper,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      link: '/admin/blog',
      data: sparkline(stats?.blogPosts || 0),
      sparkColor: '#8b5cf6',
    },
    {
      title: 'Casos de éxito',
      value: stats?.caseStudies || 0,
      icon: Briefcase,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      link: '/admin/case-studies',
      data: sparkline(stats?.caseStudies || 0),
      sparkColor: '#f59e0b',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {greeting}, {firstName}
          </h1>
          <p className="text-slate-500 mt-0.5">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/blog">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Artículo
            </Button>
          </Link>
          <Link to="/admin/crm">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Cliente
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <Link key={kpi.title} to={kpi.link}>
            <Card className="hover:shadow-md transition-all duration-200 border-slate-200/60 hover:border-slate-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  {kpi.trend !== undefined && kpi.trend !== 0 && (
                    <Badge
                      variant="secondary"
                      className={`text-[11px] gap-0.5 ${
                        kpi.trend > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                      }`}
                    >
                      {kpi.trend > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(kpi.trend)}%
                    </Badge>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{kpi.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{kpi.title}</p>
                  </div>
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={kpi.data}>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke={kpi.sparkColor}
                          fill={kpi.sparkColor}
                          fillOpacity={0.1}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leads - 2 cols */}
        <Card className="lg:col-span-2 border-slate-200/60">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Últimas consultas
            </CardTitle>
            <Link to="/admin/contact-leads">
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-slate-500">
                Ver todas <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="space-y-1">
                {stats.recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          lead.read ? 'bg-slate-300' : 'bg-primary'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{lead.name}</p>
                        <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-center gap-2">
                      {lead.service && (
                        <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600">
                          {lead.service}
                        </Badge>
                      )}
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: es })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">Sin consultas recientes</p>
            )}
          </CardContent>
        </Card>

        {/* Pipeline overview + quick stats - 1 col */}
        <div className="space-y-6">
          {/* Pipeline donut */}
          {pipelineData.length > 0 && (
            <Card className="border-slate-200/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                  Pipeline CRM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pipelineData}
                          cx="50%"
                          cy="50%"
                          innerRadius={28}
                          outerRadius={48}
                          paddingAngle={3}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {pipelineData.map((_, index) => (
                            <Cell key={index} fill={PIPELINE_COLORS[index % PIPELINE_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          content={({ active, payload }) =>
                            active && payload?.[0] ? (
                              <div className="bg-white shadow-lg border rounded-lg px-3 py-1.5 text-xs">
                                <span className="font-medium">{payload[0].name}</span>: {String(payload[0].value)}
                              </div>
                            ) : null
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {pipelineData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: PIPELINE_COLORS[index % PIPELINE_COLORS.length] }}
                          />
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-medium text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/admin/crm">
                  <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-slate-500 gap-1">
                    Ir al CRM <ChevronRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* CRM quick stats */}
          {crmStats && (
            <Card className="border-slate-200/60">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Clientes totales</span>
                  <span className="text-sm font-semibold text-slate-900">{crmStats.totalClients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Contratos activos</span>
                  <span className="text-sm font-semibold text-slate-900">{crmStats.activeContracts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Facturación activa</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatCurrency(crmStats.totalContractValue)} €
                  </span>
                </div>
                {crmStats.expiringContracts > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-amber-600 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Renovaciones próximas
                    </span>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                      {crmStats.expiringContracts}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Expiring contracts */}
          {expiringContracts.length > 0 && (
            <Card className="border-amber-200/60 bg-amber-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-4 w-4" />
                  Contratos por vencer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {expiringContracts.slice(0, 3).map((contract) => {
                  const daysLeft = differenceInDays(new Date(contract.end_date!), new Date());
                  return (
                    <div key={contract.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 truncate">{contract.service_name}</span>
                      <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700">
                        {daysLeft}d
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Top articles */}
      {stats?.topArticles && stats.topArticles.length > 0 && (
        <Card className="border-slate-200/60">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              Artículos más leídos
            </CardTitle>
            <Link to="/admin/blog">
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-slate-500">
                Gestionar <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {stats.topArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="p-3 rounded-lg bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                    {article.category && (
                      <Badge variant="secondary" className="text-[10px]">
                        {article.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">
                    {article.title_en}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {(article.view_count || 0).toLocaleString()} visitas
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Nuevo artículo', icon: Newspaper, link: '/admin/blog', color: 'text-violet-600 bg-violet-50' },
          { label: 'Nuevo servicio', icon: ClipboardList, link: '/admin/services', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Generar propuesta', icon: FileOutput, link: '/admin/proposal-generator', color: 'text-blue-600 bg-blue-50' },
          { label: 'Ver leads', icon: Users, link: '/admin/contact-leads', color: 'text-amber-600 bg-amber-50' },
        ].map((action) => (
          <Link key={action.label} to={action.link}>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-slate-300 hover:shadow-sm transition-all bg-white cursor-pointer">
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
