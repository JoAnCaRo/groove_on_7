import React, { useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Playlists = () => {
  const { sections } = useScrollContext();
  const mixcloudRefs = useRef([]); // Referencia a los iFrames
  const currentPlayingRef = useRef(null); // Guarda la referencia del iframe en reproducción

  useEffect(() => {
    // Escuchar los mensajes de Mixcloud
    const handleMessage = (event) => {
      if (event.origin.includes('mixcloud.com')) {
        const { method, playerId } = event.data;

        if (method === 'play') {
          // Pausar el iframe actualmente en reproducción si existe
          if (currentPlayingRef.current && currentPlayingRef.current !== playerId) {
            mixcloudRefs.current.forEach((iframe) => {
              if (iframe.dataset.playerId === currentPlayingRef.current) {
                iframe.contentWindow.postMessage({ method: 'pause' }, '*');
              }
            });
          }
          // Actualizar el iframe actual en reproducción
          currentPlayingRef.current = playerId;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Agregar atributos únicos para identificar los iframes
  const playlistUrls = [
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F',
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F',
    'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F',
  ];

  return (
    <section ref={sections.playlists} id="playlists" className="playlists-section">
      <div className="playlists-content-container">
        <h3>Playlists</h3>
        <p>Discover my curated playlists across styles like Disco, Funk, House, and more!</p>

        {playlistUrls.map((src, index) => (
          <div className="mixcloud-embed" key={index}>
            <iframe
              ref={(el) => (mixcloudRefs.current[index] = el)}
              src={`${src}&player_id=player-${index}`} // Agregamos un player_id único
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
