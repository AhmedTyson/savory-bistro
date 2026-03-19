import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../../context';;
import Button from '../../../../components/Button/Button';;
import './ChangePassword.css';

function ChangePassword() {
  const { currentUser, showToast } = useAuth();

  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPwError, setCurrentPwError] = useState('');
  const [newPwError,     setNewPwError]     = useState('');
  const [confirmPwError, setConfirmPwError] = useState('');
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    let valid = true;

    // validate current password not empty
    if (!currentPw.trim()) {
      setCurrentPwError('Current password is required.');
      valid = false;
    } else {
      setCurrentPwError('');
    }

    // validate new password strength
    const hasMinLength = newPw.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPw);
    const hasLowercase = /[a-z]/.test(newPw);
    const hasNumber    = /[0-9]/.test(newPw);
    const hasSpecial   = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPw);

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      const missing = [];
      if (!hasMinLength) missing.push('at least 8 characters');
      if (!hasUppercase) missing.push('an uppercase letter');
      if (!hasLowercase) missing.push('a lowercase letter');
      if (!hasNumber)    missing.push('a number');
      if (!hasSpecial)   missing.push('a special character');
      setNewPwError(`Password must include: ${missing.join(', ')}.`);
      valid = false;
    } else {
      setNewPwError('');
    }

    // validate confirm matches
    if (confirmPw !== newPw) {
      setConfirmPwError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPwError('');
    }

    if (!valid) return;

    setSaving(true);
    try {
      // verify current password via GET /api/users
      const { data } = await axios.get('http://localhost:3001/api/users');
      const found = (data.users || []).find(u => u.email === currentUser.email);
      if (!found || found.password !== currentPw) {
        setCurrentPwError('Incorrect current password.');
        setSaving(false);
        return;
      }

      // PATCH new password
      await axios.patch(`http://localhost:3001/api/users/${currentUser.id}`, {
        password: newPw,
      });

      // clear fields, show success
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      showToast({ type: 'passwordUpdate', firstName: currentUser.firstName });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to change password:', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ChangePassword">
      <h2 className="ChangePassword__title">Change Password</h2>

      <div className="ChangePassword__group ChangePassword__email-group">
        <label className="ChangePassword__label">Email Address</label>
        <input
          className="ChangePassword__input ChangePassword__input--readonly"
          value={currentUser?.email || ''}
          readOnly
        />
        <span className="ChangePassword__email-note">Email address cannot be changed.</span>
      </div>

      <div className="ChangePassword__group">
        <label className="ChangePassword__label">Current Password</label>
        <div className="ChangePassword__input-wrap">
          <input
            type={showCurrent ? 'text' : 'password'}
            className={`ChangePassword__input${currentPwError ? ' ChangePassword__input--error' : ''}`}
            value={currentPw}
            onChange={e => setCurrentPw(e.target.value)}
            placeholder="Enter current password"
          />
          <button
            type="button"
            className="ChangePassword__toggle"
            onClick={() => setShowCurrent(v => !v)}
            aria-label={showCurrent ? 'Hide password' : 'Show password'}
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {currentPwError && (
          <span className="ChangePassword__error">{currentPwError}</span>
        )}
      </div>

      <div className="ChangePassword__group">
        <label className="ChangePassword__label">New Password</label>
        <div className="ChangePassword__input-wrap">
          <input
            type={showNew ? 'text' : 'password'}
            className={`ChangePassword__input${newPwError ? ' ChangePassword__input--error' : ''}`}
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="ChangePassword__toggle"
            onClick={() => setShowNew(v => !v)}
            aria-label={showNew ? 'Hide password' : 'Show password'}
          >
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {newPwError && (
          <span className="ChangePassword__error">{newPwError}</span>
        )}
      </div>

      <div className="ChangePassword__group">
        <label className="ChangePassword__label">Confirm New Password</label>
        <div className="ChangePassword__input-wrap">
          <input
            type={showConfirm ? 'text' : 'password'}
            className={`ChangePassword__input${confirmPwError ? ' ChangePassword__input--error' : ''}`}
            value={confirmPw}
            onChange={e => setConfirmPw(e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="ChangePassword__toggle"
            onClick={() => setShowConfirm(v => !v)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {confirmPwError && (
          <span className="ChangePassword__error">{confirmPwError}</span>
        )}
      </div>

      <div className="ChangePassword__footer">
        {success && (
          <span className="ChangePassword__success">✓ Password changed successfully</span>
        )}
        <Button
          variant="primary"
          type="button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
