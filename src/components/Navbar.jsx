/* Importa React, hooks e iconos */
import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import HamburgerIcon from '../assets/icons/hamburger.svg'; 
import CloseIcon from '../assets/icons/close.svg'; 

/*Función para desplazarse a secciones específicas y controlar la visibilidad del menú */
const Navbar = () => {
  const { scrollToSection } = useScrollContext();
  const [menuOpen, setMenuOpen] = useState(false);

  /*Función abrir menú (móvil)*/
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /*Función cerrar menú (móvil)*/
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <img src={menuOpen ? CloseIcon : HamburgerIcon} alt="Menu Toggle" />
      </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
              closeMenu();
            }}
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            href="#liveSessions"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('liveSessions');
              closeMenu();
            }}
          >
            LIVE SESSIONS
          </a>
        </li>
        <li>
          <a
            href="#playlists"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('playlists');
              closeMenu();
            }}
          >
            PLAYLISTS
          </a>
        </li>
        <li>
          <a
            href="#events"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('events');
              closeMenu();
            }}
          >
            EVENTS
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
              closeMenu();
            }}
          >
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
