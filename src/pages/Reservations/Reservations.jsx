import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import './Reservations.css';

export default function Reservations() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  return (
    <div className="Reservations">
      <div className="Reservations__container">
        <h1 className="Reservations__title">Reservations</h1>
        <p className="Reservations__placeholder-text">
          Table bookings are currently managed by our host team. 
          Please contact the restaurant directly or check back later for online reservations.
        </p>
      </div>
    </div>
  );
}
