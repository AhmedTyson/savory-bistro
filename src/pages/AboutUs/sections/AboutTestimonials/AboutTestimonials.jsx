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
    <AboutSection className="AboutTestimonials" containerClass="AboutTestimonials__container">
      <div className="AboutTestimonials__brands">
        <span className="AboutTestimonials__brand-logo serif-brand">Forbes</span>
        <span className="AboutTestimonials__brand-logo sans-brand">EATER</span>
        <span className="AboutTestimonials__brand-logo script-brand">The New York Times</span>
        <span className="AboutTestimonials__brand-logo serif-brand">VOGUE</span>
      </div>

      <div className="AboutTestimonials__box-container">
        <div className="AboutTestimonials__box" key={activeReview}>
          <div className="AboutTestimonials__quote-icon">”</div>
          <p className="AboutTestimonials__quote">"{reviews[activeReview].quote}"</p>
          <span className="AboutTestimonials__author">
            — {reviews[activeReview].author}
          </span>
        </div>
      </div>

      <div className="AboutTestimonials__dots">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            className={`AboutTestimonials__dot ${idx === activeReview ? "AboutTestimonials__dot--active" : ""}`}
            onClick={() => setActiveReview(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </AboutSection>
  );
};

export default AboutTestimonials;
