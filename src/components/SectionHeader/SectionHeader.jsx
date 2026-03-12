import './SectionHeader.css';

// align: 'left' | 'center'
function SectionHeader({ label, title, subtitle, align = 'left' }) {
  return (
    <div className={`section-header section-header--${align}`}>
      {label && <span className="section-header__label">{label}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
