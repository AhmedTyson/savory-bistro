import { Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import authBgCurve from '../../../../assets/auth-bg-curve.svg'
import zigzag from '../../../../assets/zigzag.svg'
import zigzagOrange from '../../../../assets/zigzag-orange.svg'
import './SignupForm.css'

export default function SignupForm({
  firstName, onFirstNameChange, firstNameError, onFirstNameErrorClear,
  lastName, onLastNameChange, lastNameError, onLastNameErrorClear,
  email, onEmailChange, emailError, onEmailErrorClear,
  password, onPasswordChange, passwordError, onPasswordErrorClear,
  confirmPassword, onConfirmPasswordChange, confirmPasswordError, onConfirmPasswordErrorClear,
  showPassword, onTogglePassword,
  showConfirm, onToggleConfirm,
  successMsg, onSubmit
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
          <span className="auth-pill">New Member</span>
          <h1 className="auth-title">Create Account</h1>
          <span className="auth-sub">Join us for a better experience</span>
          <div className="auth-divider" />

          {successMsg && <div className="auth-ok">✓ {successMsg}</div>}

          <form onSubmit={onSubmit}>
            <div className="auth-row2">
              <div>
                <label className="auth-lbl">First Name</label>
                <div className="auth-iw">
                  <span className="auth-ii"><User size={15} /></span>
                  <input type="text" className={`auth-inp${firstNameError ? ' err' : ''}`}
                    placeholder="John" value={firstName}
                    onChange={e => { onFirstNameChange(e.target.value); onFirstNameErrorClear(); }} />
                </div>
                {firstNameError && <span className="auth-em">{firstNameError}</span>}
              </div>
              <div>
                <label className="auth-lbl">Last Name</label>
                <div className="auth-iw">
                  <span className="auth-ii"><User size={15} /></span>
                  <input type="text" className={`auth-inp${lastNameError ? ' err' : ''}`}
                    placeholder="Doe" value={lastName}
                    onChange={e => { onLastNameChange(e.target.value); onLastNameErrorClear(); }} />
                </div>
                {lastNameError && <span className="auth-em">{lastNameError}</span>}
              </div>
            </div>

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

            <div className="auth-fg">
              <label className="auth-lbl">Password</label>
              <div className="auth-iw">
                <span className="auth-ii"><Lock size={15} /></span>
                <input type={showPassword ? 'text' : 'password'}
                  className={`auth-inp${passwordError ? ' err' : ''}`}
                  placeholder="Min. 6 characters" value={password}
                  onChange={e => { onPasswordChange(e.target.value); onPasswordErrorClear(); }} />
                <button type="button" className="auth-eye" onClick={onTogglePassword}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordError && <span className="auth-em">{passwordError}</span>}
            </div>

            <div className="auth-fg" style={{ marginBottom: 4 }}>
              <label className="auth-lbl">Confirm Password</label>
              <div className="auth-iw">
                <span className="auth-ii"><Lock size={15} /></span>
                <input type={showConfirm ? 'text' : 'password'}
                  className={`auth-inp${confirmPasswordError ? ' err' : ''}`}
                  placeholder="Repeat your password" value={confirmPassword}
                  onChange={e => { onConfirmPasswordChange(e.target.value); onConfirmPasswordErrorClear(); }} />
                <button type="button" className="auth-eye" onClick={onToggleConfirm}>
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirmPasswordError && <span className="auth-em">{confirmPasswordError}</span>}
            </div>

            <button type="submit" className="auth-btn">Create Account</button>
          </form>
          <p className="auth-tn">
            By signing up you agree to our{' '}
            <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>
          <p className="auth-sw">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
