import React from "react";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./AboutTeam.css";

const AboutTeam = ({ teamMembers }) => {
  return (
    <AboutSection className="about-team-section">
      <div className="about-team container">
        <h2 className="team-section-title">Meet the Family</h2>
        <p className="team-section-subtitle">
          The talented individuals who make every visit to Savory Bistro an
          unforgettable experience.
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member">
              <div className="team-avatar-wrapper">
                <img src={member.image} alt={member.name} />
              </div>
              <h4>{member.name}</h4>
              <span className="team-role">{member.role}</span>
              <p>{member.bio}</p>
              <a
                href={member.linkedin}
                className="team-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutTeam;
