import { Clock, MapPin } from 'lucide-react';

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
          {/* MessageCircleQuestion inline SVG */}
          <svg
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className="res-card__icon--primary"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Contact Us
        </h3>
        <div className="res-card__padded">
          {/* Phone */}
          <div className="res-contact-item">
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (555) 123-4567
          </div>
          {/* Email */}
          <div className="res-contact-item">
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            hello@savorybistro.com
          </div>
          {/* Large parties note */}
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
            src="/images/Reservations/Private_Dining.webp"
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
        <div className="res-map-static">
          {/* Static SVG — no network request, works everywhere */}
          <svg
            viewBox="0 0 300 155"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* base */}
            <rect width="300" height="155" fill="#C8D9CE" />
            {/* major roads */}
            <rect x="0" y="68" width="300" height="19" fill="#B4CCBC" />
            <line x1="0" y1="77" x2="300" y2="77" stroke="#fff" strokeWidth="1.5" strokeDasharray="16 10" opacity=".55" />
            <rect x="136" y="0" width="22" height="155" fill="#B4CCBC" />
            <line x1="147" y1="0" x2="147" y2="155" stroke="#fff" strokeWidth="1.5" strokeDasharray="16 10" opacity=".55" />
            {/* minor roads */}
            <rect x="0" y="34" width="300" height="8" fill="#BDD3C6" opacity=".7" />
            <rect x="0" y="118" width="300" height="8" fill="#BDD3C6" opacity=".7" />
            <rect x="73" y="0" width="7" height="155" fill="#BDD3C6" opacity=".65" />
            <rect x="220" y="0" width="7" height="155" fill="#BDD3C6" opacity=".65" />
            {/* blocks */}
            <rect x="9"  y="9"  width="56" height="20" rx="3" fill="#A8C2B0" opacity=".55" />
            <rect x="9"  y="42" width="38" height="20" rx="3" fill="#A8C2B0" opacity=".48" />
            <rect x="82" y="9"  width="46" height="20" rx="3" fill="#A8C2B0" opacity=".45" />
            <rect x="82" y="42" width="30" height="18" rx="3" fill="#A8C2B0" opacity=".4"  />
            <rect x="162" y="9"  width="50" height="20" rx="3" fill="#A8C2B0" opacity=".5"  />
            <rect x="228" y="9"  width="62" height="20" rx="3" fill="#A8C2B0" opacity=".45" />
            <rect x="162" y="42" width="50" height="18" rx="3" fill="#A8C2B0" opacity=".4"  />
            <rect x="228" y="42" width="40" height="18" rx="3" fill="#A8C2B0" opacity=".45" />
            <rect x="9"  y="90" width="56" height="28" rx="3" fill="#A8C2B0" opacity=".5"  />
            <rect x="162" y="90" width="50" height="28" rx="3" fill="#A8C2B0" opacity=".45" />
            <rect x="228" y="90" width="62" height="28" rx="3" fill="#A8C2B0" opacity=".4"  />
            <rect x="9"  y="128" width="44" height="18" rx="3" fill="#A8C2B0" opacity=".4"  />
            <rect x="82" y="96" width="46" height="22" rx="3" fill="#A8C2B0" opacity=".4"  />
          </svg>
          {/* Pin */}
          <div className="res-map-pin">
            <div className="res-map-pin-circle">
              <MapPin size={17} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
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