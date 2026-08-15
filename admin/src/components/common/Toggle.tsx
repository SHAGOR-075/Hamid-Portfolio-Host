import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
}) => {
  const toggleId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="space-y-0.5 text-left">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn(
                'text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer select-none',
                disabled && 'opacity-60 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
          )}
        </div>
      )}

      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 dark:focus:ring-offset-[#07100C]',
          checked ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-800',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};
