import { AlertCircle } from "lucide-react";
import "./TimeSlots.css";


function TimeSlots({
  availableTimes,
  selectedDate,
  selectedTime,
  setSelectedTime,
  errors,
}) {
  return (
    <div className="res-form__section">
      <label className="res-label">
        Available Times <span className="res-req">*</span>
      </label>
      {errors.time && (
        <span className="res-error">
          <AlertCircle size={13} /> {errors.time}
        </span>
      )}

      <div className="res-times">
        {availableTimes.length > 0 ? (
          availableTimes.map((t) => (
            <button
              key={t}
              type="button"
              className={`res-time-pill ${selectedTime === t ? "res-time-pill--active" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))
        ) : (
          <p className="res-times__empty">
            {selectedDate
              ? "No available times for this date."
              : "Please select a date to see available times."}
          </p>
        )}
      </div>
    </div>
  );
}

export default TimeSlots;
