import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Brain,
  Sparkles,
  Lock,
  Mail,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const Login = () => {
  const { login, loginAsDemoStudent, loginAsDemoAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [roleTab, setRoleTab] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || (roleTab === 'admin' ? '/admin' : '/student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      const res = await login(email, password);
      if (res && res.success) {
        if (res.user.role === 'admin' || res.user.role === 'teacher') {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setError('Invalid credentials. Please verify your details.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    }
  };

  const handleDemoStudent = () => {
    loginAsDemoStudent();
    navigate('/student');
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-primary mx-auto flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Brain className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome to QuizGenius
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sign in to access quizzes, exams, and AI learning tools
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => {
              setRoleTab('student');
              setEmail('');
              setPassword('');
              setError('');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              roleTab === 'student'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRoleTab('admin');
              setEmail('');
              setPassword('');
              setError('');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              roleTab === 'admin'
                ? 'bg-white dark:bg-slate-900 text-accent-600 dark:text-accent-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Teacher / Admin</span>
          </button>
        </div>

        {/* Demo Fast-Login Pill */}
        <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-center space-y-2">
          <p className="text-xs font-semibold text-brand-800 dark:text-brand-300">
            Evaluating the system? Use 1-Click Demo Login:
          </p>
          <div className="flex gap-2 justify-center">
            {roleTab === 'student' ? (
              <button
                type="button"
                onClick={handleDemoStudent}
                className="w-full py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition shadow-sm"
              >
                🎓 Log in as Demo Student
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="w-full py-2 px-3 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 transition shadow-sm"
              >
                🛡️ Log in as Demo Teacher/Admin
              </button>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={roleTab === 'admin' ? 'admin@quizgenius.edu' : 'student@quizgenius.edu'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl gradient-primary text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign in as {roleTab === 'admin' ? 'Teacher/Admin' : 'Student'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
