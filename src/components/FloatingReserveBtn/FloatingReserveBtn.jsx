import { NavLink } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import './FloatingReserveBtn.css';

function FloatingReserveBtn() {
  return (
    <NavLink to="/reservations" className="floating-btn">
      <CalendarDays size={16} />
      Reserve Now
    </NavLink>
  );
}

export default FloatingReserveBtn;
