import { UtensilsCrossed } from 'lucide-react'
import authLeafLines from '../../../../assets/auth-leaf-lines.svg'
import './LoginPanel.css'

export default function LoginPanel() {
  return (
    <div className="auth-left">
      <img src="/images/hero/food-hero.webp" alt="Savory Bistro signature dish" className="auth-left-img" />
      <img src={authLeafLines} className="auth-left-leaf" alt="" aria-hidden="true" />
      <div className="auth-left-overlay" />
      <div className="auth-left-brand">
        <UtensilsCrossed size={16} color="var(--color-primary)" />
        <span className="auth-left-brand-name">Savory Bistro</span>
      </div>
      <div className="auth-left-content">
        <h2 className="auth-left-title">Savory Bistro</h2>
        <p className="auth-left-script">Authentic Flavors, Unforgettable Moments</p>
      </div>
    </div>
  )
}
