import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface TextEditProps {
  value: string;
  onSave: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export const InlineTextEdit = ({ value, onSave, placeholder = 'Haz clic para editar', multiline }: TextEditProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft.trim() !== value) onSave(draft.trim());
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) commit();
    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
  };

  if (!editing) {
    return (
      <span
        onClick={() => setEditing(true)}
        className={`cursor-pointer hover:bg-slate-50 rounded px-1 py-0.5 -mx-1 transition-colors ${!value ? 'text-slate-400 italic' : ''}`}
      >
        {value || placeholder}
      </span>
    );
  }

  if (multiline) {
    return (
      <textarea
        ref={inputRef as any}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKey}
        className="w-full text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
        rows={2}
      />
    );
  }

  return (
    <input
      ref={inputRef as any}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKey}
      className="w-full text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
    />
  );
};

interface DateEditProps {
  value: string | null;
  onSave: (v: string | null) => void;
}

export const InlineDateEdit = ({ value, onSave }: DateEditProps) => {
  const [open, setOpen] = useState(false);
  const selected = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn(
          'flex items-center gap-1.5 text-xs px-1 py-0.5 rounded hover:bg-slate-50 transition-colors',
          !value && 'text-slate-400 italic'
        )}>
          <CalendarIcon className="h-3 w-3" />
          {value ? format(new Date(value), 'dd/MM/yyyy') : 'Sin fecha'}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => {
            onSave(d ? format(d, 'yyyy-MM-dd') : null);
            setOpen(false);
          }}
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

interface SelectEditProps {
  value: string | null;
  options: string[];
  onSave: (v: string) => void;
  placeholder?: string;
}

export const InlineSelectEdit = ({ value, options, onSave, placeholder = 'Asignar' }: SelectEditProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'text-xs px-1 py-0.5 rounded hover:bg-slate-50 transition-colors',
          !value && 'text-slate-400 italic'
        )}
      >
        {value || placeholder}
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px] max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSave(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 ${opt === value ? 'font-semibold bg-blue-50' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
