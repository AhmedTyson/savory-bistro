import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context';
import { validateEmail, validatePhone, validateRequired } from '../../../utils/validation';

const API = 'http://localhost:3001/api';

export function useReservations() {
  const { currentUser, showToast } = useAuth();
  
  const [formData, setFormData] = useState({
    partySize: '',
    occasion: '',
    fullName: '',
    phone: '',
    email: '',
    specialReqs: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // sync initial data for auth'd users
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: `${currentUser.firstName} ${currentUser.lastName || ''}`.trim(),
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const syncHistory = useCallback(async () => {
    if (!currentUser) {
      setHistory([]);
      return;
    }

    const userIdStr = String(currentUser.id);
    let allActivity = [];

    // inquiries pull from localstorage
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

    // reservations (local cache first)
    const resKey = `sb_last_reservation_${userIdStr}`;
    const resStored = localStorage.getItem(resKey);
    if (resStored) {
      try {
        const r = JSON.parse(resStored);
        if (String(r.userId) === userIdStr) {
          allActivity.push({ ...r, type: 'reservation', timestamp: new Date(r.submittedAt).getTime() });
        }
      } catch {}
    }

    // reservations from API
    try {
      const { data } = await axios.get(`${API}/reservations?userId=${userIdStr}`);
      const apiRes = data.reservations || [];
      const formattedRes = apiRes.map(r => ({ 
        ...r, 
        type: 'reservation', 
        timestamp: new Date(r.submittedAt).getTime() 
      }));
      
      const existingIds = new Set(allActivity.map(a => a.id));
      formattedRes.forEach(r => {
        if (!existingIds.has(r.id)) allActivity.push(r);
      });
    } catch (err) { console.error("Failed to fetch API history:", err); }

    allActivity.sort((a, b) => b.timestamp - a.timestamp);
    setHistory(allActivity);
  }, [currentUser]);

  useEffect(() => {
    syncHistory();
  }, [syncHistory]);

  const validate = () => {
    const e = {};
    if (!formData.partySize) e.partySize = "Please select party size";
    if (!selectedDate) e.date = "Please select a date";
    if (!selectedTime) e.time = "Please select a time";
    const fullNameErr = validateRequired(formData.fullName, 'Full name')
    if (fullNameErr) e.fullName = fullNameErr;

    const phoneErr = validatePhone(formData.phone, 'Phone number')
    if (phoneErr) e.phone = phoneErr;

    const emailErr = validateEmail(formData.email, 'Email')
    if (emailErr) e.email = emailErr;
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!currentUser) return { error: 'LOGIN_REQUIRED' };

    setLoading(true);
    setSubmitError('');
    
    if (!validate()) {
      setLoading(false);
      return;
    }

    const payload = {
      id: Date.now().toString(),
      userId: String(currentUser.id),
      firstName: currentUser.firstName || formData.fullName.split(" ")[0],
      lastName: currentUser.lastName || formData.fullName.split(" ").slice(1).join(" "),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      partySize: formData.partySize,
      occasion: formData.occasion || "None",
      date: new Date(selectedDate).toISOString(),
      time: selectedTime,
      specialRequests: formData.specialReqs.trim() || "None",
      submittedAt: new Date().toISOString(),
      status: "confirmed",
    };

    try {
      const { data } = await axios.post(`${API}/reservations`, payload);
      const saved = data.reservation || data;
      localStorage.setItem(`sb_last_reservation_${currentUser.id}`, JSON.stringify(saved));
      await syncHistory();
      showToast({ 
        type: 'reservation', 
        firstName: currentUser.firstName, 
        extra: { 
          date: new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
          time: selectedTime, 
          submittedAt: payload.submittedAt 
        } 
      });
      
      // clean up fields but keep identity data
      setFormData(prev => ({ ...prev, partySize: '', occasion: '', specialReqs: '' }));
      setSelectedTime('');
      return { success: true };
    } catch (err) {
      setSubmitError("Failed to book. Try again.");
      return { error: 'API_ERROR' };
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    updateField,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    errors,
    submitError,
    loading,
    history,
    syncHistory,
    handleSubmit
  };
}
