/** Login.jsx - Guest Authentication & Session Entry **/
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context'
import { validateEmail, validateMinLength } from '../../utils/validation'
import LoginPanel from './sections/LoginPanel/LoginPanel'
import LoginForm  from './sections/LoginForm/LoginForm'
import ForgotPasswordModal from './sections/ForgotPasswordModal/ForgotPasswordModal'
import './Login.css'

export default function Login() {
  const { validateLogin, login, currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const mountedRef = useRef(false)

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      if (currentUser) navigate('/', { replace: true })
    }
  }, [currentUser, navigate])

  // detect returning guests for personalized greetings
  const [isReturningUser, setIsReturningUser] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('sb_has_logged_in') === 'true') {
      setIsReturningUser(true)
    }
  }, [])

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError]         = useState('')
  const [showForgot, setShowForgot]           = useState(false)

  // Rate-limiting state
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const cooldownRef = useRef(null)

  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current) }
  }, [])

  function startCooldown(seconds) {
    setCooldownSeconds(seconds)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setCooldownSeconds(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function checkRateLimit() {
    const key = 'sb_login_attempts'
    const raw = localStorage.getItem(key)
    const data = raw ? JSON.parse(raw) : { count: 0, lastAttempt: 0 }
    const now = Date.now()
    const elapsed = (now - data.lastAttempt) / 1000

    if (data.count >= 5 && elapsed < 30) {
      const remaining = Math.ceil(30 - elapsed)
      startCooldown(remaining)
      setSubmitError(`Too many attempts. Please wait ${remaining} seconds.`)
      return false
    }

    // If cooldown has expired, reset
    if (elapsed >= 30) data.count = 0

    data.count += 1
    data.lastAttempt = now
    localStorage.setItem(key, JSON.stringify(data))
    return true
  }

  function resetRateLimit() {
    localStorage.removeItem('sb_login_attempts')
    setCooldownSeconds(0)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  function handleSubmit(e) {
    if (e) e.preventDefault()
    const newErrors = {}

    // Rate limit check
    if (cooldownSeconds > 0) return

    // Email validation
    const emailErr = validateEmail(formData.email)
    if (emailErr) newErrors.email = emailErr

    // Password validation
    const passwordErr = validateMinLength(formData.password, 6, 'Password')
    if (passwordErr) newErrors.password = passwordErr

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      checkRateLimit()
      return
    }

    const userFound = validateLogin(formData.email.trim(), formData.password)
    if (!userFound) {
      setSubmitError('Incorrect email or password. Please try again.')
      checkRateLimit()
      return
    }

    // Success — reset rate limit
    resetRateLimit()

    // Set currentUser in context
    login(userFound)
    // Mark as returning user for future visits
    localStorage.setItem('sb_has_logged_in', 'true')
    
    // Auth-aware navigation
    const from = location.state?.from || '/';
    navigate(from, { 
      replace: true,
      state: { toast: 'login', firstName: userFound.firstName }
    })
  }

  return (
    <div className="Login">
      <LoginPanel />
      <LoginForm
        isReturningUser={isReturningUser}
        formData={formData}
        updateField={updateField}
        errors={errors}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(p => !p)}
        submitError={submitError}
        cooldownSeconds={cooldownSeconds}
        onSubmit={handleSubmit}
        onForgotClick={() => setShowForgot(true)}
      />
      <ForgotPasswordModal 
        isOpen={showForgot} 
        onClose={() => setShowForgot(false)} 
      />
    </div>
  )
}
