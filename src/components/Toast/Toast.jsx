/** Toast.jsx - Portal-based Notification System **/
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, X, Info, AlertTriangle, LogOut, Calendar } from "lucide-react";
import "./Toast.css";

/** Timing & Animation Constants **/
export const TOAST_VISIBLE_MS = 4000;
export const TOAST_ANIM_MS    = 500;

/** Variant Configurations **/
const TOAST_CONFIGS = {
  // personalized signup welcome
  signup: (name) => ({
    title: `Welcome, ${name}!`,
    subtitle: "Your journey with Savory Bistro begins now.",
    icon: <CheckCircle size={22} />,
  }),
  // returning user welcome
  login: (name) => ({
    title: `Welcome back, ${name}!`,
    subtitle: "It is wonderful to have you with us again.",
    icon: <CheckCircle size={22} />,
  }),
  // secure signout feedback
  logout: (name) => ({
    title: `See you soon, ${name}!`,
    subtitle: "You have been signed out successfully.",
    icon: <LogOut size={22} />,
  }),
  // booking details summary
  reservation: (name, extra) => ({
    title: "Table Confirmed!",
    subtitle: `We'll see you on ${extra?.date} at ${extra?.time}.`,
    icon: <Calendar size={22} />,
  }),
  // event planning confirmation
  inquiry: (name) => ({
    title: "Inquiry Received",
    subtitle: "We will contact you shortly about your event.",
    icon: <Info size={22} />,
  }),
  // general contact success
  contact: (name) => ({
    title: "Message Sent",
    subtitle: `Thank you, ${name}. We'll be in touch soon!`,
    icon: <CheckCircle size={22} />,
  }),
  // profile update feedback
  nameUpdate: (name) => ({
    title: "Profile Updated",
    subtitle: "Your information has been saved successfully.",
    icon: <CheckCircle size={22} />,
  }),
  // security change confirmation
  passwordUpdate: () => ({
    title: "Security Updated",
    subtitle: "Your password has been successfully changed.",
    icon: <CheckCircle size={22} />,
  }),
  // fallback error state
  error: () => ({
    title: "Something went wrong",
    subtitle: "Please try again in a moment.",
    icon: <AlertTriangle size={22} />,
  }),
};

/** Glassmorphism Portal Component **/
export default function Toast({
  type,
  firstName,
  extra,
  onDismiss,
  isExiting,
}) {
  const [localExiting, setLocalExiting] = useState(false);
  const exiting = isExiting || localExiting;

  const config =
    TOAST_CONFIGS[type]?.(firstName, extra) || TOAST_CONFIGS.error();

  useEffect(() => {
    setLocalExiting(false);

    // sequential dismissal: visibility phase -> exit animation -> callback
    const exitTimer = setTimeout(() => setLocalExiting(true), TOAST_VISIBLE_MS);
    const doneTimer = setTimeout(() => onDismiss(), TOAST_VISIBLE_MS + TOAST_ANIM_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [type, firstName, onDismiss]);

  const handleManualClose = () => {
    setLocalExiting(true);
    setTimeout(() => onDismiss(), TOAST_ANIM_MS);
  };

  // Render to document body to ensure it sits above all other stacking contexts
  return createPortal(
    <div
      className={`Toast ${exiting ? "Toast--exit" : "Toast--enter"}`}
      role="status"
    >
      <div className="Toast__icon-wrap">{config.icon}</div>

      <div className="Toast__content">
        <h4 className="Toast__title">{config.title}</h4>
        <p className="Toast__subtitle">{config.subtitle}</p>
      </div>

      <button
        className="Toast__close"
        onClick={handleManualClose}
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>

      <div className="Toast__progress" />
    </div>,
    document.body,
  );
}
