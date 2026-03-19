import { useState, useRef, useEffect } from 'react';

// shared logic for dropdown toggles and outside-click dismissal
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
