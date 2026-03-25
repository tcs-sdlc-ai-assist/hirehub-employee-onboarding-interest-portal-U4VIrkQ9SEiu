import { useState, useCallback } from 'react';
import {
  getAuthState,
  setAuthState,
  clearAuthState,
} from '../utils/sessionUtils';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export function useSessionAuth() {
  const [authState, setAuth] = useState(() => getAuthState());

  const login = useCallback((username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const newState = setAuthState({
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      });
      setAuth(newState);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    clearAuthState();
    setAuth({ isAuthenticated: false, loginTime: null });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    loginTime: authState.loginTime,
    login,
    logout,
  };
}