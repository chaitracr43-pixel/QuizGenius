import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  HelpCircle,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DifficultyBadge } from '../../components/Badge';
import { MOCK_QUIZZES } from '../../services/mockData';

export const ExamList = () => {
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    fetch('/api/quizzes')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) setQuizzes(data);
      })
      .catch(() => {});
  }, []);

  const subjects = ['All', ...new Set(quizzes.map(q => q.subject))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quiz.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Available Quizzes & Examinations
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Browse proctored examinations and practice quizzes across academic disciplines. Test your mastery and receive immediate AI diagnostic feedback.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by quiz title, subject or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Subject Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Examinations Match Your Filter</h3>
          <p className="text-xs text-slate-500">Try adjusting your search criteria or subject selection.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSubject('All'); setSelectedDifficulty('All'); }}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-brand-500/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {quiz.subject}
                  </span>
                  <DifficultyBadge difficulty={quiz.difficulty} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {quiz.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {quiz.description || `Assessment on ${quiz.topic}. Comprehensive multiple-choice exam.`}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-500" />
                    {quiz.duration} Minutes
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <HelpCircle className="w-3.5 h-3.5 text-accent-500" />
                    {quiz.totalQuestions || quiz.questions?.length || 5} Questions
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {quiz.maxMarks || 50} Marks
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>Author: {quiz.author || 'Department Faculty'}</span>
                </div>

                <Link
                  to={`/exams/${quiz.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-semibold shadow hover:opacity-95 transition-all group-hover:scale-105"
                >
                  <span>Attend Exam</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
