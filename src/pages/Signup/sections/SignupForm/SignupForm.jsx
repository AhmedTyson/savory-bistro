/** SignupForm.jsx - Interactive Registration Interface **/
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react'
import authBgCurve from '../../../../assets/auth-bg-curve.svg'
import zigzag from '../../../../assets/zigzag.svg'
import zigzagOrange from '../../../../assets/zigzag-orange.svg'
import { getPasswordRules, getPasswordStrengthScore } from '../../../../utils/validation'
import './SignupForm.css'



const strengthLevels = [
  null, // 0
  { label: 'Weak',        bars: 1, modifier: '--weak' },
  { label: 'Weak',        bars: 1, modifier: '--weak' },
  { label: 'Fair',        bars: 2, modifier: '--fair' },
  { label: 'Strong',      bars: 3, modifier: '--strong' },
  { label: 'Very Strong', bars: 4, modifier: '--very-strong' },
]

function PasswordStrength({ password }) {
  if (!password) return null
  const rules = getPasswordRules(password)
  const score = getPasswordStrengthScore(password)
  if (score === 0) return null
  const level = strengthLevels[score]

  const checkItems = [
    { met: rules.minLength, label: 'At least 8 characters' },
    { met: rules.uppercase, label: 'One uppercase letter' },
    { met: rules.lowercase, label: 'One lowercase letter' },
    { met: rules.number,    label: 'One number' },
    { met: rules.special,   label: 'One special character' },
  ]

  return (
    <div className="SignupForm__strength-wrap">
      <div className="SignupForm__strength-bars">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`SignupForm__strength-bar${
              i < level.bars
                ? ` SignupForm__strength-bar--filled SignupForm__strength-bar${level.modifier}`
                : ''
            }`}
          />
        ))}
      </div>
      <span className={`SignupForm__strength-label SignupForm__strength-label${level.modifier}`}>
        {level.label}
      </span>
      <ul className="SignupForm__checklist">
        {checkItems.map((item, i) => (
          <li
            key={i}
            className={`SignupForm__check-item${item.met ? ' SignupForm__check-item--met' : ''}`}
          >
            {item.met ? '✓' : '•'} {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PasswordMatch({ password, confirmPassword }) {
  if (!confirmPassword) return null
  if (confirmPassword === password) {
    return (
      <span className="SignupForm__match-ok">
        <CheckCircle size={14} /> Passwords match
      </span>
    )
  }
  return (
    <span className="auth-em">Passwords do not match</span>
  )
}

export default function SignupForm({
  formData,
  updateField,
  errors,
  showPassword,
  onTogglePassword,
  showConfirm,
  onToggleConfirm,
  cooldownSeconds = 0,
  onSubmit
}) {
  const { firstName, lastName, email, password, confirmPassword } = formData;
  
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

          <form onSubmit={onSubmit}>
            <div className="auth-row2">

              <div>
                <label className="auth-lbl">First Name</label>
                <div className="auth-iw">
                  <span className="auth-ii"><User size={15} /></span>
                  <input type="text" className={`auth-inp${errors.firstName ? ' err' : ''}`}
                    placeholder="John" value={firstName}
                    onChange={e => updateField('firstName', e.target.value)} />
                </div>
                {errors.firstName && <span className="auth-em">{errors.firstName}</span>}
              </div>
              <div>
                <label className="auth-lbl">Last Name</label>
                <div className="auth-iw">
                  <span className="auth-ii"><User size={15} /></span>
                  <input type="text" className={`auth-inp${errors.lastName ? ' err' : ''}`}
                    placeholder="Doe" value={lastName}
                    onChange={e => updateField('lastName', e.target.value)} />
                </div>
                {errors.lastName && <span className="auth-em">{errors.lastName}</span>}
              </div>
            </div>

            <div className="auth-fg">
              <label className="auth-lbl">Email Address</label>
              <div className="auth-iw">
                <span className="auth-ii"><Mail size={15} /></span>
                <input type="email" className={`auth-inp${errors.email ? ' err' : ''}`}
                  placeholder="john@example.com" value={email}
                  onChange={e => updateField('email', e.target.value)} />
              </div>
              {errors.email && <span className="auth-em">{errors.email}</span>}
            </div>

            <div className="auth-fg">
              <label className="auth-lbl">Password</label>
              <div className="auth-iw">
                <span className="auth-ii"><Lock size={15} /></span>
                <input type={showPassword ? 'text' : 'password'}
                  className={`auth-inp${errors.password ? ' err' : ''}`}
                  placeholder="Min. 8 characters" value={password}
                  onChange={e => updateField('password', e.target.value)} />
                <button type="button" className="auth-eye" onClick={onTogglePassword}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="auth-em">{errors.password}</span>}
              <PasswordStrength password={password} />
            </div>

            <div className="auth-fg" style={{ marginBottom: 4 }}>
              <label className="auth-lbl">Confirm Password</label>
              <div className="auth-iw">
                <span className="auth-ii"><Lock size={15} /></span>
                <input type={showConfirm ? 'text' : 'password'}
                  className={`auth-inp${errors.confirmPassword ? ' err' : ''}`}
                  placeholder="Repeat your password" value={confirmPassword}
                  onChange={e => updateField('confirmPassword', e.target.value)} />
                <button type="button" className="auth-eye" onClick={onToggleConfirm}>
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="auth-em">{errors.confirmPassword}</span>}
              <PasswordMatch password={password} confirmPassword={confirmPassword} />
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={cooldownSeconds > 0}
            >
              {cooldownSeconds > 0 ? `Please wait ${cooldownSeconds}s` : 'Create Account'}
            </button>
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
