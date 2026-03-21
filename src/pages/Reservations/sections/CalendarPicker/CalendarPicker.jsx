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

  const isSelected = (d) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === calYear &&
      selectedDate.getMonth() === calMonth &&
      selectedDate.getDate() === d
    );
  };

  return (
    <div className="ReservationForm__section">
      <label className="ReservationForm__label">
        Select Date <span className="ReservationForm__req">*</span>
      </label>
      {errors?.date && (
        <span className="ReservationForm__error" style={{ marginBottom: 12 }}>
          <AlertCircle size={13} /> {errors.date}
        </span>
      )}

      <div className="CalendarPicker">
        <div className="CalendarPicker__header">
          <button type="button" className="CalendarPicker__arrow" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <span className="CalendarPicker__month">{MONTHS[calMonth]} {calYear}</span>
          <button type="button" className="CalendarPicker__arrow" onClick={nextMonth} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="CalendarPicker__days">
          {DAYS.map((d, i) => (
            <span key={i} className="CalendarPicker__day-label">{d}</span>
          ))}
        </div>

        <div className="CalendarPicker__grid">
          {calendarDays.map((d, i) => {
            if (d === null) return <span key={`e${i}`} className="CalendarPicker__empty" />;
            
            const reserved = isDateReserved(d);
            const past = isDatePast(d);
            const isToday = isDateToday(d);
            const active = isSelected(d);
            const disabled = reserved || past;

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                className={[
                  'CalendarPicker__cell',
                  active && 'CalendarPicker__cell--active',
                  isToday && 'CalendarPicker__cell--today',
                  disabled && 'CalendarPicker__cell--disabled',
                ].filter(Boolean).join(' ')}
                onClick={() => {
                  const newDt = new Date(calYear, calMonth, d);
                  setSelectedDate(newDt);
                  if (typeof setSelectedTime === 'function') setSelectedTime('');
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        <div className="CalendarPicker__legend">
          <span className="CalendarPicker__legend-item">
            <span className="CalendarPicker__dot CalendarPicker__dot--available" /> Available
          </span>
          <span className="CalendarPicker__legend-item">
            <span className="CalendarPicker__dot CalendarPicker__dot--reserved" /> Reserved
          </span>
        </div>
      </div>
    </div>
  );
}

export default CalendarPicker;