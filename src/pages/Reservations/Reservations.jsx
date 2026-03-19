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

import { 
  OCCASIONS, 
  RESERVED_TIMES, 
  ALL_TIMES 
} from './utils/reservationUtils';
import './Reservations.css';

const API = 'http://localhost:3001/api';

function Reservations() {
  const { currentUser, showToast } = useAuth();
  const navigate        = useNavigate();

  /* ── Form State ── */
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

  /* ── UI State ── */
  const [errors,      setErrors]      = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showInquiry, setShowInquiry] = useState(false);
  const [loading,     setLoading]     = useState(false);

  /* ── History State ── */
  const [showReport,  setShowReport]  = useState(false);
  const [history,     setHistory]     = useState([]);

  // Fetch / Sync History
  const syncHistory = async () => {
    if (!currentUser) {
      setHistory([]);
      return;
    }

    const userIdStr = String(currentUser.id);
    let allActivity = [];

    // 1. Inquiries from LocalStorage
    const inqStored = localStorage.getItem("sb_inquiries");
    if (inqStored) {
      try {
        const inquiries = JSON.parse(inqStored);
        const userInquiries = inquiries
          .filter(i => String(i.userId) === userIdStr)
          .map(i => ({ ...i, type: 'inquiry', timestamp: new Date(i.createdAt).getTime() }));
        allActivity = [...allActivity, ...userInquiries];
      } catch (err) { console.error("Error parsing inquiries:", err); }
    }

    // 2. Reservations (Local Cache first, then API)
    const resKey    = `sb_last_reservation_${userIdStr}`;
    const resStored = localStorage.getItem(resKey);
    if (resStored) {
      try {
        const r = JSON.parse(resStored);
        if (String(r.userId) === userIdStr) {
          allActivity.push({ ...r, type: 'reservation', timestamp: new Date(r.submittedAt).getTime() });
        }
      } catch {}
    }

    // Always try to fetch freshest reservations
    try {
      const { data } = await axios.get(`${API}/reservations?userId=${userIdStr}`);
      const apiRes = data.reservations || [];
      const formattedRes = apiRes.map(r => ({ 
        ...r, 
        type: 'reservation', 
        timestamp: new Date(r.submittedAt).getTime() 
      }));
      
      // Merge and deduplicate by ID
      const existingIds = new Set(allActivity.map(a => a.id));
      formattedRes.forEach(r => {
        if (!existingIds.has(r.id)) allActivity.push(r);
      });
    } catch (err) { console.error("Failed to fetch API history:", err); }

    // Sort: Newest first
    allActivity.sort((a, b) => b.timestamp - a.timestamp);
    setHistory(allActivity);
  };

  useEffect(() => {
    syncHistory();
    if (currentUser) {
      setFullName(`${currentUser.firstName} ${currentUser.lastName || ""}`.trim());
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const availableTimes = useMemo(() => {
    if (!selectedDate) return ALL_TIMES;
    const booked = RESERVED_TIMES[selectedDate] || [];
    return ALL_TIMES.filter(t => !booked.includes(t));
  }, [selectedDate]);

  const validate = () => {
    const e = {};
    if (!partySize)       e.partySize = "Please select party size";
    if (!selectedDate)    e.date      = "Please select a date";
    if (!selectedTime)    e.time      = "Please select a time";
    if (!fullName.trim()) e.fullName  = "Full name is required";
    if (!phone.trim())    e.phone     = "Phone number is required";
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(phone.trim())) e.phone = "Invalid phone number";
    
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Invalid email";
    
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return (alert('Please log in.'), navigate('/login'));
    
    setLoading(true);
    setSubmitError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return setLoading(false);

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
      const saved = data.reservation || data;
      localStorage.setItem(`sb_last_reservation_${currentUser?.id}`, JSON.stringify(saved));
      await syncHistory();
      showToast({ type: 'reservation', firstName: currentUser?.firstName, extra: { date: selectedDate, time: selectedTime } });
      // navigate("/", { replace: true, state: { toast: "reservation", firstName: currentUser?.firstName, date: selectedDate, time: selectedTime } });
    } catch { setSubmitError("Failed to book. Try again."); }
    finally { setLoading(false); }
  };

  return (
    <section className="reservations-page">
      <div className="container">
        <ReservationHero />
        <div className="res-grid">
          <div className="res-form-col">
            <ReservationForm
              handleSubmit={handleSubmit}
              partySize={partySize} setPartySize={setPartySize}
              occasion={occasion} setOccasion={setOccasion}
              fullName={fullName} setFullName={setFullName}
              phone={phone} setPhone={setPhone}
              email={email} setEmail={setEmail}
              specialReqs={specialReqs} setSpecialReqs={setSpecialReqs}
              errors={errors} submitError={submitError} loading={loading}
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