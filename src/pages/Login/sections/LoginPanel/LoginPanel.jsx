import { UtensilsCrossed } from 'lucide-react'
import AuthLeafLines from '../../../../components/SvgAssets/AuthLeafLines';
import './LoginPanel.css'

export default function LoginPanel() {
  return (
    <div className="LoginPanel">
      <img src="/images/hero/food-hero.webp" alt="Savory Bistro signature dish" className="LoginPanel__image" />
      <AuthLeafLines className="LoginPanel__leaf" aria-hidden="true" />
      <div className="LoginPanel__overlay" />
      <div className="LoginPanel__brand">
        <UtensilsCrossed size={16} color="var(--color-primary)" />
        <span className="LoginPanel__brand-name">Savory Bistro</span>
      </div>
      <div className="LoginPanel__content">
        <h2 className="LoginPanel__title">Savory Bistro</h2>
        <p className="LoginPanel__script">Authentic Flavors, Unforgettable Moments</p>
      </div>
    </div>
  )
}
