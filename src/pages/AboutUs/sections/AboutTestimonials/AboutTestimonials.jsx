import { useState, useEffect } from "react";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutTestimonials.css";

const AboutTestimonials = ({ reviews }) => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <AboutSection className="about-press-section" containerClass="about-press">
      <div className="press-brands">
        <span className="brand-logo serif-brand">Forbes</span>
        <span className="brand-logo sans-brand">EATER</span>
        <span className="brand-logo script-brand">The New York Times</span>
        <span className="brand-logo serif-brand">VOGUE</span>
      </div>

      <div className="testimonial-container-outer">
        <div className="testimonial-box" key={activeReview}>
          <div className="quote-icon">”</div>
          <p className="testimonial-quote">"{reviews[activeReview].quote}"</p>
          <span className="testimonial-author">
            — {reviews[activeReview].author}
          </span>
        </div>
      </div>

      <div className="carousel-dots">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === activeReview ? "active" : ""}`}
            onClick={() => setActiveReview(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </AboutSection>
  );
};

export default AboutTestimonials;
