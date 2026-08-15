import React, { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DragDropListProps<T> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  className?: string;
  showOrderBadge?: boolean;
}

export function DragDropList<T>({
  items,
  onReorder,
  renderItem,
  keyExtractor,
  className,
  showOrderBadge = true,
}: DragDropListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onReorder(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={cn('space-y-2.5', className)}>
      {items.map((item, index) => {
        const isDragging = draggedIndex === index;
        const isOver = dragOverIndex === index;

        return (
          <div
            key={keyExtractor(item)}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={cn(
              'group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 transition-all duration-150 shadow-xs',
              isDragging && 'opacity-40 scale-[0.98] border-dashed border-emerald-500',
              isOver && 'border-emerald-500 ring-2 ring-emerald-500/20'
            )}
          >
            {/* Drag Handle & Order Controls */}
            <div className="flex items-center gap-1 shrink-0 text-zinc-400 dark:text-zinc-600">
              <div
                className="cursor-grab active:cursor-grabbing p-1 rounded hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </div>

              {showOrderBadge && (
                <span className="text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}

              {/* Up / Down button fallbacks for accessible ordering */}
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveItem(index, index - 1)}
                  className="p-0.5 text-zinc-400 hover:text-emerald-500 disabled:opacity-20 disabled:hover:text-zinc-400"
                  title="Move up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, index + 1)}
                  className="p-0.5 text-zinc-400 hover:text-emerald-500 disabled:opacity-20 disabled:hover:text-zinc-400"
                  title="Move down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Custom Content Slot */}
            <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
          </div>
        );
      })}
    </div>
  );
}
