/* Importa React */
import React from 'react';
import { motion } from 'framer-motion';

/* Componente React que crea una ventana emergente (popup) con animaciones de entrada y salida, utilizando la biblioteca Framer Motion. */
const PlaylistPopup = ({ isOpen, onClose, onLogin, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content">
        {/* Botón de Login */}
        {onLogin && (
          <button className="spotify-login-button" onClick={onLogin}>
            Login with Spotify
          </button>
        )}

        {/* Contenido Dinámico */}
        <div className="popup-dynamic-content">{children}</div>

        {/* Botón de Cierre */}
        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PlaylistPopup;
