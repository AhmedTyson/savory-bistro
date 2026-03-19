import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context';

import ReservationHero     from './sections/ReservationHero/ReservationHero';
import CalendarPicker      from './sections/CalendarPicker/CalendarPicker';
import TimeSlots           from './sections/TimeSlots/TimeSlots';
import ReservationForm     from './sections/ReservationForm/ReservationForm';
import ReservationSidebar  from './sections/ReservationSidebar/ReservationSidebar';
import ReservationReport   from './sections/ReservationReport/ReservationReport';
import PrivateDiningModal  from './sections/PrivateDiningModal/PrivateDiningModal';

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
const pad      = (n)     => String(n).padStart(2,"0");
const toKey    = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const daysIn   = (y,m)   => new Date(y,m+1,0).getDate();
const firstDay = (y,m)   => new Date(y,m,1).getDay();

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
  const [phone,       setPhone]       = useState("");
  const [email,       setEmail]       = useState(currentUser?.email || "");
  const [specialReqs, setSpecialReqs] = useState("");

  /* calendar */
  const today = new Date();
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  /* ui */
  const [errors,      setErrors]      = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showInquiry, setShowInquiry] = useState(false);

  /* report */
  const [showReport,  setShowReport]  = useState(false);
  const [lastRes,     setLastRes]     = useState(null);
  const [lastInquiry, setLastInquiry] = useState(null);

  /* The active object to show in the report panel */
  const activeReport = useMemo(() => {
    if (!lastRes && !lastInquiry) return null;
    if (!lastRes)    return { ...lastInquiry, type: 'inquiry' };
    if (!lastInquiry) return { ...lastRes,    type: 'reservation' };

    const resTime = new Date(lastRes.submittedAt || 0).getTime();
    const inqTime = new Date(lastInquiry.createdAt || 0).getTime();
    return resTime >= inqTime
      ? { ...lastRes,    type: 'reservation' }
      : { ...lastInquiry, type: 'inquiry' };
  }, [lastRes, lastInquiry]);

  /* Load last reservation and last inquiry from localStorage on mount */
  useEffect(() => {
    if (!currentUser) {
      setLastRes(null);
      setLastInquiry(null);
      return;
    }

    const userIdStr = String(currentUser.id);

    // 1. Load last reservation
    const resKey    = `sb_last_reservation_${userIdStr}`;
    const resStored = localStorage.getItem(resKey);
    
    if (resStored) {
      try { 
        const parsed = JSON.parse(resStored);
        if (parsed.userId && String(parsed.userId) === userIdStr) {
          setLastRes(parsed);
        } else {
          setLastRes(null);
        }
      } catch { setLastRes(null); }
    } else {
      // Fallback: Fetch from API if localStorage is empty
      const fetchLastRes = async () => {
        try {
          const { data } = await axios.get(`${API}/reservations?userId=${userIdStr}`);
          const userRes = data.reservations || [];
          if (userRes.length > 0) {
            // Sort by submittedAt descending to get the newest
            const sorted = [...userRes].sort((a, b) => 
              new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
            );
            const latest = sorted[0];
            setLastRes(latest);
            // Sync to localStorage
            localStorage.setItem(resKey, JSON.stringify(latest));
          } else {
            setLastRes(null);
          }
        } catch (err) {
          console.error("Failed to fetch reservation history:", err);
          setLastRes(null);
        }
      };
      fetchLastRes();
    }

    // 2. Load last inquiry from shared pool (Inquiries are currently localStorage only)
    const inqStored = localStorage.getItem("sb_inquiries");
    if (inqStored) {
      try {
        const inquiries = JSON.parse(inqStored);
        if (Array.isArray(inquiries)) {
          const userInquiries = inquiries.filter(i => i.userId && String(i.userId) === userIdStr);
          if (userInquiries.length > 0) {
            setLastInquiry(userInquiries[userInquiries.length - 1]);
          } else {
            setLastInquiry(null);
          }
        } else {
          setLastInquiry(null);
        }
      } catch { setLastInquiry(null); }
    } else {
      setLastInquiry(null);
    }

    // 3. Sync form fields with current user
    if (currentUser) {
      setFullName(`${currentUser.firstName} ${currentUser.lastName || ""}`.trim());
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

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
    if (!email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Please enter a valid email";
    } else if (currentUser && email.trim().toLowerCase() !== currentUser.email.toLowerCase()) {
      e.email = "Email must match your account email";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to make a reservation.');
      navigate('/login');
      return;
    }
    setLoading(true);
    setSubmitError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

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

            <ReservationReport
              activeReport={activeReport}
              showReport={showReport}
              setShowReport={setShowReport}
            />
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <ReservationSidebar setShowInquiry={setShowInquiry} />
        </div>
      </div>

      {/* ══ PRIVATE DINING INQUIRY MODAL ══ */}
      <PrivateDiningModal
        showInquiry={showInquiry}
        setShowInquiry={setShowInquiry}
        setLastInquiry={setLastInquiry}
      />
    </section>
  );
}

export default Reservations;