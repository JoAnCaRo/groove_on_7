import React, { useState } from 'react';
import PlaylistPopup from '../src/components/PlaylistPopup';

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTidalLogin = () => {
    // Redirige al flujo de autenticación de Tidal
    const clientId = 'FsvXoX8IZ52EWmOV';
    const redirectUri = 'https://6407-78-54-111-204.ngrok-free.app/callback'; // Usa ngrok o tu dominio en producción
    const tidalAuthUrl = new URL('https://login.tidal.com/oauth2/authorize');
    tidalAuthUrl.searchParams.append('response_type', 'token');
    tidalAuthUrl.searchParams.append('client_id', clientId);
    tidalAuthUrl.searchParams.append('redirect_uri', redirectUri);
    tidalAuthUrl.searchParams.append('scope', 'playlist.write playlist.read');
    window.location.href = tidalAuthUrl.toString(); // Redirige al usuario
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


/* POPUP */
/* import React from 'react';
import { motion } from 'framer-motion';

const PlaylistPopup = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content">
        <h4>Create Your Playlist</h4>
        <p>Access your Tidal playlists and create your own with the best tracks.</p>
        <button className="tidal-login-button" onClick={onLogin}>
          Login with Tidal
        </button>
        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PlaylistPopup; */