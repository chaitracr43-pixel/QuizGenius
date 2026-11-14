import React, { useState, useEffect } from 'react';
import {
  Award,
  Trophy,
  Medal,
  Search,
  Sparkles,
  TrendingUp,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_LEADERBOARD } from '../../services/mockData';

export const LeaderboardView = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState(MOCK_LEADERBOARD);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) setLeaderboard(data);
      })
      .catch(() => {});
  }, []);

  const filtered = leaderboard.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/30 ring-2 ring-amber-300">
          🥇 1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center shadow-md ring-2 ring-slate-200">
          🥈 2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-xs flex items-center justify-center shadow-md ring-2 ring-amber-600">
          🥉 3
        </div>
      );
    }
    return (
      <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
        #{rank}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl gradient-primary text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Excellence & Mastery Rankings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Global Student Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
            Rankings are determined by total verified examination completions, percentage consistency, and mastery milestones. Student privacy is protected.
          </p>
        </div>

        <div className="absolute right-4 -bottom-6 opacity-20 pointer-events-none">
          <Trophy className="w-64 h-64" />
        </div>
      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((top, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border text-center space-y-3 relative ${
              idx === 0
                ? 'bg-gradient-to-b from-amber-50 to-white dark:from-slate-850 dark:to-slate-900 border-amber-300 dark:border-amber-600/50 shadow-md ring-1 ring-amber-400/30'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="mx-auto w-fit">
              {getRankBadge(top.rank)}
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{top.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {top.badge}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Average</span>
                <span className="font-black text-brand-600 dark:text-brand-400 text-sm">{top.avgPercentage}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Exams</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{top.quizzesCompleted}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Top Mark</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{top.highestScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search students on leaderboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <div className="text-xs text-slate-500 shrink-0">
          Showing <strong>{filtered.length}</strong> ranked students
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Rank</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Honor Badge</th>
                <th className="py-3.5 px-4 text-center">Quizzes Completed</th>
                <th className="py-3.5 px-4 text-center">Highest Score</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Average Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => {
                const isCurrentUser = user && user.name.toLowerCase() === item.name.toLowerCase();

                return (
                  <tr
                    key={item.rank}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-brand-50/70 dark:bg-brand-950/40 font-semibold'
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6">
                      {getRankBadge(item.rank)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-300">
                      {item.quizzesCompleted}
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {item.highestScore}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <span className="text-sm font-black text-brand-600 dark:text-brand-400">
                        {item.avgPercentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
