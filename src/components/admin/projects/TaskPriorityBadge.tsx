import { useState, useRef, useEffect } from 'react';
import type { TaskPriority } from '@/hooks/useProjectTasks';

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  baja: { label: 'Baja', className: 'bg-slate-50 text-slate-500 hover:bg-slate-100' },
  media: { label: 'Media', className: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' },
  alta: { label: 'Alta', className: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
  urgente: { label: 'Urgente', className: 'bg-red-50 text-red-600 hover:bg-red-100' },
};

const priorityOrder: TaskPriority[] = ['baja', 'media', 'alta', 'urgente'];

interface Props {
  priority: TaskPriority;
  onChange: (p: TaskPriority) => void;
}

export const TaskPriorityBadge = ({ priority, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const config = priorityConfig[priority];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${config.className}`}
      >
        {config.label}
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[120px]">
          {priorityOrder.map((p) => (
            <button
              key={p}
              onClick={() => { onChange(p); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${p === priority ? 'font-semibold' : ''}`}
            >
              <span className={`inline-block px-2 py-0.5 rounded-full ${priorityConfig[p].className}`}>
                {priorityConfig[p].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
