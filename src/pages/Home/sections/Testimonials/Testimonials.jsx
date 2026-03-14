import { useState, useEffect } from "react";
import "./Testimonials.css";

export default function Testimonials({ reviews = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play carousel
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
    image: "/images/HomePage/Small_Avatar_Sara.webp",
  };

  return (
    <section className="testimonials-section py-32 lg:py-44 relative min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-y-12">
          <div className="quote-icon text-[#EAB308]">
            <svg width="48" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H15.017C13.9124 14 13.017 13.1046 13.017 12V6C13.017 4.89543 13.9124 4 15.017 4H21.017C22.1216 4 23.017 4.89543 23.017 6V12C23.017 14.5 21.017 19 18.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017V14H2.017C0.91243 14 0.017 13.1046 0.017 12V6C0.017 4.89543 0.91243 4 2.017 4H8.017C9.12157 4 10.017 4.89543 10.017 6V12C10.017 14.5 9.017 19 5.017 21H1.017Z" />
            </svg>
          </div>

          <div className="testimonial-content-wrapper relative w-full">
            <div key={activeIndex} className="testimonial-fade-in flex flex-col items-center gap-y-12">
              <blockquote className="testimonial-quote">
                "{currentReview.text}"
              </blockquote>

              <div className="testimonial-author">
                <div className="author-image-outer mb-4">
                  <div className="author-image-inner">
                    <img
                      src={currentReview.image}
                      alt={currentReview.author}
                      className="author-image"
                    />
                  </div>
                </div>
                <h4 className="author-name">{currentReview.author}</h4>
                <p className="author-role">{currentReview.role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
