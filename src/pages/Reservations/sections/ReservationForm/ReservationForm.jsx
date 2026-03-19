import { AlertCircle, ChevronDown } from 'lucide-react';

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
  OCCASIONS,
  children // This will be Calendar and TimeSlots
}) {
  return (
    <form className="res-form" onSubmit={handleSubmit} noValidate>
      {/* Party Size & Occasion */}
      <div className="res-form__row">
        <div className="res-form__field">
          <label className="res-label">
            Party Size <span className="res-req">*</span>
          </label>
          <div className="res-select-wrapper">
            <select
              className={`res-select ${errors.partySize ? "res-input--error" : ""}`}
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
            >
              <option value="">Select guests</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
            <ChevronDown className="res-select-icon" size={16} />
          </div>
          {errors.partySize && (
            <span className="res-error">
              <AlertCircle size={13} /> {errors.partySize}
            </span>
          )}
        </div>

        <div className="res-form__field">
          <label className="res-label">Occasion</label>
          <div className="res-select-wrapper">
            <select
              className="res-select"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="">Select occasion (optional)</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="res-select-icon" size={16} />
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
      <button type="submit" className="res-submit-btn">
        Confirm Reservation
      </button>
      {errors.submit && (
        <p className="res-error res-error--center">{errors.submit}</p>
      )}
    </form>
  );
}

export default ReservationForm;
