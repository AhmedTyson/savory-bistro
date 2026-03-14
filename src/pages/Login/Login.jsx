import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoginPanel from './sections/LoginPanel/LoginPanel'
import LoginForm  from './sections/LoginForm/LoginForm'
import './Login.css'

export default function Login() {
  const { validateLogin, login, currentUser } = useAuth()
  const navigate = useNavigate()

  // Returning user detection
  const [isReturningUser, setIsReturningUser] = useState(false)

  // Form state
  const [email, setEmail]           = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword]     = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword]   = useState(false)
  const [submitError, setSubmitError]     = useState('')

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  useEffect(() => {
    const visited = localStorage.getItem('sb_has_logged_in')
    if (visited === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReturningUser(true)
    }
  }, [])

  function handleSubmit(e) {
    if (e) e.preventDefault()
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

    // Validate against merged user list
    const user = validateLogin(email, password)
    if (!user) {
      setSubmitError('Incorrect email or password. Please try again.')
      return
    }

    login(user)
    localStorage.setItem('sb_has_logged_in', 'true')
    // Navigate to home — toaster is handled there (see Prompt 2)
    navigate('/', { state: { toast: 'login', firstName: user.firstName } })
  }

  return (
    <div className="auth-page">
      <LoginPanel />
      <LoginForm
        isReturningUser={isReturningUser}
        email={email}             onEmailChange={setEmail}
        emailError={emailError}   onEmailErrorClear={() => setEmailError('')}
        password={password}       onPasswordChange={setPassword}
        passwordError={passwordError} onPasswordErrorClear={() => setPasswordError('')}
        showPassword={showPassword}   onTogglePassword={() => setShowPassword(p => !p)}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
