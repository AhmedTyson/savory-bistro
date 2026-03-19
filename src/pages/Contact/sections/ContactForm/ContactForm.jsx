import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../../../context';;
import Button from '../../../../components/Button/Button';
import './ContactForm.css';

const SUBJECT_OPTIONS = ['General Inquiry', 'Reservation', 'Feedback', 'Other'];

export default function ContactForm({ children }) {
  const { showToast } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubjectSelect = (option) => {
    setSubject(option);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!response.ok) throw new Error('Failed to send message');

      showToast({ type: 'contact', firstName: name });
      setName('');
      setEmail('');
      setSubject('General Inquiry');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast({ type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="ContactForm">
      <div className="container">
        <div className="ContactForm__grid">
          <div className="ContactForm__content">
            <div className="ContactForm__heading">
              <h2 className="ContactForm__title">Send us a message</h2>
              <p className="ContactForm__subtitle">Have a question or feedback? We'd love to hear it.</p>
            </div>

            <form className="ContactForm__form" onSubmit={handleSubmit}>
              <div className="ContactForm__row">
                <div className="ContactForm__group">
                  <label className="ContactForm__label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="ContactForm__input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="ContactForm__group">
                  <label className="ContactForm__label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    className="ContactForm__input"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="ContactForm__group">
                <label className="ContactForm__label">Subject</label>
                <div className="ContactForm__custom-select" ref={dropdownRef}>
                  <div 
                    className={`ContactForm__select-trigger ${isDropdownOpen ? 'ContactForm__select-trigger--active' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{subject}</span>
                    <ChevronDown size={20} className={`ContactForm__select-icon ${isDropdownOpen ? 'ContactForm__select-icon--rotated' : ''}`} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="ContactForm__select-menu">
                      {SUBJECT_OPTIONS.map((option) => (
                        <div 
                          key={option}
                          className={`ContactForm__select-item ${subject === option ? 'ContactForm__select-item--selected' : ''}`}
                          onClick={() => handleSubjectSelect(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="ContactForm__group">
                <label className="ContactForm__label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="ContactForm__textarea"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="ContactForm__footer">
                <Button type="submit" variant="primary" className="ContactForm__submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                <p className="ContactForm__note">We reply within 24 hours</p>
              </div>
            </form>
          </div>
          

          <div className="ContactForm__media-area">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
