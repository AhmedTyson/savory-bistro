import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import data from '../../../mock-data.json';
import './Gallery.css';

function Gallery() {
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
    <div className="gallery-page">
      <div className="container section-padding">
        {/* Hero Section */}
        <SectionHeader 
          title="Moments at Savory Bistro" 
          subtitle="A visual journey through our signature dishes, curated dining spaces, and the passionate team behind the flavors."
        />

        {/* Filter Bar */}
        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`gallery-item ${item.size || 'medium'} ${item.type}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              
              <div className="gallery-overlay">
                {item.type === 'video' && (
                  <div className="video-overlay-content">
                    <span className="video-tag">VIDEO</span>
                    <div className="play-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="video-label">{item.alt}</span>
                  </div>
                )}
                {item.hasReservation && (
                  <div className="reservation-overlay-content">
                    <Button variant="primary" className="reserve-overlay-btn">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      Reserve a Table
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Explore More */}
        <div className="explore-more">
          <h3 className="explore-title">Explore More</h3>
          <div className="explore-grid">
            <div className="explore-card">
              <div className="explore-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div className="explore-content">
                <h4>Our Story</h4>
                <p>Learn about our journey from a small kitchen to a culinary destination.</p>
              </div>
            </div>
            <div className="explore-card">
              <div className="explore-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className="explore-content">
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

export default Gallery;
