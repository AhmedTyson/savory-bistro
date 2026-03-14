import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SignatureDishes.css';

export default function SignatureDishes({ dishes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate max index based on total dishes and visible count (roughly 3.5 cards)
  // For simplicity, we slide by 1 card at a time
  const maxIndex = Math.max(0, dishes.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="signature-section py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="section-title mb-2">Signature Dishes</h2>
            <p className="section-subtitle text-[#e67e22]">Hand-crafted culinary masterpieces</p>
          </div>
          
          <div className="carousel-nav flex gap-3">
            <button 
              onClick={handlePrev} 
              className={`nav-btn ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              disabled={currentIndex === 0}
              aria-label="Previous dish"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext} 
              className={`nav-btn ${currentIndex === maxIndex ? 'opacity-40 cursor-not-allowed' : ''}`}
              disabled={currentIndex === maxIndex}
              aria-label="Next dish"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="carousel-viewport overflow-visible md:overflow-hidden lg:-mr-48">
          <div 
            className="carousel-track flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(calc(-1 * ${currentIndex} * (var(--card-width) + var(--card-gap))))` 
            }}
          >
            {dishes.map((dish) => (
              <div key={dish.id} className="dish-card-wrapper">
                <div className="dish-card group">
                  <div className="dish-image-wrapper">
                    <img 
                      src={`/images/HomePage/${dish.name.replace(/ /g, '_')}.webp`} 
                      alt={dish.name} 
                      loading="lazy"
                      className="dish-image"
                    />
                    {dish.badge && (
                      <span className="dish-badge">Popular</span>
                    )}
                  </div>
                  <div className="dish-info p-[16px]">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="dish-name text-[16px] font-bold">{dish.name}</h3>
                      <span className="dish-price text-[15px] font-semibold">${dish.price}</span>
                    </div>
                    <p className="dish-desc text-[14px] leading-relaxed text-[#666] line-clamp-2">
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
