import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Play, Calendar, BookOpen, Users } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import data from '../../../mock-data.json';
import './Gallery.css';

export default function Gallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);

  // lock body scroll when modal is open and add escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };

    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'interior', label: 'Interior' },
    { id: 'events', label: 'Events' },
    { id: 'chefsCreations', label: "Chef's Creations" }
  ];

  const exploreCards = [
    {
      title: 'Our Story',
      description: 'Learn about our journey from a small kitchen to a culinary destination.',
      icon: BookOpen,
      path: '/about'
    },
    {
      title: 'Join the Team',
      description: "Passionate about food? We're always looking for new talent.",
      icon: Users,
      path: '/contact'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? data.gallery 
    : data.gallery.filter(item => item.category === activeFilter);

  return (
    <div className="Gallery">
      <div className="Gallery__container container">
        <SectionHeader 
          title="Moments at Savory Bistro" 
          subtitle="A visual journey through our signature dishes, curated dining spaces, and the passionate team behind the flavors."
          align="center"
        />

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

        <div className="Gallery__grid">
          {filteredItems.map(item => (
            <GalleryItem 
              key={item.id} 
              item={item} 
              onPlay={() => setActiveVideo(item.videoSrc)} 
              onReserve={() => navigate('/reservations')} 
            />
          ))}
        </div>

        <div className="Gallery__explore">
          <h3 className="Gallery__explore-title">Explore More</h3>
          <div className="Gallery__explore-grid">
            {exploreCards.map((card, idx) => (
              <ExploreCard key={idx} {...card} onClick={() => navigate(card.path)} />
            ))}
          </div>
        </div>
      </div>

      <VideoModal videoSrc={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}

function GalleryItem({ item, onPlay, onReserve }) {
  return (
    <div className={`Gallery__item Gallery__item--${item.size || 'medium'} Gallery__item--${item.type}`}>
      <img src={item.src} alt={item.alt} className="Gallery__image" loading="lazy" />
      
      <div className="Gallery__overlay">
        {item.type === 'video' && (
          <button 
            className="Gallery__video-content" 
            onClick={(e) => { e.stopPropagation(); onPlay(); }} 
            aria-label={`Play video: ${item.alt}`}
          >
            <span className="Gallery__video-tag">VIDEO</span>
            <div className="Gallery__play-btn">
              <Play fill="currentColor" size={24} />
            </div>
            <span className="Gallery__video-label">{item.alt}</span>
          </button>
        )}
        {item.hasReservation && (
          <div className="Gallery__reservation-content">
            <Button variant="primary" className="Gallery__reserve-btn" onClick={(e) => { e.stopPropagation(); onReserve(); }}>
              <Calendar className="Gallery__icon" size={16} />
              Reserve a Table
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ExploreCard({ title, description, icon: Icon, onClick }) {
  return (
    <div className="Gallery__explore-card" onClick={onClick} role="button" tabIndex={0} aria-label={`Navigate to ${title}`}>
      <div className="Gallery__explore-icon">
        <Icon strokeWidth={2} />
      </div>
      <div className="Gallery__explore-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

function VideoModal({ videoSrc, onClose }) {
  if (!videoSrc) return null;

  return (
    <div className="Gallery__video-modal" onClick={onClose}>
      <div className="Gallery__modal-content" onClick={e => e.stopPropagation()}>
        <button className="Gallery__modal-close" onClick={onClose} aria-label="Close Video">
          <X size={24} />
        </button>
        <video src={videoSrc} className="Gallery__video-player" controls autoPlay />
      </div>
    </div>
  );
}


