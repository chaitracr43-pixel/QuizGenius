import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Layers,
  CheckCircle2,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { ScoreDistributionChart, SubjectPerformanceBars } from '../../components/Charts';
import { MOCK_ADMIN_STATS } from '../../services/mockData';

export const AnalyticsView = () => {
  const [stats] = useState(MOCK_ADMIN_STATS);

  const curriculumData = [
    { subject: 'Computer Science & Algorithms', score: 86, strength: '165 Students', totalTests: 142 },
    { subject: 'Web Architectures & React', score: 92, strength: '210 Students', totalTests: 215 },
    { subject: 'Database Systems & SQL', score: 83, strength: '95 Students', totalTests: 88 },
    { subject: 'Artificial Intelligence & Neural Nets', score: 79, strength: '120 Students', totalTests: 98 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Examination & Institutional Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics on student pass rates, score distribution, and curriculum mastery trends
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Exam Submissions"
          value="543"
          trend="+14% this month"
          subtitle="Proctored submissions"
          icon={BarChart3}
          color="brand"
        />
        <StatCard
          title="Overall Average Score"
          value={`${stats.averageExaminationScore}%`}
          trend="+3.2%"
          subtitle="System-wide aggregate"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Passing Ratio"
          value="89.4%"
          trend="+1.8%"
          subtitle="Scores >= 50%"
          icon={CheckCircle2}
          color="sky"
        />
        <StatCard
          title="Distinction Ratio"
          value="24.2%"
          trend="+4.5%"
          subtitle="Scores >= 85%"
          icon={Award}
          color="accent"
        />
      </div>

      {/* Score Distribution Chart Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Cohort Score Bracket Distribution
            </h2>
            <p className="text-xs text-slate-500">
              Distribution of student examination scores across all curriculum modules
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
            348 Total Candidates
          </span>
        </div>

        <ScoreDistributionChart data={stats.scoreDistribution} />
      </div>

      {/* Curriculum Mastery Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Curriculum Average Pass Rates</h3>
            <p className="text-xs text-slate-500">Subject-level performance benchmarks</p>
          </div>
          <SubjectPerformanceBars data={curriculumData} />
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Institutional Takeaways</h3>
            <p className="text-xs text-slate-500">High-level insights generated for curriculum heads</p>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block mb-1">Top Subject: Web Technologies</strong>
              Students excel in component lifecycle and hooks, maintaining a 92% pass rate across 215 attempts.
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              <strong className="text-amber-900 dark:text-amber-300 block mb-1">Focus Area: Neural Network Backpropagation</strong>
              Scores on activation function constraints and vanishing gradients average 71%. Recommend scheduling a review session or publishing targeted practice quizzes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
