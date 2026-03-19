import { ChevronDown } from 'lucide-react';
import { useDropdown } from '../../hooks/useDropdown';
import './SelectionField.css';

const SelectionField = ({ 
  label, 
  value, 
  options, 
  placeholder, 
  onSelect, 
  error, 
  required = false,
  formatOption = (opt) => opt,
  className = ""
}) => {
  const { isOpen, setIsOpen, containerRef } = useDropdown(false);

  return (
    <div className={`selection-field ${className}`} ref={containerRef}>
      {label && (
        <label className="selection-label">
          {label} {required && <span className="selection-req">*</span>}
        </label>
      )}
      
      <div className="selection-container">
        <div 
          className={`selection-trigger ${isOpen ? 'selection-trigger--active' : ''} ${error ? 'selection-trigger--error' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={!value ? 'selection-placeholder' : ''}>
            {value ? formatOption(value) : placeholder}
          </span>
          <ChevronDown 
            size={18} 
            className={`selection-icon ${isOpen ? 'selection-icon--rotated' : ''}`} 
          />
        </div>
        
        {isOpen && (
          <div className="selection-menu">
            {options.map((option, idx) => (
              <div 
                key={idx}
                className={`selection-item ${value === option ? 'selection-item--selected' : ''}`}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {formatOption(option)}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <span className="selection-error-msg">{error}</span>}
    </div>
  );
};

export default SelectionField;
