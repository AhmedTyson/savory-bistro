import { Clock, MapPin, MessageCircleQuestion, Phone, Mail } from 'lucide-react';
import './ReservationSidebar.css';

function ReservationSidebar({ setShowInquiry }) {
  return (
    <aside className="ReservationSidebar">

      {/* ── TODAY'S HOURS ── */}
      <div className="ReservationSidebar__card">
        <h3 className="ReservationSidebar__card-title">
          <Clock size={17} className="ReservationSidebar__card-icon--primary" />
          Today's Hours
        </h3>
        <div className="ReservationSidebar__card-padded">
          <div className="ReservationSidebar__hours">
            <div className="ReservationSidebar__hours-row">
              <span>Lunch</span>
              <span>11:30 AM – 2:30 PM</span>
            </div>
            <div className="ReservationSidebar__hours-row">
              <span>Dinner</span>
              <span>5:00 PM – 10:00 PM</span>
            </div>
          </div>
          <p className="ReservationSidebar__card-note">
            Kitchen closes 30 minutes before end of service.
          </p>
        </div>
      </div>

      {/* ── CONTACT US ── */}
      <div className="ReservationSidebar__card ReservationSidebar__card--beige">
        <h3 className="ReservationSidebar__card-title">
          <MessageCircleQuestion size={17} className="ReservationSidebar__card-icon--primary" />
          Contact Us
        </h3>
        <div className="ReservationSidebar__card-padded">
          <div className="ReservationSidebar__contact-item">
            <Phone size={14} />
            (555) 123-4567
          </div>
          <div className="ReservationSidebar__contact-item">
            <Mail size={14} />
            hello@savorybistro.com
          </div>
          <div className="ReservationSidebar__card-large-note">
            <strong>Large Parties</strong>
            <p>
              For parties of 11 or more, please call us directly to discuss
              our set menu options.
            </p>
          </div>
        </div>
      </div>

      {/* ── PRIVATE DINING ── */}
      <div className="ReservationSidebar__card ReservationSidebar__card--dining">
        <div className="ReservationSidebar__card-hero">
          <img
            src="/images/reservations/private-dining-hero.webp"
            alt="Private dining room"
            className="ReservationSidebar__card-img"
            onError={e => { e.target.style.display = "none"; }}
          />
          <div className="ReservationSidebar__card-overlay" />
          <h3 className="ReservationSidebar__card-overlay-title">Private Dining</h3>
        </div>
        <div className="ReservationSidebar__card-body">
          <p className="ReservationSidebar__card-text">
            Host your special event in our exclusive vault room or garden terrace.
          </p>
          <button
            type="button"
            className="ReservationSidebar__inquire-btn"
            onClick={() => setShowInquiry(true)}
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* ── MAP ── */}
      <div className="ReservationSidebar__card ReservationSidebar__card--map">
        <div className="ReservationSidebar__map-container">
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
        <div className="ReservationSidebar__map-footer">
          <div className="ReservationSidebar__map-info">
            <strong>123 Culinary Way</strong>
            <span>Downtown Chicago, IL</span>
          </div>
          <a
            href="https://www.google.com/maps/search/123+Culinary+Way+Downtown+Chicago"
            target="_blank"
            rel="noopener noreferrer"
            className="ReservationSidebar__map-link"
          >
            Get Directions ↗
          </a>
        </div>
      </div>

    </aside>
  );
}

export default ReservationSidebar;