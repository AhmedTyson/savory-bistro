import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

// variant: 'full' | 'light'
function Footer({ variant = 'full' }) {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          <div className="footer__brand">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed className="footer__brand-icon" size={20} />
              <span className="footer__brand-name">Savory Bistro</span>
            </div>
            <p className="footer__tagline">
              {variant === 'full'
                ? 'Refining the art of seasonal dining with locally sourced ingredients and a commitment to culinary excellence.'
                : 'Crafting unforgettable dining experiences since 2012. Our focus is on seasonal ingredients and soulful cooking.'}
            </p>
          </div>

          {variant === 'full' && (
            <div className="footer__col">
              <h4 className="footer__col-heading">Quick Links</h4>
              <ul className="footer__links">
                <li><NavLink to="/about">Our Story</NavLink></li>
                <li><NavLink to="/reservations">Book a Table</NavLink></li>
                <li><a href="#">Private Events</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          )}

          {variant === 'light' && (
            <div className="footer__col">
              <h4 className="footer__col-heading">Visit Us</h4>
              <p className="footer__address">123 Culinary Avenue<br />Gastronomy District, NY 10012</p>
            </div>
          )}

          <div className="footer__col">
            <h4 className="footer__col-heading">Newsletter</h4>
            <p className="footer__newsletter-text">Get exclusive offers and recipes delivered to your inbox.</p>
            <div className="footer__subscribe">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer__input"
              />
              <button className="footer__subscribe-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2024 Savory Bistro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
