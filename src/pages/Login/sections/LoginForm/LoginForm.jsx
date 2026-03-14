import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import authBgCurve from '../../../../assets/auth-bg-curve.svg'
import zigzag from '../../../../assets/zigzag.svg'
import zigzagOrange from '../../../../assets/zigzag-orange.svg'
import './LoginForm.css'

export default function LoginForm({
  isReturningUser, email, onEmailChange, emailError, onEmailErrorClear,
  password, onPasswordChange, passwordError, onPasswordErrorClear,
  showPassword, onTogglePassword, submitError, onSubmit
}) {
  return (
    <div className="auth-right">
      <img src={authBgCurve} className="auth-curve" alt="" aria-hidden="true" />
      <img src={zigzag}       className="zz zz-1" alt="" aria-hidden="true" />
      <img src={zigzag}       className="zz zz-2" alt="" aria-hidden="true" />
      <img src={zigzagOrange} className="zz zz-3" alt="" aria-hidden="true" />
      <img src={zigzagOrange} className="zz zz-4" alt="" aria-hidden="true" />

      <div className="auth-form-area">
        <div className="auth-form-inner">
          <span className="auth-pill">Member Access</span>
          <h1 className="auth-title">
            {isReturningUser ? 'Welcome Back!' : 'Sign In'}
          </h1>
          <span className="auth-sub">
            {isReturningUser ? 'Good to see you again' : 'Sign in to your account'}
          </span>
          <div className="auth-divider" />

          {submitError && <div className="auth-err-banner">{submitError}</div>}

          <form onSubmit={onSubmit}>
            {/* Email field */}

            <div className="auth-fg">
              <label className="auth-lbl">Email Address</label>
              <div className="auth-iw">
                <span className="auth-ii"><Mail size={15} /></span>
                <input type="email" className={`auth-inp${emailError ? ' err' : ''}`}
                  placeholder="john@example.com" value={email}
                  onChange={e => { onEmailChange(e.target.value); onEmailErrorClear(); }} />
              </div>
              {emailError && <span className="auth-em">{emailError}</span>}
            </div>

            {/* Password field */}
            <div className="auth-fg">
              <label className="auth-lbl">Password</label>
              <div className="auth-iw">
                <span className="auth-ii"><Lock size={15} /></span>
                <input type={showPassword ? 'text' : 'password'}
                  className={`auth-inp${passwordError ? ' err' : ''}`}
                  placeholder="Enter your password" value={password}
                  onChange={e => { onPasswordChange(e.target.value); onPasswordErrorClear(); }} />
                <button type="button" className="auth-eye" onClick={onTogglePassword}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordError && <span className="auth-em">{passwordError}</span>}
            </div>

            <div className="auth-fgt">Forgot password?</div>
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
          <p className="auth-sw">
            Don't have an account?{' '}
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
