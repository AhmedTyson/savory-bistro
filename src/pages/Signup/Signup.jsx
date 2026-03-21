/** Signup.jsx - Guest Registration & Onboarding Flow **/
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'
import mockData from '../../../mock-data.json'
import { 
  validateEmail, 
  validateMinLength, 
  validatePasswordStrength, 
  validatePasswordMatch 
} from '../../utils/validation'
import SignupPanel from './sections/SignupPanel/SignupPanel'
import SignupForm  from './sections/SignupForm/SignupForm'
import './Signup.css'

export default function Signup() {
  const { registerUser, currentUser } = useAuth()
  const navigate = useNavigate()
  const mountedRef = useRef(false)

  // Auth guard: redirect if already logged in
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      if (currentUser) navigate('/', { replace: true })
    }
  }, []) // empty array — mount only

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

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

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    const newErrors = {}

    // Rate limit check
    if (cooldownSeconds > 0) return

    // First name
    const fNameError = validateMinLength(formData.firstName, 2, 'First name')
    if (fNameError) newErrors.firstName = fNameError

    // Last name
    const lNameError = validateMinLength(formData.lastName, 2, 'Last name')
    if (lNameError) newErrors.lastName = lNameError

    // Email
    const emailErr = validateEmail(formData.email)
    if (emailErr) newErrors.email = emailErr

    // Password
    const pwErr = validatePasswordStrength(formData.password)
    if (pwErr) newErrors.password = pwErr

    // Confirm password
    const confirmErr = validatePasswordMatch(formData.password, formData.confirmPassword)
    if (confirmErr) newErrors.confirmPassword = confirmErr

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      if (!checkRateLimit()) return
      return
    }

    const result = await registerUser({ 
      firstName: formData.firstName, 
      lastName: formData.lastName, 
      email: formData.email.trim(), 
      password: formData.password 
    })
    
    if (!result.success) {
      setErrors({ email: result.error })
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
        formData={formData}
        updateField={updateField}
        errors={errors}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(p => !p)}
        showConfirm={showConfirm}
        onToggleConfirm={() => setShowConfirm(p => !p)}
        cooldownSeconds={cooldownSeconds}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
