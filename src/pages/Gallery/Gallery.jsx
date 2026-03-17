import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import data from '../../../mock-data.json';
import './Gallery.css';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'interior', label: 'Interior' },
    { id: 'events', label: 'Events' },
    { id: 'chefsCreations', label: "Chef's Creations" }
  ];

  const filteredItems = activeFilter === 'all' 
    ? data.gallery 
    : data.gallery.filter(item => item.category === activeFilter);

  return (
    <div className="Gallery">
      <div className="Gallery__container container">
        {/* Header Section */}
        <SectionHeader 
          title="Moments at Savory Bistro" 
          subtitle="A visual journey through our signature dishes, curated dining spaces, and the passionate team behind the flavors."
          align="center"
        />

        {/* Filter Bar */}
        <div className="Gallery__filter-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`Gallery__filter-btn ${activeFilter === cat.id ? 'Gallery__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="Gallery__grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`Gallery__item Gallery__item--${item.size || 'medium'} Gallery__item--${item.type}`}>
              <img src={item.src} alt={item.alt} className="Gallery__image" loading="lazy" />
              
              <div className="Gallery__overlay">
                {item.type === 'video' && (
                  <div className="Gallery__video-content">
                    <span className="Gallery__video-tag">VIDEO</span>
                    <div className="Gallery__play-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="Gallery__video-label">{item.alt}</span>
                  </div>
                )}
                {item.hasReservation && (
                  <div className="Gallery__reservation-content">
                    <Button variant="primary" className="Gallery__reserve-btn">
                      <svg className="Gallery__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      Reserve a Table
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Explore More */}
        <div className="Gallery__explore">
          <h3 className="Gallery__explore-title">Explore More</h3>
          <div className="Gallery__explore-grid">
            <div className="Gallery__explore-card">
              <div className="Gallery__explore-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div className="Gallery__explore-content">
                <h4>Our Story</h4>
                <p>Learn about our journey from a small kitchen to a culinary destination.</p>
              </div>
            </div>
            <div className="Gallery__explore-card">
              <div className="Gallery__explore-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className="Gallery__explore-content">
                <h4>Join the Team</h4>
                <p>Passionate about food? We're always looking for new talent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

