/* Importa React, hooks y contexto personalizado */
import React, { createContext, useContext, useRef } from 'react';

/* Crea contexto para manejar el scroll entre secciones */
const ScrollContext = createContext();

/* Función que provee el contexto otros componentes que lo necesitan */
export const ScrollProvider = ({ children }) => {
  /* Se crean referencias para cada sección y se utilizarán para identificar las posiciones de las secciones en el DOM */
  const sections = {
    about: useRef(null),
    liveSessions: useRef(null),
    playlists: useRef(null),
    events: useRef(null),
    contact: useRef(null),
  };

  /* Función para desplazar suavemente la vista a la sección específica */
  const scrollToSection = (sectionId) => {
    const target = sections[sectionId]?.current;
    const adjustment = 60; // Avanza 10px más

    if (target) {
      /* Obtiene altura del encabezado fijo. Si no existe, utiliza 0 como valor por defecto */
      const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;

      /* Ajusta posición objetivo */
      const targetPosition = target.offsetTop - headerHeight + adjustment;

      const duration = 1700;
      const startPosition = window.scrollY;
      let startTime = null;

      /* Función para suavizar el desplazamiento (ease-in-out) */
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b; // Acelera
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b; // Desacelera
      };

      /* Función para la animación cuadro a cuadro */
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
