import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import mockData from '../../../mock-data.json'
import SignupPanel from './sections/SignupPanel/SignupPanel'
import SignupForm  from './sections/SignupForm/SignupForm'
import './Signup.css'

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

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let hasError = false

    if (!firstName.trim() || firstName.trim().length < 2) {
      setFirstNameError('Please enter your first name.')
      hasError = true
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      setLastNameError('Please enter your last name.')
      hasError = true
    }
    if (!email.trim()) {
      setEmailError('Email address is required.')
      hasError = true
    } else if (!emailRx.test(email)) {
      setEmailError('Please enter a valid email address.')
      hasError = true
    }
    if (!password.trim()) {
      setPasswordError('Please choose a password.')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
      hasError = true
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password.')
      hasError = true
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.')
      hasError = true
    }
    if (hasError) return

    const result = await registerUser({ firstName, lastName, email, password })
    if (!result.success) {
      setEmailError(result.error)
      return
    }

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
        onSubmit={handleSubmit}
      />
    </div>
  )
}
