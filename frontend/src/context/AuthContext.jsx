import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  student: {
    id: 1,
    name: 'Chaitra C R',
    email: 'chaitra.student@quizgenius.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    grade: 'Computer Science - Year 3',
  },
  admin: {
    id: 2,
    name: 'Prof. Alan Vance',
    email: 'admin@quizgenius.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Department of Computer Science & Engineering',
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('quizgenius_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('quizgenius_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('quizgenius_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('quizgenius_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('quizgenius_token', token);
    } else {
      localStorage.removeItem('quizgenius_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // First attempt backend API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('Backend unavailable, checking demo credentials fallback:', err);
    }

    // Fallback demo authentication
    await new Promise(r => setTimeout(r, 400)); // subtle realistic feel
    setLoading(false);

    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('teacher')) {
      const demoAdmin = { ...DEMO_USERS.admin, email };
      setUser(demoAdmin);
      setToken('demo-admin-jwt-token');
      return { success: true, user: demoAdmin };
    } else {
      const demoStudent = { ...DEMO_USERS.student, email: email || DEMO_USERS.student.email };
      setUser(demoStudent);
      setToken('demo-student-jwt-token');
      return { success: true, user: demoStudent };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('Backend unavailable, using demo registration fallback:', err);
    }

    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'student',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
      grade: userData.grade || 'General Studies'
    };
    setUser(newUser);
    setToken(`demo-user-token-${newUser.id}`);
    return { success: true, user: newUser };
  };

  const loginAsDemoStudent = () => {
    setUser(DEMO_USERS.student);
    setToken('demo-student-token');
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_USERS.admin);
    setToken('demo-admin-token');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('quizgenius_user');
    localStorage.removeItem('quizgenius_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'teacher',
        isStudent: user?.role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
