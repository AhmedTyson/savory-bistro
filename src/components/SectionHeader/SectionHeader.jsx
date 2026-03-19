import './SectionHeader.css';

function SectionHeader({ label, title, subtitle, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`SectionHeader ${centered ? 'SectionHeader--center' : ''} ${className}`}>
      {label && (
        <span className="SectionHeader__label">
          {label}
        </span>
      )}
      <h2 className="SectionHeader__title">{title}</h2>
      {subtitle && (
        <p className="SectionHeader__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
