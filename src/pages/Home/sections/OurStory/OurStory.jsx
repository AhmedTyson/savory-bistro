import './OurStory.css';

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-2"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function OurStory() {
  return (
    <section className="OurStory">
      <div className="OurStory__container">
        <div className="OurStory__grid">
          {/* Content Side */}
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
                Meet the Chef <ArrowRight />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="OurStory__image-side">
            <div className="OurStory__chef-frame">
              <div className="OurStory__chef-card">
                <img
                  src="/images/HomePage/The_Chef.webp"
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
