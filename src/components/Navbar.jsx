/* import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import HamburgerIcon from '../assets/icons/hamburger.svg'; // Icono de hamburguesa
import CloseIcon from '../assets/icons/close.svg'; // Icono de cerrar

const Navbar = () => {
  const { scrollToSection } = useScrollContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
              setMenuOpen(false);
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
              setMenuOpen(false);
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
              setMenuOpen(false);
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
              setMenuOpen(false);
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
              setMenuOpen(false);
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
 */


import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import HamburgerIcon from '../assets/icons/hamburger.svg'; // Icono de hamburguesa
import CloseIcon from '../assets/icons/close.svg'; // Icono de cerrar

const Navbar = () => {
  const { scrollToSection } = useScrollContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
              closeMenu(); // Cierra el menú
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
              closeMenu(); // Cierra el menú
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
              closeMenu(); // Cierra el menú
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
              closeMenu(); // Cierra el menú
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
              closeMenu(); // Cierra el menú
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
