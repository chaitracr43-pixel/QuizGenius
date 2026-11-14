import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Sparkles,
  Award,
  Users,
  BarChart3,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  GraduationCap
} from 'lucide-react';

export const Sidebar = () => {
  const { user, isAdmin, isStudent, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Available Exams', path: '/exams', icon: BookOpen },
    { name: 'My History & Results', path: '/student/history', icon: FileText },
    { name: 'AI Study Assistant', path: '/study-assistant', icon: Sparkles, highlight: true },
    { name: 'Leaderboard', path: '/leaderboard', icon: Award },
  ];

  const adminLinks = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Quizzes', path: '/admin/quizzes', icon: BookOpen },
    { name: 'Create New Quiz', path: '/admin/quizzes/create', icon: PlusCircle },
    { name: 'AI Quiz Generator', path: '/admin/ai-generator', icon: Sparkles, highlight: true },
    { name: 'Student Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'User Management', path: '/admin/users', icon: Users },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Floating Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-6 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Role Banner */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isAdmin ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
          }`}>
            {isAdmin ? <Shield className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Portal
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {isAdmin ? 'Teacher & Admin' : 'Student Workspace'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/student' || link.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <link.icon className={`w-5 h-5 shrink-0 ${link.highlight ? 'text-accent-400' : ''}`} />
            {!collapsed && (
              <span className="truncate flex-1">{link.name}</span>
            )}
            {!collapsed && link.highlight && (
              <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-accent-100 dark:bg-accent-950/80 text-accent-700 dark:text-accent-300">
                AI
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile footer in sidebar */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
          />
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          title="Sign out"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
