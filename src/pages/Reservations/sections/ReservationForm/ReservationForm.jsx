/** ReservationForm.jsx - Guest Details & Booking Submission **/
import { AlertCircle } from "lucide-react";
import SelectionField from "../../../../components/SelectionField/SelectionField";
import "./ReservationForm.css";

const ReservationForm = ({
  handleSubmit,
  formData,
  updateField,
  errors,
  submitError,
  loading,
  OCCASIONS,
  children,
}) => {
  const partyOptions = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

  return (
    <form 
      className="ReservationForm" 
      onSubmit={handleSubmit} 
      noValidate
    >
      <div className="ReservationForm__row">
        <SelectionField
          label="Party Size"
          required
          value={formData.partySize}
          options={partyOptions}
          placeholder="Select guests"
          onSelect={(val) => updateField("partySize", val)}
          error={errors.partySize}
          formatOption={(n) => `${n} ${parseInt(n) === 1 ? "Guest" : "Guests"}`}
          className="ReservationForm__field"
        />

        <SelectionField
          label="Occasion"
          value={formData.occasion}
          options={OCCASIONS}
          placeholder="Select occasion (optional)"
          onSelect={(val) => updateField("occasion", val)}
          className="ReservationForm__field"
        />
      </div>

      <div>
        {children}
      </div>

      <div className="ReservationForm__row">
        <div className="ReservationForm__field">
          <label className="ReservationForm__label">
            Full Name <span className="ReservationForm__req">*</span>
          </label>
          <input
            type="text"
            className={`ReservationForm__input ${errors.fullName ? "ReservationForm__input--error" : ""}`}
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
          {errors.fullName && (
            <span className="ReservationForm__error">
              <AlertCircle size={13} /> {errors.fullName}
            </span>
          )}
        </div>
        <div className="ReservationForm__field">
          <label className="ReservationForm__label">
            Phone Number <span className="ReservationForm__req">*</span>
          </label>
          <input
            type="tel"
            className={`ReservationForm__input ${errors.phone ? "ReservationForm__input--error" : ""}`}
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && (
            <span className="ReservationForm__error">
              <AlertCircle size={13} /> {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className="ReservationForm__section">
        <label className="ReservationForm__label">
          Email Address <span className="ReservationForm__req">*</span>
        </label>
        <input
          type="email"
          className={`ReservationForm__input ${errors.email ? "ReservationForm__input--error" : ""}`}
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        {errors.email && (
          <span className="ReservationForm__error">
            <AlertCircle size={13} /> {errors.email}
          </span>
        )}
      </div>

      <div className="ReservationForm__section">
        <label className="ReservationForm__label">Special Requests</label>
        <textarea
          className="ReservationForm__textarea"
          placeholder="Dietary restrictions, seating preferences..."
          rows={4}
          value={formData.specialReqs}
          onChange={(e) => updateField("specialReqs", e.target.value)}
        />
      </div>

      {submitError && (
        <div className="ReservationForm__submit-error">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      <div>
        <button type="submit" className="ReservationForm__submit-btn" disabled={loading}>
          {loading ? "Confirming..." : "Confirm Reservation"}
        </button>
      </div>
      {errors.submit && (
        <p className="ReservationForm__error ReservationForm__error--center">{errors.submit}</p>
      )}
    </form>
  );
};

export default ReservationForm;
