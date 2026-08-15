import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[] | string[];
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, helperText, error, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
          >
            {label}
            {required && <span className="text-emerald-500 dark:text-emerald-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              'w-full appearance-none rounded-lg text-sm bg-white dark:bg-[#0B1511] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800/90 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500/80 px-3.5 py-2.5 pr-10',
              error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
              className
            )}
            {...props}
          >
            {options.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.value;
              const lbl = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={val} value={val} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  {lbl}
                </option>
              );
            })}
          </select>

          <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute right-3 pointer-events-none" />
        </div>

        {error ? (
          <p className="text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
