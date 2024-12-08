import React, { useState } from 'react';

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
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Create Your Playlist</h4>
            <p>Here you can add details to create your own playlist!</p>
            <button className="close-popup-button" onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreatePlaylist;



