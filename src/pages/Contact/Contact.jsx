/** Contact.jsx - Inquiry & Location Page Wrapper **/
import mockData from '../../../mock-data.json';
import ContactHero from './sections/ContactHero/ContactHero';
import ContactForm from './sections/ContactForm/ContactForm';
import MapEmbed from './sections/MapEmbed/MapEmbed';
import FAQAccordion from './sections/FAQAccordion/FAQAccordion';
import './Contact.css';

export default function Contact() {
  const { contactInfo, faqs } = mockData;

  return (
    <div className="Contact">
      <ContactHero info={contactInfo} />
      
      <ContactForm>
        <MapEmbed />
      </ContactForm>

      <FAQAccordion faqs={faqs} />
    </div>
  );
}
