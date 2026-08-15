import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  onClear,
}) => {
  return (
    <div className={cn('relative flex items-center w-full max-w-sm', className)}>
      <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-lg text-sm bg-white dark:bg-[#0B1511] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 border border-zinc-200 dark:border-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
