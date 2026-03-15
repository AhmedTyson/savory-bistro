import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

function Footer({ variant = 'full' }) {
  const [email, setEmail] = useState('');

  return (
    <footer className="Footer">
      <div className="Footer__container container">
        <div className="Footer__grid">

          <div className="Footer__brand">
            <div className="Footer__brand-wrapper flex items-center gap-2 mb-3">
              <UtensilsCrossed className="Footer__brand-icon" size={20} />
              <span className="Footer__brand-name">Savory Bistro</span>
            </div>
            <p className="Footer__tagline leading-relaxed max-w-[280px]">
              {variant === 'full'
                ? 'Refining the art of seasonal dining with locally sourced ingredients and a commitment to culinary excellence.'
                : 'Crafting unforgettable dining experiences since 2012. Our focus is on seasonal ingredients and soulful cooking.'}
            </p>
          </div>

          {variant === 'full' && (
            <div className="Footer__column">
              <h4 className="Footer__column-title">Quick Links</h4>
              <ul className="Footer__links">
                <li><NavLink className="Footer__link" to="/about">Our Story</NavLink></li>
                <li><NavLink className="Footer__link" to="/reservations">Book a Table</NavLink></li>
                <li><a className="Footer__link" href="#">Private Events</a></li>
                <li><a className="Footer__link" href="#">Gift Cards</a></li>
                <li><a className="Footer__link" href="#">Careers</a></li>
              </ul>
            </div>
          )}

          {variant === 'light' && (
            <div className="Footer__column">
              <h4 className="Footer__column-title">Visit Us</h4>
              <p className="Footer__text">123 Culinary Avenue<br />Gastronomy District, NY 10012</p>
            </div>
          )}

          <div className="Footer__column">
            <h4 className="Footer__column-title">Newsletter</h4>
            <p className="Footer__text mb-4">Get exclusive offers and recipes delivered to your inbox.</p>
            <div className="Footer__newsletter">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="Footer__newsletter-input"
              />
              <button className="Footer__newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="Footer__bottom">
        <p className="Footer__copyright">© 2024 Savory Bistro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
