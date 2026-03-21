import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutTeam.css";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 200ms delay between each member fading in
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.6 },
  },
};

const AboutTeam = ({ teamMembers }) => {
  return (
    <AboutSection className="AboutTeam" containerClass="AboutTeam__container">
      <h2 className="AboutTeam__title">Meet the Family</h2>
      <p className="AboutTeam__subtitle">
        The talented individuals who make every visit to Savory Bistro an
        unforgettable experience.
      </p>

      <motion.div 
        className="AboutTeam__grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {teamMembers.map((member) => (
          <motion.div key={member.id} className="AboutTeam__member" variants={itemVariants}>
            <div className="AboutTeam__avatar-wrapper">
              <div className="AboutTeam__avatar-inner">
                <img src={member.image} alt={member.name} />
              </div>
            </div>
            <h4 className="AboutTeam__member-name">{member.name}</h4>
            <span className="AboutTeam__role">{member.role}</span>
            <p className="AboutTeam__desc">{member.bio}</p>
            <a
              href={member.linkedin}
              className="AboutTeam__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin size={14} strokeWidth={2} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </AboutSection>
  );
};

export default AboutTeam;
