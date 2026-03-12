import './SectionHeader.css';

function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-2">
          {label}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`text-sm md:text-[15px] text-[var(--color-text-body)] leading-relaxed max-w-[560px] ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
