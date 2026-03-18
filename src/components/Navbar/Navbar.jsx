import { NavLink, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, CalendarDays, Menu, X, User, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Home',         path: '/',             end: true  },
  { label: 'Menu',         path: '/menu',          end: false },
  { label: 'Reservations', path: '/reservations',  end: false },
  { label: 'Gallery',      path: '/gallery',       end: false },
  { label: 'Contact',      path: '/contact',       end: false },
  { label: 'About Us',     path: '/about',         end: false },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { isAuthenticated, user, logout, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setUserDropdown(!userDropdown);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate('/');
  };

  return (
    <nav className="navbar sticky top-0 z-50 bg-white border-b border-[var(--color-border-light)]">
      <div className="container flex items-center justify-between h-16">

        <NavLink to="/" className="flex items-center gap-2 no-underline shrink-0" onClick={closeMenu}>
          <UtensilsCrossed className="text-[var(--color-primary)]" size={20} />
          <span className="font-serif text-lg font-bold text-[var(--color-text-heading)]">Savory Bistro</span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* User Icon */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="navbar__user-btn"
              onClick={handleUserClick}
              aria-label={isAuthenticated ? 'User menu' : 'Sign in'}
            >
              {isAuthenticated ? (
                <span className="navbar__user-avatar">{user.name.charAt(0)}</span>
              ) : (
                <User size={20} />
              )}
            </button>

            {userDropdown && isAuthenticated && (
              <div className="navbar__dropdown">
                <p className="navbar__dropdown-name">{user.name}</p>
                <p className="navbar__dropdown-email">{user.email}</p>
                <hr className="navbar__dropdown-divider" />
                <button className="navbar__dropdown-logout" onClick={handleLogout}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>

          <NavLink to="/reservations" className="nav-cta hidden md:flex items-center gap-2">
            <CalendarDays size={16} />
            Book Table
          </NavLink>

          <button
            className="flex md:hidden items-center justify-center p-1 bg-transparent border-none cursor-pointer text-[var(--color-text-heading)] hover:text-[var(--color-primary)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border-light)] py-4 shadow-lg">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `mobile-link ${isActive ? 'mobile-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-4">
            <NavLink
              to="/reservations"
              className="nav-cta flex items-center justify-center gap-2 w-full"
              onClick={closeMenu}
            >
              <CalendarDays size={16} />
              Book Table
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
