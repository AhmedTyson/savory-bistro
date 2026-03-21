/** OurStory.jsx - Brand History & Mission Section **/
import { ArrowRight } from 'lucide-react';
import './OurStory.css';

export default function OurStory() {
  return (
    <section className="OurStory">
      <div className="OurStory__container">
        <div className="OurStory__grid">
          <div className="OurStory__content">
            <div className="OurStory__header">
              <h2 className="OurStory__title">
                Our Story
              </h2>
              <div className="OurStory__divider"></div>
            </div>

            <div className="OurStory__text">
              <p>
                Founded in 1998, Savory Bistro began as a small family passion
                project in the heart of the city. We believe that fine dining
                should be an approachable, soul-stirring experience. Our
                ingredients are sourced daily from local organic farms, ensuring
                that every bite carries the essence of the season.
              </p>
              <p>
                From our hand-rolled pasta to our aged steaks, our kitchen is a
                laboratory of tradition meeting innovation. Join us and discover
                why we've been the city's favorite culinary destination for over
                two decades.
              </p>
            </div>

            <div className="OurStory__actions">
              <button className="OurStory__btn group">
                Meet the Chef <ArrowRight className="OurStory__arrow-icon" size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="OurStory__image-side">
            <div className="OurStory__chef-frame">
              <div className="OurStory__chef-card">
                <img
                  src="/images/home-page/about-chef-rossi-home.webp"
                  alt="Our Head Chef"
                  loading="lazy"
                  className="OurStory__chef-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
