import { useEffect, useState } from 'react'
import './Toast.css'

const MESSAGES = {
  signup: {
    title: 'Welcome to Savory Bistro, {firstName}!',
    subtitle: 'Your account has been created. Enjoy your experience.'
  },
  login: {
    title: 'Welcome back, {firstName}!',
    subtitle: 'Great to have you with us again.'
  }
}

export default function Toast({ type, firstName, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 3800)
    const dismissTimer = setTimeout(() => onDismiss(), 4300)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(dismissTimer)
    }
  }, [onDismiss])

  function handleClose() {
    setIsExiting(true)
    setTimeout(() => onDismiss(), 500)
  }

  const msg = MESSAGES[type]
  if (!msg) return null

  return (
    <div 
      className={`toast ${isExiting ? 'toast--exit' : 'toast--enter'}`}
      role="status" 
      aria-live="polite"
    >
      <div className="toast-content">
        <h4 className="toast-title">{msg.title.replace('{firstName}', firstName)}</h4>
        <p className="toast-sub">{msg.subtitle}</p>
      </div>
      <button className="toast-close" onClick={handleClose} aria-label="Close notification">×</button>
      <div className="toast-progress-track">
        <div className="toast-progress" />
      </div>
    </div>
  )
}
