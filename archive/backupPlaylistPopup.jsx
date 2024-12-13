import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlaylistPopup = ({ isOpen, onClose, onLogin }) => {
  const [apiResponse, setApiResponse] = useState(null);

  const fetchAlbum = async () => {
    const token = localStorage.getItem('tidalAccessToken');
    if (!token) {
      alert('Primero necesitas autenticarte con TIDAL.');
      return;
    }

    try {
      const response = await fetch('https://api.tidal.com/v1/albums/369610749', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al obtener información del álbum');

      const data = await response.json();
      setApiResponse(data); // Guarda la respuesta en el estado para mostrarla
    } catch (error) {
      console.error('Error al obtener el álbum:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content">
        <h4>Create Your Playlist</h4>
        <p>Access your Tidal playlists and create your own with the best tracks.</p>

        {/* Botón para autenticar con TIDAL */}
        <button className="tidal-login-button" onClick={onLogin}>
          Login with Tidal
        </button>

        {/* Botón para obtener datos del álbum */}
        <button className="fetch-album-button" onClick={fetchAlbum}>
          Get Album Info
        </button>

        {/* Mostrar respuesta de la API */}
        {apiResponse && (
          <div className="api-response">
            <h5>Album Info:</h5>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PlaylistPopup;
