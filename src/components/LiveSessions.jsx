import React, { useRef, useEffect, useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPopup from './VideoPopup';

gsap.registerPlugin(ScrollTrigger);

const LiveSessions = () => {
  const { sections } = useScrollContext();
  const [currentVideo, setCurrentVideo] = useState(null);

  // Referencias para las líneas verticales
  const firstVerticalLineRef = useRef(null);
  const secondVerticalLineRef = useRef(null);

  useEffect(() => {
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

    // Animación para la segunda línea vertical (rojo)
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
  }, []);

  const videos = [
    { id: 1, title: 'Disco', description: 'Lorem ipsum dolor sit amet.', thumbnail: 'img/thumbnails/session-01.png', vimeoUrl: 'https://player.vimeo.com/video/290642100' },
    { id: 2, title: 'Funk', description: 'Lorem ipsum dolor sit amet.', thumbnail: 'img/thumbnails/session-02.png', vimeoUrl: 'https://player.vimeo.com/video/580266492' },
    { id: 3, title: 'House', description: 'Lorem ipsum dolor sit amet.', thumbnail: 'img/thumbnails/session-03.png', vimeoUrl: 'https://player.vimeo.com/video/290642100' },
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

      <div className="see-all-container">
        <a href="https://vimeo.com/jausejones" target="_blank" rel="noopener noreferrer" className="see-all-button-live">
          SEE ALL
        </a>
      </div>

      <VideoPopup videoUrl={currentVideo} onClose={() => setCurrentVideo(null)} />
    </section>
  );
};

export default LiveSessions;
