import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { InlineTextEdit, InlineDateEdit, InlineSelectEdit } from './InlineEditCell';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { ProjectProgressBar } from './ProjectProgressBar';
import { useProjectTasks, useCreateProjectTask, useUpdateProjectTask, useDeleteProjectTask } from '@/hooks/useProjectTasks';
import type { ProjectTask, TaskStatus, TaskPriority } from '@/hooks/useProjectTasks';

const TEAM_MEMBERS = ['Marcos', 'Laura', 'Carlos', 'Ana', 'Pedro', 'Marta', 'Jordi', 'Elena'];

interface Props {
  boardId: string;
  boardName: string;
  onBack: () => void;
}

export const ProjectTaskTable = ({ boardId, boardName, onBack }: Props) => {
  const { data: tasks = [], isLoading } = useProjectTasks(boardId);
  const createTask = useCreateProjectTask();
  const updateTask = useUpdateProjectTask();
  const deleteTask = useDeleteProjectTask();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string | 'all'>('all');
  const [dragId, setDragId] = useState<string | null>(null);

  const filtered = tasks.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (assigneeFilter !== 'all' && t.assignee !== assigneeFilter) return false;
    return true;
  });

  const handleAddTask = () => {
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map((t) => t.sort_order)) : 0;
    createTask.mutate({ board_id: boardId, title: 'Nueva tarea', sort_order: maxOrder + 1 });
  };

  const handleUpdate = (id: string, updates: Partial<ProjectTask>) => {
    updateTask.mutate({ id, ...updates });
  };

  const handleToggleComplete = (task: ProjectTask) => {
    const newStatus: TaskStatus = task.status === 'completada' ? 'pendiente' : 'completada';
    handleUpdate(task.id, { status: newStatus });
  };

  const handleDragStart = (id: string) => setDragId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const dragIdx = tasks.findIndex((t) => t.id === dragId);
    const targetIdx = tasks.findIndex((t) => t.id === targetId);
    if (dragIdx === -1 || targetIdx === -1) return;
    const newOrder = tasks[targetIdx].sort_order;
    handleUpdate(dragId, { sort_order: newOrder });
    // Shift others
    const direction = dragIdx < targetIdx ? -1 : 1;
    const start = Math.min(dragIdx, targetIdx);
    const end = Math.max(dragIdx, targetIdx);
    tasks.slice(start, end + 1).forEach((t, i) => {
      if (t.id !== dragId) {
        handleUpdate(t.id, { sort_order: t.sort_order + direction });
      }
    });
    setDragId(null);
  };

  const uniqueAssignees = [...new Set(tasks.map((t) => t.assignee).filter(Boolean))] as string[];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500">
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-slate-900">{boardName}</h2>
        </div>
        <Button size="sm" onClick={handleAddTask} disabled={createTask.isPending}>
          <Plus className="h-4 w-4 mr-1" /> Añadir tarea
        </Button>
      </div>

      {/* Progress */}
      <ProjectProgressBar tasks={tasks} />

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
          <option value="bloqueada">Bloqueada</option>
        </select>
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="all">Todos los responsables</option>
          {uniqueAssignees.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-8 text-slate-400">Cargando tareas...</div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-8"></TableHead>
                <TableHead className="w-10"></TableHead>
                <TableHead>Tarea</TableHead>
                <TableHead className="w-32">Responsable</TableHead>
                <TableHead className="w-32">Estado</TableHead>
                <TableHead className="w-28">Prioridad</TableHead>
                <TableHead className="w-32">Fecha límite</TableHead>
                <TableHead className="w-48">Notas</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((task) => (
                <TableRow
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(task.id)}
                  className={`${task.status === 'completada' ? 'opacity-60' : ''} ${dragId === task.id ? 'opacity-30' : ''}`}
                >
                  <TableCell className="px-2">
                    <GripVertical className="h-4 w-4 text-slate-300 cursor-grab" />
                  </TableCell>
                  <TableCell className="px-2">
                    <Checkbox
                      checked={task.status === 'completada'}
                      onCheckedChange={() => handleToggleComplete(task)}
                    />
                  </TableCell>
                  <TableCell>
                    <InlineTextEdit
                      value={task.title}
                      onSave={(v) => handleUpdate(task.id, { title: v })}
                      placeholder="Título de la tarea"
                    />
                  </TableCell>
                  <TableCell>
                    <InlineSelectEdit
                      value={task.assignee}
                      options={TEAM_MEMBERS}
                      onSave={(v) => handleUpdate(task.id, { assignee: v })}
                      placeholder="Asignar"
                    />
                  </TableCell>
                  <TableCell>
                    <TaskStatusBadge
                      status={task.status}
                      onChange={(s) => handleUpdate(task.id, { status: s })}
                    />
                  </TableCell>
                  <TableCell>
                    <TaskPriorityBadge
                      priority={task.priority}
                      onChange={(p) => handleUpdate(task.id, { priority: p })}
                    />
                  </TableCell>
                  <TableCell>
                    <InlineDateEdit
                      value={task.due_date}
                      onSave={(v) => handleUpdate(task.id, { due_date: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <InlineTextEdit
                      value={task.description || ''}
                      onSave={(v) => handleUpdate(task.id, { description: v || null })}
                      placeholder="Añadir notas..."
                      multiline
                    />
                  </TableCell>
                  <TableCell className="px-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-red-500"
                      onClick={() => deleteTask.mutate({ id: task.id, boardId })}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-slate-400">
                    {tasks.length === 0 ? 'Sin tareas aún. Haz clic en "Añadir tarea" para empezar.' : 'No hay tareas con estos filtros.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
