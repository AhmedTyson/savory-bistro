import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context'
import LoginPanel from './sections/LoginPanel/LoginPanel'
import LoginForm  from './sections/LoginForm/LoginForm'
import './Login.css'

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

  function handleSubmit(e) {
    if (e) e.preventDefault();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let hasError = false

    if (!email.trim()) {
      setEmailError('Email address is required.')
      hasError = true
    } else if (!emailRx.test(email)) {
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
    if (hasError) return

    const userFound = validateLogin(email, password)
    if (!userFound) {
      setSubmitError('Incorrect email or password. Please try again.')
      return
    }

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
        onSubmit={handleSubmit}
      />
    </div>
  )
}
