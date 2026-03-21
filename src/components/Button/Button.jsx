import './Button.css';

function Button({ children, variant = 'primary', type = 'button', disabled = false, fullWidth = false, className = '', ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`Button Button--${variant} ${fullWidth ? 'Button--full-width' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
