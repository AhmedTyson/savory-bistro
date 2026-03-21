import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context'
import LoginPanel from './sections/LoginPanel/LoginPanel'
import LoginForm  from './sections/LoginForm/LoginForm'
import './Login.css'

/* RFC 5322 email regex with TLD ≥ 2 chars */
const emailRx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

export default function Login() {
  const { validateLogin, login, currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const mountedRef = useRef(false)

  // Only redirect on MOUNT if user is already logged in.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      if (currentUser) navigate('/', { replace: true })
    }
  }, [currentUser, navigate])

  // Returning user detection
  const [isReturningUser, setIsReturningUser] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('sb_has_logged_in') === 'true') {
      setIsReturningUser(true)
    }
  }, [])

  // Form state
  const [email, setEmail]                     = useState('')
  const [emailError, setEmailError]           = useState('')
  const [password, setPassword]               = useState('')
  const [passwordError, setPasswordError]     = useState('')
  const [showPassword, setShowPassword]       = useState(false)
  const [submitError, setSubmitError]         = useState('')

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

  function handleSubmit(e) {
    if (e) e.preventDefault()
    let hasError = false

    // Rate limit check
    if (cooldownSeconds > 0) return

    // Email — trim + RFC 5322
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setEmailError('Email address is required.')
      hasError = true
    } else if (!emailRx.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      hasError = true
    }
    if (!password.trim()) {
      setPasswordError('Password is required.')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
      hasError = true
    }
    if (hasError) {
      checkRateLimit()
      return
    }

    const userFound = validateLogin(trimmedEmail, password)
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
        email={email}               onEmailChange={setEmail}
        emailError={emailError}     onEmailErrorClear={() => setEmailError('')}
        password={password}         onPasswordChange={setPassword}
        passwordError={passwordError} onPasswordErrorClear={() => setPasswordError('')}
        showPassword={showPassword} onTogglePassword={() => setShowPassword(p => !p)}
        submitError={submitError}
        cooldownSeconds={cooldownSeconds}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
