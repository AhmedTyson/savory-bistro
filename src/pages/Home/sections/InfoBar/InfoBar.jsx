import "./InfoBar.css";

// Custom SVG Icons to match screenshot exactly
const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM13 13H8V11H11V7H13V13Z"
      fill="currentColor"
    />
  </svg>
);

const PinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill="currentColor"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
      fill="currentColor"
    />
  </svg>
);

export default function InfoBar() {
  return (
    <div className="InfoBar">
      <div className="InfoBar__container">
        <div className="InfoBar__grid">
          {/* Hours Section */}
          <div className="InfoBar__item InfoBar__item--hours">
            <div className="InfoBar__icon-wrapper">
              <ClockIcon />
            </div>
            <div className="InfoBar__content">
              <span className="InfoBar__label">HOURS</span>
              <p className="InfoBar__value">Tue – Sun: 11:00 AM – 10:00 PM</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="InfoBar__item InfoBar__item--address">
            <div className="InfoBar__icon-wrapper">
              <PinIcon />
            </div>
            <div className="InfoBar__content">
              <span className="InfoBar__label">ADDRESS</span>
              <p className="InfoBar__value">123 Culinary Ave, Foodie District</p>
            </div>
          </div>

          {/* Phone Section */}
          <div className="InfoBar__item InfoBar__item--phone">
            <div className="InfoBar__icon-wrapper">
              <PhoneIcon />
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
