/** ChangeUsername.jsx - Guest Profile Identity Management **/
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context';
import Button from '../../../../components/Button/Button';
import { validateMinLength } from '../../../../utils/validation';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import './ChangeUsername.css';

function ChangeUsername() {
  const { currentUser, updateUser, showToast } = useAuth();

  const [firstName,      setFirstName]      = useState(currentUser?.firstName || '');
  const [lastName,       setLastName]       = useState(currentUser?.lastName  || '');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError,  setLastNameError]  = useState('');
  const [saving,         setSaving]         = useState(false);
  const [success,        setSuccess]        = useState(false);

  async function handleSave() {
    // handle name constraints
    let valid = true;
    const fNameError = validateMinLength(firstName, 2, 'First name')
    if (fNameError) {
      setFirstNameError(fNameError);
      valid = false;
    } else {
      setFirstNameError('');
    }
    const lNameError = validateMinLength(lastName, 2, 'Last name')
    if (lNameError) {
      setLastNameError(lNameError);
      valid = false;
    } else {
      setLastNameError('');
    }
    if (!valid) return;

    setSaving(true);
    try {
      await axios.patch(`http://localhost:3001/api/users/${currentUser.id}`, {
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
      });
      updateUser({ firstName: firstName.trim(), lastName: lastName.trim() });
      showToast({ type: 'nameUpdate', firstName: firstName.trim() });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update name:', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardCard 
      title="Update Name" 
      subtitle="Your name will be visible on reviews and reservations."
      className="ChangeUsername"
    >
      <div className="ChangeUsername__grid">
        <div className="ChangeUsername__group">
          <label className="ChangeUsername__label">First Name</label>
          <input
            className={`ChangeUsername__input${firstNameError ? ' ChangeUsername__input--error' : ''}`}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First name"
          />
          {firstNameError && (
            <span className="ChangeUsername__error">{firstNameError}</span>
          )}
        </div>

        <div className="ChangeUsername__group">
          <label className="ChangeUsername__label">Last Name</label>
          <input
            className={`ChangeUsername__input${lastNameError ? ' ChangeUsername__input--error' : ''}`}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last name"
          />
          {lastNameError && (
            <span className="ChangeUsername__error">{lastNameError}</span>
          )}
        </div>
      </div>

      <div className="ChangeUsername__footer">
        <div className="ChangeUsername__status">
          {success && (
            <span className="ChangeUsername__success">✓ Name updated successfully</span>
          )}
        </div>
        <Button
          variant="primary"
          type="button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </DashboardCard>
  );
}

export default ChangeUsername;
