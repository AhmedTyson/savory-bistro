import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

function CalendarPicker({
  calYear, calMonth, selectedDate,
  setSelectedDate, setSelectedTime,
  prevMonth, nextMonth,
  DAYS, MONTHS, calendarDays,
  isDateReserved, isDatePast, isDateToday,
  toKey, errors
}) {
  return (
    <div className="res-form__section">
      <label className="res-label">
        Select Date <span className="res-req">*</span>
      </label>
      {errors?.date && (
        <span className="res-error">
          <AlertCircle size={13} /> {errors.date}
        </span>
      )}

      <div className="res-calendar">
        <div className="res-calendar__header">
          <button type="button" className="res-calendar__arrow" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <span className="res-calendar__month">{MONTHS[calMonth]} {calYear}</span>
          <button type="button" className="res-calendar__arrow" onClick={nextMonth} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="res-calendar__days">
          {DAYS.map((d, i) => (
            <span key={i} className="res-calendar__day-label">{d}</span>
          ))}
        </div>

        <div className="res-calendar__grid">
          {calendarDays.map((d, i) => {
            if (d === null) return <span key={`e${i}`} className="res-calendar__empty" />;
            const key      = toKey(calYear, calMonth, d);
            const reserved = isDateReserved(d);
            const past     = isDatePast(d);
            const today    = isDateToday(d);
            const active   = selectedDate === key;
            const disabled = reserved || past;

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                className={[
                  'res-calendar__cell',
                  active   && 'res-calendar__cell--active',
                  today    && 'res-calendar__cell--today',
                  disabled && 'res-calendar__cell--disabled',
                ].filter(Boolean).join(' ')}
                onClick={() => {
                  setSelectedDate(key);
                  if (typeof setSelectedTime === 'function') setSelectedTime('');
                }}
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
  );
}

export default CalendarPicker;