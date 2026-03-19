import React, { useEffect, useRef } from "react";
import "./AboutChef.css";

const AboutChef = () => {
  const chefContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("chef-container--visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (chefContainerRef.current) {
      observer.observe(chefContainerRef.current);
    }

    return () => {
      if (chefContainerRef.current) {
        observer.unobserve(chefContainerRef.current);
      }
    };
  }, []);

  return (
    <section className="about-chef-section">
      <div className="container chef-container" ref={chefContainerRef}>
        <div className="chef-image-box">
          <img
            src="/images/AboutUs/About us 4.webp"
            alt="Chef Antonio Rossi"
          />
        </div>
        <div className="chef-content">
          <div className="chef-window-bg"></div>
          <div className="chef-content-inner">
            <h2 className="chef-title">Chef Antonio Rossi</h2>
            <p className="chef-role">Executive Chef & Founder</p>
            <p className="chef-desc">
              Trained in the rolling hills of Tuscany, Italy, Antonio brings
              over two decades of traditional Mediterranean expertise fused with
              modern innovation.
            </p>
            <div className="chef-quote-box">
              <p className="chef-quote">
                "Cooking is an act of love, a gift, a way to share with others
                the little secrets that are simmering on the back burner."
              </p>
            </div>
            <h5 className="signature-title">SIGNATURE DISHES</h5>
            <ul className="signature-list">
              <li>Wild Mushroom Risotto</li>
              <li>Tuscan Herb Crusted Lamb</li>
              <li>Deconstructed Tiramisu</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutChef;
