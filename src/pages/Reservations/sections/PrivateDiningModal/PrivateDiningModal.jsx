/** PrivateDiningModal.jsx - Specialized Event Inquiry Flow **/
import { useState, useEffect } from "react";
import { useAuth } from "../../../../context";
import { CheckCircle, X, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { validateEmail, validatePhone, validateRequired } from "../../../../utils/validation";
import "./PrivateDiningModal.css";

function PrivateDiningModal({ showInquiry, setShowInquiry, onSuccess }) {
  const { currentUser, showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    size: "",
    event: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Prefill form if guest is logged in
    if (showInquiry && currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: `${currentUser.firstName} ${currentUser.lastName || ""}`.trim(),
        email: currentUser.email || "",
      }));
    }

    // Lock scroll and handle global Escape key listener
    if (showInquiry) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e) => e.key === "Escape" && resetInquiry();
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showInquiry, currentUser]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateInquiry = () => {
    const newErrors = {};
    const nameErr = validateRequired(formData.name, 'Name')
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email)
    if (emailErr) {
      newErrors.email = emailErr;
    } else if (
      currentUser &&
      formData.email.trim().toLowerCase() !== currentUser.email.toLowerCase()
    ) {
      newErrors.email = "Email must match your account email";
    }

    const phoneErr = validatePhone(formData.phone, 'Valid phone')
    if (phoneErr) newErrors.phone = phoneErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!validateInquiry()) return;

    const inquiry = {
      id: Date.now().toString(),
      userId: currentUser?.id || "guest",
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem("sb_inquiries") || "[]");
    stored.push(inquiry);
    localStorage.setItem("sb_inquiries", JSON.stringify(stored));

    if (typeof onSuccess === "function") onSuccess();
    showToast({
      type: "inquiry",
      firstName: currentUser?.firstName || formData.name.split(" ")[0],
    });
    setSuccess(true);
  };

  const resetInquiry = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      size: "",
      event: "",
      message: "",
    });
    setErrors({});
    setSuccess(false);
    setShowInquiry(false);
  };

  return (
    <AnimatePresence>
      {showInquiry && (
        <motion.div
          className="PrivateDiningModal__overlay"
          onClick={resetInquiry}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="PrivateDiningModal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Private Dining Inquiry"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="PrivateDiningModal__drag" />

            <button
              className="PrivateDiningModal__close"
              onClick={resetInquiry}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {success ? (
              <div
                className="PrivateDiningModal__success"
                style={{ padding: "30px 20px", textAlign: "center" }}
              >
                <div
                  className="PrivateDiningModal__success-icon"
                  style={{
                    color: "var(--color-green-sustain)",
                    marginBottom: 16,
                  }}
                >
                  <CheckCircle size={36} style={{ margin: "0 auto" }} />
                </div>
                <h2
                  className="PrivateDiningModal__title"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    marginBottom: 8,
                  }}
                >
                  Inquiry Submitted
                </h2>
                <p
                  className="PrivateDiningModal__subtitle"
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                    marginBottom: 20,
                  }}
                >
                  Our events team will reach out within 24 hours to discuss your
                  special occasion.
                </p>
                <button
                  className="ReservationForm__submit-btn"
                  style={{ maxWidth: 200, margin: "0 auto" }}
                  onClick={resetInquiry}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="PrivateDiningModal__hero">
                  <img
                    src="/images/reservations/private-dining-hero.webp"
                    alt=""
                    className="PrivateDiningModal__hero-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="PrivateDiningModal__hero-overlay" />
                  <div className="PrivateDiningModal__hero-content">
                    <span className="PrivateDiningModal__hero-tag">
                      Private Event
                    </span>
                    <h2 className="PrivateDiningModal__hero-title">
                      Private Dining
                    </h2>
                    <p className="PrivateDiningModal__hero-sub">
                      Vault room · Garden terrace · Up to 60 guests
                    </p>
                  </div>
                </div>

                <div className="PrivateDiningModal__body">
                  <p
                    className="PrivateDiningModal__lead"
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-muted)",
                      marginBottom: 16,
                      lineHeight: 1.4,
                    }}
                  >
                    Tell us about your event and we'll craft a personalised
                    experience just for you.
                  </p>

                  <form onSubmit={handleInquirySubmit} noValidate>
                    <div className="ReservationForm__row">
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Name <span className="ReservationForm__req">*</span>
                        </label>
                        <input
                          className={`ReservationForm__input${errors.name ? " ReservationForm__input--error" : ""}`}
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                        />
                        {errors.name && (
                          <span className="ReservationForm__error">
                            <AlertCircle size={13} /> {errors.name}
                          </span>
                        )}
                      </div>
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Email <span className="ReservationForm__req">*</span>
                        </label>
                        <input
                          type="email"
                          className={`ReservationForm__input${errors.email ? " ReservationForm__input--error" : ""}`}
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                        />
                        {errors.email && (
                          <span className="ReservationForm__error">
                            <AlertCircle size={13} /> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ReservationForm__row">
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Phone <span className="ReservationForm__req">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`ReservationForm__input${errors.phone ? " ReservationForm__input--error" : ""}`}
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                        />
                        {errors.phone && (
                          <span className="ReservationForm__error">
                            <AlertCircle size={13} /> {errors.phone}
                          </span>
                        )}
                      </div>
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          className="ReservationForm__input"
                          value={formData.date}
                          onChange={(e) => updateField("date", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="ReservationForm__row">
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Estimated Guests
                        </label>
                        <input
                          type="number"
                          className="ReservationForm__input"
                          placeholder="e.g. 25"
                          min="11"
                          value={formData.size}
                          onChange={(e) => updateField("size", e.target.value)}
                        />
                      </div>
                      <div className="ReservationForm__field">
                        <label className="ReservationForm__label">
                          Event Type
                        </label>
                        <div
                          className="ReservationForm__select-wrapper"
                          style={{ position: "relative" }}
                        >
                          <select
                            className="ReservationForm__select"
                            value={formData.event}
                            onChange={(e) =>
                              updateField("event", e.target.value)
                            }
                          >
                            <option value="">Select type</option>
                            <option>Corporate Dinner</option>
                            <option>Wedding Reception</option>
                            <option>Birthday Party</option>
                            <option>Social Gathering</option>
                            <option>Other Event</option>
                          </select>
                          <ChevronDown
                            style={{
                              position: "absolute",
                              right: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                              color: "#9E9184",
                            }}
                            size={16}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="ReservationForm__section">
                      <label className="ReservationForm__label">Message</label>
                      <textarea
                        className="ReservationForm__textarea"
                        rows={3}
                        placeholder="Dietary requirements, theme, AV needs..."
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="ReservationForm__submit-btn"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PrivateDiningModal;
