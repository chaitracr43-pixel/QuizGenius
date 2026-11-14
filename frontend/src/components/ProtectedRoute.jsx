import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && !(requiredRole === 'admin' && user.role === 'teacher')) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Access Restricted</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You do not have administrative permissions to view this section. This portal is reserved for teachers and system administrators.
          </p>
          <div className="pt-2">
            <a
              href="/student"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow hover:opacity-95 transition-all"
            >
              Return to Student Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
