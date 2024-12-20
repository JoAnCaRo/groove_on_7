/* Importa React */
import React from 'react';

/* Componente que toma un videoId y genera un reproductor de video responsivo y accesible para reproducir contenido de Vimeo. */
const VideoEmbed = ({ videoId }) => {
  return (
    <div
      style={{
        padding: '56.25% 0 0 0',
        position: 'relative',
      }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
        title="Vimeo Video"
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
