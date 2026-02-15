import { useState, useRef, useEffect } from 'react';
import type { TaskStatus } from '@/hooks/useProjectTasks';

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  en_progreso: { label: 'En progreso', className: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  completada: { label: 'Completada', className: 'bg-green-50 text-green-600 hover:bg-green-100' },
  bloqueada: { label: 'Bloqueada', className: 'bg-red-50 text-red-600 hover:bg-red-100' },
};

const statusOrder: TaskStatus[] = ['pendiente', 'en_progreso', 'completada', 'bloqueada'];

interface Props {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

export const TaskStatusBadge = ({ status, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const config = statusConfig[status];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${config.className}`}
      >
        {config.label}
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px]">
          {statusOrder.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${s === status ? 'font-semibold' : ''}`}
            >
              <span className={`inline-block px-2 py-0.5 rounded-full ${statusConfig[s].className}`}>
                {statusConfig[s].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
