import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar sticky top-0 z-50 bg-white">
      <div className="container flex items-center justify-between h-16">

        {/* Brand Logo */}
        <NavLink to="/" className="navbar__brand flex items-center gap-2" onClick={closeMenu}>
          <UtensilsCrossed className="navbar__brand-icon" size={20} />
          <span className="navbar__brand-name">Savory Bistro</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <NavLink to="/reservations" className="navbar__cta hidden md:flex items-center gap-2">
            <CalendarDays size={16} />
            Book Table
          </NavLink>

          {/* Hamburger button — mobile only */}
          <button
            className="navbar__hamburger flex md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu md:hidden">
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive
                      ? 'navbar__mobile-link navbar__mobile-link--active'
                      : 'navbar__mobile-link'
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile CTA Button */}
          <div className="navbar__mobile-cta">
            <NavLink
              to="/reservations"
              className="navbar__cta flex items-center justify-center gap-2 w-full"
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
