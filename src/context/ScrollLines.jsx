/* import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollLines = () => {
  const lineRef = useRef(null); // Referencia a la línea

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0, // Comienza sin ancho
        },
        {
          scaleX: 1, // La línea se expande completamente
          scrollTrigger: {
            trigger: '.about-section', // Solo se anima dentro de About
            start: 'top center', // Inicia cuando About llega al centro del viewport
            end: 'bottom center', // Termina cuando About sale del viewport
            scrub: true, // Sincroniza con el scroll
            markers: true, // Para depuración (puedes quitarlo después)
          },
        }
      );
    }
  }, []);

  return null; // Este componente no debería renderizar ningún elemento
};

export default ScrollLines;
 */