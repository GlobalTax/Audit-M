import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCRMStats } from '@/hooks/useCRMStats';
import { Users, FileText, DollarSign, AlertTriangle, Phone, Mail, Calendar, StickyNote, ListTodo } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PIPELINE_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  propuesta: 'Propuesta',
  negociacion: 'Negociación',
  cerrado_ganado: 'Cerrado Ganado',
  cerrado_perdido: 'Cerrado Perdido',
};

const STATUS_LABELS: Record<string, string> = {
  prospecto: 'Prospecto',
  activo: 'Activo',
  inactivo: 'Inactivo',
  perdido: 'Perdido',
};

const INTERACTION_ICONS: Record<string, any> = {
  llamada: Phone,
  email: Mail,
  reunion: Calendar,
  nota: StickyNote,
  tarea: ListTodo,
};

export const CRMDashboard = () => {
  const { data: stats, isLoading } = useCRMStats();

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-muted-foreground">Cargando métricas...</div>;
  }

  if (!stats) return null;

  const pipelineStages = ['nuevo', 'contactado', 'propuesta', 'negociacion', 'cerrado_ganado', 'cerrado_perdido'];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Activos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeContracts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Facturación Activa</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContractValue.toLocaleString('es-ES')} €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Renovaciones Próximas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.expiringContracts}</div>
            <p className="text-xs text-muted-foreground">Próximos 30 días</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Funnel del Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pipelineStages.map((stage) => {
              const count = stats.byPipeline[stage] || 0;
              const maxCount = Math.max(...Object.values(stats.byPipeline), 1);
              const width = Math.max((count / maxCount) * 100, 8);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className="text-sm w-32 text-muted-foreground">{PIPELINE_LABELS[stage]}</span>
                  <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-xs font-medium text-primary-foreground">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">{label}</span>
                  <Badge variant="secondary" className="text-sm">
                    {stats.byStatus[key] || 0}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentInteractions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No hay interacciones recientes</p>
          ) : (
            <div className="space-y-3">
              {stats.recentInteractions.map((interaction) => {
                const Icon = INTERACTION_ICONS[interaction.type] || StickyNote;
                return (
                  <div key={interaction.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                    <div className="p-1.5 rounded-full bg-primary/10">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{interaction.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(interaction.date), "d MMM yyyy, HH:mm", { locale: es })}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">{interaction.type}</Badge>
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
