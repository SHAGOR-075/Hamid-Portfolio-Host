import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  label,
  placeholder = 'Type technology and press Enter (e.g. PyTorch)...',
  helperText,
  error,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 p-2 rounded-lg text-sm bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/90 min-h-[46px] transition-all',
          'focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-500'
        )}
      >
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-emerald-600 hover:text-emerald-950 dark:hover:text-white p-0.5 rounded-full"
              aria-label={`Remove ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue) addTag(inputValue);
          }}
          placeholder={tags.length === 0 ? placeholder : 'Add more...'}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none px-1.5 py-1"
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => addTag(inputValue)}
            className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-md"
            title="Add tag"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
};
