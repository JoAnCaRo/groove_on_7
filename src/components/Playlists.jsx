import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Playlists = () => {
  const { sections } = useScrollContext();
  const lineRef = useRef(null); // Referencia a la línea horizontal
  const reverseLineRef = useRef(null); // Referencia a la línea que se mueve de derecha a izquierda

  const mixcloudRefs = useRef([]); // Referencia a los iFrames de Mixcloud
  const currentPlayer = useRef(null); // Guarda el iFrame actualmente reproduciendo

  useEffect(() => {
    console.log('Initializing GSAP animation for Playlists section');

    const playlistsSection = document.querySelector('.playlists-section');

    if (lineRef.current && reverseLineRef.current && playlistsSection) {
      // Animación línea horizontal (izquierda a derecha)
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
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

      // Animación línea inversa (derecha a izquierda)
      gsap.fromTo(
        reverseLineRef.current,
        { scaleX: 0 },
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

    // Lógica para controlar la reproducción única de los iframes
    const handleMessage = (event) => {
      if (event.origin.includes('mixcloud.com')) {
        const { method, player_id } = event.data;

        if (method === 'play') {
          // Pausar el iframe anterior si existe
          if (currentPlayer.current && currentPlayer.current !== player_id) {
            mixcloudRefs.current.forEach((iframe) => {
              if (iframe.dataset.playerId === currentPlayer.current) {
                iframe.contentWindow.postMessage({ method: 'pause' }, '*');
              }
            });
          }
          // Actualizar el iframe en reproducción
          currentPlayer.current = player_id;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const playlistUrls = [
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F',
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F',
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F',
  ];

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

        {playlistUrls.map((src, index) => (
          <div key={index} className="mixcloud-embed">
            <iframe
              ref={(el) => (mixcloudRefs.current[index] = el)}
              src={`${src}&player_id=player-${index}`}
              width="100%"
              height="120"
              title={`Mixcloud Playlist ${index + 1}`}
              data-player-id={`player-${index}`}
            ></iframe>
          </div>
        ))}

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
