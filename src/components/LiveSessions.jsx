import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const LiveSessions = () => {
  const { sections } = useScrollContext();
  const [currentVideo, setCurrentVideo] = useState(null);

  // Videos disponibles con sus miniaturas y URLs de Vimeo
  const videos = [
    {
      id: 1,
      title: 'Disco',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      thumbnail: 'img/thumbnails/thumbnail1.png',
      vimeoUrl: 'https://player.vimeo.com/video/290642100', // Asegúrate de usar el embed URL de Vimeo
    },
    {
      id: 2,
      title: 'Funk',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      thumbnail: 'img/thumbnails/thumbnail2.png',
      vimeoUrl: 'https://player.vimeo.com/video/580266492', // Asegúrate de usar el embed URL de Vimeo
    },
    {
      id: 3,
      title: 'House',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      thumbnail: 'img/thumbnails/thumbnail3.png',
      vimeoUrl: 'https://player.vimeo.com/video/290642100', // Asegúrate de usar el embed URL de Vimeo
    },
  ];

  return (
    <section ref={sections.liveSessions} id="live-sessions" className="live-sessions-section">
      <h3>Live Sessions</h3>

      {/* Reproductor emergente de video */}
      {currentVideo && (
        <div className="video-popup">
          <div className="video-popup-overlay" onClick={() => setCurrentVideo(null)}></div>
          <div className="video-popup-content">
            <iframe src={currentVideo} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Live Session Video"></iframe>
            <button onClick={() => setCurrentVideo(null)} className="close-video-button">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Lista de sesiones */}
      <div className="sessions">
        {videos.map((video) => (
          <div key={video.id} className="session">
            <div className="session-image" onClick={() => setCurrentVideo(video.vimeoUrl)}>
              <img src={video.thumbnail} alt={`${video.title} Thumbnail`} />
            </div>
            <div className="session-content">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              <button className="play-button" onClick={() => setCurrentVideo(video.vimeoUrl)}>
                <img src="img/icons/fullscreen.svg" alt="Play" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveSessions;
