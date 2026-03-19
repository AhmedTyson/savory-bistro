import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthBgCurve from '../../../../components/SvgAssets/AuthBgCurve';
import ZigZagLightning from '../../../../components/SvgAssets/ZigZagLightning';
import './LoginForm.css'

export default function LoginForm({
  isReturningUser, email, onEmailChange, emailError, onEmailErrorClear,
  password, onPasswordChange, passwordError, onPasswordErrorClear,
  showPassword, onTogglePassword, submitError,
  cooldownSeconds = 0,
  onSubmit
}) {
  return (
    <div className="LoginForm">
      <AuthBgCurve className="LoginForm__curve" aria-hidden="true" />
      <ZigZagLightning className="LoginForm__zigzag LoginForm__zigzag--1" aria-hidden="true" />
      <ZigZagLightning className="LoginForm__zigzag LoginForm__zigzag--2" aria-hidden="true" />
      <ZigZagLightning className="LoginForm__zigzag LoginForm__zigzag--3" aria-hidden="true" style={{ stroke: 'var(--color-primary)' }} />
      <ZigZagLightning className="LoginForm__zigzag LoginForm__zigzag--4" aria-hidden="true" style={{ stroke: 'var(--color-primary)' }} />

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
                <input type="email" className={`LoginForm__input${emailError ? ' LoginForm__input--error' : ''}`}
                  placeholder="john@example.com" value={email}
                  onChange={e => { onEmailChange(e.target.value); onEmailErrorClear(); }} />
              </div>
              {emailError && <span className="LoginForm__error-msg">{emailError}</span>}
            </div>

            {/* Password field */}
            <div className="LoginForm__field-group">
              <label className="LoginForm__label">Password</label>
              <div className="LoginForm__input-wrapper">
                <span className="LoginForm__input-icon"><Lock size={15} /></span>
                <input type={showPassword ? 'text' : 'password'}
                  className={`LoginForm__input${passwordError ? ' LoginForm__input--error' : ''}`}
                  placeholder="Enter your password" value={password}
                  onChange={e => { onPasswordChange(e.target.value); onPasswordErrorClear(); }} />
                <button type="button" className="LoginForm__toggle-pw" onClick={onTogglePassword}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordError && <span className="LoginForm__error-msg">{passwordError}</span>}
            </div>

            <div className="LoginForm__forgot">Forgot password?</div>
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
