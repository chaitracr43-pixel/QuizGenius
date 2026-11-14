import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
  ExternalLink,
  Target,
  FileCheck2,
  Activity,
  Zap,
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { Badge, DifficultyBadge } from '../../components/Badge';
import { ProgressLineChart, SubjectPerformanceBars } from '../../components/Charts';
import { MOCK_STUDENT_STATS, MOCK_QUIZZES } from '../../services/mockData';
import { DemoTag } from '../../components/DemoBadge';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(MOCK_STUDENT_STATS);
  const [availableExams, setAvailableExams] = useState(MOCK_QUIZZES);

  useEffect(() => {
    // Attempt fetch from backend, fallback seamlessly
    fetch('/api/student/dashboard')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setStats(data.stats || MOCK_STUDENT_STATS);
          if (data.quizzes) setAvailableExams(data.quizzes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl gradient-primary text-white p-6 sm:p-8 shadow-xl shadow-brand-500/15">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Learning Pathway Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Chaitra'}! 🚀
          </h1>
          <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
            You're in the top 5% of active students this week. Check your recent algorithmic diagnostic scores and practice your recommended study targets below.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/exams"
              className="px-5 py-2.5 rounded-xl bg-white text-brand-700 text-xs sm:text-sm font-bold shadow hover:bg-slate-50 transition"
            >
              Take an Examination
            </Link>
            <Link
              to="/study-assistant"
              className="px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask AI Assistant</span>
            </Link>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Quizzes Attempted"
          value={stats.totalQuizzesAttempted}
          trend="+3"
          subtitle="Total completed tests"
          icon={FileCheck2}
          color="brand"
        />
        <StatCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          trend="+5.2%"
          subtitle="Aggregate performance"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Highest Score"
          value={`${stats.highestScore}%`}
          subtitle="Top achievement: Web Tech"
          icon={Award}
          color="accent"
        />
        <StatCard
          title="Marks Earned"
          value={`${stats.totalMarksEarned}/${stats.totalMarksPossible}`}
          subtitle="85.3% Total efficiency"
          icon={Target}
          color="amber"
        />
      </div>

      {/* Charts & Subject Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Learning Progress Trend</span>
                <DemoTag text="Verified" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Score percentage progression over the past 5 months</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              Monthly Avg
            </span>
          </div>

          <ProgressLineChart data={stats.progressHistory} height={200} />
        </div>

        {/* Subject Performance Bars */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Subject Mastery</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Proficiency across active curriculum areas</p>
          </div>
          <SubjectPerformanceBars data={stats.subjectPerformance} />
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-accent-50/60 to-brand-50/60 dark:from-slate-900 dark:to-slate-900 border border-accent-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Personalized AI Study Recommendations</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent-100 dark:bg-accent-950 text-accent-700 dark:text-accent-300">
                  Adaptive
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Derived from your latest quiz submission error patterns</p>
            </div>
          </div>
          <Link to="/study-assistant" className="text-xs font-bold text-accent-600 dark:text-accent-400 hover:underline flex items-center gap-1">
            <span>Open Study Assistant</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {stats.aiRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{rec.subject}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    rec.urgency === 'High' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' :
                    rec.urgency === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                    'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                  }`}>
                    {rec.urgency} Priority
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{rec.reason}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <p className="text-[11px] font-medium text-brand-600 dark:text-brand-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 shrink-0" />
                  <span>{rec.suggestedAction}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Examinations & Recent Results Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Examinations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Available Examinations</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Standard proctored tests ready for your attempt</p>
            </div>
            <Link to="/exams" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              View All ({availableExams.length})
            </Link>
          </div>

          <div className="space-y-3">
            {availableExams.slice(0, 3).map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{quiz.subject}</span>
                    <DifficultyBadge difficulty={quiz.difficulty} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {quiz.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration} mins</span>
                    <span>{quiz.totalQuestions} Questions</span>
                    <span>{quiz.maxMarks} Marks</span>
                  </div>
                </div>

                <Link
                  to={`/exams/${quiz.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold shadow hover:opacity-95 transition-all shrink-0"
                >
                  <span>Start Exam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quiz Results & Activities */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Exam Results</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Evaluated score sheets and answer reviews</p>
            </div>
            <Link to="/student/history" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Full History
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentResults.slice(0, 3).map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{res.subject}</span>
                    <span className="text-[11px] text-slate-400">• {res.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{res.quizTitle}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Score: <strong className="text-slate-800 dark:text-slate-200">{res.score}/{res.totalMarks}</strong></span>
                    <span>Time: {res.timeSpent}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-brand-600 dark:text-brand-400">
                    {res.percentage}%
                  </div>
                  <Link
                    to={`/exams/results/${res.quizId}?attemptId=${res.id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Analysis</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Mini-Feed */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Activity Stream</h4>
            <div className="space-y-2">
              {stats.recentActivities.slice(0, 2).map((act) => (
                <div key={act.id} className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-brand-500" />
                    <span>{act.action}: <strong className="text-slate-800 dark:text-slate-200">{act.target}</strong></span>
                  </span>
                  <span className="text-[11px] text-slate-400">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
