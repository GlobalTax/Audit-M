import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Trash2, FolderKanban, Calendar as CalendarIcon } from 'lucide-react';
import { useProjectBoards, useCreateProjectBoard, useDeleteProjectBoard } from '@/hooks/useProjectBoards';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import type { ProjectBoard } from '@/hooks/useProjectBoards';

interface Props {
  onSelectBoard: (board: ProjectBoard) => void;
}

export const ProjectBoardList = ({ onSelectBoard }: Props) => {
  const { data: boards = [], isLoading } = useProjectBoards();
  const createBoard = useCreateProjectBoard();
  const deleteBoard = useDeleteProjectBoard();

  const handleCreate = () => {
    createBoard.mutate({ name: 'Nuevo proyecto', status: 'active' });
  };

  if (isLoading) {
    return <div className="text-center py-12 text-slate-400">Cargando proyectos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Proyectos</h2>
        <Button size="sm" onClick={handleCreate} disabled={createBoard.isPending}>
          <Plus className="h-4 w-4 mr-1" /> Nuevo proyecto
        </Button>
      </div>

      {boards.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FolderKanban className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p>No hay proyectos aún.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={handleCreate}>
            Crear primer proyecto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} onClick={() => onSelectBoard(board)} onDelete={() => deleteBoard.mutate(board.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

function BoardCard({ board, onClick, onDelete }: { board: ProjectBoard; onClick: () => void; onDelete: () => void }) {
  const { data: tasks = [] } = useProjectTasks(board.id);
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completada').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      onClick={onClick}
      className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer bg-white group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{board.name}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      {board.description && (
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{board.description}</p>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Progress value={pct} className="flex-1 h-1.5" />
          <span className="text-xs font-medium text-slate-600">{pct}%</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{completed}/{total} tareas</span>
          {board.deadline && (
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {format(new Date(board.deadline), 'dd MMM yyyy', { locale: es })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
