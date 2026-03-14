import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Reservations.css';

function Reservations() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '');
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState(currentUser?.email || '');

  return <div className="min-h-screen py-24 container"><h1 className="text-4xl font-bold">Reservations Page</h1></div>;
}

export default Reservations;
