import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../../../../components/Button/Button';
import './ContactForm.css';

const SUBJECT_OPTIONS = ['General Inquiry', 'Reservation', 'Feedback', 'Other'];

export default function ContactForm({ children }) {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubjectSelect = (option) => {
    setForm({ ...form, subject: option });
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  // Close dropdown if clicked outside
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
                    value={form.name}
                    onChange={handleChange}
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
                    value={form.email}
                    onChange={handleChange}
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
                    <span>{form.subject}</span>
                    <ChevronDown size={20} className={`ContactForm__select-icon ${isDropdownOpen ? 'ContactForm__select-icon--rotated' : ''}`} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="ContactForm__select-menu">
                      {SUBJECT_OPTIONS.map((option) => (
                        <div 
                          key={option}
                          className={`ContactForm__select-item ${form.subject === option ? 'ContactForm__select-item--selected' : ''}`}
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
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div className="ContactForm__footer">
                <Button type="submit" variant="primary" className="ContactForm__submit-btn" disabled={submitted}>
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>
                <p className="ContactForm__note">We reply within 24 hours</p>
              </div>
            </form>
          </div>
          
          {/* Slot for MapEmbed */}
          <div className="ContactForm__media-area">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
