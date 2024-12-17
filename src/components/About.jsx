import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const About = () => {
  const { sections } = useScrollContext();
  const lineRef = useRef(null); // Referencia a la línea horizontal
  const verticalLineRef = useRef(null); // Referencia a la línea vertical

  useEffect(() => {
    const { gsap } = window; // Accede a GSAP global desde el CDN
    const { ScrollTrigger } = window;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger); // Asegura que esté registrado

      const aboutSection = document.querySelector('.about-section');

      // Animación de la línea horizontal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // Animación de la línea vertical
      gsap.fromTo(
        verticalLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );
    } else {
      console.error('GSAP or ScrollTrigger not found!');
    }
  }, []);

  return (
    <section ref={sections.about} id="about" className="about-section">
      {/* Contenedor para las líneas animadas */}
      <div className="line-container-about">
        <div ref={lineRef} className="scroll-line-about"></div>
      </div>
      <div className="vertical-line-container-about">
        <div ref={verticalLineRef} className="vertical-scroll-line-about"></div>
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
