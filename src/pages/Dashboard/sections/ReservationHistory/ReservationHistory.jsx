import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarX } from 'lucide-react';
import { useAuth } from '../../../../context';
import './ReservationHistory.css';

function ReservationHistory() {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/reservations?userId=${currentUser.id}`
        );
        setReservations(data.reservations || []);
      } catch (err) {
        console.error('Failed to load reservations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = [...reservations].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );

  return (
    <div className="ReservationHistory">
      {loading ? (
        <p className="ReservationHistory__loading">Loading your reservations…</p>
      ) : sorted.length === 0 ? (
        <div className="ReservationHistory__empty">
          <CalendarX size={40} className="ReservationHistory__empty-icon" />
          <p className="ReservationHistory__empty-text">
            You haven't made any reservations yet.
          </p>
          <Link to="/reservations" className="ReservationHistory__book-link">
            Book your first table →
          </Link>
        </div>
      ) : (
        <>
          <h2 className="ReservationHistory__title">Reservation History</h2>
          <div className="ReservationHistory__list">
            {sorted.map((r) => {
              const dateLabel = (() => {
                try {
                  return new Date(r.date).toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                  });
                } catch { return r.date; }
              })();

              return (
                <div key={r.id} className="ReservationHistory__card">
                  <div className="ReservationHistory__card-header">
                    <span className="ReservationHistory__card-date">{dateLabel}</span>
                    <span className="ReservationHistory__card-badge">Confirmed</span>
                  </div>

                  <div className="ReservationHistory__card-details">
                    <div className="ReservationHistory__detail">
                      <span className="ReservationHistory__detail-label">Time</span>
                      <span className="ReservationHistory__detail-value">{r.time || '—'}</span>
                    </div>
                    <div className="ReservationHistory__detail">
                      <span className="ReservationHistory__detail-label">Party Size</span>
                      <span className="ReservationHistory__detail-value">
                        {r.partySize ? `${r.partySize} ${parseInt(r.partySize) === 1 ? 'Guest' : 'Guests'}` : '—'}
                      </span>
                    </div>
                    <div className="ReservationHistory__detail">
                      <span className="ReservationHistory__detail-label">Occasion</span>
                      <span className="ReservationHistory__detail-value">
                        {r.occasion && r.occasion !== 'None' ? r.occasion : '—'}
                      </span>
                    </div>
                  </div>

                  {r.specialRequests && r.specialRequests !== 'None' && (
                    <div className="ReservationHistory__card-footer">
                      <span className="ReservationHistory__requests-label">Special Requests</span>
                      <span className="ReservationHistory__requests-value">{r.specialRequests}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ReservationHistory;
