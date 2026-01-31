import { useState, useCallback, DragEvent } from 'react';

interface UseDragAndDropOptions<T> {
  items: T[];
  onReorder: (orderedIds: string[]) => void;
  getId: (item: T) => string;
}

interface DragProps {
  draggable: boolean;
  onDragStart: (e: DragEvent) => void;
  onDragEnd: (e: DragEvent) => void;
  onDragOver: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
}

interface HandleProps {
  onMouseDown: () => void;
  style: { cursor: string };
}

interface UseDragAndDropReturn {
  getDragProps: (id: string) => DragProps;
  getHandleProps: (id: string) => HandleProps;
  isDragging: (id: string) => boolean;
  isDragOver: (id: string) => boolean;
}

/**
 * Hook for native HTML5 Drag and Drop functionality
 * No external dependencies - works with any list of items
 */
export function useDragAndDrop<T>({
  items,
  onReorder,
  getId,
}: UseDragAndDropOptions<T>): UseDragAndDropReturn {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [canDrag, setCanDrag] = useState(false);

  const handleDragStart = useCallback((id: string) => (e: DragEvent) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    
    // Add a slight delay to allow the drag image to be set
    requestAnimationFrame(() => {
      const target = e.target as HTMLElement;
      target.style.opacity = '0.5';
    });
  }, [canDrag]);

  const handleDragEnd = useCallback((e: DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
    setDraggedId(null);
    setDragOverId(null);
    setCanDrag(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((id: string) => (e: DragEvent) => {
    e.preventDefault();
    if (id !== draggedId) {
      setDragOverId(id);
    }
  }, [draggedId]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    // Only clear if we're actually leaving the element, not entering a child
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverId(null);
    }
  }, []);

  const handleDrop = useCallback((targetId: string) => (e: DragEvent) => {
    e.preventDefault();
    
    const sourceId = e.dataTransfer.getData('text/plain');
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      return;
    }

    // Calculate new order
    const sourceIndex = items.findIndex(item => getId(item) === sourceId);
    const targetIndex = items.findIndex(item => getId(item) === targetId);
    
    if (sourceIndex === -1 || targetIndex === -1) {
      setDragOverId(null);
      return;
    }

    // Create new order
    const newItems = [...items];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    // Call onReorder with new order of IDs
    const orderedIds = newItems.map(item => getId(item));
    onReorder(orderedIds);
    
    setDragOverId(null);
  }, [items, getId, onReorder]);

  const getDragProps = useCallback((id: string): DragProps => ({
    draggable: canDrag,
    onDragStart: handleDragStart(id),
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter(id),
    onDragLeave: handleDragLeave,
    onDrop: handleDrop(id),
  }), [canDrag, handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDragLeave, handleDrop]);

  const getHandleProps = useCallback((id: string): HandleProps => ({
    onMouseDown: () => setCanDrag(true),
    style: { cursor: draggedId === id ? 'grabbing' : 'grab' },
  }), [draggedId]);

  const isDragging = useCallback((id: string) => draggedId === id, [draggedId]);
  const isDragOver = useCallback((id: string) => dragOverId === id && draggedId !== id, [dragOverId, draggedId]);

  return {
    getDragProps,
    getHandleProps,
    isDragging,
    isDragOver,
  };
}
