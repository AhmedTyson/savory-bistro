import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'
import mockData from '../../../mock-data.json'
import SignupPanel from './sections/SignupPanel/SignupPanel'
import SignupForm  from './sections/SignupForm/SignupForm'
import './Signup.css'

/* RFC 5322 email regex with TLD ≥ 2 chars */
const emailRx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

export default function Signup() {
  const { registerUser, currentUser } = useAuth()
  const navigate = useNavigate()
  const mountedRef = useRef(false)

  // Redirect on mount ONLY if already logged in
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      if (currentUser) navigate('/', { replace: true })
    }
  }, []) // empty array — mount only

  // Form state
  const [firstName, setFirstName]                         = useState('')
  const [firstNameError, setFirstNameError]               = useState('')
  const [lastName, setLastName]                           = useState('')
  const [lastNameError, setLastNameError]                 = useState('')
  const [email, setEmail]                                 = useState('')
  const [emailError, setEmailError]                       = useState('')
  const [password, setPassword]                           = useState('')
  const [passwordError, setPasswordError]                 = useState('')
  const [confirmPassword, setConfirmPassword]             = useState('')
  const [confirmPasswordError, setConfirmPasswordError]   = useState('')
  const [showPassword, setShowPassword]                   = useState(false)
  const [showConfirm, setShowConfirm]                     = useState(false)

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
    const key = 'sb_signup_attempts'
    const raw = localStorage.getItem(key)
    const data = raw ? JSON.parse(raw) : { count: 0, lastAttempt: 0 }
    const now = Date.now()
    const elapsed = (now - data.lastAttempt) / 1000

    if (data.count >= 5 && elapsed < 30) {
      const remaining = Math.ceil(30 - elapsed)
      startCooldown(remaining)
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
    localStorage.removeItem('sb_signup_attempts')
    setCooldownSeconds(0)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    let hasError = false

    // Rate limit check
    if (cooldownSeconds > 0) return

    // First name
    if (!firstName.trim() || firstName.trim().length < 2) {
      setFirstNameError('Please enter your first name.')
      hasError = true
    }
    // Last name
    if (!lastName.trim() || lastName.trim().length < 2) {
      setLastNameError('Please enter your last name.')
      hasError = true
    }

    // Email — trim, length, RFC 5322
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setEmailError('Email address is required.')
      hasError = true
    } else if (trimmedEmail.length > 254) {
      setEmailError('Email address is too long (max 254 characters).')
      hasError = true
    } else if (!emailRx.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      hasError = true
    }

    // Password — 5 rules
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber    = /[0-9]/.test(password)
    const hasSpecial   = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    if (!password.trim()) {
      setPasswordError('Please choose a password.')
      hasError = true
    } else if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      const missing = []
      if (!hasMinLength) missing.push('at least 8 characters')
      if (!hasUppercase) missing.push('an uppercase letter')
      if (!hasLowercase) missing.push('a lowercase letter')
      if (!hasNumber)    missing.push('a number')
      if (!hasSpecial)   missing.push('a special character')
      setPasswordError('Password must contain: ' + missing.join(', ') + '.')
      hasError = true
    }

    // Confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password.')
      hasError = true
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.')
      hasError = true
    }

    if (hasError) {
      if (!checkRateLimit()) return
      return
    }

    const result = await registerUser({ firstName, lastName, email: trimmedEmail, password })
    if (!result.success) {
      setEmailError(result.error)
      checkRateLimit()
      return
    }

    // Success — reset rate limit
    resetRateLimit()

    // Navigate IMMEDIATELY after registerUser sets currentUser
    localStorage.setItem('sb_has_logged_in', 'true')
    navigate('/', {
      replace: true,
      state: { toast: 'signup', firstName: result.user.firstName }
    })
  }

  const dishes = mockData.signatureDishes.slice(0, 3)

  return (
    <div className="auth-page">
      <SignupPanel dishes={dishes} />
      <SignupForm
        firstName={firstName}               onFirstNameChange={setFirstName}
        firstNameError={firstNameError}     onFirstNameErrorClear={() => setFirstNameError('')}
        lastName={lastName}                 onLastNameChange={setLastName}
        lastNameError={lastNameError}       onLastNameErrorClear={() => setLastNameError('')}
        email={email}                       onEmailChange={setEmail}
        emailError={emailError}             onEmailErrorClear={() => setEmailError('')}
        password={password}                 onPasswordChange={setPassword}
        passwordError={passwordError}       onPasswordErrorClear={() => setPasswordError('')}
        confirmPassword={confirmPassword}   onConfirmPasswordChange={setConfirmPassword}
        confirmPasswordError={confirmPasswordError}
        onConfirmPasswordErrorClear={() => setConfirmPasswordError('')}
        showPassword={showPassword}         onTogglePassword={() => setShowPassword(p => !p)}
        showConfirm={showConfirm}           onToggleConfirm={() => setShowConfirm(p => !p)}
        cooldownSeconds={cooldownSeconds}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
