import './ChefSpecial.css';

export default function ChefSpecial() {
  return (
    <section className="special-section py-20 lg:py-28 relative overflow-hidden">
      <div 
        className="special-bg absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/images/HomePage/Wild_Caught_Halibut.webp")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="special-overlay absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="special-tag mb-6 block">CHEF'S SPECIAL</span>
          <h2 className="special-title mb-6">Wild Caught Halibut</h2>
          
          <p className="special-desc text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
            Poached in lemon-thyme butter, served over a bed of saffron risotto 
            with asparagus spears and a citrus beurre blanc.
          </p>

          <div className="special-price mb-12">
            <span className="text-4xl md:text-5xl font-bold text-[var(--color-gold-accent)]">$39</span>
          </div>

          <button className="special-order-btn">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
