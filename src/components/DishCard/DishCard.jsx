import './DishCard.css';

function DishCard({ image, name, description, price, badge, dietIcon }) {
  return (
    <div className="dish-card flex items-start gap-4 p-4 w-full bg-white border border-[var(--color-border-light)] rounded-lg hover:shadow-md transition-shadow">
      <div className="relative shrink-0">
        {badge && <span className="dish-badge">{badge}</span>}
        <img src={image} alt={name} className="dish-img" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[15px] font-semibold text-[var(--color-text-heading)] break-words">{name}</h3>
          <span className="text-[15px] font-bold text-[var(--color-text-price)] whitespace-nowrap ml-2">${price}</span>
        </div>
        <p className="text-[13px] text-[var(--color-text-body)] leading-normal mb-1.5 break-words">{description}</p>
        {dietIcon && <span className={`diet-dot diet-dot--${dietIcon}`} />}
      </div>
    </div>
  );
}

export default DishCard;
