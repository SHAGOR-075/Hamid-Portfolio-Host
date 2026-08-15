import React from 'react';
import { cn } from '../../lib/utils';
import { Star, CheckCircle, XCircle } from 'lucide-react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'emerald' | 'warning' | 'danger' | 'featured' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const variants = {
    default:
      'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60',
    emerald:
      'bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-700/40',
    warning:
      'bg-amber-500/10 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-500/20 dark:border-amber-700/40',
    danger:
      'bg-red-500/10 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-500/20 dark:border-red-700/40',
    featured:
      'bg-amber-500/15 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold',
    outline:
      'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-tight rounded-md',
    md: 'text-xs px-2.5 py-1 font-medium tracking-wide rounded-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 leading-none select-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {variant === 'featured' && <Star className="w-3 h-3 fill-amber-400 text-amber-500 shrink-0" />}
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ active: boolean; className?: string }> = ({
  active,
  className,
}) => {
  return active ? (
    <Badge variant="emerald" size="sm" className={className}>
      <CheckCircle className="w-3 h-3 text-emerald-500" />
      Active
    </Badge>
  ) : (
    <Badge variant="default" size="sm" className={className}>
      <XCircle className="w-3 h-3 text-zinc-400" />
      Inactive
    </Badge>
  );
};
