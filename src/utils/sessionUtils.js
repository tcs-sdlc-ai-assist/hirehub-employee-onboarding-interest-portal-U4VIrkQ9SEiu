const SESSION_KEY = 'hirehub_admin_auth';

export function getAuthState() {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (data === null) {
      return { isAuthenticated: false, loginTime: null };
    }
    const parsed = JSON.parse(data);
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.isAuthenticated !== 'boolean') {
      console.warn('Corrupted sessionStorage: expected auth object, reset to unauthenticated');
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isAuthenticated: false, loginTime: null }));
      return { isAuthenticated: false, loginTime: null };
    }
    return parsed;
  } catch (e) {
    console.warn('Corrupted sessionStorage, reset to unauthenticated:', e);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isAuthenticated: false, loginTime: null }));
    return { isAuthenticated: false, loginTime: null };
  }
}

export function setAuthState(auth) {
  const authState = {
    isAuthenticated: auth.isAuthenticated || false,
    loginTime: auth.loginTime || new Date().toISOString(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(authState));
  return authState;
}

export function clearAuthState() {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isAuthenticated: false, loginTime: null }));
}