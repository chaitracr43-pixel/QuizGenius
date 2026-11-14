import React from 'react';
import { Brain, Heart, Github, Linkedin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white shadow-sm">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white font-sans">
                Quiz<span className="text-brand-600 dark:text-brand-400">Genius</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering students and educators with next-generation AI-driven quizzes, dynamic proctored examinations, and personalized learning insights.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/exams" className="hover:text-brand-600 dark:hover:text-brand-400">Online Exams</Link></li>
              <li><Link to="/study-assistant" className="hover:text-brand-600 dark:hover:text-brand-400">AI Study Assistant</Link></li>
              <li><Link to="/leaderboard" className="hover:text-brand-600 dark:hover:text-brand-400">Global Leaderboard</Link></li>
              <li><Link to="/student" className="hover:text-brand-600 dark:hover:text-brand-400">Student Portal</Link></li>
              <li><Link to="/admin" className="hover:text-brand-600 dark:hover:text-brand-400">Teacher & Admin Portal</Link></li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">AI Capabilities</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-accent-500" /> Automated Question Generation</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-accent-500" /> Instant Intelligent Explanations</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-accent-500" /> Weak Area Diagnosis</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-accent-500" /> Personalized Study Pathways</li>
            </ul>
          </div>

          {/* Credits & Technology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Project & Author</h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                Developed by <span className="text-brand-600 dark:text-brand-400">Chaitra C R</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                AI-Powered Quiz & Exam Management System. Built with React, Tailwind CSS, Python Flask & SQLite/PostgreSQL.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Production Grade Architecture</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} QuizGenius. All rights reserved. Designed & Engineered by Chaitra C R.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> and AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
