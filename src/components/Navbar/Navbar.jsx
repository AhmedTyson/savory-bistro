import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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

        {/* Desktop Right Zone */}
        <div className="flex items-center gap-3">
          {!currentUser ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="nav-auth-login hidden md:flex items-center px-3 min-h-[44px] text-sm font-semibold transition-colors cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="nav-auth-signup hidden md:flex items-center px-[18px] min-h-[44px] text-sm font-semibold rounded-lg border border-solid transition-all cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <UserCircle
                size={22}
                className="text-[color:var(--color-primary)] flex-shrink-0"
              />
              <span className="text-sm font-semibold whitespace-nowrap nav-user-name">
                {currentUser.firstName}
              </span>
              <div className="w-px h-5 flex-shrink-0 nav-separator" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-[6px] px-[14px] min-h-[44px] text-[13px] font-medium rounded-lg border border-solid cursor-pointer transition-all nav-logout-btn"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}

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

      {/* Mobile Drawer */}
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

          <div className="mx-0 my-2 nav-mobile-divider" />

          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="mobile-link block"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mobile-link block font-semibold mobile-signup-link"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-[10px] px-6 py-[14px] border-b mobile-user-row">
                <UserCircle
                  size={18}
                  className="text-[color:var(--color-primary)] flex-shrink-0"
                />
                <span className="text-[15px] font-semibold nav-user-name">
                  {currentUser.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-6 py-[14px] text-[15px] font-medium border-b cursor-pointer transition-colors bg-transparent mobile-logout-row"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
