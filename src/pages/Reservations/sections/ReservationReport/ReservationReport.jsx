import { useMemo } from 'react';
import { Calendar, Tag, Clock, Users, Info, ChevronRight, CheckCircle, FileText, ChevronDown, X } from 'lucide-react';
import './ReservationReport.css';

function ReservationReport({ history = [], showReport, setShowReport }) {
  const latestItem = useMemo(() => {
    if (history.length === 0) return null;
    return history[0];
  }, [history]);

  const formatDate = (dateValue) => {
    if (!dateValue || dateValue === 'Not specified') return '—';
    try {
      return new Date(dateValue).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch { return dateValue; }
  };

  if (!latestItem) return null;

  const isRes = latestItem.type === 'reservation';

  return (
    <div className="ReservationReport">
      <button
        type="button"
        className={`res-report-btn${showReport ? ' active' : ''}`}
        onClick={() => setShowReport(v => !v)}
      >
        <FileText size={16} />
        <span>{showReport ? 'Hide' : 'View'} Last {isRes ? 'Reservation' : 'Inquiry'}</span>
        <ChevronDown size={16} className="chevron" />
      </button>

      <div className={`res-report-panel${showReport ? ' active' : ''}`}>
        <div className={`ReservationHistory__card ${latestItem.type} res-card-override`}>
          <div className="ReservationHistory__card-sidebar">
            <div className={`ReservationHistory__icon-box ${latestItem.type}`}>
              {isRes ? <Calendar size={18} /> : <Tag size={18} />}
            </div>
            <div className="ReservationHistory__line" />
          </div>

          <div className="ReservationHistory__card-main">
            <div className="ReservationHistory__card-top">
              <div className="ReservationHistory__type-info">
                <span className={`ReservationHistory__badge ${latestItem.type}`}>
                  {isRes ? 'Table Booking' : 'Private Dining'}
                </span>
                <span className="ReservationHistory__id">#{String(latestItem.id).slice(-6)}</span>
              </div>
              <div className="ReservationHistory__status">
                <CheckCircle size={12} strokeWidth={2} />
                {isRes ? 'Confirmed' : 'Inquiry Sent'}
              </div>
            </div>

            <h3 className="ReservationHistory__card-title">
              {formatDate(isRes ? latestItem.date : latestItem.eventDate)}
            </h3>

            <div className="ReservationHistory__card-grid">
              <div className="ReservationHistory__grid-item">
                <Clock size={14} strokeWidth={1.5} className="ReservationHistory__item-icon" />
                <span>{isRes ? latestItem.time : latestItem.eventType}</span>
              </div>
              <div className="ReservationHistory__grid-item">
                <Users size={14} strokeWidth={1.5} className="ReservationHistory__item-icon" />
                <span>{latestItem.partySize} {parseInt(latestItem.partySize) === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="ReservationHistory__grid-item">
                {isRes ? (
                  <Info size={14} strokeWidth={1.5} className="ReservationHistory__item-icon" />
                ) : (
                  <Tag size={14} strokeWidth={1.5} className="ReservationHistory__item-icon" />
                )}
                <span>{isRes ? (latestItem.occasion || 'Standard Visit') : 'Private Event'}</span>
              </div>
            </div>

            {(latestItem.specialRequests || latestItem.message) && (
              <div className="ReservationHistory__notes">
                <p>"{latestItem.specialRequests || latestItem.message}"</p>
              </div>
            )}

            {/* Premium Close Action at bottom of card */}
            <div className="res-report-footer">
              <button 
                type="button" 
                className="res-report-close-btn"
                onClick={() => setShowReport(false)}
              >
                <X size={14} strokeWidth={2.5} />
                <span>Close Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationReport;
