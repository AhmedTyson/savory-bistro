import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* 1. Hero Section */}
      <section className="about-hero container">
        <div className="about-hero-content">
          <span className="about-subtitle">SINCE 2015</span>
          <h1 className="about-title">Our Journey</h1>
          <p className="about-desc">
            From a small corner in the city to a culinary destination, our journey has been defined by passion and authentic flavors. What started as a humble dream between friends has blossomed into a community staple for those who appreciate the art of fine dining without the pretense.
          </p>
          <div className="about-badges">
            <div className="badge">
              <span className="badge-icon medal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#df782e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#df782e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Michelin Plate 2015-2023
            </div>
            <div className="badge">
              <span className="badge-icon star">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#df782e" />
                </svg>
              </span>
              Best New Bistro 2015
            </div>
          </div>
        </div>
        <div className="about-hero-images">
          <div className="img-block img-tall" style={{ backgroundImage: "url('/images/AboutUs/About us 5.png')" }}></div>
          <div className="img-block img-menu" style={{ backgroundImage: "url('/images/AboutUs/About us 2.png')" }}></div>
          <div className="img-block img-team" style={{ backgroundImage: "url('/images/AboutUs/About us 1.png')" }}></div>
          <div className="img-block img-store" style={{ backgroundImage: "url('/images/AboutUs/About us 3.png')" }}></div>
        </div>
      </section>

      {/* 2. Chef Section */}
      <section className="about-chef-section">
        <div className="container chef-container">
          <div className="chef-image">
            <img src="/images/AboutUs/About us 4.png" alt="Chef Antonio Rossi" />
          </div>
          <div className="chef-content">
            <h2 className="chef-title">Chef Antonio Rossi</h2>
            <h4 className="chef-role">Executive Chef & Founder</h4>
            <p className="chef-desc">
              Trained in the rolling hills of Tuscany, Italy, Antonio brings over two decades of traditional Mediterranean expertise fused with modern innovation.
            </p>
            <div className="chef-quote-box-wrapper">
              <div className="chef-quote-box">
                <p className="chef-quote">
                  "Cooking is an act of love, a gift, a way to share with others the little secrets that are simmering on the back burner."
                </p>
              </div>
            </div>

            <h5 className="signature-title">SIGNATURE DISHES</h5>
            <ul className="signature-list">
              <li>Wild Mushroom Risotto</li>
              <li>Tuscan Herb Crusted Lamb</li>
              <li>Deconstructed Tiramisu</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Sustainability Section */}
      <section className="about-sustainability">
        <div className="container sustain-container">
          <h2 className="sustain-title">Good for the Plate, Good for the Planet</h2>
          <p className="sustain-subtitle">Our commitment to sustainability is woven into every aspect of Savory Bistro.</p>

          <div className="sustain-grid">
            <div className="sustain-item">
              <div className="sustain-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#607d5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              <h4>Local Sourcing</h4>
              <p>90% of our ingredients come from within a 50-mile radius.</p>
            </div>
            <div className="sustain-item">
              <div className="sustain-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#607d5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
              </div>
              <h4>Zero Waste</h4>
              <p>Strict nose-to-tail and root-to-stem culinary philosophy.</p>
            </div>
            <div className="sustain-item">
              <div className="sustain-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#607d5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              </div>
              <h4>Composting</h4>
              <p>All organic waste is returned to our partner farms.</p>
            </div>
            <div className="sustain-item">
              <div className="sustain-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#607d5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h4>Community</h4>
              <p>Supporting local urban garden initiatives annually.</p>
            </div>
          </div>

          <div className="sustain-logos">
            <div className="sustain-logo-box">GREEN FARM</div>
            <div className="sustain-logo-box">ROOTS CO.</div>
            <div className="sustain-logo-box">URBAN SOIL</div>
            <div className="sustain-logo-box">ECO-VALLEY</div>
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="about-team container">
        <h2 className="team-section-title">Meet the Family</h2>
        <p className="team-section-subtitle">
          The talented individuals who make every visit to Savory Bistro an unforgettable experience.
        </p>

        <div className="team-grid">
          {/* Member 1 */}
          <div className="team-member">
            <div className="team-avatar-wrapper">
              <img src="/images/AboutUs/Avatar 1.jpeg" alt="Ahmed Tyson" />
            </div>
            <h4>Ahmed Tyson</h4>
            <span className="team-role">Home, login and register pages</span>
            <p><br></br>Bro cooked so hard😉 <br></br><br></br></p>
            <a href="#" className="team-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>

          {/* Member 2 */}
          <div className="team-member">
            <div className="team-avatar-wrapper">
              <img src="/images/AboutUs/Avatar 2.jpeg" alt="Hagar Ashraf" />
            </div>
            <h4>Hagar Ashraf</h4>
            <span className="team-role">Gallary and Menu Pages </span>
            <p>Hagar's wine pairings are legendary, curated from the fines...</p>
            <a href="#" className="team-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>

          {/* Member 3 */}
          <div className="team-member">
            <div className="team-avatar-wrapper">
              <img src="/images/AboutUs/Avatar 3.jpeg" alt="Bassant Hesham" />
            </div>
            <h4>Bassant Hesham</h4>
            <span className="team-role">Reservation</span>
            <p>Award-winning desserts that are as beautiful as they are delicious.</p>
            <a href="#" className="team-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>

          {/* Member 4 */}
          <div className="team-member">
            <div className="team-avatar-wrapper">
              <img src="/images/AboutUs/Avatar 4.jpeg" alt="Youssef Elsherif" />
            </div>
            <h4>Youssef Elsherif</h4>
            <span className="team-role">Contact us page </span>
            <p>Youssef is the master of operations, Marcus keeps our kitchen running like...</p>
            <a href="#" className="team-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>

          {/* Member 5 */}
          <div className="team-member">
            <div className="team-avatar-wrapper">
              <img src="/images/AboutUs/Avatar 5.jpeg" alt="Ahmed Sorour" />
            </div>
            <h4>Ahmed Sorour</h4>
            <span className="team-role">AboutUs Page</span>
            <p>Specializing in seafood dishes, Sorour brings fresh talent...</p>
            <a href="#" className="team-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
      </section>

      {/* 5. Press / Testimonial Section */}
      <section className="about-press container">
        <div className="press-brands">
          <span className="brand-logo serif-brand">Forbes</span>
          <span className="brand-logo sans-brand">EATER</span>
          <span className="brand-logo script-brand">The New York Times</span>
          <span className="brand-logo serif-brand">VOGUE</span>
        </div>

        <div className="testimonial-box">
          <div className="quote-icon">”</div>
          <p className="testimonial-quote">
            "Savory Bistro manages to balance high-end culinary expertise with a warmth that makes you want to stay for hours. A rare gem in the city."
          </p>
          <span className="testimonial-author">— Culinary Review Monthly</span>
        </div>

        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
