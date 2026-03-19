import React, { forwardRef } from 'react';
import './AboutSection.css';

const AboutSection = forwardRef(({ 
  className = "", 
  containerClass = "",
  children 
}, ref) => {
  return (
    <section className={`about-section ${className}`}>
      <div className={`container ${containerClass}`} ref={ref}>
        {children}
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
