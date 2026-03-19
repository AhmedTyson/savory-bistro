import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context';
import {
  CheckCircle, X, AlertCircle, ChevronDown, FileText
} from 'lucide-react';

import ReservationHero    from './sections/ReservationHero/ReservationHero';
import CalendarPicker     from './sections/CalendarPicker/CalendarPicker';
import TimeSlots          from './sections/TimeSlots/TimeSlots';
import ReservationForm    from './sections/ReservationForm/ReservationForm';
import ReservationSidebar from './sections/ReservationSidebar/ReservationSidebar';

import './Reservations.css';
import './sections/ReservationForm/ReservationForm.css';

const API = 'http://localhost:3001/api';

/* ─── CONSTANTS ─────────────────────────────────────── */
const RESERVED_DATES = [
  "2026-03-20","2026-03-22","2026-03-25","2026-03-28",
  "2026-04-01","2026-04-05","2026-04-10","2026-04-14",
  "2026-04-18","2026-04-22","2026-04-26",
  "2026-05-02","2026-05-06","2026-05-12","2026-05-16",
  "2026-05-20","2026-05-24","2026-05-30",
];
const ALL_TIMES = ["17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"];
const RESERVED_TIMES = {
  "2026-03-19": ["18:00","19:00"],
  "2026-03-21": ["17:30","20:00"],
  "2026-03-23": ["18:30"],
  "2026-03-24": ["17:00","19:30","20:30"],
  "2026-04-02": ["18:00","18:30"],
  "2026-04-03": ["19:00"],
  "2026-04-07": ["17:00","20:00"],
};
const OCCASIONS = [
  "Birthday","Anniversary","Date Night","Business Dinner",
  "Graduation","Engagement","Promotion","Holiday Celebration",
  "Family Gathering","Reunion","Other",
];
const DAYS   = ["S","M","T","W","T","F","S"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* ─── HELPERS ───────────────────────────────────────── */
const pad       = (n)     => String(n).padStart(2,"0");
const toKey     = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const daysIn    = (y,m)   => new Date(y,m+1,0).getDate();
const firstDay  = (y,m)   => new Date(y,m,1).getDay();

/* ─── COMPONENT ─────────────────────────────────────── */
function Reservations() {
  const { currentUser } = useAuth();
  const navigate        = useNavigate();

  /* form */
  const [partySize,    setPartySize]    = useState("");
  const [occasion,     setOccasion]     = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [fullName,     setFullName]     = useState(
    currentUser?.firstName
      ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
      : ""
  );
  const [phone,        setPhone]        = useState("");
  const [email,        setEmail]        = useState(currentUser?.email || "");
  const [specialReqs,  setSpecialReqs]  = useState("");

  /* calendar */
  const today = new Date();
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  /* ui */
  const [errors,      setErrors]      = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showInquiry, setShowInquiry] = useState(false);

  /* report */
  const [showReport, setShowReport] = useState(false);
  const [lastRes,    setLastRes]    = useState(null);
  const [lastInquiry, setLastInquiry] = useState(null);

  // The active object to show in the report panel
  const activeReport = useMemo(() => {
    if (!lastRes && !lastInquiry) return null;
    if (!lastRes) return { ...lastInquiry, type: 'inquiry' };
    if (!lastInquiry) return { ...lastRes, type: 'reservation' };

    // Compare timestamps to show the most recent
    const resTime = new Date(lastRes.submittedAt || 0).getTime();
    const inqTime = new Date(lastInquiry.createdAt || 0).getTime();

    return resTime >= inqTime 
      ? { ...lastRes, type: 'reservation' } 
      : { ...lastInquiry, type: 'inquiry' };
  }, [lastRes, lastInquiry]);

  /* Load last reservation and last inquiry from localStorage on mount */
  useEffect(() => {
    const resKey = `sb_last_reservation_${currentUser?.id || "guest"}`;
    const resStored = localStorage.getItem(resKey);
    if (resStored) {
      try { setLastRes(JSON.parse(resStored)); } catch { /* ignore */ }
    }

    const inqStored = localStorage.getItem("sb_inquiries");
    if (inqStored) {
      try {
        const inquiries = JSON.parse(inqStored);
        if (Array.isArray(inquiries) && inquiries.length > 0) {
          // Get the last one in the array
          setLastInquiry(inquiries[inquiries.length - 1]);
        }
      } catch { /* ignore */ }
    }
  }, [currentUser?.id]);

  /* inquiry */
  const [inqName,    setInqName]    = useState("");
  const [inqEmail,   setInqEmail]   = useState("");
  const [inqPhone,   setInqPhone]   = useState("");
  const [inqDate,    setInqDate]    = useState("");
  const [inqSize,    setInqSize]    = useState("");
  const [inqEvent,   setInqEvent]   = useState("");
  const [inqMessage, setInqMessage] = useState("");
  const [inqErrors,  setInqErrors]  = useState({});
  const [inqSuccess, setInqSuccess] = useState(false);

  /* ── calendar ── */
  const calendarDays = useMemo(() => {
    const total = daysIn(calYear, calMonth);
    const start = firstDay(calYear, calMonth);
    const cells = [];
    for (let i = 0; i < start; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [calYear, calMonth]);

  const isDateReserved = (d) => RESERVED_DATES.includes(toKey(calYear, calMonth, d));
  const isDatePast     = (d) => {
    const dt = new Date(calYear, calMonth, d);
    const t  = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  };
  const isDateToday = (d) => {
    const dt = new Date(calYear, calMonth, d);
    const t  = new Date(); t.setHours(0,0,0,0);
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

  const availableTimes = useMemo(() => {
    if (!selectedDate) return ALL_TIMES;
    const booked = RESERVED_TIMES[selectedDate] || [];
    return ALL_TIMES.filter(t => !booked.includes(t));
  }, [selectedDate]);

  /* ── reservation submit ── */
  const validate = () => {
    const e = {};
    if (!partySize)       e.partySize = "Please select party size";
    if (!selectedDate)    e.date      = "Please select a date";
    if (!selectedTime)    e.time      = "Please select a time";
    if (!fullName.trim()) e.fullName  = "Full name is required";
    if (!phone.trim())    e.phone     = "Phone number is required";
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(phone.trim()))
      e.phone = "Please enter a valid phone number";
    if (!email.trim())    e.email     = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Please enter a valid email";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      id:              Date.now().toString(),
      userId:          String(currentUser?.id || "guest"),
      firstName:       currentUser?.firstName || fullName.split(" ")[0] || "Guest",
      lastName:        currentUser?.lastName  || fullName.split(" ").slice(1).join(" ") || "",
      email:           email.trim().toLowerCase(),
      phone:           phone.trim(),
      partySize,
      occasion:        occasion || "None",
      date:            new Date(selectedDate).toISOString(),
      time:            selectedTime,
      specialRequests: specialReqs.trim() || "None",
      submittedAt:     new Date().toISOString(),
      status:          "confirmed",
    };

    try {
      const { data } = await axios.post(`${API}/reservations`, payload);
      const saved    = data.reservation || data;

      const key = `sb_last_reservation_${currentUser?.id || "guest"}`;
      localStorage.setItem(key, JSON.stringify(saved));
      setLastRes(saved);

      const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric",
      });
      navigate("/", {
        replace: true,
        state: {
          toast:     "reservation",
          firstName: currentUser?.firstName || fullName.split(" ")[0],
          date:      formattedDate,
          time:      selectedTime,
        },
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  /* ── inquiry ── */
  const validateInquiry = () => {
    const e = {};
    if (!inqName.trim())  e.name  = "Name is required";
    if (!inqEmail.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inqEmail))
      e.email = "Enter a valid email";
    if (!inqPhone.trim()) e.phone = "Phone is required";
    return e;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const errs = validateInquiry();
    setInqErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const inquiry = {
      id:        Date.now(),
      name:      inqName.trim(),
      email:     inqEmail.trim(),
      phone:     inqPhone.trim(),
      eventDate: inqDate  || "Not specified",
      partySize: inqSize  || "Not specified",
      eventType: inqEvent || "Not specified",
      message:   inqMessage.trim() || "None",
      createdAt: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem("sb_inquiries") || "[]");
    stored.push(inquiry);
    localStorage.setItem("sb_inquiries", JSON.stringify(stored));
    setLastInquiry(inquiry);
    setInqSuccess(true);
  };

  const resetInquiry = () => {
    setInqName(""); setInqEmail(""); setInqPhone(""); setInqDate("");
    setInqSize(""); setInqEvent(""); setInqMessage("");
    setInqErrors({}); setInqSuccess(false); setShowInquiry(false);
  };

  /* ── format stored report date ── */
  const reportDate = useMemo(() => {
    const dateValue = activeReport?.type === 'reservation' ? activeReport?.date : activeReport?.eventDate;
    if (!dateValue || dateValue === "Not specified") return "—";
    try {
      return new Date(dateValue).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      });
    } catch { return dateValue; }
  }, [activeReport]);

  const reportName = useMemo(() => {
    if (!activeReport) return "—";
    if (activeReport.type === 'inquiry') return activeReport.name || "—";
    return (activeReport.fullName ||
           `${activeReport.firstName || ""} ${activeReport.lastName || ""}`.trim() ||
           "—");
  }, [activeReport]);

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <section className="reservations-page">
      <div className="container">
        <ReservationHero />

        <div className="res-grid">

          {/* ── LEFT: FORM + REPORT ── */}
          <div className="res-form-col">
            <ReservationForm
              handleSubmit={handleSubmit}
              partySize={partySize}       setPartySize={setPartySize}
              occasion={occasion}         setOccasion={setOccasion}
              fullName={fullName}         setFullName={setFullName}
              phone={phone}               setPhone={setPhone}
              email={email}               setEmail={setEmail}
              specialReqs={specialReqs}   setSpecialReqs={setSpecialReqs}
              errors={errors}
              submitError={submitError}
              OCCASIONS={OCCASIONS}
            >
              <CalendarPicker
                calYear={calYear}         calMonth={calMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
                prevMonth={prevMonth}     nextMonth={nextMonth}
                DAYS={DAYS}               MONTHS={MONTHS}
                calendarDays={calendarDays}
                isDateReserved={isDateReserved}
                isDatePast={isDatePast}
                isDateToday={isDateToday}
                toKey={toKey}
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

            {/* ── REPORT TOGGLE ── */}
            <button
              type="button"
              className={`res-report-toggle${showReport ? " active" : ""}`}
              onClick={() => setShowReport(v => !v)}
              aria-expanded={showReport}
            >
              <FileText size={15} />
              {showReport 
                ? (activeReport?.type === 'inquiry' ? "Hide Last Inquiry" : "Hide Last Reservation") 
                : (activeReport?.type === 'inquiry' ? "View Last Inquiry Report" : "View Last Reservation Report")
              }
              <ChevronDown size={15} className="chevron" />
            </button>

            {/* ── REPORT PANEL ── */}
            <div className={`res-report-panel${showReport ? " active" : ""}`}>
              <div className="res-report-inner">
                <div className="res-report-header">
                  <span className="res-report-tag">
                    {activeReport 
                      ? (activeReport.type === 'reservation' 
                          ? `Confirmation #${activeReport.id}` 
                          : `Inquiry #${String(activeReport.id).slice(-6)}`)
                      : "No activity on file"}
                  </span>
                  {activeReport && (
                    <span className={`res-report-badge ${activeReport.type === 'inquiry' ? 'inquiry' : ''}`}>
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
                          {activeReport.partySize}{" "}
                          {parseInt(activeReport.partySize) === 1 ? "Guest" : "Guests"}
                        </div>
                      </div>
                      <div>
                        <div className="res-report-label">
                          {activeReport.type === 'reservation' ? 'Occasion' : 'Status'}
                        </div>
                        <div className="res-report-value">
                          {activeReport.type === 'reservation' 
                            ? (activeReport.occasion && activeReport.occasion !== "None" ? activeReport.occasion : "—")
                            : "Pending Review"}
                        </div>
                      </div>
                      <div>
                        <div className="res-report-label">Name</div>
                        <div className="res-report-value">{reportName}</div>
                      </div>
                      <div>
                        <div className="res-report-label">Email</div>
                        <div
                          className="res-report-value"
                          style={{ wordBreak: "break-all" }}
                        >
                          {activeReport.email}
                        </div>
                      </div>
                    </div>

                    {(activeReport.specialRequests || activeReport.message) &&
                      (activeReport.specialRequests !== "None" && activeReport.message !== "None") && (
                        <div className="res-report-footer">
                          <div className="res-report-divider" />
                          <div className="res-report-label" style={{ marginBottom: 4 }}>
                            {activeReport.type === 'reservation' ? 'Special Requests' : 'Message'}
                          </div>
                          <div
                            className="res-report-value"
                            style={{
                              fontWeight: 400,
                              color: "var(--color-text-body)",
                              fontSize: 13,
                            }}
                          >
                            {activeReport.type === 'reservation' ? activeReport.specialRequests : activeReport.message}
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
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <ReservationSidebar setShowInquiry={setShowInquiry} />
        </div>
      </div>

      {/* ══ PRIVATE DINING INQUIRY MODAL ══ */}
      {showInquiry && (
        <div className="res-modal-overlay" onClick={resetInquiry}>
          <div
            className="res-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Private Dining Inquiry"
          >
            {/* drag pill — visible on mobile only via CSS */}
            <div className="res-modal-drag" />

            <button
              className="res-modal__close"
              onClick={resetInquiry}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {inqSuccess ? (
              /* ── SUCCESS ── */
              <div className="res-modal__success">
                <div className="res-modal__success-icon">
                  <CheckCircle size={36} />
                </div>
                <h2 className="res-modal__title">Inquiry Submitted</h2>
                <p className="res-modal__subtitle">
                  Our events team will reach out within 24 hours to
                  discuss your special occasion.
                </p>
                <button
                  className="res-submit-btn"
                  style={{ maxWidth: 240, marginBottom: 0 }}
                  onClick={resetInquiry}
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── FORM ── */
              <>
                {/* Hero strip */}
                <div className="res-modal__hero">
                  <img
                    src="/images/Reservations/Private_Dining.webp"
                    alt=""
                    className="res-modal__hero-img"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div className="res-modal__hero-overlay" />
                  <div className="res-modal__hero-content">
                    <span className="res-modal__hero-tag">Private Event</span>
                    <h2 className="res-modal__hero-title">Private Dining</h2>
                    <p className="res-modal__hero-sub">
                      Vault room · Garden terrace · Up to 60 guests
                    </p>
                  </div>
                </div>

                {/* Scrollable form body */}
                <div className="res-modal__body">
                  <p className="res-modal__lead">
                    Tell us about your event and we'll craft a personalised
                    experience just for you.
                  </p>

                  <form onSubmit={handleInquirySubmit} noValidate>
                    <div className="res-form__row">
                      <div className="res-form__field">
                        <label className="res-label">
                          Name <span className="res-req">*</span>
                        </label>
                        <input
                          className={`res-input${inqErrors.name ? " res-input--error" : ""}`}
                          placeholder="Your name"
                          value={inqName}
                          onChange={e => setInqName(e.target.value)}
                        />
                        {inqErrors.name && (
                          <span className="res-error">
                            <AlertCircle size={13} /> {inqErrors.name}
                          </span>
                        )}
                      </div>
                      <div className="res-form__field">
                        <label className="res-label">
                          Email <span className="res-req">*</span>
                        </label>
                        <input
                          type="email"
                          className={`res-input${inqErrors.email ? " res-input--error" : ""}`}
                          placeholder="you@email.com"
                          value={inqEmail}
                          onChange={e => setInqEmail(e.target.value)}
                        />
                        {inqErrors.email && (
                          <span className="res-error">
                            <AlertCircle size={13} /> {inqErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="res-form__row">
                      <div className="res-form__field">
                        <label className="res-label">
                          Phone <span className="res-req">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`res-input${inqErrors.phone ? " res-input--error" : ""}`}
                          placeholder="(555) 000-0000"
                          value={inqPhone}
                          onChange={e => setInqPhone(e.target.value)}
                        />
                        {inqErrors.phone && (
                          <span className="res-error">
                            <AlertCircle size={13} /> {inqErrors.phone}
                          </span>
                        )}
                      </div>
                      <div className="res-form__field">
                        <label className="res-label">Preferred Date</label>
                        <input
                          type="date"
                          className="res-input"
                          value={inqDate}
                          onChange={e => setInqDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="res-form__row">
                      <div className="res-form__field">
                        <label className="res-label">Estimated Guests</label>
                        <input
                          type="number"
                          className="res-input"
                          placeholder="e.g. 25"
                          min="11"
                          value={inqSize}
                          onChange={e => setInqSize(e.target.value)}
                        />
                      </div>
                      <div className="res-form__field">
                        <label className="res-label">Event Type</label>
                        <div className="res-select-wrapper">
                          <select
                            className="res-select"
                            value={inqEvent}
                            onChange={e => setInqEvent(e.target.value)}
                          >
                            <option value="">Select type</option>
                            <option>Corporate Dinner</option>
                            <option>Wedding Reception</option>
                            <option>Birthday Party</option>
                            <option>Social Gathering</option>
                            <option>Other Event</option>
                          </select>
                          <ChevronDown className="res-select-icon" size={14} />
                        </div>
                      </div>
                    </div>

                    <div className="res-form__section">
                      <label className="res-label">Message</label>
                      <textarea
                        className="res-textarea"
                        rows={3}
                        placeholder="Dietary requirements, theme, AV needs..."
                        value={inqMessage}
                        onChange={e => setInqMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="res-submit-btn">
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Reservations;