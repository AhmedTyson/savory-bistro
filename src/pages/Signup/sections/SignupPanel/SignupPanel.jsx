import { UtensilsCrossed } from 'lucide-react'
import AuthLeafLines from '../../../../components/SvgAssets/AuthLeafLines';
import './SignupPanel.css'

export default function SignupPanel({ dishes }) {
  return (
    <div className="auth-left">
      <AuthLeafLines className="auth-left-leaf" aria-hidden="true" />
      <div className="auth-left-brand">
        <UtensilsCrossed size={15} color="var(--color-primary)" />
        <span className="auth-left-brand-name">Savory Bistro</span>
      </div>
      {dishes.map((dish, i) => (
        <div key={dish.id} className={`dish-slot dish-slot-${i + 1}`}>
          <img src={`/images/home-page/${dish.name.toLowerCase().replace(/ /g, '-')}.webp`} alt={dish.name}
            className="dish-slot-img"
            onError={e => { e.target.style.display = 'none' }} />
          <div className="dish-slot-overlay" />
          {dish.badge === 'POPULAR' && <span className="dish-slot-popular">POPULAR</span>}
          <div className="dish-slot-badge">
            <div className="dish-slot-name">{dish.name}</div>
            <div className="dish-slot-price">${dish.price.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
