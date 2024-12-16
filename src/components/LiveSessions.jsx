import React, { useRef, useEffect, useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPopup from './VideoPopup';

gsap.registerPlugin(ScrollTrigger);

const LiveSessions = () => {
  const { sections } = useScrollContext();
  const [currentVideo, setCurrentVideo] = useState(null);
  const verticalLineRef = useRef(null);
  const horizontalLineRef = useRef(null);

useEffect(() => {
  const liveSessionsSection = document.querySelector('.live-sessions-section');

  // Animación para la primera línea vertical (azul)
  if (verticalLineRef.current) {
    gsap.fromTo(
      verticalLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: liveSessionsSection,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    );
  }

  // Animación para la segunda línea vertical (rojo)
  const secondVerticalLine = document.querySelector('.second-scroll-line');
  if (secondVerticalLine) {
    gsap.fromTo(
      secondVerticalLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: liveSessionsSection,
          start: 'top center-=1000',
          end: 'bottom center',
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
      <div className="vertical-line-container-livesessions first-vertical-line">
        <div ref={verticalLineRef} className="vertical-scroll-line-livesessions"></div>
      </div>

      {/* Segunda línea vertical */}
      <div className="vertical-line-container-livesessions second-vertical-line">
        <div className="vertical-scroll-line-livesessions second-scroll-line"></div>
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
