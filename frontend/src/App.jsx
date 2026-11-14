import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ExamList } from './pages/student/ExamList';
import { ExamRoom } from './pages/student/ExamRoom';
import { ExamResult } from './pages/student/ExamResult';
import { StudyAssistant } from './pages/student/StudyAssistant';
import { PerformanceHistory } from './pages/student/PerformanceHistory';
import { LeaderboardView } from './pages/student/LeaderboardView';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { QuizManagement } from './pages/admin/QuizManagement';
import { QuizEditor } from './pages/admin/QuizEditor';
import { AIQuizGenerator } from './pages/admin/AIQuizGenerator';
import { AnalyticsView } from './pages/admin/AnalyticsView';
import { UserManagement } from './pages/admin/UserManagement';

export const App = () => {
  const location = useLocation();

  const isExamRoom = location.pathname.startsWith('/exams/') && !location.pathname.includes('/results');
  const isDashboardRoute = location.pathname.startsWith('/student') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navigation */}
      {!isExamRoom && <Navbar />}

      {/* Main Content Area */}
      {isDashboardRoute ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Routes>
              {/* Student Protected Portal */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/history"
                element={
                  <ProtectedRoute requiredRole="student">
                    <PerformanceHistory />
                  </ProtectedRoute>
                }
              />

              {/* Admin & Teacher Protected Portal */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/quizzes"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <QuizManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/quizzes/create"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <QuizEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/quizzes/edit/:id"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <QuizEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/ai-generator"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AIQuizGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AnalyticsView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public & Student Accessible Quizzes */}
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exams/:id" element={<ExamRoom />} />
            <Route path="/exams/results/:id" element={<ExamResult />} />

            {/* AI Assistant & Global Leaderboard */}
            <Route path="/study-assistant" element={<StudyAssistant />} />
            <Route path="/leaderboard" element={<LeaderboardView />} />
          </Routes>
        </main>
      )}

      {/* Footer */}
      {!isExamRoom && <Footer />}
    </div>
  );
};
