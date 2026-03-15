import { useState } from 'react';
import './Contact.css';


const INFO_CARDS = [
  {
    icon: '📍',
    title: 'Address',
    lines: ['123 Culinary Avenue', 'Foodville, CA 90210'],
    action: { label: 'Get Directions', href: '#' },
  },
  {
    icon: '🕐',
    title: 'Hours',
    lines: ['Mon - Thu: 11am - 10pm', 'Fri - Sat: 11am - 11pm', 'Sunday: 10am - 9pm'],
  },
  {
    icon: '❓',
    title: 'Contact',
    lines: ['(555) 123-4567', 'hello@savorybistro.com'],
    socials: true,
  },
];

const FAQS = [
  'Do you accommodate dietary restrictions?',
  'Is there parking available?',
  'Do you accept walk-ins?',
  'Can I bring my own wine?',
  'Do you offer gift certificates?',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">


      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">Get in Touch</h1>
          <p className="hero__sub">We'd love to hear from you</p>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="info-cards">
        {INFO_CARDS.map((card) => (
          <div className="info-card" key={card.title}>
            <div className="info-card__icon">{card.icon}</div>
            <h3 className="info-card__title">{card.title}</h3>
            {card.lines.map((line) => (
              <p className="info-card__line" key={line}>{line}</p>
            ))}
            {card.action && (
              <a className="info-card__link" href={card.action.href}>{card.action.label}</a>
            )}
            {card.socials && (
              <div className="info-card__socials">
                <span>🌐</span><span>📷</span><span>🔗</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── CONTACT FORM + MAP ── */}
      <section className="contact-section">
        <div className="contact-form-col">
          <h2 className="contact-form__heading">Send us a message</h2>
          <p className="contact-form__sub">Have a question or feedback? We'd love to hear it.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form__field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label>Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange}>
                <option>General Inquiry</option>
                <option>Reservation</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div className="contact-form__field">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <button className="contact-form__submit" type="submit">
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>
            <p className="contact-form__note">We reply within 24 hours</p>
          </form>
        </div>

        {/* Map image — replace "/map-image.png" with your actual image filename */}
        <div className="contact-map-col">
          <div className="contact-map">
            <img src="/public/images/ContactUs/rest_map.webp" alt="Restaurant location map" className="contact-map__img" />
            <button className="contact-map__reserve">📅 Reserve Table</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2 className="faq__heading">Frequently Asked Questions</h2>
        <div className="faq__list">
          {FAQS.map((q, i) => (
            <div
              className={`faq__item ${openFaq === i ? 'faq__item--open' : ''}`}
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq__question">
                <span>{q}</span>
                <span className="faq__chevron">{openFaq === i ? '∧' : '∨'}</span>
              </div>
              {openFaq === i && (
                <div className="faq__answer">
                  Please contact us directly for detailed information about this topic.
                  We're happy to help!
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
