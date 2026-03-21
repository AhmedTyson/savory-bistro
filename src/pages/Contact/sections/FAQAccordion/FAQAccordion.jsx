/** FAQAccordion.jsx - Guest Inquiry Quick Reference **/
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="FAQAccordion">
      <div className="container">
        <h2 className="FAQAccordion__title">Frequently Asked Questions</h2>
        <div className="FAQAccordion__container">
          <div className="FAQAccordion__list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id || index}
                  className={`FAQAccordion__item ${isOpen ? 'FAQAccordion__item--open' : ''}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="FAQAccordion__header">
                    <h4 className="FAQAccordion__question">{faq.question}</h4>
                    <div className="FAQAccordion__trigger-icon">
                      {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                    </div>
                  </div>
                  <div className="FAQAccordion__content">
                    <div className="FAQAccordion__answer">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
