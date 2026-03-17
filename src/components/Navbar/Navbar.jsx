import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context';
import { useState } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Home',         path: '/',             end: true  },
  { label: 'Menu',         path: '/menu',          end: false },
  { label: 'Reservations', path: '/reservations',  end: false },
  { label: 'Gallery',      path: '/gallery',       end: false },
  { label: 'Contact',      path: '/contact',       end: false },
  { label: 'About Us',     path: '/about',         end: false }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();      // sets pendingToast in AuthContext
    navigate('/'); // go to Home so toast appears
    closeMenu();   // close mobile drawer if open
  }

  return (
    <nav className="Navbar">
      <div className="Navbar__container container">

        <NavLink to="/" className="Navbar__brand" onClick={closeMenu}>
          <UtensilsCrossed className="Navbar__brand-icon" size={20} />
          <span className="Navbar__brand-name">Savory Bistro</span>
        </NavLink>

        <ul className="Navbar__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `Navbar__link ${isActive ? 'Navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Zone */}
        <div className="Navbar__right">
          {!currentUser ? (
            <div className="Navbar__auth">
              <Link
                to="/login"
                className="Navbar__auth-link Navbar__auth-link--login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="Navbar__auth-link Navbar__auth-link--signup"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="Navbar__user">
              <UserCircle
                size={22}
                className="Navbar__user-icon"
              />
              <span className="Navbar__user-name">
                {currentUser.firstName}
              </span>
              <div className="Navbar__separator" />
              <button
                onClick={handleLogout}
                className="Navbar__logout-btn"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}

          <button
            className="Navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="Navbar__mobile-menu">
          <ul className="Navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `Navbar__mobile-link ${isActive ? 'Navbar__mobile-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="Navbar__mobile-divider" />

          {!currentUser ? (
            <div className="Navbar__mobile-auth">
              <Link
                to="/login"
                className="Navbar__mobile-link"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="Navbar__mobile-link Navbar__mobile-link--signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="Navbar__mobile-user">
              <div className="Navbar__mobile-user-row">
                <UserCircle
                  size={18}
                  className="Navbar__user-icon"
                />
                <span className="Navbar__user-name">
                  {currentUser.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="Navbar__mobile-logout-row"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
