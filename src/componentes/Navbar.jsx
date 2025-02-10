import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import './styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón para abrir */}
      <button className="menu-icon" onClick={toggleNavbar}>
        ☰
      </button>

      {/* Navbar horizontal */}
      <div className={`navbar ${isOpen ? 'open' : ''}`}>
        <button className="close-icon" onClick={toggleNavbar}>
          ✖
        </button>
        <ul>
          <li><Link to="/" onClick={toggleNavbar}>Home</Link></li>
          <li><Link to="/about" onClick={toggleNavbar}>About</Link></li>
          <li><Link to="/contact" onClick={toggleNavbar}>Contact</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;



