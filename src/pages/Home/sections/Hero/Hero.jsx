import { Link } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';
import Button from '../../../../components/Button/Button';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero-section">
      {/* Background Image with Overlay */}
      <div 
        className="hero-bg"
        style={{ 
          backgroundImage: 'url("/images/HomePage/Burger_index_hero_section.webp")',
          backgroundColor: 'var(--color-bg-hero)'
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content Area */}
      <div className="hero-content container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="hero-title">
            Savory Bistro
          </h1>

          <p className="hero-subtitle">
            Authentic Flavors, Unforgettable Moments
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="w-full sm:w-auto">
              <Button variant="primary" className="min-w-[180px]">
                View Menu
              </Button>
            </Link>
            <Link to="/reservations" className="w-full sm:w-auto">
              <Button variant="outlined" className="min-w-[180px]">
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hero-scroll-indicator">
        <ChevronsDown size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
}
