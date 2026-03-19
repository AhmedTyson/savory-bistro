import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to handle dropdown open/close states and outside clicks.
 * @param {boolean} initialState - Initial state of the dropdown.
 * @returns {object} - { isOpen, setIsOpen, containerRef }
 */
export function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, containerRef };
}
