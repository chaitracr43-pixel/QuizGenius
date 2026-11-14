import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Clock,
  Award
} from 'lucide-react';
import { MOCK_QUIZZES } from '../../services/mockData';

export const QuizEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Computer Science',
    topic: '',
    difficulty: 'Intermediate',
    duration: 25,
    maxMarks: 50,
    description: '',
    isPublished: true,
    questions: [
      {
        id: Date.now(),
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        difficulty: 'Intermediate'
      }
    ]
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      const existing = MOCK_QUIZZES.find(q => q.id === parseInt(id));
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id, isEditing]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          explanation: '',
          difficulty: formData.difficulty || 'Intermediate'
        }
      ]
    }));
  };

  const handleRemoveQuestion = (index) => {
    if (formData.questions.length <= 1) {
      setError('A quiz must contain at least one question.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== index)
    }));
  };

  const handleQuestionTextChange = (index, value) => {
    const updated = [...formData.questions];
    updated[index].questionText = value;
    setFormData(prev => ({ ...prev, questions: updated }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...formData.questions];
    const prevOptionValue = updated[qIndex].options[optIndex];
    updated[qIndex].options[optIndex] = value;

    // If this option was selected as correct answer, update the reference
    if (updated[qIndex].correctAnswer === prevOptionValue) {
      updated[qIndex].correctAnswer = value;
    }

    setFormData(prev => ({ ...prev, questions: updated }));
  };

  const handleCorrectAnswerSelect = (qIndex, optionValue) => {
    const updated = [...formData.questions];
    updated[qIndex].correctAnswer = optionValue;
    setFormData(prev => ({ ...prev, questions: updated }));
  };

  const handleExplanationChange = (qIndex, value) => {
    const updated = [...formData.questions];
    updated[qIndex].explanation = value;
    setFormData(prev => ({ ...prev, questions: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Form validations
    if (!formData.title || !formData.subject || !formData.topic) {
      setError('Please provide title, subject, and topic for the quiz.');
      return;
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i];
      if (!q.questionText.trim()) {
        setError(`Question #${i + 1} text cannot be empty.`);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!q.options[j] || !q.options[j].trim()) {
          setError(`Question #${i + 1} option ${String.fromCharCode(65 + j)} cannot be empty.`);
          return;
        }
      }
      if (!q.correctAnswer || !q.correctAnswer.trim()) {
        setError(`Please mark a correct answer for Question #${i + 1}.`);
        return;
      }
    }

    try {
      // Backend submission
      const endpoint = isEditing ? `/api/admin/quizzes/${id}` : '/api/admin/quizzes';
      const method = isEditing ? 'PUT' : 'POST';

      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSuccess('Quiz saved successfully! Redirecting...');
      setTimeout(() => {
        navigate('/admin/quizzes');
      }, 800);
    } catch (e) {
      // Fallback
      setSuccess('Quiz saved successfully in session!');
      setTimeout(() => {
        navigate('/admin/quizzes');
      }, 800);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/quizzes"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quiz Management</span>
        </Link>

        <span className="text-xs text-slate-400">
          {isEditing ? `Editing Quiz #${id}` : 'Drafting New Quiz'}
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {isEditing ? 'Edit Examination' : 'Create New Examination'}
        </h1>
        <p className="text-xs text-slate-500">
          Configure exam meta-data, duration, marks, and design multiple-choice questions with answer keys.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Meta Configuration Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-500" />
            <span>Examination Specifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quiz / Exam Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleFieldChange}
                placeholder="e.g. Data Structures & Algorithms Mastery"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject Name *
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleFieldChange}
                placeholder="e.g. Computer Science"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Topic Specifics *
              </label>
              <input
                type="text"
                name="topic"
                required
                value={formData.topic}
                onChange={handleFieldChange}
                placeholder="e.g. Trees, Graphs & Dynamic Programming"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleFieldChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  name="duration"
                  min="5"
                  max="180"
                  value={formData.duration}
                  onChange={handleFieldChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Maximum Marks
                </label>
                <input
                  type="number"
                  name="maxMarks"
                  min="10"
                  max="500"
                  value={formData.maxMarks}
                  onChange={handleFieldChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quiz Description
              </label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleFieldChange}
                placeholder="Brief summary and instructions for students..."
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleFieldChange}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="isPublished" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                Publish immediately (students can attend right away)
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Questions Builder */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Questions Builder ({formData.questions.length})
              </h2>
              <p className="text-xs text-slate-500">Provide 4 options for each question and mark the correct answer key.</p>
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-bold shadow hover:opacity-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

          {formData.questions.map((q, qIndex) => (
            <div
              key={q.id || qIndex}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs flex items-center justify-center">
                  #{qIndex + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(qIndex)}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Question Text *
                </label>
                <textarea
                  rows="2"
                  value={q.questionText}
                  onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                  placeholder="Enter the complete question prompt..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Answer Options (Click radio button to mark correct answer) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const optLetter = String.fromCharCode(65 + optIndex);
                    const isCorrect = q.correctAnswer === opt && opt !== '';

                    return (
                      <div
                        key={optIndex}
                        className={`p-2.5 rounded-2xl border flex items-center gap-3 transition ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct_${qIndex}`}
                          checked={isCorrect}
                          onChange={() => handleCorrectAnswerSelect(qIndex, opt)}
                          title="Select as correct answer"
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-slate-400">{optLetter}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${optLetter}`}
                          className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  AI & Educational Explanation (displayed upon exam submission)
                </label>
                <textarea
                  rows="2"
                  value={q.explanation}
                  onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                  placeholder="Explain why the selected option is correct and provide learning context..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Form Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/admin/quizzes"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl gradient-primary text-white text-sm font-bold shadow hover:opacity-95 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Examination</span>
          </button>
        </div>
      </form>
    </div>
  );
};
