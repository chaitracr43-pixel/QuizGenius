import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    primary: 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    purple: 'bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300 border-accent-200 dark:border-accent-800',
    beginner: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    intermediate: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    advanced: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  };

  const sizes = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1 font-medium',
    md: 'text-sm px-3 py-1 font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.default} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export const DifficultyBadge = ({ difficulty }) => {
  const norm = (difficulty || '').toLowerCase();
  let variant = 'default';
  if (norm.includes('begin') || norm.includes('easy')) variant = 'beginner';
  else if (norm.includes('inter') || norm.includes('medium')) variant = 'intermediate';
  else if (norm.includes('adv') || norm.includes('hard')) variant = 'advanced';

  return (
    <Badge variant={variant}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        variant === 'beginner' ? 'bg-emerald-500' :
        variant === 'intermediate' ? 'bg-amber-500' :
        variant === 'advanced' ? 'bg-rose-500' : 'bg-slate-400'
      }`} />
      <span className="capitalize">{difficulty || 'General'}</span>
    </Badge>
  );
};
