import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const sections = {
    about: useRef(null),
    liveSessions: useRef(null),
    playlists: useRef(null),
    events: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = (sectionId) => {
    const target = sections[sectionId]?.current;
    const adjustment = 50; // Avanza 10px más

    if (target) {
      // Obtén la altura del encabezado fijo
      const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;

      // Ajusta la posición objetivo
      const targetPosition = target.offsetTop - headerHeight + adjustment;

      const duration = 1700;
      const startPosition = window.scrollY;
      let startTime = null;

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, targetPosition - startPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  };

  return <ScrollContext.Provider value={{ sections, scrollToSection }}>{children}</ScrollContext.Provider>;
};

export const useScrollContext = () => useContext(ScrollContext);
