import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

function Footer({ variant = 'full' }) {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

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
                <li><NavLink className="Footer__link" to="/private-events">Private Events</NavLink></li>
                <li><NavLink className="Footer__link" to="/gift-cards">Gift Cards</NavLink></li>
                <li><NavLink className="Footer__link" to="/careers">Careers</NavLink></li>
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
            <form className="Footer__newsletter-form" onSubmit={handleSubmit}>
              <div className="Footer__newsletter">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleInputChange}
                  className={`Footer__newsletter-input ${status === 'error' ? 'Footer__newsletter-input--error' : ''}`}
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit"
                  className={`Footer__newsletter-btn ${status === 'loading' ? 'Footer__newsletter-btn--loading' : ''}`} 
                  aria-label="Subscribe"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <div className="Footer__newsletter-spinner"></div>
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              </div>
              {message && (
                <p className={`Footer__newsletter-msg Footer__newsletter-msg--${status}`}>
                  {message}
                </p>
              )}
            </form>
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
