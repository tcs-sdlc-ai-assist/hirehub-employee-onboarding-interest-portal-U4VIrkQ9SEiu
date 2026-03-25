import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthProvider';

export function Header() {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <svg
            className="header-logo-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <text
              x="16"
              y="22"
              textAnchor="middle"
              fill="white"
              fontSize="18"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              H
            </text>
          </svg>
          HireHub
        </Link>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header-nav-link${isActive ? ' active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `header-nav-link${isActive ? ' active' : ''}`
            }
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `header-nav-link${isActive ? ' active' : ''}`
            }
          >
            Admin
          </NavLink>

          {isAdmin ? (
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/admin" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}