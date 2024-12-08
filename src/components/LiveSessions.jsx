import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import VideoPopup from './VideoPopup';

const LiveSessions = () => {
  const { sections } = useScrollContext();
  const [currentVideo, setCurrentVideo] = useState(null); // Estado para el video actual

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

      {}
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

      {}
      <div className="see-all-container">
        <a href="https://vimeo.com/jausejones" target="_blank" rel="noopener noreferrer" className="see-all-button-live">
          SEE ALL
        </a>
      </div>

      {}
      <VideoPopup videoUrl={currentVideo} onClose={() => setCurrentVideo(null)} />
    </section>
  );
};

export default LiveSessions;



