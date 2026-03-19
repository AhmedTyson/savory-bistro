import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context';
import { CheckCircle, X, AlertCircle, ChevronDown } from 'lucide-react';
import './PrivateDiningModal.css';

function PrivateDiningModal({ showInquiry, setShowInquiry, onSuccess }) {
  const { currentUser, showToast } = useAuth();
  const [inqName,    setInqName]    = useState('');
  const [inqEmail,   setInqEmail]   = useState('');
  const [inqPhone,   setInqPhone]   = useState('');
  const [inqDate,    setInqDate]    = useState('');
  const [inqSize,    setInqSize]    = useState('');
  const [inqEvent,   setInqEvent]   = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [inqErrors,  setInqErrors]  = useState({});
  const [inqSuccess, setInqSuccess] = useState(false);

  useEffect(() => {
    if (showInquiry && currentUser) {
      setInqName(`${currentUser.firstName} ${currentUser.lastName || ""}`.trim());
      setInqEmail(currentUser.email || "");
    }
  }, [showInquiry, currentUser]);

  const validateInquiry = () => {
    const e = {};
    if (!inqName.trim())  e.name  = 'Name is required';
    if (!inqEmail.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inqEmail)) {
      e.email = 'Enter a valid email';
    } else if (currentUser && inqEmail.trim().toLowerCase() !== currentUser.email.toLowerCase()) {
      e.email = 'Email must match your account email';
    }
    if (!inqPhone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const errs = validateInquiry();
    setInqErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const inquiry = {
      id:        Date.now().toString(),
      userId:    currentUser?.id || 'guest',
      name:      inqName.trim(),
      email:     inqEmail.trim(),
      phone:     inqPhone.trim(),
      eventDate: inqDate  || 'Not specified',
      partySize: inqSize  || 'Not specified',
      eventType: inqEvent || 'Not specified',
      message:   inqMessage.trim() || 'None',
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('sb_inquiries') || '[]');
    stored.push(inquiry);
    localStorage.setItem('sb_inquiries', JSON.stringify(stored));
    
    if (typeof onSuccess === 'function') onSuccess();
    showToast({ type: 'inquiry', firstName: currentUser?.firstName || inqName.split(' ')[0] });
    setInqSuccess(true);
  };

  const resetInquiry = () => {
    setInqName(''); setInqEmail(''); setInqPhone(''); setInqDate('');
    setInqSize(''); setInqEvent(''); setInqMessage('');
    setInqErrors({}); setInqSuccess(false); setShowInquiry(false);
  };

  if (!showInquiry) return null;

  return (
    <div className="res-modal-overlay" onClick={resetInquiry}>
      <div
        className="res-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Private Dining Inquiry"
      >
        <div className="res-modal-drag" />

        <button
          className="res-modal__close"
          onClick={resetInquiry}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {inqSuccess ? (
          <div className="res-modal__success" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div className="res-modal__success-icon" style={{ color: 'var(--color-green-sustain)', marginBottom: 20 }}>
              <CheckCircle size={48} style={{ margin: '0 auto' }} />
            </div>
            <h2 className="res-modal__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 28, marginBottom: 12 }}>Inquiry Submitted</h2>
            <p className="res-modal__subtitle" style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 30 }}>
              Our events team will reach out within 24 hours to discuss your special occasion.
            </p>
            <button
              className="res-submit-btn"
              style={{ maxWidth: 200, margin: '0 auto' }}
              onClick={resetInquiry}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="res-modal__hero">
              <img
                src="/images/Reservations/Private_Dining.webp"
                alt=""
                className="res-modal__hero-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="res-modal__hero-overlay" />
              <div className="res-modal__hero-content">
                <span className="res-modal__hero-tag">Private Event</span>
                <h2 className="res-modal__hero-title">Private Dining</h2>
                <p className="res-modal__hero-sub">
                  Vault room · Garden terrace · Up to 60 guests
                </p>
              </div>
            </div>

            <div className="res-modal__body">
              <p className="res-modal__lead" style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                Tell us about your event and we'll craft a personalised experience just for you.
              </p>

              <form onSubmit={handleInquirySubmit} noValidate>
                <div className="res-form__row">
                  <div className="res-form__field">
                    <label className="res-label">
                      Name <span className="res-req">*</span>
                    </label>
                    <input
                      className={`res-input${inqErrors.name ? ' res-input--error' : ''}`}
                      placeholder="Your name"
                      value={inqName}
                      onChange={e => setInqName(e.target.value)}
                    />
                    {inqErrors.name && (
                      <span className="res-error">
                        <AlertCircle size={13} /> {inqErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="res-form__field">
                    <label className="res-label">
                      Email <span className="res-req">*</span>
                    </label>
                    <input
                      type="email"
                      className={`res-input${inqErrors.email ? ' res-input--error' : ''}`}
                      placeholder="you@email.com"
                      value={inqEmail}
                      onChange={e => setInqEmail(e.target.value)}
                    />
                    {inqErrors.email && (
                      <span className="res-error">
                        <AlertCircle size={13} /> {inqErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="res-form__row">
                  <div className="res-form__field">
                    <label className="res-label">
                      Phone <span className="res-req">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`res-input${inqErrors.phone ? ' res-input--error' : ''}`}
                      placeholder="(555) 000-0000"
                      value={inqPhone}
                      onChange={e => setInqPhone(e.target.value)}
                    />
                    {inqErrors.phone && (
                      <span className="res-error">
                        <AlertCircle size={13} /> {inqErrors.phone}
                      </span>
                    )}
                  </div>
                  <div className="res-form__field">
                    <label className="res-label">Preferred Date</label>
                    <input
                      type="date"
                      className="res-input"
                      value={inqDate}
                      onChange={e => setInqDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="res-form__row">
                  <div className="res-form__field">
                    <label className="res-label">Estimated Guests</label>
                    <input
                      type="number"
                      className="res-input"
                      placeholder="e.g. 25"
                      min="11"
                      value={inqSize}
                      onChange={e => setInqSize(e.target.value)}
                    />
                  </div>
                  <div className="res-form__field">
                    <label className="res-label">Event Type</label>
                    <div className="res-select-wrapper" style={{ position: 'relative' }}>
                      <select
                        className="res-select"
                        value={inqEvent}
                        onChange={e => setInqEvent(e.target.value)}
                      >
                        <option value="">Select type</option>
                        <option>Corporate Dinner</option>
                        <option>Wedding Reception</option>
                        <option>Birthday Party</option>
                        <option>Social Gathering</option>
                        <option>Other Event</option>
                      </select>
                      <ChevronDown 
                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9E9184' }} 
                        size={16} 
                      />
                    </div>
                  </div>
                </div>

                <div className="res-form__section">
                  <label className="res-label">Message</label>
                  <textarea
                    className="res-textarea"
                    rows={3}
                    placeholder="Dietary requirements, theme, AV needs..."
                    value={inqMessage}
                    onChange={e => setInqMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="res-submit-btn">
                  Send Inquiry
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PrivateDiningModal;
