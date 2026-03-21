/** SignatureDishes.jsx - Interactive Menu Showcase **/
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SignatureDishes.css';

export default function SignatureDishes({ dishes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate carousel offsets for smooth sliding
  const maxIndex = Math.max(0, dishes.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="SignatureDishes">
      <div className="SignatureDishes__container">
        <div className="SignatureDishes__header">
          <div className="SignatureDishes__heading-group">
            <h2 className="SignatureDishes__title">Signature Dishes</h2>
            <p className="SignatureDishes__subtitle">Hand-crafted culinary masterpieces</p>
          </div>
          
          <div className="SignatureDishes__carousel-nav">
            <button 
              onClick={handlePrev} 
              className={`SignatureDishes__nav-btn ${currentIndex === 0 ? 'SignatureDishes__nav-btn--disabled' : ''}`}
              disabled={currentIndex === 0}
              aria-label="Previous dish"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext} 
              className={`SignatureDishes__nav-btn ${currentIndex === maxIndex ? 'SignatureDishes__nav-btn--disabled' : ''}`}
              disabled={currentIndex === maxIndex}
              aria-label="Next dish"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="SignatureDishes__carousel-viewport">
          <div 
            className="SignatureDishes__carousel-track"
            style={{ 
              transform: `translateX(calc(-1 * ${currentIndex} * (var(--card-width) + var(--card-gap))))` 
            }}
          >
            {dishes.map((dish) => (
              <div key={dish.id} className="SignatureDishes__card-wrapper">
                <div className="SignatureDishes__card">
                  <div className="SignatureDishes__image-wrapper">
                    <img 
                      src={`/images/home-page/${dish.name.toLowerCase().replace(/ /g, '-')}.webp`} 
                      alt={dish.name} 
                      loading="lazy"
                      className="SignatureDishes__image"
                    />
                    {dish.badge && (
                      <span className="SignatureDishes__badge">Popular</span>
                    )}
                  </div>
                  <div className="SignatureDishes__info">
                    <div className="SignatureDishes__card-header">
                      <h3 className="SignatureDishes__dish-name">{dish.name}</h3>
                      <span className="SignatureDishes__dish-price">${dish.price}</span>
                    </div>
                    <p className="SignatureDishes__dish-desc">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
