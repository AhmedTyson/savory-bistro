import './About.css';

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function About() {
  return (
    <section className="about-section py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <h2 className="about-title text-[40px] font-bold text-[#1a1a1a] leading-tight">
                Our Story
              </h2>
              <div className="title-divider bg-[#e67e22]"></div>
            </div>
            
            <div className="space-y-6 text-[#555] text-[15px] leading-[1.75] font-medium">
              <p>
                Founded in 1998, Savory Bistro began as a small family passion project in the heart of the city. 
                We believe that fine dining should be an approachable, soul-stirring experience. 
                Our ingredients are sourced daily from local organic farms, ensuring that every bite 
                carries the essence of the season.
              </p>
              <p>
                From our hand-rolled pasta to our aged steaks, our kitchen is a laboratory of tradition meeting innovation. 
                Join us and discover why we've been the city's favorite culinary destination for over two decades.
              </p>
            </div>

            <div className="mt-10">
              <button className="meet-chef-btn group">
                Meet the Chef <ArrowRight />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="chef-frame-outer">
              <div className="chef-card">
                <img 
                  src="/images/HomePage/The_Chef.webp" 
                  alt="Our Head Chef" 
                  loading="lazy"
                  className="transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
