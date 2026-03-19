import './DishCard.css';

function DishCard({ image, name, description, price, badge, dietIcon }) {
  return (
    <div className="DishCard flex items-start gap-4 p-4 w-full bg-white border border-[var(--color-border-light)] rounded-lg hover:shadow-md transition-shadow">
      <div className="DishCard__image-wrapper relative shrink-0">
        {badge && <span className="DishCard__badge">{badge}</span>}
        <img src={image} alt={name} className="DishCard__image" />
      </div>
      <div className="DishCard__body flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="DishCard__name text-[15px] font-semibold text-[var(--color-text-heading)] break-words">{name}</h3>
          <span className="DishCard__price text-[15px] font-bold text-[var(--color-text-price)] whitespace-nowrap ml-2">${price}</span>
        </div>
        <p className="DishCard__description text-[13px] text-[var(--color-text-body)] leading-normal mb-1.5 break-words">{description}</p>
        {dietIcon && <span className={`DishCard__diet-dot DishCard__diet-dot--${dietIcon}`} />}
      </div>
    </div>
  );
}

export default DishCard;
