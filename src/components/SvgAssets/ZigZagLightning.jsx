import './SvgAssets.css';

export default function ZigZagLightning({ className, style, size = 32 }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      className={`ZigZagLightning ${className}`} 
      style={style}
    >
      <polyline points="15 3 7 10 17 14 9 21" />
    </svg>
  );
}
