import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

function Footer({ variant = 'full' }) {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed className="text-[var(--color-primary)]" size={20} />
              <span className="font-serif text-lg font-bold">Savory Bistro</span>
            </div>
            <p className="footer__muted text-[13px] leading-relaxed max-w-[280px]">
              {variant === 'full'
                ? 'Refining the art of seasonal dining with locally sourced ingredients and a commitment to culinary excellence.'
                : 'Crafting unforgettable dining experiences since 2012. Our focus is on seasonal ingredients and soulful cooking.'}
            </p>
          </div>

          {variant === 'full' && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="footer__links flex flex-col gap-2">
                <li><NavLink to="/about">Our Story</NavLink></li>
                <li><NavLink to="/reservations">Book a Table</NavLink></li>
                <li><a href="#">Private Events</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          )}

          {variant === 'light' && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Visit Us</h4>
              <p className="footer__muted text-[13px] leading-loose">123 Culinary Avenue<br />Gastronomy District, NY 10012</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Newsletter</h4>
            <p className="footer__muted text-[13px] mb-4">Get exclusive offers and recipes delivered to your inbox.</p>
            <div className="flex gap-2">
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
      <div className="border-t border-white/8 py-4 text-center">
        <p className="text-xs text-[#666]">© 2024 Savory Bistro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
