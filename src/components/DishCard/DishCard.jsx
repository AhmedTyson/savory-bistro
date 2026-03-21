import { Leaf, Fish, Flame, Wine, Cookie, ChefHat } from 'lucide-react';
import './DishCard.css';

function DishCard({ image, name, description, price, badge, dietIcon }) {
  return (
    <div className="DishCard">
      <div className="DishCard__image-wrapper">
        {badge && <span className="DishCard__badge">{badge}</span>}
        <img src={image} alt={name} className="DishCard__image" />
      </div>
      <div className="DishCard__body">
        <div className="DishCard__header">
          <h3 className="DishCard__name">{name}</h3>
          <span className="DishCard__price">${price}</span>
        </div>
        <p className="DishCard__description">{description}</p>
        {dietIcon && (
          <div className={`DishCard__diet-icon DishCard__diet-icon--${dietIcon}`}>
            {dietIcon === 'vegetarian' && <Leaf size={14} />}
            {dietIcon === 'seafood' && <Fish size={14} />}
            {dietIcon === 'spicy' && <Flame size={14} />}
            {dietIcon === 'drink' && <Wine size={14} />}
            {dietIcon === 'sweet' && <Cookie size={14} />}
            {dietIcon === 'signature' && <ChefHat size={14} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default DishCard;
