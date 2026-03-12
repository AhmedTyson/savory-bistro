import { Link } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Home.css';

function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("../../public/images/HomePage/Burger_index_hero_section.webp")',
          backgroundColor: 'var(--color-bg-hero)'
        }}
      >
        {/* Darkening overlay as seen in the image */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Main Title: Savory Bistro */}
          <h1 
            className="text-6xl md:text-8xl lg:text-[120px] font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Savory Bistro
          </h1>

          {/* Script Subtitle: Authentic Flavors, Unforgettable Moments */}
          <p 
            className="text-xl md:text-3xl lg:text-4xl text-[var(--color-gold-accent)] mb-10"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Authentic Flavors, Unforgettable Moments
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronsDown size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default Home;
