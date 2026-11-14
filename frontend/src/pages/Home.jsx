import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Zap,
  BarChart3,
  Clock,
  ShieldCheck,
  GraduationCap,
  Users,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Badge } from '../components/Badge';

export const Home = () => {
  const { isAuthenticated, user, isAdmin, loginAsDemoStudent, loginAsDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const handleQuickStudent = () => {
    loginAsDemoStudent();
    navigate('/student');
  };

  const handleQuickAdmin = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] overflow-hidden -z-10 pointer-events-none opacity-40 dark:opacity-25">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-accent-500" />
            <span>Next-Generation AI Quiz & Examination Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Master Every Subject with{' '}
            <span className="gradient-text">AI-Powered</span> Exams & Quizzes
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experience smart online examinations, automated AI question generation, granular performance diagnostics, and 24/7 personalized study assistance.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to={isAdmin ? '/admin' : '/student'}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-primary text-white font-semibold text-base shadow-lg shadow-brand-500/30 hover:scale-105 transition-all"
              >
                Go to My Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-primary text-white font-semibold text-base shadow-lg shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  Start Practicing Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/exams"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <BookOpen className="w-5 h-5 text-brand-500" />
                  Explore Quizzes
                </Link>
              </>
            )}
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Instant Demo Access:</span>
            <button
              onClick={handleQuickStudent}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-600 border border-slate-200 dark:border-slate-700 font-medium transition-all"
            >
              🎓 Launch Student Demo
            </button>
            <button
              onClick={handleQuickAdmin}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-accent-50 dark:bg-slate-800 dark:hover:bg-accent-950/60 text-slate-700 dark:text-slate-300 hover:text-accent-600 border border-slate-200 dark:border-slate-700 font-medium transition-all"
            >
              🛡️ Launch Teacher/Admin Demo
            </button>
          </div>

          {/* Hero Feature Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Countdown Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>AI Diagnostics & Weak Area Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Full Role-Based Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-600 dark:text-brand-400">10,000+</p>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Questions Generated</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-accent-600 dark:text-accent-400">98.4%</p>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Diagnostic Accuracy</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400">30+ Mins</p>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Average Daily Study</p>
            </div>
            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</p>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Proctored & Immutable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Roles Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">Dual-Role Ecosystem</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Engineered for Both Students & Educators
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              A single unified ecosystem that simplifies test creation for instructors and elevates learning outcomes for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Card */}
            <div className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-500/5 relative overflow-hidden group hover:border-brand-500 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Student Experience</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Practice topic-wise quizzes, attend timed online exams, navigate questions with review flags, and receive immediate AI score breakdowns with personalized improvement tips.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Timed examination room with auto-save & review flags</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>AI Study Assistant chat for doubt clarification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Comprehensive topic-wise strength & weakness analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>Live leaderboard and learning progress tracker</span>
                </li>
              </ul>
              <button
                onClick={handleQuickStudent}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl gradient-primary text-white font-semibold text-sm shadow hover:opacity-95 transition-all"
              >
                <span>Enter as Student</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Teacher / Admin Card */}
            <div className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-accent-500/5 relative overflow-hidden group hover:border-accent-500 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent-50 dark:bg-accent-950 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Teacher & Admin Portal</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Design custom exams in minutes using the AI Quiz Generator. Review generated questions, set timers and marks, publish exams, and track cohort-wide learning curves.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  <span>AI generator for instant multi-difficulty question drafting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  <span>Full quiz editor with 4 options, explanations & timers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  <span>Publish, unpublish, and manage student accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  <span>Institutional analytics with score distribution charts</span>
                </li>
              </ul>
              <button
                onClick={handleQuickAdmin}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow hover:opacity-90 transition-all"
              >
                <span>Enter as Teacher / Admin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="purple" className="mb-3">Feature Suite</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Cutting-Edge Intelligence for Modern Education
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Every feature has been meticulously crafted to deliver precision, responsiveness, and pedagogical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Quiz Generator</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Specify any topic, subject, difficulty (Beginner, Intermediate, Advanced) and question count. Generate comprehensive questions with 4 distinct options and in-depth explanations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Timed Examination Engine</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Countdown timer, auto-saving responses, question navigation grid, and mark-for-review capability. Guarantees tamper-free and immutable submissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Diagnostic Feedback</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Beyond raw marks: get pinpoint detection of concepts you mastered versus those requiring remediation, paired with targeted study suggestions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">24/7 AI Study Assistant</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Interactive chat assistant ready to explain complex questions, simplify jargon, generate flash practice prompts, and break down why incorrect options were wrong.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Competitive Leaderboard</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Celebrate top achievers with ranking calculations based on verified exam scores and completion rates, while maintaining student privacy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Enterprise Security</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                BCrypt password hashing, role-guarded endpoints, server-side evaluation of answer keys, and safe backend API proxying for all AI interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-brand-600 via-accent-600 to-brand-700 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Revolutionize Your Examination Experience?
          </h2>
          <p className="text-brand-100 max-w-2xl mx-auto text-sm sm:text-base">
            Join students and educators using QuizGenius to unlock deeper understanding, faster test authoring, and reliable academic evaluation.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-white text-brand-700 font-bold text-sm shadow-xl hover:bg-slate-50 transition-all hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/exams"
              className="px-8 py-3.5 rounded-2xl bg-brand-800/60 border border-white/20 text-white font-bold text-sm hover:bg-brand-800 transition-all"
            >
              Browse Active Exams
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
