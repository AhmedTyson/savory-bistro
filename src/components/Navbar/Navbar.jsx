import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, CalendarDays, Menu, X, UserCircle, LogOut } from 'lucide-react';
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
    logout();
    navigate('/');
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

        <div className="flex items-center gap-3">
          {!currentUser ? (
            <NavLink to="/reservations" className="nav-cta hidden md:flex items-center gap-2">
              <CalendarDays size={16} />
              Book Table
            </NavLink>
          ) : (
            <div className="hidden md:flex items-center gap-[8px]">
              <UserCircle size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                {currentUser.firstName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: '1px solid var(--color-border-input)',
                  borderRadius: 'var(--radius-md, 6px)',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  minHeight: '44px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-input)';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
              >
                <LogOut size={14} /> Logout
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
            {!currentUser && (
              <>
                <li>
                  <Link to="/login" className="mobile-link" onClick={closeMenu}>Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="mobile-link" onClick={closeMenu}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
          <div className="px-6 pt-4">
            {!currentUser ? (
              <NavLink
                to="/reservations"
                className="nav-cta flex items-center justify-center gap-2 w-full"
                onClick={closeMenu}
              >
                <CalendarDays size={16} />
                Book Table
              </NavLink>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-[var(--color-border-light)]">
                <div className="flex items-center gap-2">
                  <UserCircle size={20} color="var(--color-primary)" />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                </div>
                <button
                  onClick={() => { handleLogout(); closeMenu(); }}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-border-input)',
                    borderRadius: 'var(--radius-md, 6px)',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-input)';
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
