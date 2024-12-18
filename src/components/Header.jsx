/* Importa React */
import React from 'react';

/* Función para manejar barra de navegación principal */
const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#live-sessions">LIVE SESSIONS</a>
          </li>
          <li>
            <a href="#playlists">PLAYLISTS</a>
          </li>
          <li>
            <a href="#events">EVENTS</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
