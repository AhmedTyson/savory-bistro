import { useMemo } from 'react';
import { FileText, ChevronDown } from 'lucide-react';

function ReservationReport({ activeReport, showReport, setShowReport }) {

  const reportDate = useMemo(() => {
    const dateValue = activeReport?.type === 'reservation'
      ? activeReport?.date
      : activeReport?.eventDate;
    if (!dateValue || dateValue === 'Not specified') return '—';
    try {
      return new Date(dateValue).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
    } catch { return dateValue; }
  }, [activeReport]);

  const reportName = useMemo(() => {
    if (!activeReport) return '—';
    if (activeReport.type === 'inquiry') return activeReport.name || '—';
    return (
      activeReport.fullName ||
      `${activeReport.firstName || ''} ${activeReport.lastName || ''}`.trim() ||
      '—'
    );
  }, [activeReport]);

  if (!activeReport) return null;

  return (
    <>
      {/* ── REPORT TOGGLE ── */}
      <button
        type="button"
        className={`res-report-toggle${showReport ? ' active' : ''}`}
        onClick={() => setShowReport(v => !v)}
        aria-expanded={showReport}
      >
        <FileText size={15} />
        {showReport
          ? (activeReport?.type === 'inquiry' ? 'Hide Last Inquiry' : 'Hide Last Reservation')
          : (activeReport?.type === 'inquiry' ? 'View Last Inquiry Report' : 'View Last Reservation Report')
        }
        <ChevronDown size={15} className="chevron" />
      </button>

      {/* ── REPORT PANEL ── */}
      <div className={`res-report-panel${showReport ? ' active' : ''}`}>
        <div className="res-report-inner">
          <div className="res-report-header">
            <span className="res-report-tag">
              {activeReport
                ? (activeReport.type === 'reservation'
                    ? `Confirmation #${activeReport.id}`
                    : `Inquiry #${String(activeReport.id).slice(-6)}`)
                : 'No activity on file'}
            </span>
            {activeReport && (
              <span className={`res-report-badge${activeReport.type === 'inquiry' ? ' inquiry' : ''}`}>
                {activeReport.type === 'reservation' ? 'Confirmed' : 'Inquiry Sent'}
              </span>
            )}
          </div>

          {activeReport ? (
            <>
              <div className="res-report-grid">
                <div>
                  <div className="res-report-label">Date</div>
                  <div className="res-report-value">{reportDate}</div>
                </div>
                <div>
                  <div className="res-report-label">
                    {activeReport.type === 'reservation' ? 'Time' : 'Event Type'}
                  </div>
                  <div className="res-report-value">
                    {activeReport.type === 'reservation' ? activeReport.time : activeReport.eventType}
                  </div>
                </div>
                <div>
                  <div className="res-report-label">Party Size</div>
                  <div className="res-report-value">
                    {activeReport.partySize}{' '}
                    {parseInt(activeReport.partySize) === 1 ? 'Guest' : 'Guests'}
                  </div>
                </div>
                <div>
                  <div className="res-report-label">
                    {activeReport.type === 'reservation' ? 'Occasion' : 'Status'}
                  </div>
                  <div className="res-report-value">
                    {activeReport.type === 'reservation'
                      ? (activeReport.occasion && activeReport.occasion !== 'None'
                          ? activeReport.occasion
                          : '—')
                      : 'Pending Review'}
                  </div>
                </div>
                <div>
                  <div className="res-report-label">Name</div>
                  <div className="res-report-value">{reportName}</div>
                </div>
                <div>
                  <div className="res-report-label">Email</div>
                  <div className="res-report-value" style={{ wordBreak: 'break-all' }}>
                    {activeReport.email}
                  </div>
                </div>
              </div>

              {(activeReport.specialRequests || activeReport.message) &&
                (activeReport.specialRequests !== 'None' && activeReport.message !== 'None') && (
                  <div className="res-report-footer">
                    <div className="res-report-divider" />
                    <div className="res-report-label" style={{ marginBottom: 4 }}>
                      {activeReport.type === 'reservation' ? 'Special Requests' : 'Message'}
                    </div>
                    <div
                      className="res-report-value"
                      style={{ fontWeight: 400, color: 'var(--color-text-body)', fontSize: 13 }}
                    >
                      {activeReport.type === 'reservation'
                        ? activeReport.specialRequests
                        : activeReport.message}
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="res-report-empty">
              You haven't made any reservations or inquiries yet. Your activity will appear here.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ReservationReport;
