import React, { useState } from 'react';
import PlaylistPopup from './PlaylistPopup';

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTidalLogin = () => {
    const clientId = 'FsvXoX8IZ52EWmOV';
    const redirectUri = 'https://00f1-77-183-190-220.ngrok-free.app/callback';
    const tidalAuthUrl = new URL('https://login.tidal.com/authorize');

    tidalAuthUrl.searchParams.append('response_type', 'code');
    tidalAuthUrl.searchParams.append('client_id', clientId);
    tidalAuthUrl.searchParams.append('redirect_uri', redirectUri);
    tidalAuthUrl.searchParams.append('scope', 'playlist.read playlist.write');
    tidalAuthUrl.searchParams.append('state', 'my_unique_state_123');

    console.log('Generated URL:', tidalAuthUrl.toString());
    window.location.href = tidalAuthUrl.toString();
  };

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
      <PlaylistPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLogin={handleTidalLogin} // Prop para manejar el login de Tidal
      />
    </section>
  );
};

export default CreatePlaylist;
