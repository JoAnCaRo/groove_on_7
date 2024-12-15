import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { sections } = useScrollContext();
  const lineRef = useRef(null); // Referencia a la línea horizontal
  const verticalLineRef = useRef(null); // Referencia a la línea vertical

  useEffect(() => {
    if (lineRef.current && verticalLineRef.current) {
      const aboutSection = document.querySelector('.about-section'); // Sección About

      // Animación de la línea horizontal
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0, // Comienza sin ancho
        },
        {
          scaleX: 1, // Se expande completamente
          scrollTrigger: {
            trigger: aboutSection, // La animación está vinculada al contenedor About
            start: 'top center', // Comienza cuando About llega al centro del viewport
            end: 'bottom center', // Termina cuando About sale del viewport
            scrub: true, // Sincroniza con el scroll
          },
        }
      );

      // Animación de la línea vertical
      gsap.fromTo(
        verticalLineRef.current,
        {
          scaleY: 0, // Comienza sin altura
        },
        {
          scaleY: 1, // Se expande completamente
          scrollTrigger: {
            trigger: aboutSection, // La animación está vinculada al contenedor About
            start: 'top center', // Comienza cuando About llega al centro del viewport
            end: 'bottom center', // Termina cuando About sale del viewport
            scrub: true, // Sincroniza con el scroll
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sections.about} id="about" className="about-section">
      {/* Contenedor para las líneas animadas */}
      <div className="line-container">
        <div ref={lineRef} className="scroll-line"></div>
      </div>
      <div className="vertical-line-container">
        <div ref={verticalLineRef} className="vertical-scroll-line"></div>
      </div>

      {/* Contenedor para el contenido del texto */}
      <div className="text-container">
        <h2>THIS ABOUT MUSIC, VINYL CULTURE AND LOVE</h2>
        <p>Welcome to Groove on 7!</p>
        <p>For over 15 years, I’ve been on a global journey, curating an extraordinary collection of 7” vinyl singles, each record carrying its own story, rhythm, and soul.</p>
        <p>From dusty crates in far-flung record shops to spinning at some of Berlin's most iconic bars, I’ve shared these grooves with those who know the power of music to connect and inspire.</p>
        <p>Now, it’s time to take this passion beyond the dancefloor and into your world.</p>
        <p>Groove on 7 is more than just a portfolio, it’s a space where vinyl culture, timeless sounds, and unforgettable vibes come together.</p>
      </div>
    </section>
  );
};

export default About;
