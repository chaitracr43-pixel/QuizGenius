import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Sparkles,
  PlusCircle,
  TrendingUp,
  Clock,
  Shield,
  ArrowRight,
  ChevronRight,
  Activity,
  Layers,
  GraduationCap
} from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { ScoreDistributionChart } from '../../components/Charts';
import { MOCK_ADMIN_STATS, MOCK_QUIZZES } from '../../services/mockData';
import { DemoTag } from '../../components/DemoBadge';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(MOCK_ADMIN_STATS);
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setStats(data.stats || MOCK_ADMIN_STATS);
          if (data.quizzes) setQuizzes(data.quizzes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Admin Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-semibold border border-accent-500/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Institutional Administration Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Administrator'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitor active examinations, generate new curriculum assessments using AI, and analyze real-time student cohort performance metrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/admin/ai-generator"
              className="px-5 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-semibold shadow hover:opacity-95 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Quiz Generator</span>
            </Link>
            <Link
              to="/admin/quizzes/create"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-brand-400" />
              <span>Create Manual Quiz</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Registered Students"
          value={stats.totalRegisteredStudents}
          trend="+18 this week"
          subtitle="Active student cohort"
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Total Examinations"
          value={stats.totalExaminations}
          trend="+4 new"
          subtitle="Published exam sessions"
          icon={FileText}
          color="accent"
        />
        <StatCard
          title="Active Question Bank"
          value={stats.totalQuizzes * 5}
          subtitle="Curated & AI verified"
          icon={Layers}
          color="sky"
        />
        <StatCard
          title="Average Exam Score"
          value={`${stats.averageExaminationScore}%`}
          trend="+2.1%"
          subtitle="System-wide student average"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Performance Analytics & Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Distribution Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Cohort Examination Score Distribution</span>
                <DemoTag text="Cohort Live" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total student attempts grouped by score bracket</p>
            </div>
            <Link to="/admin/analytics" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Detailed Analytics →
            </Link>
          </div>

          <ScoreDistributionChart data={stats.scoreDistribution} />

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 0-50% Remedial</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 51-70% Average</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span> 71-85% Good</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 86-100% Distinction</span>
          </div>
        </div>

        {/* Subject Enrollments & Pass Rate Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Curriculum Pass Rates</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Departmental exam completion rates</p>
          </div>

          <div className="space-y-3">
            {stats.subjectEnrollments.map((sub, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{sub.subject}</p>
                  <p className="text-[11px] text-slate-500">{sub.students} enrolled examinees</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{sub.passRate}</span>
                  <p className="text-[10px] text-slate-400">Pass Rate</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/admin/users"
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition"
          >
            <Users className="w-4 h-4 text-brand-500" />
            <span>Manage Student Accounts ({stats.totalRegisteredStudents})</span>
          </Link>
        </div>
      </div>

      {/* Quizzes & Recent Exam Activities Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz Management Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Examination Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage questions, timer settings and publish status</p>
            </div>
            <Link to="/admin/quizzes" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              View All Quizzes →
            </Link>
          </div>

          <div className="space-y-3">
            {quizzes.slice(0, 3).map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-500">{quiz.subject}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Published
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{quiz.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {quiz.totalQuestions} Questions • {quiz.duration} mins • {quiz.attemptsCount} attempts
                  </p>
                </div>

                <Link
                  to={`/admin/quizzes/edit/${quiz.id}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                >
                  Edit Quiz
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Live Examination Activity Stream */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Student Submissions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live stream of exam submissions and grading</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {stats.recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50/40 dark:bg-slate-800/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                    {act.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{act.studentName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      {act.examTitle}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-brand-600 dark:text-brand-400">{act.score}</span>
                  <p className="text-[10px] text-slate-400">{act.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
