import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials-section py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="quote-icon mb-10 text-[var(--color-primary)]">
            <svg width="48" height="36" viewBox="0 0 48 36" fill="currentColor">
              <path d="M12.9 36C10.3 36 7.9 35.1 5.7 33.3C3.5 31.5 1.8 29.1 0.7 26.1C-0.4 23.1 -0.2 19.3 1.3 14.7L6.4 0H18.7L13.8 14C15.4 14.1 16.8 14.7 18 15.8C19.2 16.9 19.8 18.3 19.8 20.1C19.8 22.1 19.1 23.8 17.7 25.2C16.3 26.6 14.7 27.3 12.9 27.3C12.5 27.3 12 27.2 11.4 27.1C11.9 28.7 12.8 30.1 14.1 31.3C15.4 32.5 16.9 33.1 18.6 33.1H18.9V36H12.9ZM41 36C38.4 36 36 35.1 33.8 33.3C31.6 31.5 29.9 29.1 28.8 26.1C27.7 23.1 27.9 19.3 29.4 14.7L34.5 0H46.8L41.9 14C43.5 14.1 44.9 14.7 46.1 15.8C47.3 16.9 47.9 18.3 47.9 20.1C47.9 22.1 47.2 23.8 45.8 25.2C44.4 26.6 42.8 27.3 41 27.3C40.6 27.3 40.1 27.2 39.5 27.1C40 28.7 40.9 30.1 42.2 31.3C43.5 32.5 45 33.1 46.7 33.1H47V36H41Z" />
            </svg>
          </div>

          <blockquote className="testimonial-quote mb-12">
            "The most incredible culinary experience I've had in years. 
            The truffle pasta is to die for, and the service is impeccably warm."
          </blockquote>

          <div className="testimonial-author">
            <div className="author-image-wrapper mb-4">
              <img 
                src="/images/HomePage/Small_Avatar_Sara.webp" 
                alt="Sarah Jenkins" 
                className="author-image"
              />
            </div>
            <h4 className="author-name">Sarah Jenkins</h4>
            <span className="author-role">FOOD CRITIC</span>
          </div>

          <div className="testimonial-dots mt-12 flex justify-center gap-2">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
