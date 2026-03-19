import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarX, Calendar, Tag, Clock, Users, Info, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../../context';;
import './ReservationHistory.css';

const API = 'http://localhost:3001/api';

function ReservationHistory() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!currentUser) return;
    setLoading(true);

    const userIdStr = String(currentUser.id);
    let allActivity = [];

    // inquiries pull from localstorage, reservations pull from DB
    const inqStored = localStorage.getItem("sb_inquiries");
    if (inqStored) {
      try {
        const inquiries = JSON.parse(inqStored);
        const userInquiries = inquiries
          .filter(i => String(i.userId) === userIdStr)
          .map(i => ({ 
            ...i, 
            type: 'inquiry', 
            timestamp: new Date(i.createdAt).getTime(),
            dateLabel: i.eventDate,
            mainInfo: i.eventType
          }));
        allActivity = [...allActivity, ...userInquiries];
      } catch (err) { console.error("Error parsing inquiries:", err); }
    }

    try {
      const { data } = await axios.get(`${API}/reservations?userId=${userIdStr}`);
      const apiRes = data.reservations || [];
      const formattedRes = apiRes.map(r => ({ 
        ...r, 
        type: 'reservation', 
        timestamp: new Date(r.submittedAt).getTime(),
        dateLabel: r.date,
        mainInfo: r.time
      }));
      
      // merge disparate sources — priority to local ids
      const existingIds = new Set(allActivity.map(a => a.id));
      formattedRes.forEach(r => {
        if (!existingIds.has(r.id)) allActivity.push(r);
      });
    } catch (err) { console.error("Failed to fetch reservations:", err); }

    allActivity.sort((a, b) => b.timestamp - a.timestamp);
    setHistory(allActivity);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [currentUser]);

  const formatDate = (dateValue) => {
    if (!dateValue || dateValue === 'Not specified') return '—';
    try {
      return new Date(dateValue).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch { return dateValue; }
  };

  return (
    <div className="ReservationHistory">
      <div className="ReservationHistory__header">
        <h2 className="ReservationHistory__title">Activity & Reservations</h2>
        <p className="ReservationHistory__subtitle">Your dining journey at Savory Bistro</p>
      </div>

      {loading ? (
        <div className="ReservationHistory__loading">
          <div className="res-spinner" />
          <p>Gathering your history…</p>
        </div>
      ) : history.length === 0 ? (
        <div className="ReservationHistory__empty">
          <CalendarX size={44} className="ReservationHistory__empty-icon" />
          <p className="ReservationHistory__empty-text">
            You haven't made any reservations or inquiries yet.
          </p>
          <Link to="/reservations" className="ReservationHistory__book-link">
            Book a Table →
          </Link>
        </div>
      ) : (
        <div className="ReservationHistory__list">
          {history.map((item) => {
            const isRes = item.type === 'reservation';
            return (
              <div key={item.id} className={`ReservationHistory__card ${item.type}`}>
                <div className="ReservationHistory__card-sidebar">
                  <div className={`ReservationHistory__icon-box ${item.type}`}>
                    {isRes ? <Calendar size={18} /> : <Tag size={18} />}
                  </div>
                  <div className="ReservationHistory__line" />
                </div>

                <div className="ReservationHistory__card-main">
                  <div className="ReservationHistory__card-top">
                    <div className="ReservationHistory__type-info">
                      <span className={`ReservationHistory__badge ${item.type}`}>
                        {isRes ? 'Table Booking' : 'Private Dining'}
                      </span>
                      <span className="ReservationHistory__id">#{String(item.id).slice(-6)}</span>
                    </div>
                    <div className="ReservationHistory__status">
                      <CheckCircle size={12} />
                      {isRes ? 'Confirmed' : 'Inquiry Sent'}
                    </div>
                  </div>

                  <h3 className="ReservationHistory__card-title">
                    {formatDate(item.dateLabel)}
                  </h3>

                  <div className="ReservationHistory__card-grid">
                    <div className="ReservationHistory__grid-item">
                      <Clock size={14} />
                      <span>{item.mainInfo}</span>
                    </div>
                    <div className="ReservationHistory__grid-item">
                      <Users size={14} />
                      <span>{item.partySize} {parseInt(item.partySize) === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    {isRes ? (
                       <div className="ReservationHistory__grid-item">
                         <Info size={14} />
                         <span>{item.occasion && item.occasion !== 'None' ? item.occasion : 'Standard Visit'}</span>
                       </div>
                    ) : (
                      <div className="ReservationHistory__grid-item">
                         <Tag size={14} />
                         <span>Private Event</span>
                       </div>
                    )}
                  </div>

                  {(item.specialRequests || item.message) && (
                    <div className="ReservationHistory__notes">
                      <p>"{item.specialRequests || item.message}"</p>
                    </div>
                  )}
                </div>
                
                <ChevronRight size={20} className="ReservationHistory__arrow" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReservationHistory;
