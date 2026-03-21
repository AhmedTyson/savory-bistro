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
    <form className="res-form" onSubmit={handleSubmit} noValidate>
      <div className="res-form__row">
        <SelectionField
          label="Party Size"
          required
          value={formData.partySize}
          options={partyOptions}
          placeholder="Select guests"
          onSelect={(val) => updateField("partySize", val)}
          error={errors.partySize}
          formatOption={(n) => `${n} ${parseInt(n) === 1 ? "Guest" : "Guests"}`}
          className="res-form__field"
        />

        <SelectionField
          label="Occasion"
          value={formData.occasion}
          options={OCCASIONS}
          placeholder="Select occasion (optional)"
          onSelect={(val) => updateField("occasion", val)}
          className="res-form__field"
        />
      </div>

      {children}

      <div className="res-form__row">
        <div className="res-form__field">
          <label className="res-label">
            Full Name <span className="res-req">*</span>
          </label>
          <input
            type="text"
            className={`res-input ${errors.fullName ? "res-input--error" : ""}`}
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
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
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && (
            <span className="res-error">
              <AlertCircle size={13} /> {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className="res-form__section">
        <label className="res-label">
          Email Address <span className="res-req">*</span>
        </label>
        <input
          type="email"
          className={`res-input ${errors.email ? "res-input--error" : ""}`}
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        {errors.email && (
          <span className="res-error">
            <AlertCircle size={13} /> {errors.email}
          </span>
        )}
      </div>

      <div className="res-form__section">
        <label className="res-label">Special Requests</label>
        <textarea
          className="res-textarea"
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

      <button type="submit" className="res-submit-btn" disabled={loading}>
        {loading ? "Confirming..." : "Confirm Reservation"}
      </button>
      {errors.submit && (
        <p className="res-error res-error--center">{errors.submit}</p>
      )}
    </form>
  );
};

export default ReservationForm;
