import React from 'react';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'neutral' | 'info';
  description?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendType = 'positive',
  description,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative p-5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-[#1A2E24] shadow-xs transition-all duration-200 text-left',
        onClick && 'cursor-pointer hover:border-emerald-500/50 hover:shadow-md dark:hover:border-emerald-700/60',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
          {typeof value === 'number' && value < 10 ? `0${value}` : value}
        </span>
      </div>

      {(trend || description) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          {trend && (
            <span
              className={cn(
                'font-medium',
                trendType === 'positive' && 'text-emerald-600 dark:text-emerald-400',
                trendType === 'neutral' && 'text-zinc-500',
                trendType === 'info' && 'text-blue-500'
              )}
            >
              {trend}
            </span>
          )}
          {description && (
            <span className="text-zinc-400 dark:text-zinc-500">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
