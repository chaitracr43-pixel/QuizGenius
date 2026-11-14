import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Send,
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';
import { MOCK_QUIZZES } from '../../services/mockData';
import { DifficultyBadge } from '../../components/Badge';

export const ExamRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find quiz
  const quiz = MOCK_QUIZZES.find(q => q.id === parseInt(id)) || MOCK_QUIZZES[0];
  const questions = quiz.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    // Attempt restoring saved answers
    const saved = localStorage.getItem(`quizgenius_exam_${quiz.id}_answers`);
    return saved ? JSON.parse(saved) : {};
  });
  const [flagged, setFlagged] = useState(() => {
    const saved = localStorage.getItem(`quizgenius_exam_${quiz.id}_flagged`);
    return saved ? JSON.parse(saved) : {};
  });

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`quizgenius_exam_${quiz.id}_time`);
    return savedTime ? parseInt(savedTime) : quiz.duration * 60;
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save answers & flagged states to localStorage
  useEffect(() => {
    localStorage.setItem(`quizgenius_exam_${quiz.id}_answers`, JSON.stringify(answers));
  }, [answers, quiz.id]);

  useEffect(() => {
    localStorage.setItem(`quizgenius_exam_${quiz.id}_flagged`, JSON.stringify(flagged));
  }, [flagged, quiz.id]);

  // Timer Tick
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        localStorage.setItem(`quizgenius_exam_${quiz.id}_time`, next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300; // Under 5 minutes

  const currentQ = questions[currentIndex] || {};
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  const handleSelectOption = (option) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleToggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    // Calculate score
    let correctCount = 0;
    const marksPerQ = Math.round(quiz.maxMarks / questions.length);

    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scoreObtained = correctCount * marksPerQ;
    const percentage = Math.round((correctCount / questions.length) * 100);

    const submissionResult = {
      attemptId: Date.now(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      subject: quiz.subject,
      topic: quiz.topic,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount: questions.length - correctCount,
      score: scoreObtained,
      maxMarks: quiz.maxMarks,
      percentage,
      userAnswers: answers,
      timeTakenSecs: (quiz.duration * 60) - Math.max(0, timeLeft),
      submittedAt: new Date().toISOString(),
      questions: questions,
    };

    // Save result to localStorage
    localStorage.setItem(`quizgenius_result_${quiz.id}_${submissionResult.attemptId}`, JSON.stringify(submissionResult));
    // Clear exam progress session
    localStorage.removeItem(`quizgenius_exam_${quiz.id}_answers`);
    localStorage.removeItem(`quizgenius_exam_${quiz.id}_flagged`);
    localStorage.removeItem(`quizgenius_exam_${quiz.id}_time`);

    // Submit to backend if available
    try {
      await fetch('/api/exams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionResult),
      });
    } catch (e) {
      // Backend optional, frontend result handled seamlessly
    }

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/exams/results/${quiz.id}?attemptId=${submissionResult.attemptId}`);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Proctored Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">{quiz.subject}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{quiz.topic}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {quiz.title}
          </h1>
        </div>

        {/* Timer & Submit Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Countdown Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold tracking-wider transition-colors ${
            isLowTime
              ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800 animate-pulse'
              : 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800'
          }`}>
            <Clock className="w-4 h-4 shrink-0" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-5 py-2 rounded-xl gradient-primary text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Main Examination Layout: Question + Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Question Body (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center justify-center">
                  {currentIndex + 1}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <DifficultyBadge difficulty={currentQ.difficulty} />
                <button
                  onClick={handleToggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    flagged[currentQ.id]
                      ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {flagged[currentQ.id] ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                  <span>{flagged[currentQ.id] ? 'Flagged for Review' : 'Mark for Review'}</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options?.map((option, idx) => {
                const isSelected = answers[currentQ.id] === option;
                const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-150 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 shadow-sm ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {optionLetter}
                    </div>
                    <span className="text-sm font-medium leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Review & Submit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Navigator (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Question Navigator
            </h3>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let bgClass = 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
                if (isFlagged) {
                  bgClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-bold';
                } else if (isAnswered) {
                  bgClass = 'bg-brand-600 text-white border-brand-600 font-bold shadow-xs';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${bgClass} ${
                      isCurrent ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-600"></span> Answered
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span> Flagged
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{flaggedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"></span> Unanswered
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{unansweredCount}</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition text-center"
            >
              Submit All Answers
            </button>
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Final Submission</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you ready to submit your examination? Once submitted, your answers are immutable and cannot be modified.
              </p>
            </div>

            {/* Summary statistics pill */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
              <div>
                <span className="text-xs text-slate-400">Answered</span>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{answeredCount}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Flagged</span>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{flaggedCount}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Remaining</span>
                <p className="text-lg font-bold text-slate-600 dark:text-slate-300">{unansweredCount}</p>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl text-center">
                ⚠️ You still have {unansweredCount} unattempted question{unansweredCount > 1 ? 's' : ''}.
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Back to Exam
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="py-2.5 px-4 rounded-xl gradient-primary text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating...' : 'Yes, Submit Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
