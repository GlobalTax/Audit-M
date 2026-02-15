import { useState } from 'react';
import { ProjectBoardList } from '@/components/admin/projects/ProjectBoardList';
import { ProjectTaskTable } from '@/components/admin/projects/ProjectTaskTable';
import type { ProjectBoard } from '@/hooks/useProjectBoards';

const AdminProjects = () => {
  const [selectedBoard, setSelectedBoard] = useState<ProjectBoard | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {selectedBoard ? (
        <ProjectTaskTable
          boardId={selectedBoard.id}
          boardName={selectedBoard.name}
          onBack={() => setSelectedBoard(null)}
        />
      ) : (
        <ProjectBoardList onSelectBoard={setSelectedBoard} />
      )}
    </div>
  );
};

export default AdminProjects;
