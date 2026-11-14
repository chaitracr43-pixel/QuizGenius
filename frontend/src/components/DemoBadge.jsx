import React from 'react';
import { AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const DemoNotice = ({ title = "Demo Simulation Mode", message, isLive = false }) => {
  if (isLive) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Connected to Live AI Service</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-200 text-xs">
      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold flex items-center gap-2">
          <span>{title}</span>
          <span className="px-1.5 py-0.2 bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded text-[10px] uppercase font-bold tracking-wider">Demo Data</span>
        </div>
        <p className="mt-0.5 text-amber-700 dark:text-amber-300/80 leading-relaxed">
          {message || "No AI API key is currently configured. Standard high-quality curated sample content is displayed instead of live API tokens."}
        </p>
      </div>
    </div>
  );
};

export const DemoTag = ({ text = "Demo Data" }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-semibold tracking-wide border border-amber-200 dark:border-amber-800">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
    {text}
  </span>
);
