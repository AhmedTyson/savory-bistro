/** Navbar.jsx - Global Navigation & User Menu **/
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, UserCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context';
import { useState } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import './Navbar.css';

const navLinks = [
  { label: 'Home',         path: '/',             end: true  },
  { label: 'Menu',         path: '/menu',          end: false },
  { label: 'Reservations', path: '/reservations',  end: false },
  { label: 'Gallery',      path: '/gallery',       end: false },
  { label: 'ContactUs',   path: '/contact',       end: false },
  { label: 'AboutUs',     path: '/about',         end: false }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen: isUserDropdownOpen, setIsOpen: setIsUserDropdownOpen, containerRef: userDropdownRef } = useDropdown(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
    logout(); // Toast fires on redirect in App.jsx
    setIsUserDropdownOpen(false); 
    navigate('/'); 
    closeMenu();   
  }

  // Filter visibility based on auth status (e.g., hide Reservations for guests)
  const visibleLinks = navLinks.filter(link => {
    if (link.path === '/reservations' && !currentUser) return false;
    return true;
  });

  return (
    <nav className="Navbar">
      <div className="Navbar__container container">

        <NavLink to="/" className="Navbar__brand" onClick={closeMenu}>
          <UtensilsCrossed className="Navbar__brand-icon" size={20} />
          <span className="Navbar__brand-name">Savory Bistro</span>
        </NavLink>

        <ul className="Navbar__links">
          {visibleLinks.map((link) => (
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

        {/* Desktop zone: Auth links or User Profile dropdown */}
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
            <div className="Navbar__user" ref={userDropdownRef}>
              <div 
                className={`Navbar__user-trigger ${isUserDropdownOpen ? 'Navbar__user-trigger--active' : ''}`}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <UserCircle size={22} className="Navbar__user-icon" />
                <span className="Navbar__user-name">{currentUser.firstName}</span>
                <ChevronDown size={14} className={`Navbar__dropdown-chevron ${isUserDropdownOpen ? 'Navbar__dropdown-chevron--rotated' : ''}`} />
              </div>
              
              <div className={`Navbar__dropdown ${isUserDropdownOpen ? 'Navbar__dropdown--open' : ''}`}>
                <Link 
                  to="/dashboard" 
                  className="Navbar__dropdown-item"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <UserCircle size={16} />
                  My Account
                </Link>
                <div className="Navbar__dropdown-divider" />
                <button onClick={handleLogout} className="Navbar__dropdown-item Navbar__dropdown-item--logout">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
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

      {/* Mobile drawer: Animated slide-in menu */}
      {menuOpen && (
        <div className="Navbar__mobile-menu">
          <ul className="Navbar__mobile-links">
            {visibleLinks.map((link) => (
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
              <Link
                to="/dashboard"
                className="Navbar__mobile-link"
                onClick={closeMenu}
              >My Account</Link>
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
