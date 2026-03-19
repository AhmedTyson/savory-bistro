import ProfileCard        from './sections/ProfileCard/ProfileCard';
import ChangeUsername     from './sections/ChangeUsername/ChangeUsername';
import ChangePassword     from './sections/ChangePassword/ChangePassword';
import ReservationHistory from './sections/ReservationHistory/ReservationHistory';

import './Dashboard.css';

function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="Dashboard__inner">
        <div className="Dashboard__header">
          <h1 className="Dashboard__title">My Account</h1>
          <p className="Dashboard__subtitle">Manage your profile and reservation history.</p>
          <div className="Dashboard__divider" />
        </div>

        <ProfileCard />
        <ChangeUsername />
        <ChangePassword />
        <ReservationHistory />
      </div>
    </div>
  );
}

export default Dashboard;
