import './SvgAssets.css';

export default function AuthLeafLines({ className, style }) {
  return (
    <svg 
      className={`AuthLeafLines ${className}`} 
      style={style} 
      viewBox="0 0 200 200" 
      fill="none"
    >
      <path className="AuthLeafLines--dashed" d="M40,100 C60,40 140,40 160,100 C180,160 100,180 40,100 Z" />
      <path d="M50,120 C80,30 180,60 140,150 C100,200 20,180 50,120 Z" />
      <path d="M10,80 Q30,-10 100,20 T190,90 T120,190 T10,80" />
      <path d="M100,100 Q150,50 180,100 T150,150 T80,150 Z" />
    </svg>
  );
}
