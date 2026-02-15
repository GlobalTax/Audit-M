import { Progress } from '@/components/ui/progress';
import type { ProjectTask } from '@/hooks/useProjectTasks';

interface Props {
  tasks: ProjectTask[];
}

export const ProjectProgressBar = ({ tasks }: Props) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completada').length;
  const inProgress = tasks.filter((t) => t.status === 'en_progreso').length;
  const blocked = tasks.filter((t) => t.status === 'bloqueada').length;
  const pending = tasks.filter((t) => t.status === 'pendiente').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Progress value={pct} className="flex-1 h-2" />
        <span className="text-sm font-semibold text-slate-700 min-w-[40px] text-right">{pct}%</span>
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-slate-500">Total: <strong className="text-slate-700">{total}</strong></span>
        <span className="text-green-600">Completadas: <strong>{completed}</strong></span>
        <span className="text-blue-600">En progreso: <strong>{inProgress}</strong></span>
        <span className="text-slate-500">Pendientes: <strong>{pending}</strong></span>
        {blocked > 0 && <span className="text-red-600">Bloqueadas: <strong>{blocked}</strong></span>}
      </div>
    </div>
  );
};
