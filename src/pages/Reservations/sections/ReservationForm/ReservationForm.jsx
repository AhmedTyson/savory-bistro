import { useState, useRef, useEffect } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import './ReservationForm.css';


function ReservationForm({
  handleSubmit,
  partySize,
  setPartySize,
  occasion,
  setOccasion,
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  specialReqs,
  setSpecialReqs,
  errors,
  submitError,
  loading,
  OCCASIONS,
  children // This will be Calendar and TimeSlots
}) {
  const [isPartyOpen, setIsPartyOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const partyRef = useRef(null);
  const occasionRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (partyRef.current && !partyRef.current.contains(event.target)) setIsPartyOpen(false);
      if (occasionRef.current && !occasionRef.current.contains(event.target)) setIsOccasionOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const partyOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <form className="res-form" onSubmit={handleSubmit} noValidate>
      {/* Party Size & Occasion */}
      <div className="res-form__row">
        <div className="res-form__field">
          <label className="res-label">
            Party Size <span className="res-req">*</span>
          </label>
          <div className="ContactForm__custom-select" ref={partyRef}>
            <div 
              className={`ContactForm__select-trigger ${isPartyOpen ? 'ContactForm__select-trigger--active' : ''} ${errors.partySize ? "res-input--error" : ""}`}
              onClick={() => setIsPartyOpen(!isPartyOpen)}
            >
              <span>{partySize ? `${partySize} ${parseInt(partySize) === 1 ? "Guest" : "Guests"}` : "Select guests"}</span>
              <ChevronDown size={18} className={`ContactForm__select-icon ${isPartyOpen ? 'ContactForm__select-icon--rotated' : ''}`} />
            </div>
            
            {isPartyOpen && (
              <div className="ContactForm__select-menu">
                {partyOptions.map((n) => (
                  <div 
                    key={n}
                    className={`ContactForm__select-item ${partySize === n.toString() ? 'ContactForm__select-item--selected' : ''}`}
                    onClick={() => { setPartySize(n.toString()); setIsPartyOpen(false); }}
                  >
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.partySize && (
            <span className="res-error">
              <AlertCircle size={13} /> {errors.partySize}
            </span>
          )}
        </div>

        <div className="res-form__field">
          <label className="res-label">Occasion</label>
          <div className="ContactForm__custom-select" ref={occasionRef}>
            <div 
              className={`ContactForm__select-trigger ${isOccasionOpen ? 'ContactForm__select-trigger--active' : ''}`}
              onClick={() => setIsOccasionOpen(!isOccasionOpen)}
            >
              <span>{occasion || "Select occasion (optional)"}</span>
              <ChevronDown size={18} className={`ContactForm__select-icon ${isOccasionOpen ? 'ContactForm__select-icon--rotated' : ''}`} />
            </div>
            
            {isOccasionOpen && (
              <div className="ContactForm__select-menu">
                <div 
                  className={`ContactForm__select-item ${!occasion ? 'ContactForm__select-item--selected' : ''}`}
                  onClick={() => { setOccasion(''); setIsOccasionOpen(false); }}
                >
                  None
                </div>
                {OCCASIONS.map((o) => (
                  <div 
                    key={o}
                    className={`ContactForm__select-item ${occasion === o ? 'ContactForm__select-item--selected' : ''}`}
                    onClick={() => { setOccasion(o); setIsOccasionOpen(false); }}
                  >
                    {o}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children: Calendar and TimeSlots */}
      {children}

      {/* Name & Phone */}
      <div className="res-form__row">
        <div className="res-form__field">
          <label className="res-label">
            Full Name <span className="res-req">*</span>
          </label>
          <input
            type="text"
            className={`res-input ${errors.fullName ? "res-input--error" : ""}`}
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <span className="res-error">
              <AlertCircle size={13} /> {errors.fullName}
            </span>
          )}
        </div>
        <div className="res-form__field">
          <label className="res-label">
            Phone Number <span className="res-req">*</span>
          </label>
          <input
            type="tel"
            className={`res-input ${errors.phone ? "res-input--error" : ""}`}
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <span className="res-error">
              <AlertCircle size={13} /> {errors.phone}
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="res-form__section">
        <label className="res-label">
          Email Address <span className="res-req">*</span>
        </label>
        <input
          type="email"
          className={`res-input ${errors.email ? "res-input--error" : ""}`}
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="res-error">
            <AlertCircle size={13} /> {errors.email}
          </span>
        )}
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

      {/* Submit Error Banner */}
      {submitError && (
        <div className="ReservationForm__submit-error">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit */}
      <button 
        type="submit" 
        className="res-submit-btn"
        disabled={loading}
      >
        {loading ? "Confirming..." : "Confirm Reservation"}
      </button>
      {errors.submit && (
        <p className="res-error res-error--center">{errors.submit}</p>
      )}
    </form>
  );
}

export default ReservationForm;
