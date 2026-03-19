import React from "react";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero container">
      <div className="about-hero-content">
        <span className="about-subtitle">SINCE 2015</span>
        <h1 className="about-title">Our Journey</h1>
        <p className="about-desc">
          From a small corner in the city to a culinary destination, our
          journey has been defined by passion and authentic flavors. What
          started as a humble dream between friends has blossomed into a
          community staple for those who appreciate the art of fine dining
          without the pretense.
        </p>
        <div className="about-badges">
          <div className="badge">
            <span className="badge-icon medal">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Michelin Plate 2015-2023
          </div>
          <div className="badge">
            <span className="badge-icon star">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Best New Bistro 2015
          </div>
        </div>
      </div>
      <div className="about-hero-images">
        <div
          className="img-block img-tall"
          style={{ backgroundImage: "url('/images/AboutUs/About us 5.webp')" }}
        ></div>
        <div
          className="img-block img-menu"
          style={{ backgroundImage: "url('/images/AboutUs/About us 2.webp')" }}
        ></div>
        <div
          className="img-block img-team"
          style={{ backgroundImage: "url('/images/AboutUs/About us 1.webp')" }}
        ></div>
        <div
          className="img-block img-store"
          style={{ backgroundImage: "url('/images/AboutUs/About us 3.webp')" }}
        ></div>
      </div>
    </section>
  );
};

export default AboutHero;
