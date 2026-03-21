/** Testimonials.jsx - Social Proof & Guest Reviews **/
import { useState, useEffect } from "react";
import { Quote } from 'lucide-react';
import "./Testimonials.css";

export default function Testimonials({ reviews = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const currentReview = reviews[activeIndex] || {
    text: "The most incredible culinary experience I've had in years. The truffle pasta is to die for, and the service is impeccably warm.",
    author: "Sarah Jenkins",
    role: "FOOD CRITIC",
    image: "/images/home-page/avatar-sara-jenkins.webp",
  };

  return (
    <section className="Testimonials">
      <div className="Testimonials__container">
        <div className="Testimonials__wrapper">
          <div className="Testimonials__quote-icon">
            <Quote size={48} fill="currentColor" strokeWidth={1} />
          </div>

          <div className="Testimonials__content-viewport">
            <div key={activeIndex} className="Testimonials__slide">
              <blockquote className="Testimonials__quote">
                "{currentReview.text}"
              </blockquote>

              <div className="Testimonials__author">
                <div className="Testimonials__author-image-outer">
                  <div className="Testimonials__author-image-inner">
                    <img
                      src={currentReview.image}
                      alt={currentReview.author}
                      className="Testimonials__author-image"
                    />
                  </div>
                </div>
                <h4 className="Testimonials__author-name">{currentReview.author}</h4>
                <p className="Testimonials__author-role">{currentReview.role}</p>
              </div>
            </div>
          </div>

          <div className="Testimonials__dots">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`Testimonials__dot ${index === activeIndex ? "Testimonials__dot--active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
