import { useState } from 'react';
import { Sparkles, Loader2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { useCreateProjectTask, type TaskPriority } from '@/hooks/useProjectTasks';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GeneratedTask {
  title: string;
  priority: TaskPriority;
  description?: string;
  selected: boolean;
}

interface AITaskGeneratorProps {
  boardId: string;
  currentTaskCount: number;
}

export const AITaskGenerator = ({ boardId, currentTaskCount }: AITaskGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [tasks, setTasks] = useState<GeneratedTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [inserting, setInserting] = useState(false);
  const [step, setStep] = useState<'input' | 'preview'>('input');
  const createTask = useCreateProjectTask();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-project-tasks', {
        body: { prompt: prompt.trim() },
      });

      if (error) {
        toast.error(error.message || 'Error al generar tareas');
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      const generated: GeneratedTask[] = (data.tasks || []).map((t: any) => ({
        title: t.title,
        priority: t.priority as TaskPriority,
        description: t.description || null,
        selected: true,
      }));

      if (generated.length === 0) {
        toast.error('No se pudieron extraer tareas del texto.');
        return;
      }

      setTasks(generated);
      setStep('preview');
    } catch (e) {
      toast.error('Error de conexión al generar tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (idx: number) => {
    setTasks((prev) => prev.map((t, i) => (i === idx ? { ...t, selected: !t.selected } : t)));
  };

  const handleInsert = async () => {
    const selected = tasks.filter((t) => t.selected);
    if (selected.length === 0) return;
    setInserting(true);
    try {
      for (let i = 0; i < selected.length; i++) {
        const t = selected[i];
        await createTask.mutateAsync({
          board_id: boardId,
          title: t.title,
          priority: t.priority,
          description: t.description || null,
          sort_order: currentTaskCount + i + 1,
        });
      }
      toast.success(`${selected.length} tareas añadidas`);
      handleClose();
    } catch {
      toast.error('Error al insertar tareas');
    } finally {
      setInserting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPrompt('');
    setTasks([]);
    setStep('input');
  };

  const selectedCount = tasks.filter((t) => t.selected).length;

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Sparkles className="h-4 w-4 mr-1" /> Generar con IA
      </Button>

      <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Generar tareas con IA
            </DialogTitle>
            <DialogDescription>
              {step === 'input'
                ? 'Pega un texto, plan o briefing y la IA extraerá las tareas automáticamente.'
                : `${tasks.length} tareas generadas. Selecciona las que quieras añadir.`}
            </DialogDescription>
          </DialogHeader>

          {step === 'input' ? (
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Plan de marketing digital para 2026. Necesitamos crear una web optimizada para SEO, lanzar campañas de Google Ads, crear contenidos para el blog..."
                className="min-h-[200px] text-sm"
              />
              <DialogFooter>
                <Button variant="ghost" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" /> Generar tareas
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                {tasks.map((task, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      task.selected
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-muted/30 opacity-60'
                    }`}
                  >
                    <Checkbox
                      checked={task.selected}
                      onCheckedChange={() => handleToggle(idx)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{task.title}</span>
                        <TaskPriorityBadge priority={task.priority} onChange={() => {}} />
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{task.description}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <DialogFooter className="flex-row justify-between sm:justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep('input')}>
                  ← Volver a editar
                </Button>
                <Button onClick={handleInsert} disabled={inserting || selectedCount === 0}>
                  {inserting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Insertando...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Añadir {selectedCount} tareas
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
