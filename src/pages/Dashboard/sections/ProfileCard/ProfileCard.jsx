import { UserCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../../context';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import './ProfileCard.css';

function ProfileCard() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const fullName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();

  return (
    <DashboardCard className="ProfileCard">
      <div className="ProfileCard__content">
        <div className="ProfileCard__avatar-wrap">
          <UserCircle size={80} strokeWidth={1.2} className="ProfileCard__avatar-icon" />
          <div className="ProfileCard__badge">
            <ShieldCheck size={14} />
          </div>
        </div>
        <div className="ProfileCard__info">
          <h2 className="ProfileCard__name">{fullName}</h2>
          <p className="ProfileCard__email">{currentUser.email}</p>
          <div className="ProfileCard__tags">
            <span className="ProfileCard__tag">Verified Member</span>
            <span className="ProfileCard__tag ProfileCard__tag--gold">Premier Guest</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

export default ProfileCard;
