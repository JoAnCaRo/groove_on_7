/* Importa React, hooks y contexto personalizado */
import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';

/* Función para gestionar referencias de secciones y lineas de decoración */
const Playlists = () => {
  const { sections } = useScrollContext();
  const lineRef = useRef(null);
  const reverseLineRef = useRef(null);

  /* Registra el plugin ScrollTrigger en gsap y definir el área de activación de las animaciones. */
  useEffect(() => {
    console.log('Initializing GSAP animation for Playlists section'); // Depuración

    const { gsap } = window; // Accede a GSAP globalmente
    const { ScrollTrigger } = window; // Accede a ScrollTrigger desde GSAP

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger); // Asegura que ScrollTrigger esté registrado

      const playlistsSection = document.querySelector('.playlists-section'); // Obtiene la sección de referencia

      if (lineRef.current && playlistsSection) {
        // Animación de la línea horizontal (izquierda a derecha)
        gsap.fromTo(
          lineRef.current,
          {
            scaleX: 0, 
          },
          {
            scaleX: 1, 
            duration: 2, 
            scrollTrigger: {
              trigger: playlistsSection, 
              start: 'top center',
              end: 'bottom center', 
              scrub: true, 
            },
          }
        );
      }

      if (reverseLineRef.current && playlistsSection) {
        // Animación de la línea horizontal inversa (derecha a izquierda)
        gsap.fromTo(
          reverseLineRef.current,
          {
            scaleX: 0, 
          },
          {
            scaleX: 1, 
            duration: 2,
            transformOrigin: 'right center', 
            scrollTrigger: {
              trigger: playlistsSection,
              start: 'top center-=500',
              end: 'bottom center-=500',
              scrub: true,
            },
          }
        );
      }
    } else {
      console.error('GSAP or ScrollTrigger not found!');
    }
  }, []);

  return (
    <section ref={sections.playlists} id="playlists" className="playlists-section">
      {/* Contenedores para las líneas animadas */}
      <div className="line-container-playlists">
        <div ref={lineRef} className="scroll-line-playlists"></div>
        <div ref={reverseLineRef} className="reverse-scroll-line-playlists"></div>
      </div>

      {/* Contenedor para el contenido */}
      <div className="playlists-content-container">
        <h3>Playlists</h3>
        <p>Discover my curated playlists across styles like Disco, Funk, House, and more!</p>

        <div className="mixcloud-embed">
          <iframe
            width="100%"
            height="120"
            src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="mixcloud-embed">
          <iframe
            width="100%"
            height="120"
            src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="mixcloud-embed">
          <iframe
            width="100%"
            height="120"
            src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="see-all-container">
          <a href="https://www.mixcloud.com/JauseJones/" target="_blank" rel="noopener noreferrer" className="see-all-button-play">
            SEE ALL
          </a>
        </div>
      </div>
    </section>
  );
};

export default Playlists;
