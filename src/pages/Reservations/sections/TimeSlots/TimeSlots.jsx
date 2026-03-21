/** TimeSlots.jsx - Reservation Timing Selection Pills **/
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
    <div className="ReservationForm__section">
      <label className="ReservationForm__label">
        Available Times <span className="ReservationForm__req">*</span>
      </label>
      {errors.time && (
        <span className="ReservationForm__error">
          <AlertCircle size={13} /> {errors.time}
        </span>
      )}

      <div className="TimeSlots__grid">
        {availableTimes.length > 0 ? (
          availableTimes.map((t) => (
            <button
              key={t}
              type="button"
              className={`TimeSlots__pill ${selectedTime === t ? "TimeSlots__pill--active" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))
        ) : (
          <p className="TimeSlots__empty">
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
