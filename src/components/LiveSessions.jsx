/* Importa React, hooks y archivos necesario */
import React, { useRef, useEffect, useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import VideoPopup from './VideoPopup';

/* Función para gestionar referencias de secciones y  video actual en reproducción
 */
const LiveSessions = () => {
  const { sections } = useScrollContext();
  const [currentVideo, setCurrentVideo] = useState(null);

  // Referencias para las líneas verticales
  const firstVerticalLineRef = useRef(null);
  const secondVerticalLineRef = useRef(null);

  /* Registra el plugin ScrollTrigger en gsap y definir el área de activación de las animaciones. */
  useEffect(() => {
    const { gsap } = window; // Accede a GSAP globalmente
    const { ScrollTrigger } = window; // Accede a ScrollTrigger desde GSAP

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger); // Asegura que ScrollTrigger esté registrado

      const liveSessionsSection = document.querySelector('.live-sessions-section');

      // Animación para la primera línea vertical (azul)
      if (firstVerticalLineRef.current) {
        gsap.fromTo(
          firstVerticalLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: liveSessionsSection,
              start: 'top center+=20',
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      }

      // Animación para la segunda línea vertical (roja)
      if (secondVerticalLineRef.current) {
        gsap.fromTo(
          secondVerticalLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: liveSessionsSection,
              start: 'top center-=900',
              end: 'bottom center-=1000',
              scrub: true,
            },
          }
        );
      }
    } else {
      console.error('GSAP or ScrollTrigger not found!'); /* Manejo de errores */
    }
  }, []);

  const videos = [
    {
      id: 1,
      title: 'Disco',
      description: 'A journey through groovy Disco beats and timeless classics. Feel the rhythm and let the music move you!',
      thumbnail: 'img/thumbnails/session-01.png',
      vimeoUrl: 'https://player.vimeo.com/video/290642100',
    },
    {
      id: 2,
      title: 'Funk',
      description: 'Get down to the irresistible grooves of Funk — where deep basslines, soulful rhythms, and electrifying vibes take over!',
      thumbnail: 'img/thumbnails/session-02.png',
      vimeoUrl: 'https://player.vimeo.com/video/290642100',
    },
    {
      id: 3,
      title: 'House',
      description: 'Immerse yourself in the pulsating beats of House music — uplifting melodies, hypnotic rhythms, and pure dancefloor energy!',
      thumbnail: 'img/thumbnails/session-03.png',
      vimeoUrl: 'https://player.vimeo.com/video/580266492',
    },
  ];

  return (
    <section ref={sections.liveSessions} id="live-sessions" className="live-sessions-section">
      {/* Primera línea vertical */}
      <div className="first-vertical-line-container-livesessions">
        <div ref={firstVerticalLineRef} className="first-vertical-scroll-line-livesessions"></div>
      </div>

      {/* Segunda línea vertical */}
      <div className="second-vertical-line-container-livesessions">
        <div ref={secondVerticalLineRef} className="second-vertical-scroll-line-livesessions"></div>
      </div>

      {/* Contenedor de sesiones en vivo */}
      <div className="sessions">
        <h3>Live Sessions</h3>
        {videos.map((video) => (
          <div key={video.id} className="session">
            <div className="session-image" onClick={() => setCurrentVideo(video.vimeoUrl)}>
              <img src={video.thumbnail} alt={`${video.title} Thumbnail`} />
            </div>
            <div className="session-content">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para ver todas las sesiones */}
      <div className="see-all-container">
        <a href="https://vimeo.com/jausejones" target="_blank" rel="noopener noreferrer" className="see-all-button-live">
          SEE ALL
        </a>
      </div>

      {/* Popup de video */}
      <VideoPopup videoUrl={currentVideo} onClose={() => setCurrentVideo(null)} />
    </section>
  );
};

export default LiveSessions;
