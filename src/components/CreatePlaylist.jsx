import React, { useState } from 'react';
import PlaylistPopup from './PlaylistPopup'; // Ajusta la ruta si es necesario.

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section id="create-playlist" className="create-playlist-section">
      <div className="create-playlist-content">
        <h3>Create Your Own Playlist</h3>
        <p>Access my playlists and create your own with the best tracks on Tidal.</p>
      </div>

      <div className="create-playlist-container">
        <button className="create-playlist-button" onClick={() => setIsPopupOpen(true)}>
          CREATE YOUR PLAYLIST
        </button>
      </div>

      {/* Ventana emergente */}
      <PlaylistPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default CreatePlaylist;


