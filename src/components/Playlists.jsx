import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Playlists = () => {
  const { sections } = useScrollContext();
  const lineRef = useRef(null); // Referencia a la línea horizontal
  const reverseLineRef = useRef(null); // Referencia a la línea que se mueve de derecha a izquierda

  useEffect(() => {
    console.log('Initializing GSAP animation for Playlists section'); // Depuración

    const playlistsSection = document.querySelector('.playlists-section'); // Sección Playlists

    if (lineRef.current && reverseLineRef.current && playlistsSection) {
      // Animación de la línea horizontal (izquierda a derecha)
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0, // Comienza sin ancho
        },
        {
          scaleX: 1, // Se expande completamente
          duration: 2, // Añade duración para depuración
          scrollTrigger: {
            trigger: playlistsSection, // La animación está vinculada al contenedor Playlists
            start: 'top center', // Comienza cuando Playlists llega al centro del viewport
            end: 'bottom center', // Termina cuando Playlists sale del viewport
            scrub: true, // Sincroniza con el scroll
          },
        }
      );

      // Animación de la línea horizontal inversa (derecha a izquierda)
      gsap.fromTo(
        reverseLineRef.current,
        {
          scaleX: 0, // Comienza sin ancho
        },
        {
          scaleX: 1, // Se expande completamente
          duration: 2,
          transformOrigin: 'right center', // Se expande desde la derecha
          scrollTrigger: {
            trigger: playlistsSection, // La animación está vinculada al contenedor Playlists
            start: 'top center-=500',
            end: 'bottom center-=500',
            scrub: true,
          },
        }
      );
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
          <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F"></iframe>
        </div>

        <div className="mixcloud-embed">
          <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F"></iframe>
        </div>

        <div className="mixcloud-embed">
          <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F"></iframe>
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
