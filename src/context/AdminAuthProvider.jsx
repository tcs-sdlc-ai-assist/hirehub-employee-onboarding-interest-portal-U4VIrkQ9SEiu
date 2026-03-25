import { createContext, useContext } from 'react';
import { useSessionAuth } from '../hooks/useSessionAuth';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const { isAuthenticated, loginTime, login, logout } = useSessionAuth();

  const value = {
    isAdmin: isAuthenticated,
    loginTime,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === null) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}