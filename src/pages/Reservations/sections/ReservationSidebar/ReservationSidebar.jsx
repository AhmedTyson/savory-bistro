import { Clock, MapPin, MessageCircleQuestion, Phone, Mail } from 'lucide-react';
import './ReservationSidebar.css';

function ReservationSidebar({ setShowInquiry }) {
  return (
    <aside className="res-sidebar">

      {/* ── TODAY'S HOURS ── */}
      <div className="res-card">
        <h3 className="res-card__title">
          <Clock size={17} className="res-card__icon--primary" />
          Today's Hours
        </h3>
        <div className="res-card__padded">
          <div className="res-hours">
            <div className="res-hours__row">
              <span>Lunch</span>
              <span>11:30 AM – 2:30 PM</span>
            </div>
            <div className="res-hours__row">
              <span>Dinner</span>
              <span>5:00 PM – 10:00 PM</span>
            </div>
          </div>
          <p className="res-card__note">
            Kitchen closes 30 minutes before end of service.
          </p>
        </div>
      </div>

      {/* ── CONTACT US ── */}
      <div className="res-card res-card--beige">
        <h3 className="res-card__title">
          <MessageCircleQuestion size={17} className="res-card__icon--primary" />
          Contact Us
        </h3>
        <div className="res-card__padded">
          <div className="res-contact-item">
            <Phone size={14} />
            (555) 123-4567
          </div>
          <div className="res-contact-item">
            <Mail size={14} />
            hello@savorybistro.com
          </div>
          <div className="res-card__large-note">
            <strong>Large Parties</strong>
            <p>
              For parties of 11 or more, please call us directly to discuss
              our set menu options.
            </p>
          </div>
        </div>
      </div>

      {/* ── PRIVATE DINING ── */}
      <div className="res-card res-card--dining">
        <div className="res-card__hero">
          <img
            src="/images/reservations/private-dining-hero.webp"
            alt="Private dining room"
            className="res-card__img"
            onError={e => { e.target.style.display = "none"; }}
          />
          <div className="res-card__overlay" />
          <h3 className="res-card__overlay-title">Private Dining</h3>
        </div>
        <div className="res-card__body">
          <p className="res-card__text">
            Host your special event in our exclusive vault room or garden terrace.
          </p>
          <button
            type="button"
            className="res-inquire-btn"
            onClick={() => setShowInquiry(true)}
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* ── MAP ── */}
      <div className="res-card res-card--map">
        <div className="res-map-container">
          <iframe
            title="Savory Bistro Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.438495572836!2d-87.6312!3d41.8817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cb439a0c693%3A0x6965162489e27c1d!2sDowntown%20Chicago%2C%20Chicago%2C%20IL!5e0!3m2!1sen!2sus!4v1710892435000!5m2!1sen!2sus"
            width="100%"
            height="155"
            style={{ border: 0, borderRadius: 'var(--radius-md)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="res-map-footer">
          <div className="res-map-info">
            <strong>123 Culinary Way</strong>
            <span>Downtown Chicago, IL</span>
          </div>
          <a
            href="https://www.google.com/maps/search/123+Culinary+Way+Downtown+Chicago"
            target="_blank"
            rel="noopener noreferrer"
            className="res-map-link"
          >
            Get Directions ↗
          </a>
        </div>
      </div>

    </aside>
  );
}

export default ReservationSidebar;