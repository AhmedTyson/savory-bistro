/** Hero.jsx - Landing Page Hero Section **/
import { Link } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';
import Button from '../../../../components/Button/Button';
import './Hero.css';

export default function Hero() {
  return (
    <div className="Hero">
      <div 
        className="Hero__bg"
        style={{ 
          backgroundImage: 'url("/images/home-page/burger-hero.webp")',
          backgroundColor: 'var(--color-bg-hero)'
        }}
      >
        <div className="Hero__overlay"></div>
      </div>
 
      <div className="Hero__content">
        <div className="Hero__container">
          <h1 className="Hero__title">
            Savory Bistro
          </h1>
 
          <p className="Hero__subtitle">
            Authentic Flavors, Unforgettable Moments
          </p>
 
          <div className="Hero__actions">
            <Link to="/menu" className="Hero__action-link">
              <Button variant="primary" className="Hero__button">
                View Menu
              </Button>
            </Link>
            <Link to="/reservations" className="Hero__action-link">
              <Button variant="outlined-dark" className="Hero__button">
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </div>
 
      <div className="Hero__scroll-indicator">
        <ChevronsDown size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
}
