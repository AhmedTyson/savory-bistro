import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import mockData from '../../mock-data.json';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('sb_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = useCallback((email, password) => {
    const found = mockData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userData = {
        email: found.email,
        name: `${found.firstName} ${found.lastName}`,
      };
      localStorage.setItem('sb_user', JSON.stringify(userData));
      setUser(userData);
      setShowLogin(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sb_user');
    setUser(null);
    setPendingRedirect(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        showLogin,
        setShowLogin,
        pendingRedirect,
        setPendingRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
