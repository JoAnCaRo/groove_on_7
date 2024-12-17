import React, { useEffect, useRef, useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Playlists = () => {
  const { sections } = useScrollContext();

  // Referencias a los iFrames
  const mixcloudRefs = useRef([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  // Enviar mensajes a Mixcloud para controlar la reproducción
  const handlePlay = (index) => {
    // Pausar el iFrame actualmente en reproducción
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      const prevPlayer = mixcloudRefs.current[currentPlayingIndex];
      prevPlayer.contentWindow.postMessage({ method: 'pause' }, '*');
    }

    // Reproducir el iFrame seleccionado
    const currentPlayer = mixcloudRefs.current[index];
    currentPlayer.contentWindow.postMessage({ method: 'play' }, '*');

    setCurrentPlayingIndex(index); // Actualizar el índice actual
  };

  useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      if (currentPlayingIndex !== null) {
        const currentPlayer = mixcloudRefs.current[currentPlayingIndex];
        currentPlayer?.contentWindow.postMessage({ method: 'pause' }, '*');
      }
    };
  }, [currentPlayingIndex]);

  return (
    <section ref={sections.playlists} id="playlists" className="playlists-section">
      <div className="line-container-playlists">
        {/* Líneas animadas */}
        <div className="scroll-line-playlists"></div>
        <div className="reverse-scroll-line-playlists"></div>
      </div>

      <div className="playlists-content-container">
        <h3>Playlists</h3>
        <p>Discover my curated playlists across styles like Disco, Funk, House, and more!</p>

        {[
          'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F',
          'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F',
          'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F',
        ].map((src, index) => (
          <div className="mixcloud-embed" key={index}>
            <iframe
              ref={(el) => (mixcloudRefs.current[index] = el)}
              src={src}
              width="100%"
              height="120"
              title={`Mixcloud Playlist ${index + 1}`}
              onLoad={() => console.log(`Loaded: ${index}`)}
            ></iframe>
            <button className="play-button" onClick={() => handlePlay(index)}>
              Play
            </button>
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
