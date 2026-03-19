import { UserCircle } from 'lucide-react';
import { useAuth } from '../../../../context';;
import './ProfileCard.css';

function ProfileCard() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const fullName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();

  return (
    <div className="ProfileCard">
      <div className="ProfileCard__avatar-wrap">
        <UserCircle size={72} className="ProfileCard__avatar-icon" />
      </div>
      <div className="ProfileCard__info">
        <div className="ProfileCard__name">{fullName}</div>
        <div className="ProfileCard__email">{currentUser.email}</div>
        <span className="ProfileCard__tag">Member</span>
      </div>
    </div>
  );
}

export default ProfileCard;
