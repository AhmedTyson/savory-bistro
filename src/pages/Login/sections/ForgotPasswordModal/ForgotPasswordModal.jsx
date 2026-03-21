/** ForgotPasswordModal.jsx - Account Recovery Flow **/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { validateEmail } from '../../../../utils/validation';
import './ForgotPasswordModal.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    
    const emailErr = validateEmail(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    setStatus('loading');
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus('success');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ForgotPasswordModal">
          <motion.div 
            className="ForgotPasswordModal__overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <div className="ForgotPasswordModal__container">
            <motion.div 
              className="ForgotPasswordModal__content"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="ForgotPasswordModal__close" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>

              {status !== 'success' ? (
                <div className="ForgotPasswordModal__form-wrapper">
                  <div className="ForgotPasswordModal__header">
                    <div className="ForgotPasswordModal__icon-bg">
                      <Mail size={24} className="ForgotPasswordModal__icon" />
                    </div>
                    <h2 className="ForgotPasswordModal__title">Forgot Password?</h2>
                    <p className="ForgotPasswordModal__description">
                      No worries! Enter your email below and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="ForgotPasswordModal__form">
                    <div className="ForgotPasswordModal__field">
                      <label htmlFor="forgot-email" className="ForgotPasswordModal__label">Email Address</label>
                      <div className="ForgotPasswordModal__input-wrapper">
                        <input
                          id="forgot-email"
                          type="email"
                          className={`ForgotPasswordModal__input ${error ? 'ForgotPasswordModal__input--error' : ''}`}
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          disabled={status === 'loading'}
                        />
                        {error && (
                          <span className="ForgotPasswordModal__error">
                            <AlertCircle size={14} /> {error}
                          </span>
                        )}
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="ForgotPasswordModal__submit" 
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending link...' : (
                        <>
                          Send Reset Link <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  className="ForgotPasswordModal__success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="ForgotPasswordModal__icon-bg ForgotPasswordModal__icon-bg--success">
                    <CheckCircle size={32} className="ForgotPasswordModal__icon ForgotPasswordModal__icon--success" />
                  </div>
                  <h2 className="ForgotPasswordModal__title">Check Your Email</h2>
                  <p className="ForgotPasswordModal__description">
                    We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                  </p>
                  <div className="ForgotPasswordModal__footer">
                    <button className="ForgotPasswordModal__back" onClick={onClose}>
                      Back to Login
                    </button>
                    <button className="ForgotPasswordModal__resend" onClick={handleReset}>
                      Try another email
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
