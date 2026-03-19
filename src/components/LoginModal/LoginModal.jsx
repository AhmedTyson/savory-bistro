import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context';;
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

function LoginModal() {
  const { showLogin, setShowLogin, login, pendingRedirect, setPendingRedirect } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (showLogin) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [showLogin]);

  if (!showLogin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const result = login(email, password);
    if (result.success) {
      if (pendingRedirect) {
        const target = pendingRedirect;
        setPendingRedirect(null);
        navigate(target);
      }
    } else {
      setError(result.message);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setPendingRedirect(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal__close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="login-modal__accent" />
        <h2 className="login-modal__title">Welcome Back</h2>
        <p className="login-modal__subtitle">Sign in to make a reservation</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="login-modal__error">{error}</div>}

          <div className="login-modal__field">
            <label className="login-modal__label">Email</label>
            <input
              type="email"
              className="login-modal__input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-modal__field">
            <label className="login-modal__label">Password</label>
            <input
              type="password"
              className="login-modal__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-modal__btn">Sign In</button>
        </form>

        <p className="login-modal__hint">
          Demo: <code>john@example.com</code> / <code>password123</code>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
