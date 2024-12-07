import React from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Navbar = () => {
  const { scrollToSection } = useScrollContext();

  return (
    <nav className="navbar">
  <ul>
    <li>
      <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a>
    </li>
    <li>
      <a href="#liveSessions" onClick={(e) => { e.preventDefault(); scrollToSection('liveSessions'); }}>LIVE SESSIONS</a>
    </li>
    <li>
      <a href="#playlists" onClick={(e) => { e.preventDefault(); scrollToSection('playlists'); }}>PLAYLISTS</a>
    </li>
    <li>
      <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>EVENTS</a>
    </li>
    <li>
      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACT</a>
    </li>
  </ul>
</nav>

  );
};

export default Navbar;
