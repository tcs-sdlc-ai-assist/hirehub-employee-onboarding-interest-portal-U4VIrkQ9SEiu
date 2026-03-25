import { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthProvider';

export function AdminLoginForm() {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    const success = login(username.trim(), password);

    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container" style={{ maxWidth: '440px' }}>
        <div className="form-header text-center">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin dashboard.</p>
        </div>

        <div className="form-card">
          {error && (
            <div
              className="form-error"
              style={{
                marginBottom: 'var(--spacing-lg)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username<span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password<span className="form-label-required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}