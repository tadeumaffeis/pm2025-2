import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ onCursosPress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCursosPress = () => {
    setIsOpen(false);
    onCursosPress && onCursosPress();
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        <div className="hamburger">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </button>

      {isOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
          <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
            <button className="menu-item" onClick={handleCursosPress}>
              Cursos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;