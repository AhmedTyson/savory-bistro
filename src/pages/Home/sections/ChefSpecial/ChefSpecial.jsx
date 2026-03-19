import './ChefSpecial.css';

export default function ChefSpecial() {
  return (
    <section className="ChefSpecial">
      <div 
        className="ChefSpecial__bg"
        style={{ 
          backgroundImage: 'url("/images/home-page/wild-caught-halibut.webp")'
        }}
      >
        <div className="ChefSpecial__overlay"></div>
      </div>

      <div className="ChefSpecial__content">
        <div className="ChefSpecial__container">
          <span className="ChefSpecial__tag">CHEF'S SPECIAL</span>
          <h2 className="ChefSpecial__title">Wild Caught Halibut</h2>
          
          <p className="ChefSpecial__desc">
            Poached in lemon-thyme butter, served over a bed of saffron risotto 
            with asparagus spears and a citrus beurre blanc.
          </p>

          <div className="ChefSpecial__price">
            <span className="ChefSpecial__amount">$39</span>
          </div>

          <button className="ChefSpecial__order-btn">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
