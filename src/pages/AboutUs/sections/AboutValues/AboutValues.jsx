/** AboutValues.jsx - Sustainability & Community Mission **/
import { Truck, Leaf, RefreshCw, Users } from "lucide-react";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutValues.css";

const AboutValues = () => {
  return (
    <AboutSection className="AboutValues" containerClass="AboutValues__container">
      <h2 className="AboutValues__title">
        Good for the Plate, Good for the Planet
      </h2>
      <p className="AboutValues__subtitle">
        Our commitment to sustainability is woven into every aspect of
        Savory Bistro.
      </p>

      <div className="AboutValues__grid">
        <div className="AboutValues__item">
          <div className="AboutValues__icon-wrapper">
            <Truck size={28} strokeWidth={2.5} />
          </div>
          <h4>Local Sourcing</h4>
          <p>90% of our ingredients come from within a 50-mile radius.</p>
        </div>
        <div className="AboutValues__item">
          <div className="AboutValues__icon-wrapper">
            <Leaf size={28} strokeWidth={2.5} />
          </div>
          <h4>Zero Waste</h4>
          <p>Strict nose-to-tail and root-to-stem culinary philosophy.</p>
        </div>
        <div className="AboutValues__item">
          <div className="AboutValues__icon-wrapper">
            <RefreshCw size={28} strokeWidth={2.5} />
          </div>
          <h4>Composting</h4>
          <p>All organic waste is returned to our partner farms.</p>
        </div>
        <div className="AboutValues__item">
          <div className="AboutValues__icon-wrapper">
            <Users size={28} strokeWidth={2.5} />
          </div>
          <h4>Community</h4>
          <p>Supporting local urban garden initiatives annually.</p>
        </div>
      </div>

      <div className="AboutValues__logos">
        <div className="AboutValues__logo-box">GREEN FARM</div>
        <div className="AboutValues__logo-box">ROOTS CO.</div>
        <div className="AboutValues__logo-box">URBAN SOIL</div>
        <div className="AboutValues__logo-box">ECO-VALLEY</div>
      </div>
    </AboutSection>
  );
};

export default AboutValues;
