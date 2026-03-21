import { useEffect, useRef } from "react";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutChef.css";

const AboutChef = () => {
  const chefContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("AboutChef__container--visible");
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
    <AboutSection 
      className="AboutChef" 
      containerClass="AboutChef__container"
      ref={chefContainerRef}
    >
      <div className="AboutChef__image-box">
        <img
          src="/images/about-us/about-chef-rossi.webp"
          alt="Chef Antonio Rossi"
        />
      </div>
      <div className="AboutChef__content">
        <div className="AboutChef__window-bg"></div>
        <div className="AboutChef__content-inner">
          <h2 className="AboutChef__title">Chef Antonio Rossi</h2>
          <p className="AboutChef__role">Executive Chef & Founder</p>
          <p className="AboutChef__desc">
            Trained in the rolling hills of Tuscany, Italy, Antonio brings
            over two decades of traditional Mediterranean expertise fused with
            modern innovation.
          </p>
          <div className="AboutChef__quote-box">
            <p className="AboutChef__quote">
              "Cooking is an act of love, a gift, a way to share with others
              the little secrets that are simmering on the back burner."
            </p>
          </div>
          <h5 className="AboutChef__signature-title">SIGNATURE DISHES</h5>
          <ul className="AboutChef__signature-list">
            <li>Wild Mushroom Risotto</li>
            <li>Tuscan Herb Crusted Lamb</li>
            <li>Deconstructed Tiramisu</li>
          </ul>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutChef;
