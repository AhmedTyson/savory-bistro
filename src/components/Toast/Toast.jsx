import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import './Toast.css'

// Props:
//   type       — 'signup' | 'login'
//   firstName  — string, the user's first name
//   onDismiss  — callback to clear the toast from parent state

const MESSAGES = {
  signup: (name) => ({
    title:    `Welcome to Savory Bistro, ${name}!`,
    subtitle: 'Your account has been created. Enjoy your experience.',
  }),
  login: (name) => ({
    title:    `Welcome back, ${name}!`,
    subtitle: 'Great to have you with us again.',
  }),
  logout: (name) => ({
    title:    `See you soon, ${name}!`,
    subtitle: 'You have been signed out successfully.',
  }),
}

export default function Toast({ type, firstName, onDismiss }) {
  const [exiting, setExiting] = useState(false)

  const { title, subtitle } = MESSAGES[type]?.(firstName) ?? {
    title: 'Welcome!', subtitle: ''
  }

  useEffect(() => {
    // Start exit animation after 3.8s, then call onDismiss at 4.3s
    const exitTimer = setTimeout(() => setExiting(true), 3800)
    const doneTimer = setTimeout(() => onDismiss(), 4300)
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer) }
  }, [onDismiss])

  function handleClose() {
    setExiting(true)
    setTimeout(() => onDismiss(), 500)
  }

  return (
    <div className={`toast ${exiting ? 'toast--exit' : 'toast--enter'}`}
         role="status" aria-live="polite">
      <div className="toast-icon">
        <CheckCircle size={22} />
      </div>
      <div className="toast-body">
        <p className="toast-title">{title}</p>
        <p className="toast-subtitle">{subtitle}</p>
      </div>
      <button className="toast-close" onClick={handleClose} aria-label="Dismiss">
        <X size={16} />
      </button>
      {/* Progress bar that drains over 4 seconds */}
      <div className="toast-progress" />
    </div>
  )
}
