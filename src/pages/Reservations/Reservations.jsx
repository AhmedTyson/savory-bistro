import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { useReservations } from './hooks/useReservations';

import ReservationHero     from './sections/ReservationHero/ReservationHero';
import CalendarPicker      from './sections/CalendarPicker/CalendarPicker';
import TimeSlots           from './sections/TimeSlots/TimeSlots';
import ReservationForm     from './sections/ReservationForm/ReservationForm';
import ReservationSidebar  from './sections/ReservationSidebar/ReservationSidebar';
import ReservationReport   from './sections/ReservationReport/ReservationReport';
import PrivateDiningModal  from './sections/PrivateDiningModal/PrivateDiningModal';

import { OCCASIONS, ALL_TIMES, RESERVED_TIMES } from './utils/reservationUtils';
import './Reservations.css';

function Reservations() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    formData, updateField, selectedDate, setSelectedDate,
    selectedTime, setSelectedTime, errors, submitError,
    loading, history, syncHistory, handleSubmit
  } = useReservations();

  const [showInquiry, setShowInquiry] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // filter times based on existing bookings
  const availableTimes = useMemo(() => {
    if (!selectedDate) return ALL_TIMES;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const booked = RESERVED_TIMES[dateStr] || [];
    return ALL_TIMES.filter(t => !booked.includes(t));
  }, [selectedDate]);

  const handleBooking = async (e) => {
    const result = await handleSubmit(e);
    if (result?.error === 'LOGIN_REQUIRED') {
      alert('Please log in to make a reservation.');
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return (
    <section className="Reservations">
      <div className="container">
        <ReservationHero />
        
        <div className="Reservations__grid">
          <div className="Reservations__form-col">
            <ReservationForm
              handleSubmit={handleBooking}
              formData={formData}
              updateField={updateField}
              errors={errors}
              submitError={submitError}
              loading={loading}
              OCCASIONS={OCCASIONS}
            >
              <CalendarPicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
                errors={errors}
              />
              <TimeSlots
                availableTimes={availableTimes}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                errors={errors}
              />
            </ReservationForm>
            
            <ReservationReport
              history={history}
              showReport={showReport}
              setShowReport={setShowReport}
              syncHistory={syncHistory}
            />
          </div>
          <ReservationSidebar setShowInquiry={setShowInquiry} />
        </div>
      </div>
      <PrivateDiningModal
        showInquiry={showInquiry}
        setShowInquiry={setShowInquiry}
        onSuccess={syncHistory}
      />
    </section>
  );
}

export default Reservations;