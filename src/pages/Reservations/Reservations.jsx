import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Clock, Phone, Mail, MapPin,
  AlertCircle, CheckCircle, X
} from 'lucide-react';
import './Reservations.css';

/* ═══════════════════════════════════════════════════════
   MOCK DATA — reserved dates / times
   ═══════════════════════════════════════════════════════ */
const RESERVED_DATES = [
  '2026-03-20', '2026-03-22', '2026-03-25', '2026-03-28',
  '2026-04-01', '2026-04-05', '2026-04-10', '2026-04-14',
  '2026-04-18', '2026-04-22', '2026-04-26',
  '2026-05-02', '2026-05-06', '2026-05-12', '2026-05-16',
  '2026-05-20', '2026-05-24', '2026-05-30',
];

const ALL_TIMES = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'];

/* times already booked per date — those won't appear */
const RESERVED_TIMES = {
  '2026-03-19': ['18:00','19:00'],
  '2026-03-21': ['17:30','20:00'],
  '2026-03-23': ['18:30'],
  '2026-03-24': ['17:00','19:30','20:30'],
  '2026-04-02': ['18:00','18:30'],
  '2026-04-03': ['19:00'],
  '2026-04-07': ['17:00','20:00'],
};

const OCCASIONS = [
  'Birthday', 'Anniversary', 'Date Night', 'Business Dinner',
  'Graduation', 'Engagement','Promotion', 'Holiday Celebration',
  'Family Gathering', 'Reunion', 'Other',
];

const DAYS = ['S','M','T','W','T','F','S'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function pad(n) { return String(n).padStart(2, '0'); }
function toKey(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function firstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
function Reservations() {
  /* ── form state ── */
  const [partySize, setPartySize]           = useState('');
  const [occasion, setOccasion]             = useState('');
  const [selectedDate, setSelectedDate]     = useState(null);   // 'YYYY-MM-DD'
  const [selectedTime, setSelectedTime]     = useState('');
  const [fullName, setFullName]             = useState('');
  const [phone, setPhone]                   = useState('');
  const [email, setEmail]                   = useState('');
  const [specialReqs, setSpecialReqs]       = useState('');

  /* ── calendar state ── */
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  /* ── UI state ── */
  const [errors, setErrors]                 = useState({});
  const [showSuccess, setShowSuccess]       = useState(false);
  const [confirmedData, setConfirmedData]   = useState(null);
  const [showInquiry, setShowInquiry]       = useState(false);

  /* ── private dining inquiry state ── */
  const [inqName, setInqName]       = useState('');
  const [inqEmail, setInqEmail]     = useState('');
  const [inqPhone, setInqPhone]     = useState('');
  const [inqDate, setInqDate]       = useState('');
  const [inqSize, setInqSize]       = useState('');
  const [inqEvent, setInqEvent]     = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [inqErrors, setInqErrors]   = useState({});
  const [inqSuccess, setInqSuccess] = useState(false);

  /* ════════════════════════════════════════════════════
     CALENDAR LOGIC
     ════════════════════════════════════════════════════ */
  const calendarDays = useMemo(() => {
    const total = daysInMonth(calYear, calMonth);
    const start = firstDayOfMonth(calYear, calMonth);
    const cells = [];
    for (let i = 0; i < start; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [calYear, calMonth]);

  const isDateReserved = (d) => RESERVED_DATES.includes(toKey(calYear, calMonth, d));

  const isDatePast = (d) => {
    const dt = new Date(calYear, calMonth, d);
    const t  = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  /* ── available times for selected date ── */
  const availableTimes = useMemo(() => {
    if (!selectedDate) return ALL_TIMES;
    const booked = RESERVED_TIMES[selectedDate] || [];
    return ALL_TIMES.filter((t) => !booked.includes(t));
  }, [selectedDate]);

  /* ════════════════════════════════════════════════════
     RESERVATION VALIDATION & SUBMIT
     ════════════════════════════════════════════════════ */
  const validate = () => {
    const e = {};
    if (!partySize) e.partySize = 'Please select party size';
    if (!selectedDate) e.date = 'Please select a date';
    if (!selectedTime) e.time = 'Please select a time';
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!phone.trim()) e.phone = 'Phone number is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const reservation = {
      id: Date.now(),
      partySize,
      occasion: occasion || 'None',
      date: selectedDate,
      time: selectedTime,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      specialRequests: specialReqs.trim() || 'None',
      createdAt: new Date().toISOString(),
    };

    /* persist to localStorage */
    const stored = JSON.parse(localStorage.getItem('sb_reservations') || '[]');
    stored.push(reservation);
    localStorage.setItem('sb_reservations', JSON.stringify(stored));

    setConfirmedData(reservation);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setPartySize(''); setOccasion(''); setSelectedDate(null);
    setSelectedTime(''); setFullName(''); setPhone('');
    setEmail(''); setSpecialReqs(''); setErrors({});
    setShowSuccess(false); setConfirmedData(null);
  };

  /* ════════════════════════════════════════════════════
     PRIVATE DINING INQUIRY
     ════════════════════════════════════════════════════ */
  const validateInquiry = () => {
    const e = {};
    if (!inqName.trim()) e.name = 'Name is required';
    if (!inqEmail.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inqEmail)) e.email = 'Enter a valid email';
    if (!inqPhone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const errs = validateInquiry();
    setInqErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const inquiry = {
      id: Date.now(),
      name: inqName.trim(),
      email: inqEmail.trim(),
      phone: inqPhone.trim(),
      eventDate: inqDate || 'Not specified',
      partySize: inqSize || 'Not specified',
      eventType: inqEvent || 'Not specified',
      message: inqMessage.trim() || 'None',
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('sb_inquiries') || '[]');
    stored.push(inquiry);
    localStorage.setItem('sb_inquiries', JSON.stringify(stored));

    setInqSuccess(true);
  };

  const resetInquiry = () => {
    setInqName(''); setInqEmail(''); setInqPhone(''); setInqDate('');
    setInqSize(''); setInqEvent(''); setInqMessage('');
    setInqErrors({}); setInqSuccess(false); setShowInquiry(false);
  };

  /* ════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════ */
  return (
    <section className="reservations-page">
      <div className="container">

        {/* ── BREADCRUMB ── */}
        <nav className="res-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="res-breadcrumb__sep">›</span>
          <span className="res-breadcrumb__current">Reservations</span>
        </nav>

        {/* ── HEADER ── */}
        <h1 className="res-title">Book Your Table</h1>
        <p className="res-subtitle">We can't wait to host you at Savory Bistro.</p>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="res-grid">

          {/* ═══ LEFT: BOOKING FORM ═══ */}
          <form className="res-form" onSubmit={handleSubmit} noValidate>

            {/* Party Size & Occasion */}
            <div className="res-form__row">
              <div className="res-form__field">
                <label className="res-label">Party Size <span className="res-req">*</span></label>
                <select
                  className={`res-select ${errors.partySize ? 'res-input--error' : ''}`}
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                >
                  <option value="">Select guests</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errors.partySize && <span className="res-error"><AlertCircle size={13} /> {errors.partySize}</span>}
              </div>

              <div className="res-form__field">
                <label className="res-label">Occasion</label>
                <select
                  className="res-select"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option value="">Select occasion (optional)</option>
                  {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Calendar */}
            <div className="res-form__section">
              <label className="res-label">Select Date <span className="res-req">*</span></label>
              {errors.date && <span className="res-error"><AlertCircle size={13} /> {errors.date}</span>}

              <div className="res-calendar">
                <div className="res-calendar__header">
                  <button type="button" className="res-calendar__arrow" onClick={prevMonth}><ChevronLeft size={18} /></button>
                  <span className="res-calendar__month">{MONTHS[calMonth]} {calYear}</span>
                  <button type="button" className="res-calendar__arrow" onClick={nextMonth}><ChevronRight size={18} /></button>
                </div>

                <div className="res-calendar__days">
                  {DAYS.map((d, i) => <span key={i} className="res-calendar__day-label">{d}</span>)}
                </div>

                <div className="res-calendar__grid">
                  {calendarDays.map((d, i) => {
                    if (d === null) return <span key={`e${i}`} className="res-calendar__empty" />;
                    const key = toKey(calYear, calMonth, d);
                    const reserved = isDateReserved(d);
                    const past = isDatePast(d);
                    const active = selectedDate === key;
                    const disabled = reserved || past;

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={disabled}
                        className={`res-calendar__cell ${active ? 'res-calendar__cell--active' : ''} ${disabled ? 'res-calendar__cell--disabled' : ''}`}
                        onClick={() => { setSelectedDate(key); setSelectedTime(''); }}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                <div className="res-calendar__legend">
                  <span className="res-calendar__legend-item">
                    <span className="res-calendar__dot res-calendar__dot--available" /> Available
                  </span>
                  <span className="res-calendar__legend-item">
                    <span className="res-calendar__dot res-calendar__dot--reserved" /> Reserved
                  </span>
                </div>
              </div>
            </div>

            {/* Available Times */}
            <div className="res-form__section">
              <label className="res-label">Available Times <span className="res-req">*</span></label>
              {errors.time && <span className="res-error"><AlertCircle size={13} /> {errors.time}</span>}

              <div className="res-times">
                {availableTimes.length > 0 ? (
                  availableTimes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`res-time-pill ${selectedTime === t ? 'res-time-pill--active' : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))
                ) : (
                  <p className="res-times__empty">No available times for this date.</p>
                )}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="res-form__row">
              <div className="res-form__field">
                <label className="res-label">Full Name <span className="res-req">*</span></label>
                <input
                  type="text"
                  className={`res-input ${errors.fullName ? 'res-input--error' : ''}`}
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <span className="res-error"><AlertCircle size={13} /> {errors.fullName}</span>}
              </div>
              <div className="res-form__field">
                <label className="res-label">Phone Number <span className="res-req">*</span></label>
                <input
                  type="tel"
                  className={`res-input ${errors.phone ? 'res-input--error' : ''}`}
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <span className="res-error"><AlertCircle size={13} /> {errors.phone}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="res-form__section">
              <label className="res-label">Email Address <span className="res-req">*</span></label>
              <input
                type="email"
                className={`res-input ${errors.email ? 'res-input--error' : ''}`}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="res-error"><AlertCircle size={13} /> {errors.email}</span>}
            </div>

            {/* Special Requests */}
            <div className="res-form__section">
              <label className="res-label">Special Requests</label>
              <textarea
                className="res-textarea"
                placeholder="Dietary restrictions, seating preferences..."
                rows={4}
                value={specialReqs}
                onChange={(e) => setSpecialReqs(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button type="submit" className="res-submit-btn">Confirm Reservation</button>
          </form>

          {/* ═══ RIGHT: SIDEBAR ═══ */}
          <aside className="res-sidebar">

            {/* Today's Hours */}
            <div className="res-card">
              <h3 className="res-card__title">
                <Clock size={18} className="res-card__icon res-card__icon--primary" />
                Today's Hours
              </h3>
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
              <p className="res-card__note">Kitchen closes 30 minutes before end of service.</p>
            </div>

            {/* Contact Us */}
            <div className="res-card">
              <h3 className="res-card__title">
                <MapPin size={18} className="res-card__icon res-card__icon--primary" />
                Contact Us
              </h3>
              <div className="res-contact-row"><Phone size={15} /> (555) 123-4567</div>
              <div className="res-contact-row"><Mail size={15} /> hello@savorybistro.com</div>
              <div className="res-card__large-note">
                <strong>Large Parties</strong>
                <p>For parties of 11 or more, please call us directly to discuss our set menu options.</p>
              </div>
            </div>

            {/* Private Dining */}
            <div className="res-card res-card--dining">
              <div className="res-dining-img-wrap">
                <img
                  src="/images/Reservations/Private_Dining.webp"
                  alt="Private dining room"
                  className="res-dining-img"
                />
                <span className="res-dining-img__overlay">Private Dining</span>
              </div>
              <p className="res-dining-text">Host your special event in our exclusive vault room or garden terrace.</p>
              <button
                type="button"
                className="res-inquire-btn"
                onClick={() => setShowInquiry(true)}
              >
                Inquire Now
              </button>
            </div>

            {/* Map */}
            <div className="res-card res-card--map">
              <div className="res-map-embed">
                <iframe
                  title="Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.6484460838287!2d-87.6297982!3d41.8781136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca3e2d94695%3A0x4829f9cc902c5053!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2seg!4v1700000000000"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="res-map-info">
                <strong>123 Culinary Way</strong>
                <span>Downtown Chicago, IL</span>
              </div>
              <a
                href="https://www.google.com/maps/search/123+Culinary+Way+Downtown+Chicago+IL"
                target="_blank"
                rel="noopener noreferrer"
                className="res-map-link"
              >
                Get Directions ↗
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SUCCESS MODAL
          ═══════════════════════════════════════════════ */}
      {showSuccess && confirmedData && (
        <div className="res-modal-overlay" onClick={resetForm}>
          <div className="res-modal" onClick={(e) => e.stopPropagation()}>
            <button className="res-modal__close" onClick={resetForm}><X size={20} /></button>

            <div className="res-modal__check">
              <CheckCircle size={56} />
            </div>

            <h2 className="res-modal__title">Reservation Confirmed!</h2>
            <p className="res-modal__subtitle">We look forward to seeing you.</p>

            <div className="res-modal__details">
              {[
                ['Date', confirmedData.date],
                ['Time', confirmedData.time],
                ['Party Size', `${confirmedData.partySize} ${Number(confirmedData.partySize) === 1 ? 'Guest' : 'Guests'}`],
                ['Occasion', confirmedData.occasion],
                ['Name', confirmedData.fullName],
                ['Phone', confirmedData.phone],
                ['Email', confirmedData.email],
                ...(confirmedData.specialRequests !== 'None'
                  ? [['Requests', confirmedData.specialRequests]]
                  : []),
              ].map(([label, value], idx) => (
                <div
                  key={label}
                  className="res-modal__row res-modal__row--animated"
                  style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <button className="res-submit-btn" onClick={resetForm}>Done</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          PRIVATE DINING INQUIRY MODAL
          ═══════════════════════════════════════════════ */}
      {showInquiry && (
        <div className="res-modal-overlay" onClick={resetInquiry}>
          <div className="res-modal res-modal--inquiry" onClick={(e) => e.stopPropagation()}>
            <button className="res-modal__close" onClick={resetInquiry}><X size={20} /></button>

            {inqSuccess ? (
              <>
                <div className="res-modal__check"><CheckCircle size={56} /></div>
                <h2 className="res-modal__title">Inquiry Submitted!</h2>
                <p className="res-modal__subtitle">Our events team will contact you within 24 hours.</p>
                <button className="res-submit-btn" onClick={resetInquiry}>Done</button>
              </>
            ) : (
              <>
                <h2 className="res-modal__title">Private Dining Inquiry</h2>
                <p className="res-modal__subtitle">Tell us about your event and we'll get back to you shortly.</p>

                <form onSubmit={handleInquirySubmit} noValidate>
                  <div className="res-form__row">
                    <div className="res-form__field">
                      <label className="res-label">Name <span className="res-req">*</span></label>
                      <input className={`res-input ${inqErrors.name ? 'res-input--error' : ''}`} placeholder="Your name" value={inqName} onChange={(e) => setInqName(e.target.value)} />
                      {inqErrors.name && <span className="res-error"><AlertCircle size={13} /> {inqErrors.name}</span>}
                    </div>
                    <div className="res-form__field">
                      <label className="res-label">Email <span className="res-req">*</span></label>
                      <input type="email" className={`res-input ${inqErrors.email ? 'res-input--error' : ''}`} placeholder="you@email.com" value={inqEmail} onChange={(e) => setInqEmail(e.target.value)} />
                      {inqErrors.email && <span className="res-error"><AlertCircle size={13} /> {inqErrors.email}</span>}
                    </div>
                  </div>

                  <div className="res-form__row">
                    <div className="res-form__field">
                      <label className="res-label">Phone <span className="res-req">*</span></label>
                      <input type="tel" className={`res-input ${inqErrors.phone ? 'res-input--error' : ''}`} placeholder="(555) 000-0000" value={inqPhone} onChange={(e) => setInqPhone(e.target.value)} />
                      {inqErrors.phone && <span className="res-error"><AlertCircle size={13} /> {inqErrors.phone}</span>}
                    </div>
                    <div className="res-form__field">
                      <label className="res-label">Event Date</label>
                      <input type="date" className="res-input" value={inqDate} onChange={(e) => setInqDate(e.target.value)} />
                    </div>
                  </div>

                  <div className="res-form__row">
                    <div className="res-form__field">
                      <label className="res-label">Estimated Party Size</label>
                      <input type="number" className="res-input" placeholder="e.g. 25" min="1" value={inqSize} onChange={(e) => setInqSize(e.target.value)} />
                    </div>
                    <div className="res-form__field">
                      <label className="res-label">Event Type</label>
                      <select className="res-select" value={inqEvent} onChange={(e) => setInqEvent(e.target.value)}>
                        <option value="">Select type</option>
                        <option>Corporate Dinner</option>
                        <option>Wedding Reception</option>
                        <option>Birthday Party</option>
                        <option>Holiday Party</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="res-form__section">
                    <label className="res-label">Message</label>
                    <textarea className="res-textarea" rows={3} placeholder="Tell us about your event..." value={inqMessage} onChange={(e) => setInqMessage(e.target.value)} />
                  </div>

                  <button type="submit" className="res-submit-btn">Submit Inquiry</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Reservations;
