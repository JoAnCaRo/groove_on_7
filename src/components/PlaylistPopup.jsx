import React from 'react';
import { motion } from 'framer-motion';

const PlaylistPopup = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content">
        <h4>Create Your Playlist</h4>
        <p>Access your Spotify playlists and create your own with the best tracks.</p>
        <button className="spotify-login-button" onClick={onLogin}>
          Login with Spotify
        </button>
        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PlaylistPopup;
