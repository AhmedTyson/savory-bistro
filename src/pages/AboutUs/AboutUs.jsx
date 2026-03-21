/** AboutUs.jsx - Brand Philosophy & Team Overview **/
import AboutHero from "./sections/AboutHero/AboutHero";
import AboutChef from "./sections/AboutChef/AboutChef";
import AboutValues from "./sections/AboutValues/AboutValues";
import AboutTeam from "./sections/AboutTeam/AboutTeam";
import AboutTestimonials from "./sections/AboutTestimonials/AboutTestimonials";
import mockData from "../../../mock-data.json";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <AboutHero />
      <AboutChef />
      <AboutValues />
      <AboutTeam teamMembers={mockData.aboutTeam} />
      <AboutTestimonials reviews={mockData.aboutReviews} />
    </div>
  );
};

export default AboutUs;
