import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { DAYS, MONTHS, toKey, daysIn, firstDay, RESERVED_DATES } from '../../utils/reservationUtils';
import "./CalendarPicker.css";

function CalendarPicker({
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  errors
}) {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const calendarDays = useMemo(() => {
    const total = daysIn(calYear, calMonth);
    const start = firstDay(calYear, calMonth);
    const cells = [];
    for (let i = 0; i < start; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [calYear, calMonth]);

  const isDateReserved = (d) => RESERVED_DATES.includes(toKey(calYear, calMonth, d));
  const isDatePast = (d) => {
    const dt = new Date(calYear, calMonth, d);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return dt < t;
  };
  const isDateToday = (d) => {
    const dt = new Date(calYear, calMonth, d);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return dt.getTime() === t.getTime();
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

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
            const key = toKey(calYear, calMonth, d);
            const reserved = isDateReserved(d);
            const past = isDatePast(d);
            const isToday = isDateToday(d);
            const active = selectedDate === key;
            const disabled = reserved || past;

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                className={[
                  'res-calendar__cell',
                  active && 'res-calendar__cell--active',
                  isToday && 'res-calendar__cell--today',
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