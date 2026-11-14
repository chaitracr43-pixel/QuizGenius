import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  Award,
  ChevronRight,
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle,
  BarChart2
} from 'lucide-react';
import { MOCK_STUDENT_STATS } from '../../services/mockData';

export const PerformanceHistory = () => {
  const [history, setHistory] = useState(MOCK_STUDENT_STATS.recentResults);
  const [search, setSearch] = useState('');

  const filtered = history.filter(item =>
    item.quizTitle.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Examination History & Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your finalized exam results, test metrics, and past AI cognitive diagnostic reports
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by exam title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none"
        />
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-brand-500/50 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {item.subject}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.quizTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Time Spent: {item.timeSpent}
                </span>
                <span>
                  Score: <strong className="text-slate-800 dark:text-slate-200">{item.score}/{item.totalMarks}</strong>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.percentage >= 85 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                  item.percentage >= 60 ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400' :
                  'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                {item.percentage}%
              </span>

              <Link
                to={`/exams/results/${item.quizId}?attemptId=${item.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-bold shadow hover:opacity-95 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>View AI Diagnosis</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
