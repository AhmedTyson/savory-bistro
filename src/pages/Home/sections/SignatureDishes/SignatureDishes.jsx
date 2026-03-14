import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SignatureDishes.css';

export default function SignatureDishes({ dishes }) {
  // Navigation for carousel - simple placeholder for now
  const handlePrev = () => {};
  const handleNext = () => {};

  return (
    <section className="signature-section py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="section-title mb-2">Signature Dishes</h2>
            <p className="section-subtitle">Hand-crafted culinary masterpieces</p>
          </div>
          
          <div className="carousel-nav flex gap-4">
            <button 
              onClick={handlePrev} 
              className="nav-btn"
              aria-label="Previous dish"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext} 
              className="nav-btn"
              aria-label="Next dish"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="dishes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card group">
              <div className="dish-image-wrapper">
                <img 
                  src={`/images/HomePage/${dish.name.replace(/ /g, '_')}.webp`} 
                  alt={dish.name} 
                  className="dish-image"
                />
                {dish.badge && (
                  <span className="dish-badge">{dish.badge}</span>
                )}
              </div>
              <div className="dish-info p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="dish-name text-2xl font-bold">{dish.name}</h3>
                  <span className="dish-price">${dish.price}</span>
                </div>
                <p className="dish-desc text-muted line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
