/** AboutHero.jsx - Brand History & Milestones **/
import { Award, Star } from "lucide-react";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <AboutSection className="AboutHero" containerClass="AboutHero__layout">
      <div className="AboutHero__content">
        <span className="AboutHero__subtitle">SINCE 2015</span>
        <h1 className="AboutHero__title">Our Journey</h1>
        <p className="AboutHero__desc">
          From a small corner in the city to a culinary destination, our
          journey has been defined by passion and authentic flavors. What
          started as a humble dream between friends has blossomed into a
          community staple for those who appreciate the art of fine dining
          without the pretense.
        </p>
        <div className="AboutHero__badges">
          <div className="AboutHero__badge">
            <span className="AboutHero__badge-icon">
              <Award size={18} strokeWidth={2} />
            </span>
            Michelin Plate 2015-2023
          </div>
          <div className="AboutHero__badge">
            <span className="AboutHero__badge-icon">
              <Star size={18} strokeWidth={2} fill="currentColor" />
            </span>
            Best New Bistro 2015
          </div>
        </div>
      </div>
      <div className="AboutHero__images">
        <div
          className="AboutHero__img-block AboutHero__img-block--tall"
          style={{ backgroundImage: "url('/images/about-us/about-hero-tall.webp')" }}
        ></div>
        <div
          className="AboutHero__img-block AboutHero__img-block--menu"
          style={{ backgroundImage: "url('/images/about-us/about-hero-service.webp')" }}
        ></div>
        <div
          className="AboutHero__img-block AboutHero__img-block--team"
          style={{ backgroundImage: "url('/images/about-us/about-team-all.webp')" }}
        ></div>
        <div
          className="AboutHero__img-block AboutHero__img-block--store"
          style={{ backgroundImage: "url('/images/about-us/about-interior-storefront.webp')" }}
        ></div>
      </div>
    </AboutSection>
  );
};

export default AboutHero;
