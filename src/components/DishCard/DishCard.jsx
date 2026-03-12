import './DishCard.css';

// dietIcon: 'vegetarian' | 'seafood' | 'spicy' | null
function DishCard({ image, name, description, price, badge, dietIcon }) {
  return (
    <div className="dish-card">
      <div className="dish-card__img-wrap">
        {badge && <span className="dish-card__badge">{badge}</span>}
        <img src={image} alt={name} className="dish-card__img" />
      </div>
      <div className="dish-card__body flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="dish-card__name">{name}</h3>
          <span className="dish-card__price">${price}</span>
        </div>
        <p className="dish-card__desc">{description}</p>
        {dietIcon && <span className={`dish-card__dot dish-card__dot--${dietIcon}`} />}
      </div>
    </div>
  );
}

export default DishCard;
