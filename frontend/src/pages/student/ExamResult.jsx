import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BarChart3,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Check,
  X,
  Share2
} from 'lucide-react';
import { MOCK_QUIZZES } from '../../services/mockData';
import { Badge, DifficultyBadge } from '../../components/Badge';
import { DemoNotice } from '../../components/DemoBadge';

export const ExamResult = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get('attemptId');

  const quiz = MOCK_QUIZZES.find(q => q.id === parseInt(id)) || MOCK_QUIZZES[0];
  const [result, setResult] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    // Attempt load from localStorage first
    let stored = null;
    if (attemptId) {
      stored = localStorage.getItem(`quizgenius_result_${quiz.id}_${attemptId}`);
    }

    if (stored) {
      const parsed = JSON.parse(stored);
      setResult(parsed);
      generateAIFeedback(parsed);
    } else {
      // Create a sensible preview result for demonstration
      const defaultUserAnswers = {
        [quiz.questions[0]?.id]: quiz.questions[0]?.correctAnswer,
        [quiz.questions[1]?.id]: quiz.questions[1]?.correctAnswer,
        [quiz.questions[2]?.id]: 'Incorrect Answer Sample',
        [quiz.questions[3]?.id]: quiz.questions[3]?.correctAnswer,
        [quiz.questions[4]?.id]: quiz.questions[4]?.correctAnswer,
      };

      let correct = 0;
      quiz.questions.forEach(q => {
        if (defaultUserAnswers[q.id] === q.correctAnswer) correct++;
      });

      const fallbackResult = {
        attemptId: attemptId || Date.now(),
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        topic: quiz.topic,
        totalQuestions: quiz.questions.length,
        correctCount: correct,
        incorrectCount: quiz.questions.length - correct,
        score: Math.round((correct / quiz.questions.length) * quiz.maxMarks),
        maxMarks: quiz.maxMarks,
        percentage: Math.round((correct / quiz.questions.length) * 100),
        userAnswers: defaultUserAnswers,
        timeTakenSecs: 740,
        submittedAt: new Date().toISOString(),
        questions: quiz.questions,
      };
      setResult(fallbackResult);
      generateAIFeedback(fallbackResult);
    }
  }, [id, attemptId, quiz]);

  const generateAIFeedback = async (resData) => {
    setLoadingAi(true);
    try {
      const resp = await fetch('/api/ai/analyze-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resData),
      });

      if (resp.ok) {
        const data = await resp.json();
        setAiFeedback(data);
        setLoadingAi(false);
        return;
      }
    } catch (e) {
      // Backend not running, use built-in rule-based AI diagnostic engine
    }

    // High quality pedagogical feedback engine
    const isHigh = resData.percentage >= 80;
    const isMedium = resData.percentage >= 60 && resData.percentage < 80;

    setAiFeedback({
      isLive: false,
      summary: isHigh
        ? `Exemplary performance! You demonstrated firm command over ${resData.topic}, solving ${resData.correctCount} out of ${resData.totalQuestions} questions accurately.`
        : isMedium
        ? `Solid foundation established in ${resData.topic}. With focused review on key definitions and algorithmic complexities, you can easily cross the 90% threshold.`
        : `Foundational revision is recommended for ${resData.topic}. Several core concepts need closer attention to solidify your comprehension.`,
      strongTopics: isHigh
        ? ['Core Concept Identification', 'Traversals & State Tracking', 'Time Complexity Analysis']
        : ['Basic Definitions', 'Foundational Terminologies'],
      topicsToImprove: isHigh
        ? ['Edge-case Analysis', 'Non-linear Data Constraints']
        : ['Algorithmic Paradigms', 'Worst-Case Bounds', 'Space Complexity Calculations'],
      recommendations: [
        `Re-examine question explanations below, particularly questions with intermediate and advanced ratings.`,
        `Ask the AI Study Assistant to provide 3 targeted practice scenarios on: ${resData.topic}.`,
        `Schedule a short 15-minute review session before attempting the next milestone test.`
      ]
    });
    setLoadingAi(false);
  };

  if (!result) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isDistinction = result.percentage >= 85;
  const isPassed = result.percentage >= 50;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Official Examination Score Report
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {result.quizTitle}
            </h1>
            <p className="text-xs text-slate-500">
              Subject: {result.subject} • Submitted: {new Date(result.submittedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Percentage Circular Badge */}
          <div className="flex items-center gap-6">
            <div className="text-center p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800">
              <span className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">
                {result.percentage}%
              </span>
              <p className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase mt-0.5">
                {isDistinction ? 'Distinction' : isPassed ? 'Passed' : 'Needs Review'}
              </p>
            </div>

            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <p>Score: <strong className="text-slate-900 dark:text-white">{result.score} / {result.maxMarks}</strong> marks</p>
              <p>Correct: <strong className="text-emerald-600">{result.correctCount}</strong> / {result.totalQuestions}</p>
              <p>Incorrect: <strong className="text-rose-500">{result.incorrectCount}</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Analysis Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-50/70 via-accent-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 border border-brand-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Performance Diagnostics & Insights
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Granular cognitive feedback derived from your answer patterns
              </p>
            </div>
          </div>

          <DemoNotice isLive={aiFeedback?.isLive} />
        </div>

        {/* AI Summary Text */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {aiFeedback?.summary || "Analyzing response parameters..."}
        </div>

        {/* Strong Topics vs Topics Needing Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strong */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Demonstrated Strengths</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
              {aiFeedback?.strongTopics?.map((top, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{top}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weak / Improvement */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Areas for Improvement</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
              {aiFeedback?.topicsToImprove?.map((top, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{top}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personalized AI Suggestions */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-brand-600" />
            <span>Targeted Study Suggestions</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {aiFeedback?.recommendations?.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Immutable Question-by-Question Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Detailed Question-by-Question Review
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exam answers are finalized and immutable. Review correct answers and detailed explanations below.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Read-Only
          </span>
        </div>

        <div className="space-y-4">
          {result.questions?.map((q, idx) => {
            const userAnswer = result.userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnattempted = userAnswer === undefined;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/60'
                    : isUnattempted
                    ? 'border-slate-200 dark:border-slate-800'
                    : 'border-rose-200 dark:border-rose-900/60'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <DifficultyBadge difficulty={q.difficulty} />
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : isUnattempted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        Unattempted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        <X className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <p className="text-base font-semibold text-slate-900 dark:text-white mb-4">
                  {q.questionText}
                </p>

                {/* 4 Options Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options?.map((opt, optIdx) => {
                    const isOptionCorrect = opt === q.correctAnswer;
                    const isUserChoice = opt === userAnswer;

                    let optClass = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                    if (isOptionCorrect) {
                      optClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      optClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                      >
                        <span>{opt}</span>
                        {isOptionCorrect && (
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                            Correct Answer
                          </span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="p-3.5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50 text-xs space-y-1">
                  <span className="font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    <span>Explanation & Key Learning:</span>
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footers */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <Link
          to="/student"
          className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          Return to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/study-assistant"
            className="px-6 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Clarify with AI Study Assistant</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
