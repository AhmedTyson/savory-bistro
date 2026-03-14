import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import mockData from '../../../mock-data.json';

// Sections
import Hero from './sections/Hero/Hero';
import InfoBar from './sections/InfoBar/InfoBar';
import About from './sections/About/About';
import SignatureDishes from './sections/SignatureDishes/SignatureDishes';
import ChefSpecial from './sections/ChefSpecial/ChefSpecial';
import Testimonials from './sections/Testimonials/Testimonials';

import './Home.css';

function Home() {
  const location = useLocation();
  const [toast, setToast] = useState(() => {
    const s = location.state;
    if (s?.toast && s?.firstName) return { type: s.toast, firstName: s.firstName };
    return null;
  });

  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <div className="home-page overflow-x-hidden">
      {toast && (
        <Toast 
          type={toast.type} 
          firstName={toast.firstName} 
          onDismiss={dismissToast} 
        />
      )}

      <Hero />
      <InfoBar />
      <About />
      <SignatureDishes dishes={mockData.signatureDishes} />
      <ChefSpecial />
      <Testimonials reviews={mockData.testimonials} />
    </div>
  );
}

export default Home;
