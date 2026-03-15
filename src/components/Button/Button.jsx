import './Button.css';

function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`Button Button--${variant} ${fullWidth ? 'Button--full-width' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
