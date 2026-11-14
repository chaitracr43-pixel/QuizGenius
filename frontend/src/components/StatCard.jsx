import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel = 'vs last month',
  color = 'brand',
  className = ''
}) => {
  const colorMap = {
    brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
    accent: 'bg-accent-500/10 text-accent-600 dark:text-accent-400 border-accent-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const isPositiveTrend = trend && !trend.startsWith('-');

  return (
    <div className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.brand}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md ${
            isPositiveTrend
              ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300'
          }`}>
            {isPositiveTrend ? <ArrowUpRight className="w-3.5 h-3.5 inline" /> : <ArrowDownRight className="w-3.5 h-3.5 inline" />}
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {trend ? `${trendLabel}` : subtitle}
        </p>
      )}
    </div>
  );
};
