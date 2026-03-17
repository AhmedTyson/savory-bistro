import { Utensils, CalendarDays } from 'lucide-react';
import './MapEmbed.css';

export default function MapEmbed() {
  return (
    <div className="MapEmbed">
      <img 
        src="/images/ContactUs/rest_map.webp" 
        alt="Restaurant interior map" 
        className="MapEmbed__image" 
      />
      <div className="MapEmbed__marker">
        <div className="MapEmbed__pin">
          <Utensils size={20} color="white" />
        </div>
      </div>
      <button className="MapEmbed__reserve-btn">
        <CalendarDays size={20} />
        <span className="MapEmbed__reserve-label">Reserve Table</span>
      </button>
    </div>
  );
}
