import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context';
import { CalendarDays } from 'lucide-react';
import './FloatingReserveBtn.css';

function FloatingReserveBtn() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on reservations page
  if (location.pathname === '/reservations') return null;

  function handleClick() {
    if (user) {
      navigate('/reservations');
    } else {
      navigate('/login', { state: { from: '/reservations' } });
    }
  }

  return (
    <button onClick={handleClick} className="FloatingReserveBtn">
      <CalendarDays size={16} className="FloatingReserveBtn__icon" />
      <span className="FloatingReserveBtn__text">Reserve Now</span>
    </button>
  );
}

export default FloatingReserveBtn;
