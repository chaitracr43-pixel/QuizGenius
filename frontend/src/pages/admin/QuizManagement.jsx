import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  PlusCircle,
  Sparkles,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Users,
  Search,
  Filter
} from 'lucide-react';
import { MOCK_QUIZZES } from '../../services/mockData';
import { DifficultyBadge } from '../../components/Badge';

export const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  useEffect(() => {
    fetch('/api/admin/quizzes')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) setQuizzes(data);
      })
      .catch(() => {});
  }, []);

  const handleTogglePublish = async (quizId) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        return { ...q, isPublished: !q.isPublished };
      }
      return q;
    }));

    try {
      await fetch(`/api/admin/quizzes/${quizId}/toggle-publish`, { method: 'POST' });
    } catch (e) {}
  };

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action will remove all associated exam attempts.')) {
      setQuizzes(prev => prev.filter(q => q.id !== quizId));
      try {
        await fetch(`/api/admin/quizzes/${quizId}`, { method: 'DELETE' });
      } catch (e) {}
    }
  };

  const subjects = ['All', ...new Set(quizzes.map(q => q.subject))];

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || q.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quiz & Examination Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Author, edit, publish or configure timers and marks for examinations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/ai-generator"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-semibold shadow hover:opacity-95 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Quiz Generator</span>
          </Link>

          <Link
            to="/admin/quizzes/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold shadow transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Quiz Manually</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5" />
          <span>Subject:</span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
          >
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Quiz Details</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Duration & Marks</th>
                <th className="py-3.5 px-4">Attempts</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{quiz.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{quiz.topic} • {quiz.totalQuestions || quiz.questions?.length} Questions</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {quiz.subject}
                  </td>
                  <td className="py-4 px-4">
                    <DifficultyBadge difficulty={quiz.difficulty} />
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    <span>{quiz.duration} mins • {quiz.maxMarks} marks</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-900 dark:text-white">{quiz.attemptsCount || 0}</span>
                    <span className="text-[11px] text-slate-400 block">Avg: {quiz.avgScore || 75}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleTogglePublish(quiz.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        quiz.isPublished
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {quiz.isPublished ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{quiz.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                    <Link
                      to={`/exams/${quiz.id}`}
                      title="Preview Examination"
                      className="inline-flex p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/admin/quizzes/edit/${quiz.id}`}
                      title="Edit Quiz"
                      className="inline-flex p-2 rounded-xl text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      title="Delete Quiz"
                      className="inline-flex p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
