import './Button.css';

// variant: 'primary' | 'outlined' | 'outlined-dark'
function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
