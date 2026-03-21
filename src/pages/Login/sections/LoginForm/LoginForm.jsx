/** LoginForm.jsx - Interactive Sign-In Interface **/
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import authBgCurve from '../../../../assets/auth-bg-curve.svg'
import zigzag from '../../../../assets/zigzag.svg'
import zigzagOrange from '../../../../assets/zigzag-orange.svg'
import './LoginForm.css'

export default function LoginForm({
  isReturningUser, formData, updateField, errors,
  showPassword, onTogglePassword, submitError,
  cooldownSeconds = 0,
  onSubmit, onForgotClick
}) {
  return (
    <div className="LoginForm">
      <img src={authBgCurve} className="LoginForm__curve" alt="" aria-hidden="true" />
      <img src={zigzag}       className="LoginForm__zigzag LoginForm__zigzag--1" alt="" aria-hidden="true" />
      <img src={zigzag}       className="LoginForm__zigzag LoginForm__zigzag--2" alt="" aria-hidden="true" />
      <img src={zigzagOrange} className="LoginForm__zigzag LoginForm__zigzag--3" alt="" aria-hidden="true" />
      <img src={zigzagOrange} className="LoginForm__zigzag LoginForm__zigzag--4" alt="" aria-hidden="true" />

      <div className="LoginForm__form-area">
        <div className="LoginForm__form-inner">
          <span className="LoginForm__pill">Member Access</span>
          <h1 className="LoginForm__title">
            {isReturningUser ? 'Welcome Back!' : 'Sign In'}
          </h1>
          <span className="LoginForm__subtitle">
            {isReturningUser ? 'Good to see you again' : 'Sign in to your account'}
          </span>
          <div className="LoginForm__divider" />

          {submitError && <div className="LoginForm__error-banner">{submitError}</div>}

          <form onSubmit={onSubmit}>
            {/* Email field */}

            <div className="LoginForm__field-group">
              <label className="LoginForm__label">Email Address</label>
              <div className="LoginForm__input-wrapper">
                <span className="LoginForm__input-icon"><Mail size={15} /></span>
                <input type="email" className={`LoginForm__input${errors.email ? ' LoginForm__input--error' : ''}`}
                  placeholder="john@example.com" value={formData.email}
                  onChange={e => updateField("email", e.target.value)} />
              </div>
              {errors.email && <span className="LoginForm__error-msg">{errors.email}</span>}
            </div>

            {/* Password field */}
            <div className="LoginForm__field-group">
              <label className="LoginForm__label">Password</label>
              <div className="LoginForm__input-wrapper">
                <span className="LoginForm__input-icon"><Lock size={15} /></span>
                <input type={showPassword ? 'text' : 'password'}
                  className={`LoginForm__input${errors.password ? ' LoginForm__input--error' : ''}`}
                  placeholder="Enter your password" value={formData.password}
                  onChange={e => updateField("password", e.target.value)} />
                <button type="button" className="LoginForm__toggle-pw" onClick={onTogglePassword}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="LoginForm__error-msg">{errors.password}</span>}
            </div>

            <button type="button" className="LoginForm__forgot" onClick={onForgotClick}>
              Forgot password?
            </button>
            <button
              type="submit"
              className="LoginForm__submit-btn"
              disabled={cooldownSeconds > 0}
            >
              {cooldownSeconds > 0 ? `Please wait ${cooldownSeconds}s` : 'Sign In'}
            </button>
          </form>
          <p className="LoginForm__switch">
            Don't have an account?{' '}
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
