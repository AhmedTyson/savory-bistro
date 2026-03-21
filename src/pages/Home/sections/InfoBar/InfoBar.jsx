/** InfoBar.jsx - Store Location & Hours Overview **/
import { Clock, MapPin, Phone } from "lucide-react";
import "./InfoBar.css";

export default function InfoBar() {
  return (
    <div className="InfoBar">
      <div className="InfoBar__container">
        <div className="InfoBar__grid">
          <div className="InfoBar__item">
            <div className="InfoBar__icon-wrapper">
              <Clock
                size={22}
                fill="currentColor"
                stroke="var(--color-bg-infobar)"
                strokeWidth={2}
              />
            </div>
            <div className="InfoBar__content">
              <span className="InfoBar__label">HOURS</span>
              <p className="InfoBar__value">Tue – Sun: 11:00 AM – 10:00 PM</p>
            </div>
          </div>

          <div className="InfoBar__item">
            <div className="InfoBar__icon-wrapper">
              <MapPin
                size={22}
                fill="currentColor"
                stroke="var(--color-bg-infobar)"
                strokeWidth={2}
              />
            </div>
            <div className="InfoBar__content">
              <span className="InfoBar__label">ADDRESS</span>
              <p className="InfoBar__value">
                123 Culinary Ave, Foodie District
              </p>
            </div>
          </div>

          <div className="InfoBar__item">
            <div className="InfoBar__icon-wrapper">
              <Phone size={22} fill="currentColor" stroke="none" />
            </div>
            <div className="InfoBar__content">
              <span className="InfoBar__label">PHONE</span>
              <p className="InfoBar__value">+1 (555) 123 - 4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
