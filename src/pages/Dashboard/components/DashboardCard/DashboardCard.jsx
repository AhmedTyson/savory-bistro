import './DashboardCard.css';

function DashboardCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`DashboardCard ${className}`}>
      {(title || subtitle) && (
        <div className="DashboardCard__header">
          {title && <h2 className="DashboardCard__title">{title}</h2>}
          {subtitle && <p className="DashboardCard__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="DashboardCard__body">
        {children}
      </div>
    </section>
  );
}

export default DashboardCard;
